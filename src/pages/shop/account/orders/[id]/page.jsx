import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Package, Truck, CheckCircle } from "lucide-react"

// Mock order data - replace with actual API call
const getOrder = (id) => {
  return {
    id: id,
    date: "2024-03-15",
    status: "Processing",
    items: [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 129.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    shipping: {
      method: "Standard Shipping",
      cost: 10.0,
      trackingNumber: "TRK123456789",
      carrier: "UPS",
    },
    subtotal: 329.98,
    tax: 32.99,
    total: 372.97,
  }
}

export default function ShopOrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchedOrder = getOrder(id)
    setOrder(fetchedOrder)
    setIsLoading(false)
  }, [id])

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
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/shop/account/orders">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Order #{order.id}</h1>
            <p className="text-muted-foreground">Placed on {order.date}</p>
          </div>
          <Badge className={getStatusColor(order.status)}>
            {order.status}
          </Badge>
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-20">
                  <img
                    src={item.image}
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
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${order.tax.toFixed(2)}</span>
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
              <h3 className="font-medium">Shipping Method</h3>
              <p className="text-muted-foreground">{order.shipping.method}</p>
            </div>
            <div>
              <h3 className="font-medium">Tracking Number</h3>
              <p className="text-muted-foreground">{order.shipping.trackingNumber}</p>
            </div>
            <div>
              <h3 className="font-medium">Carrier</h3>
              <p className="text-muted-foreground">{order.shipping.carrier}</p>
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
  )
} 