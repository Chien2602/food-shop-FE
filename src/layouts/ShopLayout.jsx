import { Link, Outlet } from 'react-router-dom'
import { ShoppingCart, User, Home, Package } from 'lucide-react'
import { Button } from '../components/ui/button'

export default function ShopLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <Link to="/shop" className="text-2xl font-bold">
              ShopName
            </Link>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/shop" className="text-sm font-medium hover:underline">
                  Home
                </Link>
                <Link to="/shop/products" className="text-sm font-medium hover:underline">
                  Products
                </Link>
                <Link to="/shop/categories" className="text-sm font-medium hover:underline">
                  Categories
                </Link>
              </nav>
              <div className="flex items-center gap-2">
                <Link to="/shop/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      0
                    </span>
                  </Button>
                </Link>
                <Link to="/shop/account">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="md:hidden mt-4 flex items-center justify-between">
            <nav className="flex items-center justify-between w-full">
              <Link to="/shop" className="flex flex-col items-center text-xs">
                <Home className="h-5 w-5 mb-1" />
                Home
              </Link>
              <Link to="/shop/products" className="flex flex-col items-center text-xs">
                <Package className="h-5 w-5 mb-1" />
                Products
              </Link>
              <Link to="/shop/categories" className="flex flex-col items-center text-xs">
                <Package className="h-5 w-5 mb-1" />
                Categories
              </Link>
              <Link to="/shop/account" className="flex flex-col items-center text-xs">
                <User className="h-5 w-5 mb-1" />
                Account
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/shop" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/shop/products" className="hover:underline">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link to="/shop/categories" className="hover:underline">
                    Categories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Account</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/shop/account" className="hover:underline">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link to="/shop/account/orders" className="hover:underline">
                    Order History
                  </Link>
                </li>
                <li>
                  <Link to="/shop/account/wishlist" className="hover:underline">
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Information</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/shop/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/shop/contact" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/shop/faq" className="hover:underline">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/shop/terms" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/shop/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/shop/returns" className="hover:underline">
                    Return Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ShopName. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
} 