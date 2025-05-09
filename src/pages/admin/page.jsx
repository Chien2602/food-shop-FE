"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, DollarSign, Package, ShoppingCart, Users } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/fade-in"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data for dashboard
const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 6000 },
  { month: "Mar", revenue: 5500 },
  { month: "Apr", revenue: 7500 },
  { month: "May", revenue: 8500 },
  { month: "Jun", revenue: 10000 },
  { month: "Jul", revenue: 9500 },
  { month: "Aug", revenue: 11000 },
  { month: "Sep", revenue: 12500 },
  { month: "Oct", revenue: 14000 },
  { month: "Nov", revenue: 16000 },
  { month: "Dec", revenue: 18000 },
]

const categoryData = [
  { name: "Electronics", value: 40 },
  { name: "Clothing", value: 30 },
  { name: "Footwear", value: 15 },
  { name: "Accessories", value: 10 },
  { name: "Other", value: 5 },
]

const recentOrders = [
  { id: "ORD-001", customer: "John Doe", date: "2023-05-01", status: "Delivered", total: 129.99 },
  { id: "ORD-002", customer: "Jane Smith", date: "2023-05-02", status: "Processing", total: 259.98 },
  { id: "ORD-003", customer: "Bob Johnson", date: "2023-05-03", status: "Shipped", total: 89.99 },
  { id: "ORD-004", customer: "Alice Brown", date: "2023-05-04", status: "Pending", total: 349.97 },
  { id: "ORD-005", customer: "Charlie Wilson", date: "2023-05-05", status: "Delivered", total: 199.99 },
]

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          // Skeleton loading state
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-32 mb-1" />
                <Skeleton className="h-4 w-20" />
              </CardContent>
            </Card>
          ))
        ) : (
          // Actual stats cards
          <>
            <FadeIn delay={0.1}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                      <motion.h3
                        className="text-2xl font-bold mt-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        $45,231.89
                      </motion.h3>
                      <motion.p
                        className="text-xs flex items-center mt-1 text-green-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <ArrowUp className="h-3 w-3 mr-1" />
                        +20.1% from last month
                      </motion.p>
                    </div>
                    <motion.div
                      className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                    >
                      <DollarSign className="h-6 w-6 text-primary" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Orders</p>
                      <motion.h3
                        className="text-2xl font-bold mt-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        +2,350
                      </motion.h3>
                      <motion.p
                        className="text-xs flex items-center mt-1 text-green-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <ArrowUp className="h-3 w-3 mr-1" />
                        +12.2% from last month
                      </motion.p>
                    </div>
                    <motion.div
                      className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                    >
                      <ShoppingCart className="h-6 w-6 text-blue-600" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Products</p>
                      <motion.h3
                        className="text-2xl font-bold mt-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        12,234
                      </motion.h3>
                      <motion.p
                        className="text-xs flex items-center mt-1 text-green-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <ArrowUp className="h-3 w-3 mr-1" />
                        +4.3% from last month
                      </motion.p>
                    </div>
                    <motion.div
                      className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                    >
                      <Package className="h-6 w-6 text-green-600" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.4}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Customers</p>
                      <motion.h3
                        className="text-2xl font-bold mt-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        +573
                      </motion.h3>
                      <motion.p
                        className="text-xs flex items-center mt-1 text-red-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <ArrowDown className="h-3 w-3 mr-1" />
                        -8.4% from last month
                      </motion.p>
                    </div>
                    <motion.div
                      className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                    >
                      <Users className="h-6 w-6 text-purple-600" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </>
        )}
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm">
            Download Report
          </Button>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <ScrollReveal>
            <Card className="min-h-[360px] h-full flex flex-col justify-between bg-white shadow-md overflow-hidden relative">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue for the current year</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="h-[220px] w-full flex items-center justify-center bg-muted/50 rounded-lg">
                  {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <Skeleton className="h-full w-full rounded-md" />
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={220}>
                      <AreaChart data={revenueData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorRevenue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ScrollReveal delay={0.1}>
              <Card className="min-h-[360px] h-full flex flex-col justify-between bg-white shadow-md overflow-hidden relative">
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                  <CardDescription>Distribution of sales across product categories</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center">
                  <div className="h-[220px] w-full flex items-center justify-center bg-muted/50 rounded-lg">
                    {isLoading ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <Skeleton className="h-full w-full rounded-md" />
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={categoryData} layout="vertical" margin={{ top: 20, right: 20, left: 80, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" />
                          <Tooltip />
                          <Bar dataKey="value" fill="#82ca9d" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card className="min-h-[360px] h-full flex flex-col justify-between bg-white shadow-md overflow-hidden relative">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest orders and customer activity</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="space-y-4 overflow-y-auto max-h-[220px] pr-2">
                    {isLoading
                      ? Array.from({ length: 5 }).map((_, index) => (
                          <div key={index} className="flex items-center justify-between border-b pb-4">
                            <div>
                              <Skeleton className="h-5 w-32 mb-1" />
                              <Skeleton className="h-4 w-24" />
                            </div>
                            <div className="text-right">
                              <Skeleton className="h-5 w-16 mb-1" />
                              <Skeleton className="h-4 w-20 ml-auto" />
                            </div>
                          </div>
                        ))
                      : recentOrders.map((order, index) => (
                          <motion.div
                            key={order.id}
                            className="flex items-center justify-between border-b pb-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div>
                              <p className="font-medium">{order.customer}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{order.id}</span>
                                <span>•</span>
                                <span>{order.date}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${order.total.toFixed(2)}</p>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "Shipped"
                                      ? "bg-blue-100 text-blue-800"
                                      : order.status === "Processing"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {order.status}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analytics</CardTitle>
              <CardDescription>In-depth analysis of your store performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-lg">
                <p className="text-muted-foreground">Detailed analytics content will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>Access and download your store reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-lg">
                <p className="text-muted-foreground">Reports content will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
