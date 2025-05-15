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
import Cookies from "js-cookie"

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [chartData, setChartData] = useState([])
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    ordersChange: 0,
    productsChange: 0,
    customersChange: 0
  })
  const token = Cookies.get('token')

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch orders with pagination
        const ordersResponse = await fetch('http://127.0.0.1:8000/api/admin/orders?per_page=100', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        })
        const ordersResult = await ordersResponse.json()

        // Calculate order statistics
        const orders = ordersResult.data || []
        const totalOrders = ordersResult.total || 0
        
        // Calculate monthly order changes
        const currentMonth = new Date().getMonth()
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
        const currentMonthOrders = orders.filter(order => {
          const orderDate = new Date(order.created_at)
          return orderDate.getMonth() === currentMonth
        }).length
        const lastMonthOrders = orders.filter(order => {
          const orderDate = new Date(order.created_at)
          return orderDate.getMonth() === lastMonth
        }).length
        const ordersChange = lastMonthOrders === 0 ? 0 : ((currentMonthOrders - lastMonthOrders) / lastMonthOrders) * 100

        // Fetch products with pagination
        const productsResponse = await fetch('http://127.0.0.1:8000/api/admin/products?per_page=100', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        })
        const products = await productsResponse.json()
        const productsResult = products.data || []

        // Fetch users with pagination
        const usersResponse = await fetch('http://127.0.0.1:8000/api/admin/users?per_page=100', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        })
        const users = await usersResponse.json()
        const usersResult = users.data || []

        // Process data for chart
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const chartData = months.map(month => {
          const monthIndex = months.indexOf(month)
          const monthOrders = orders.filter(order => {
            const orderDate = new Date(order.created_at)
            return orderDate.getMonth() === monthIndex
          }).length

          return {
            month,
            orders: monthOrders,
            products: productsResult.length || 0,
            customers: usersResult.length || 0
          }
        })

        setChartData(chartData)

        // Update stats
        setStats({
          totalOrders,
          totalProducts: productsResult.total || 0,
          totalCustomers: usersResult.length || 0,
          ordersChange: Math.round(ordersChange),
          productsChange: 0,
          customersChange: 0
        })

      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [token])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Skeleton loading state
          Array.from({ length: 3 }).map((_, index) => (
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
                      <p className="text-sm font-medium text-muted-foreground">Orders</p>
                      <motion.h3
                        className="text-2xl font-bold mt-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {stats.totalOrders}
                      </motion.h3>
                      <motion.p
                        className={`text-xs flex items-center mt-1 ${stats.ordersChange >= 0 ? 'text-green-600' : 'text-red-600'}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {stats.ordersChange >= 0 ? (
                          <ArrowUp className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDown className="h-3 w-3 mr-1" />
                        )}
                        {stats.ordersChange > 0 ? '+' : ''}{stats.ordersChange}% from last month
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

            <FadeIn delay={0.2}>
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
                        {stats.totalProducts}
                      </motion.h3>
                      <motion.p
                        className="text-xs flex items-center mt-1 text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        Total products
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

            <FadeIn delay={0.3}>
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
                        {stats.totalCustomers}
                      </motion.h3>
                      <motion.p
                        className="text-xs flex items-center mt-1 text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        Total customers
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
      <Card className="min-h-[360px] h-full flex flex-col justify-between bg-white shadow-md overflow-hidden relative">
        <CardHeader>
          <CardTitle>Statistics Overview</CardTitle>
          <CardDescription>Monthly statistics for orders, products and customers</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="h-[220px] w-full flex items-center justify-center bg-muted/50 rounded-lg">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Skeleton className="h-full w-full rounded-md" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-2 border rounded shadow">
                            <p className="font-medium">{label}</p>
                            {payload.map((entry, index) => (
                              <p key={index} className="text-sm" style={{ color: entry.color }}>
                                {entry.name}: {entry.value}
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="orders" name="Orders" fill="#3b82f6" />
                  <Bar dataKey="products" name="Products" fill="#22c55e" />
                  <Bar dataKey="customers" name="Customers" fill="#a855f7" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
