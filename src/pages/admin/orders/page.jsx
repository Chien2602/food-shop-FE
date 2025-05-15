"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Cookies from "js-cookie"

export default function AdminOrders() {
  const { toast } = useToast()
  const token = Cookies.get('token')
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updatingStatus, setUpdatingStatus] = useState(null)
  const [users, setUsers] = useState({})

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://127.0.0.1:8000/api/admin/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch orders')
        }

        const data = await response.json()
        console.log(data)
        
        // Fetch user information for each order
        const userPromises = data.data.map(async (order) => {
          try {
            const userResponse = await fetch(`http://127.0.0.1:8000/api/me`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              credentials: 'include'
            });
            if (userResponse.ok) {
              const userData = await userResponse.json();
              console.log(userData.data.user.fullname)
              return { [order.user_id]: userData.data.user.fullname };
            }
            return null;
          } catch (error) {
            console.error(`Failed to fetch user ${order.user_id}:`, error);
            return null;
          }
        });

        const userResults = await Promise.all(userPromises);
        const userMap = userResults.reduce((acc, curr) => {
          if (curr) {
            return { ...acc, ...curr };
          }
          return acc;
        }, {});

        setUsers(userMap);
        setOrders(Array.isArray(data.data) ? data.data : [])
      } catch (err) {
        setError(err.message)
        toast({
          title: "Error",
          description: "Failed to fetch orders",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [token, toast])

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingStatus(orderId)
      const response = await fetch(`http://127.0.0.1:8000/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ 
          status: newStatus,
          _method: 'PATCH'
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update order status')
      }

      const data = await response.json()
      
      // Update local state with the response data
      setOrders(orders.map(order => 
        order.id === orderId ? { 
          ...order, 
          items: order.items.map(item => ({
            ...item,
            product: {
              ...item.product,
              status: newStatus
            }
          }))
        } : order
      ))

      toast({
        title: "Success",
        description: "Order status updated successfully",
      })
    } catch (err) {
      console.error('Error updating order:', err)
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive"
      })
    } finally {
      setUpdatingStatus(null)
    }
  }

  // Filter orders based on search term and status
  const filteredOrders = Array.isArray(orders) ? orders.filter((order) => {
    const user = users[order.user_id];
    const searchTermLower = searchTerm.toLowerCase();
    
    const matchesSearch = searchTerm === "" || 
      String(order.id).toLowerCase().includes(searchTermLower) ||
      (user && user.toLowerCase().includes(searchTermLower));

    const orderStatus = order.items[0]?.product?.status;
    const matchesStatus = statusFilter === "all" || orderStatus === statusFilter.toLowerCase();
    console.log(statusFilter.toLowerCase())
    return matchesSearch && matchesStatus;
  }) : [];

  // Get status badge color
  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Format price to VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }

  // Format status text
  const formatStatus = (status) => {
    if (!status) return 'Pending';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="text-center">Loading orders...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orders</h1>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>
                    {users[order.user_id] ? (
                      <div>
                        <div className="font-medium">{users[order.user_id]}</div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Loading...</span>
                    )}
                  </TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{order.items.length || 0}</TableCell>
                  <TableCell>{formatPrice(order.total_price)}</TableCell>
                  <TableCell>
                    <Select
                      value={order.items[0].status || 'pending'}
                      onValueChange={(value) => handleStatusChange(order.id, value)}
                      disabled={updatingStatus === order.id}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue>
                          <Badge className={getStatusColor(order.items[0].status)}>
                            {formatStatus(order.items[0].status)}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
