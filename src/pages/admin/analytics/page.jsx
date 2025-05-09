"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FadeIn } from "@/components/ui/fade-in"
import {
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  ShoppingCart,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Package,
  CreditCard,
  Clock,
} from "lucide-react"

export default function AdminAnalytics() {
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("year")

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Mock data - replace with actual API calls
  const statsData = {
    revenue: {
      current: 12500,
      previous: 10000,
      change: 25
    },
    orders: {
      current: 150,
      previous: 120,
      change: 25
    },
    customers: {
      current: 250,
      previous: 200,
      change: 25
    },
    averageOrderValue: {
      current: 83.33,
      previous: 83.33,
      change: 0
    }
  }

  // Convert stats object to array for mapping
  const stats = [
    {
      title: "Total Revenue",
      value: `$${statsData.revenue.current.toLocaleString()}`,
      change: `${statsData.revenue.change}%`,
      trend: statsData.revenue.change >= 0 ? "up" : "down",
      description: "vs last month",
      icon: DollarSign
    },
    {
      title: "Total Orders",
      value: statsData.orders.current,
      change: `${statsData.orders.change}%`,
      trend: statsData.orders.change >= 0 ? "up" : "down",
      description: "vs last month",
      icon: ShoppingBag
    },
    {
      title: "Total Customers",
      value: statsData.customers.current,
      change: `${statsData.customers.change}%`,
      trend: statsData.customers.change >= 0 ? "up" : "down",
      description: "vs last month",
      icon: Users
    },
    {
      title: "Average Order Value",
      value: `$${statsData.averageOrderValue.current.toFixed(2)}`,
      change: `${statsData.averageOrderValue.change}%`,
      trend: statsData.averageOrderValue.change >= 0 ? "up" : "down",
      description: "vs last month",
      icon: TrendingUp
    }
  ]

  const recentOrders = [
    {
      id: "ORD001",
      customer: "John Doe",
      amount: "$125.00",
      status: "Completed",
      date: "2024-03-15",
    },
    {
      id: "ORD002",
      customer: "Jane Smith",
      amount: "$89.50",
      status: "Processing",
      date: "2024-03-15",
    },
    {
      id: "ORD003",
      customer: "Mike Johnson",
      amount: "$234.75",
      status: "Shipped",
      date: "2024-03-14",
    },
    {
      id: "ORD004",
      customer: "Sarah Wilson",
      amount: "$56.25",
      status: "Completed",
      date: "2024-03-14",
    },
    {
      id: "ORD005",
      customer: "David Brown",
      amount: "$178.90",
      status: "Processing",
      date: "2024-03-13",
    },
  ]

  const topProducts = [
    {
      id: 1,
      name: "Premium Headphones",
      sales: 234,
      revenue: "$23,400",
    },
    {
      id: 2,
      name: "Wireless Mouse",
      sales: 189,
      revenue: "$9,450",
    },
    {
      id: 3,
      name: "Mechanical Keyboard",
      sales: 156,
      revenue: "$15,600",
    },
    {
      id: 4,
      name: "Gaming Monitor",
      sales: 98,
      revenue: "$19,600",
    },
    {
      id: 5,
      name: "USB-C Hub",
      sales: 87,
      revenue: "$4,350",
    },
  ]

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/10 text-green-500"
      case "processing":
        return "bg-blue-500/10 text-blue-500"
      case "shipped":
        return "bg-purple-500/10 text-purple-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <FadeIn>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your store's performance and growth
            </p>
          </div>
          <div className="flex gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last 90 days</SelectItem>
                <SelectItem value="year">This year</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                  <div className="flex items-center mt-2">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm font-medium ml-1 ${
                        stat.trend === "up" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {stat.description}
                    </span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 overflow-visible">
            <ScrollReveal>
              <Card className="p-6 min-h-[360px] h-full flex flex-col justify-between bg-white shadow-md overflow-hidden relative">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold">Revenue Overview</h3>
                    <p className="text-sm text-muted-foreground">
                      Revenue trends over time
                    </p>
                  </div>
                  <LineChart className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="h-[220px] w-full flex items-center justify-center bg-muted/50 rounded-lg">
                    <div className="text-center">
                      <Activity className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Revenue Chart</p>
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Card className="p-6 min-h-[360px] h-full flex flex-col justify-between bg-white shadow-md overflow-hidden relative">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold">Sales Distribution</h3>
                    <p className="text-sm text-muted-foreground">
                      Sales by category
                    </p>
                  </div>
                  <PieChart className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="h-[220px] w-full flex items-center justify-center bg-muted/50 rounded-lg">
                    <div className="text-center">
                      <PieChart className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Sales Distribution Chart</p>
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ScrollReveal>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold">Recent Orders</h3>
                    <p className="text-sm text-muted-foreground">
                      Latest customer orders
                    </p>
                  </div>
                  <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    >
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            {order.customer}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.amount}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            {order.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold">Top Products</h3>
                    <p className="text-sm text-muted-foreground">
                      Best selling products
                    </p>
                  </div>
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {topProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    >
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            {product.sales} sales
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">{product.revenue}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </TabsContent>

        <TabsContent value="sales">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Sales Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Detailed sales performance
                </p>
              </div>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="h-[400px] flex items-center justify-center bg-muted/50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Detailed Sales Analytics</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Customer Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Customer behavior and trends
                </p>
              </div>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="h-[400px] flex items-center justify-center bg-muted/50 rounded-lg">
              <div className="text-center">
                <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Customer Analytics Data</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Product Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Product performance metrics
                </p>
              </div>
              <Package className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="h-[400px] flex items-center justify-center bg-muted/50 rounded-lg">
              <div className="text-center">
                <Package className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Product Analytics Data</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
