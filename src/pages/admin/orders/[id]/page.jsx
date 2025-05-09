"use client"

import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Download, Mail, Printer, Package, Truck, CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock order data
const getOrder = (id) => {
  return {
    id: id,
    date: "2023-05-01",
    status: "Processing",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
    },
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    billingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    items: [
      {
        id: 1,
        name: "Wireless Headphones",
        sku: "WH-1000X",
        price: 129.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 2,
        name: "Smart Watch",
        sku: "SW-2000",
        price: 199.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    payment: {
      method: "Credit Card",
      cardNumber: "**** **** **** 1234",
      cardType: "Visa",
    },
    shipping: {
      method: "Standard Shipping",
      cost: 10.0,
      trackingNumber: "TRK123456789",
      carrier: "UPS",
    },
    subtotal: 329.98,
    tax: 32.99,
    total: 372.97,
    notes: "Customer requested gift wrapping.",
    history: [
      {
        date: "2023-05-01 09:15:00",
        status: "Order Placed",
        note: "Order was placed by customer",
      },
      {
        date: "2023-05-01 10:30:00",
        status: "Payment Received",
        note: "Payment was successfully processed",
      },
      {
        date: "2023-05-02 14:45:00",
        status: "Processing",
        note: "Order is being prepared for shipping",
      },
    ],
  }
}

export default function AdminOrderDetail() {
  const { id } = useParams()
  const { toast } = useToast()
  const [order, setOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [status, setStatus] = useState("")
  const [note, setNote] = useState("")

  // Fetch order data
  useEffect(() => {
    const fetchedOrder = getOrder(id)
    setOrder(fetchedOrder)
    setStatus(fetchedOrder.status)
    setIsLoading(false)
  }, [id])

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus)
    toast({
      title: "Status updated",
      description: `Order status has been updated to ${newStatus}`,
    })
  }

  const handleAddNote = () => {
    if (!note.trim()) return

    const newHistoryEntry = {
      date: new Date().toLocaleString(),
      status: status,
      note: note,
    }

    setOrder({
      ...order,
      history: [newHistoryEntry, ...order.history],
    })

    setNote("")

    toast({
      title: "Note added",
      description: "Your note has been added to the order history",
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Processing":
        return "bg-blue-100 text-blue-800"
      case "Shipped":
        return "bg-purple-100 text-purple-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      case "Refunded":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/orders">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Order #{order.id}</h1>
            <p className="text-muted-foreground">Placed on {order.date}</p>
          </div>
        </div>
        <Badge className={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${order.shipping.cost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-muted-foreground">
                  {order.shippingAddress.name}<br />
                  {order.shippingAddress.street}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
                  {order.shippingAddress.country}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Shipping Method</h3>
                <p className="text-muted-foreground">{order.shipping.method}</p>
              </div>
              <div>
                <h3 className="font-medium">Tracking Number</h3>
                <p className="text-muted-foreground">{order.shipping.trackingNumber}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Customer & Payment Info */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Name</h3>
                <p className="text-muted-foreground">{order.customer.name}</p>
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">{order.customer.email}</p>
              </div>
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-muted-foreground">{order.customer.phone}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Payment Method</h3>
                <p className="text-muted-foreground">{order.payment.method}</p>
              </div>
              <div>
                <h3 className="font-medium">Card Type</h3>
                <p className="text-muted-foreground">{order.payment.cardType}</p>
              </div>
              <div>
                <h3 className="font-medium">Card Number</h3>
                <p className="text-muted-foreground">{order.payment.cardNumber}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Order Status</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-green-500" />
                <span>Order Placed</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-blue-500" />
                <span>Processing</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="h-4 w-4" />
                <span>Shipped</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="h-4 w-4" />
                <span>Delivered</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
