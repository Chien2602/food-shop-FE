import { Link, Outlet, useLocation } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { BarChart3, Box, Home, LayoutDashboard, LogOut, Package, Settings, ShoppingCart, Users } from 'lucide-react'
import { cn } from '../lib/utils'

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Box,
  },
]

export default function AdminLayout() {
  const location = useLocation()

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-background">
        <div className="p-6 border-b">
          <Link to="/admin" className="flex items-center gap-2 font-semibold text-lg">
            <Box className="h-6 w-6" />
            <span>Admin Panel</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link key={item.href} to={item.href}>
              <Button
                variant="ghost"
                className={cn("w-full justify-start gap-2", location.pathname === item.href && "bg-muted")}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Home className="h-5 w-5" />
              Back to Shop
            </Button>
          </Link>
          <Link to="/">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-background border-t">
        <div className="flex justify-around p-2">
          {sidebarItems.slice(0, 5).map((item) => (
            <Link key={item.href} to={item.href}>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "flex flex-col items-center justify-center h-16 w-16 rounded-none",
                  location.pathname === item.href && "bg-muted",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.title}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b bg-background flex items-center px-6">
          <div className="flex-1">
            <h1 className="text-xl font-semibold">
              {sidebarItems.find((item) => item.href === location.pathname)?.title || "Admin Panel"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/shop">
              <Button variant="outline" size="sm">
                View Shop
              </Button>
            </Link>
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <span className="font-medium text-sm">AD</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
} 