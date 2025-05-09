"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter } from "lucide-react"

// Mock data for orders
const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john.doe@example.com",
    date: "2023-05-01",
    status: "Delivered",
    total: 129.99,
    items: 2,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane.smith@example.com",
    date: "2023-05-02",
    status: "Processing",
    total: 259.98,
    items: 3,
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    email: "bob.johnson@example.com",
    date: "2023-05-03",
    status: "Shipped",
    total: 89.99,
    items: 1,
  },
  {
    id: "ORD-004",
    customer: "Alice Brown",
    email: "alice.brown@example.com",
    date: "2023-05-04",
    status: "Pending",
    total: 349.97,
    items: 4,
  },
  {
    id: "ORD-005",
    customer: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    date: "2023-05-05",
    status: "Delivered",
    total: 199.99,
    items: 2,
  },
  {
    id: "ORD-006",
    customer: "Diana Miller",
    email: "diana.miller@example.com",
    date: "2023-05-06",
    status: "Cancelled",
    total: 79.99,
    items: 1,
  },
  {
    id: "ORD-007",
    customer: "Edward Davis",
    email: "edward.davis@example.com",
    date: "2023-05-07",
    status: "Delivered",
    total: 149.98,
    items: 2,
  },
  {
    id: "ORD-008",
    customer: "Fiona Clark",
    email: "fiona.clark@example.com",
    date: "2023-05-08",
    status: "Processing",
    total: 299.97,
    items: 3,
  },
  {
    id: "ORD-009",
    customer: "George White",
    email: "george.white@example.com",
    date: "2023-05-09",
    status: "Refunded",
    total: 59.99,
    items: 1,
  },
  {
    id: "ORD-010",
    customer: "Hannah Green",
    email: "hannah.green@example.com",
    date: "2023-05-10",
    status: "Shipped",
    total: 179.98,
    items: 2,
  },
]

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter orders based on search term and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search orders..."
              className="pl-10 w-[200px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Link to={`/admin/orders/${order.id}`}>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
