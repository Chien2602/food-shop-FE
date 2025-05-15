"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FadeIn } from "@/components/ui/fade-in"
import { LogOut, Package, ShoppingBag, User } from "lucide-react"
import Cookies from "js-cookie"

export default function AccountPage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "/placeholder.svg?height=100&width=100",
  })
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    current_password: "",
    new_password: "",
    new_password_confirmation: ""
  })
  const token = Cookies.get('token')

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/me", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })

        if (!res.ok) {
          throw new Error('Failed to fetch user info')
        }

        const data = await res.json()
        const userData = data.data.user
        console.log(userData)

        setUser({
          name: `${userData.fullname}`,
          email: userData.email,
        })
        setFormData(prev => ({
          ...prev,
          fullname: userData.fullname,
          email: userData.email
        }))
      } catch (error) {
        console.error('Failed to fetch user info:', error)
      }
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/orders", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
          credentials: 'include',
        })

        if (!res.ok) {
          throw new Error('Failed to fetch orders')
        }

        const data = await res.json()
        console.log(data)
        setOrders(data.data.orders.map(order => ({
          id: order.id,
          date: new Date(order.created_at).toLocaleDateString(),
          status: order.items[0].status,
          total: order.total_price,
          items: order.items.map(item => ({
            id: item.id,
            name: item.product.title,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.thumbnail || "/placeholder.svg?height=80&width=80",
          }))
        })))
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserInfo()
    fetchOrders()
  }, [token])

  const handleLogout = () => {
    Cookies.remove('token')
    window.location.href = '/login'
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setIsUpdating(true)
    try {
      const res = await fetch("http://localhost:8000/api/users/profile", {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          fullname: formData.fullname,
          email: formData.email
        })
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Failed to update profile')
      }

      const data = await res.json()
      setUser({
        name: data.user.fullname,
        email: data.user.email,
      })
      alert('Profile updated successfully')
    } catch (error) {
      console.error('Failed to update profile:', error)
      alert(error.message || 'Failed to update profile')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setIsChangingPassword(true)
    try {
      const res = await fetch("http://localhost:8000/api/users/password", {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          current_password: formData.current_password,
          new_password: formData.new_password,
          new_password_confirmation: formData.new_password_confirmation
        })
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Failed to change password')
      }

      alert('Password changed successfully')
      setFormData(prev => ({
        ...prev,
        current_password: "",
        new_password: "",
        new_password_confirmation: ""
      }))
    } catch (error) {
      console.error('Failed to change password:', error)
      alert(error.message || 'Failed to change password')
    } finally {
      setIsChangingPassword(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <FadeIn>
        <h1 className="text-3xl font-bold mb-6">My Account</h1>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <FadeIn delay={0.1} className="lg:col-span-1">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/shop/account">
                  <User className="mr-2 h-4 w-4" />
                  Account Details
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </FadeIn>

        <div className="lg:col-span-3">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <ScrollReveal>
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your account details and personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullname">Full Name</Label>
                      <Input 
                        id="fullname" 
                        value={formData.fullname}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={handleUpdateProfile}
                      disabled={isUpdating}
                    >
                      {isUpdating ? 'Updating...' : 'Save Changes'}
                    </Button>
                  </CardFooter>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Update your password to keep your account secure</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current_password">Current Password</Label>
                      <Input 
                        id="current_password" 
                        type="password"
                        value={formData.current_password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new_password">New Password</Label>
                      <Input 
                        id="new_password" 
                        type="password"
                        value={formData.new_password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new_password_confirmation">Confirm New Password</Label>
                      <Input 
                        id="new_password_confirmation" 
                        type="password"
                        value={formData.new_password_confirmation}
                        onChange={handleInputChange}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={handleChangePassword}
                      disabled={isChangingPassword}
                    >
                      {isChangingPassword ? 'Updating...' : 'Update Password'}
                    </Button>
                  </CardFooter>
                </Card>
              </ScrollReveal>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <ScrollReveal>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>View and manage your recent orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="text-center py-6">
                        <p>Loading orders...</p>
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="text-center py-6">
                        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                        <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
                        <Link to="/shop/products">
                          <Button>Start Shopping</Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {orders.map((order) => (
                          <div key={order.id} className="border rounded-lg overflow-hidden">
                            <div className="bg-muted/50 p-4 border-b">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold">Order #{order.id}</h3>
                                    <Badge 
                                      variant={
                                        order.status === "completed" ? "default" : 
                                        order.status === "processing" ? "secondary" :
                                        order.status === "cancelled" ? "destructive" :
                                        "outline"
                                      }
                                      className="capitalize"
                                    >
                                      {order.status}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">Placed on {order.date}</p>
                                </div>
                                <div className="text-right">
                                  <span className="text-lg font-semibold text-primary">
                                    {order.total.toLocaleString('vi-VN')} ₫
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {order.items.map((item) => (
                                  <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="object-cover w-full h-full"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium truncate">{item.name}</div>
                                      <div className="text-sm text-muted-foreground">
                                        {item.quantity} × {item.price.toLocaleString('vi-VN')} ₫
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </ScrollReveal>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
