"use client"

import { useState } from "react"
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
import { CreditCard, Edit, LogOut, Package, ShoppingBag, User } from "lucide-react"

// Mock data for orders
const orders = [
  {
    id: "ORD-001",
    date: "2023-05-01",
    status: "Delivered",
    total: 129.99,
    items: [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 129.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "ORD-002",
    date: "2023-04-15",
    status: "Shipped",
    total: 259.98,
    items: [
      {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 3,
        name: "T-Shirt",
        price: 29.99,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
]

// Mock data for addresses
const addresses = [
  {
    id: 1,
    type: "Shipping",
    default: true,
    name: "John Doe",
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
  },
  {
    id: 2,
    type: "Billing",
    default: true,
    name: "John Doe",
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
  },
]

// Mock data for payment methods
const paymentMethods = [
  {
    id: 1,
    type: "Credit Card",
    default: true,
    cardNumber: "**** **** **** 1234",
    cardType: "Visa",
    expiryDate: "05/25",
  },
]

export default function AccountPage() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <FadeIn>
        <h1 className="text-3xl font-bold mb-6">My Account</h1>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <FadeIn delay={0.1} className="lg:col-span-1">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
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
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/shop/orders">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Orders
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/shop/wishlist">
                  <Package className="mr-2 h-4 w-4" />
                  Wishlist
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </FadeIn>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
              <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <ScrollReveal>
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your account details and personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
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
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Update Password</Button>
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
                    {orders.length === 0 ? (
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
                          <div key={order.id} className="border rounded-lg p-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">Order #{order.id}</h3>
                                  <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>
                                    {order.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                              </div>
                              <div className="mt-2 md:mt-0">
                                <span className="font-semibold">${order.total.toFixed(2)}</span>
                                <Link to={`/shop/orders/${order.id}`}>
                                  <Button variant="outline" size="sm" className="ml-4">
                                    View Details
                                  </Button>
                                </Link>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-3">
                                  <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                                    <img
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      className="object-cover w-full h-full"
                                    />
                                  </div>
                                  <div>
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Link to="/shop/orders">
                      <Button variant="outline">View All Orders</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </ScrollReveal>
            </TabsContent>

            <TabsContent value="addresses" className="space-y-6">
              <ScrollReveal>
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Saved Addresses</CardTitle>
                        <CardDescription>Manage your shipping and billing addresses</CardDescription>
                      </div>
                      <Button>Add New Address</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {addresses.map((address) => (
                        <div key={address.id} className="border rounded-lg p-4 relative">
                          <div className="absolute top-4 right-4 flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{address.type} Address</h3>
                            {address.default && <Badge variant="outline">Default</Badge>}
                          </div>
                          <div className="space-y-1 text-sm">
                            <p>{address.name}</p>
                            <p>{address.street}</p>
                            <p>
                              {address.city}, {address.state} {address.zip}
                            </p>
                            <p>{address.country}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </TabsContent>

            <TabsContent value="payment" className="space-y-6">
              <ScrollReveal>
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>Manage your saved payment methods</CardDescription>
                      </div>
                      <Button>Add Payment Method</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="border rounded-lg p-4 relative">
                          <div className="absolute top-4 right-4 flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <CreditCard className="h-5 w-5" />
                            <h3 className="font-semibold">{method.cardType}</h3>
                            {method.default && <Badge variant="outline">Default</Badge>}
                          </div>
                          <div className="space-y-1 text-sm">
                            <p>{method.cardNumber}</p>
                            <p>Expires: {method.expiryDate}</p>
                          </div>
                        </div>
                      ))}
                    </div>
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
