"use client"

import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Mail, MapPin, Phone, ShoppingBag, User, Calendar, DollarSign, Package, CreditCard, ChevronRight, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FadeIn } from "@/components/ui/fade-in"
import { useToast } from "@/components/ui/use-toast"
import Cookies from "js-cookie"

export default function AdminCustomerDetail() {
  const { id } = useParams()
  const { toast } = useToast()
  const token = Cookies.get('token')
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://127.0.0.1:8000/api/admin/users/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch customer details')
        }

        const data = await response.json()
        setCustomer(data)
      } catch (err) {
        setError(err.message)
        toast({
          title: "Error",
          description: "Failed to fetch customer details",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCustomer()
  }, [id, token, toast])

  const handleDeleteCustomer = async () => {
    if (!window.confirm('Are you sure you want to delete this customer?')) {
      return
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete customer')
      }

      toast({
        title: "Success",
        description: "Customer deleted successfully",
      })

      // Redirect to customers list
      window.location.href = '/admin/customers'
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete customer",
        variant: "destructive"
      })
    }
  }

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500"
      case "inactive":
        return "bg-gray-500/10 text-gray-500"
      default:
        return "bg-blue-500/10 text-blue-500"
    }
  }

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500"
      case "processing":
        return "bg-blue-500/10 text-blue-500"
      case "cancelled":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">Loading customer details...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">Customer not found</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin/customers">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Customer Details</h1>
              <p className="text-muted-foreground">
                View and manage customer information
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Customer
            </Button>
            <Button variant="destructive" onClick={handleDeleteCustomer}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Customer
            </Button>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <ScrollReveal>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Customer Information</h2>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{customer.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {customer.joined}</span>
              </div>
              <div className="pt-4">
                <Badge className={getStatusColor(customer.status)}>
                  {customer.status}
                </Badge>
              </div>
            </div>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <Package className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Orders</span>
                <span className="font-medium">{customer.totalOrders}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Spent</span>
                <span className="font-medium">${customer.totalSpent.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Average Order Value</span>
                <span className="font-medium">${customer.averageOrderValue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Last Order</span>
                <span className="font-medium">{customer.lastOrder}</span>
              </div>
            </div>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Payment Methods</h2>
              <CreditCard className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              {customer.paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {method.type === "credit_card"
                          ? `•••• ${method.last4}`
                          : "PayPal"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {method.type === "credit_card"
                          ? `Expires ${method.expiry}`
                          : method.email}
                      </p>
                    </div>
                  </div>
                  {method.default && (
                    <Badge variant="secondary">Default</Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </ScrollReveal>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <Link to={`/admin/orders?customer=${customer.id}`}>
            <Button variant="ghost" size="sm">
              View All Orders
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customer.orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="font-medium">{order.id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      {order.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                      {order.items} items
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                      ${order.total.toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getOrderStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/orders/${order.id}`}>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
