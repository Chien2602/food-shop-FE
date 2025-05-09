import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

const mockOrders = [
  {
    id: "1",
    date: "2024-03-15",
    status: "delivered",
    total: 129.99,
    items: 3
  },
  {
    id: "2",
    date: "2024-03-10",
    status: "processing",
    total: 89.99,
    items: 2
  },
  {
    id: "3",
    date: "2024-03-05",
    status: "shipped",
    total: 199.99,
    items: 4
  }
]

const statusColors = {
  delivered: "bg-green-500",
  processing: "bg-yellow-500",
  shipped: "bg-blue-500",
  cancelled: "bg-red-500"
}

const statusLabels = {
  delivered: "Delivered",
  processing: "Processing",
  shipped: "Shipped",
  cancelled: "Cancelled"
}

export default function AccountOrders() {
  const [orders] = useState(mockOrders)

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <Badge className={statusColors[order.status]}>
                    {statusLabels[order.status]}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Placed on {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {order.items} items • ${order.total.toFixed(2)}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/shop/account/orders/${order.id}`}>
                    View Details
                  </Link>
                </Button>
                {order.status === "delivered" && (
                  <Button variant="outline" size="sm">
                    Buy Again
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 