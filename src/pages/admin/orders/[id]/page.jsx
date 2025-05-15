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
import Cookies from "js-cookie"

export default function AdminOrderDetail() {
  const { id } = useParams()
  const { toast } = useToast()
  const token = Cookies.get('token')
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState("")
  const [note, setNote] = useState("")
  const [updatingStatus, setUpdatingStatus] = useState(false)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://127.0.0.1:8000/api/orders/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch order details')
        }

        const data = await response.json()
        setOrder(data)
        setStatus(data.status)
      } catch (err) {
        setError(err.message)
        toast({
          title: "Error",
          description: "Failed to fetch order details",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id, token, toast])

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdatingStatus(true)
      const response = await fetch(`http://127.0.0.1:8000/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (!response.ok) {
        throw new Error('Failed to update order status')
      }

      setStatus(newStatus)
      setOrder(prev => ({
        ...prev,
        status: newStatus,
        history: [
          {
            date: new Date().toLocaleString(),
            status: newStatus,
            note: `Status updated to ${newStatus}`,
          },
          ...prev.history
        ]
      }))

      toast({
        title: "Success",
        description: `Order status has been updated to ${newStatus}`,
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive"
      })
    } finally {
      setUpdatingStatus(false)
    }
  }

  const handleAddNote = async () => {
    if (!note.trim()) return

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/orders/${id}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ note })
      })

      if (!response.ok) {
        throw new Error('Failed to add note')
      }

      const newHistoryEntry = {
        date: new Date().toLocaleString(),
        status: status,
        note: note,
      }

      setOrder(prev => ({
        ...prev,
        history: [newHistoryEntry, ...prev.history],
      }))

      setNote("")

      toast({
        title: "Success",
        description: "Note has been added to the order history",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to add note",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">Loading order details...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="space-y-6">
        <div className="text-center">Order not found</div>
      </div>
    )
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
        <Select
          value={status}
          onValueChange={handleStatusChange}
          disabled={updatingStatus}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue>
              <Badge className={getStatusColor(status)}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>
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

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Order History</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Textarea
                  placeholder="Add a note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <Button onClick={handleAddNote}>Add Note</Button>
              </div>
              <div className="space-y-4">
                {order.history.map((entry, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-24 text-sm text-muted-foreground">
                      {entry.date}
                    </div>
                    <div className="flex-1">
                      <Badge className={getStatusColor(entry.status)}>
                        {entry.status}
                      </Badge>
                      <p className="mt-1 text-sm">{entry.note}</p>
                    </div>
                  </div>
                ))}
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
        </div>
      </div>
    </div>
  )
}
