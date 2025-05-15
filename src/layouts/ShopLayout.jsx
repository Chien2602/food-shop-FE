import { Link, Outlet } from 'react-router-dom'
import { ShoppingCart, User, Home, Package, Menu, X } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export default function ShopLayout() {
  const [cartCount, setCartCount] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const token = Cookies.get('token')

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/cart", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
          credentials: 'include',
        })

        if (!res.ok) {
          throw new Error('Failed to fetch cart')
        }

        const data = await res.json()
        setCartCount(data.data.cart.items.length)
      } catch (error) {
        console.error('Failed to fetch cart:', error)
      }
    }

    if (token) {
      fetchCartCount()
      // Set up polling to update cart count every 5 seconds
      const interval = setInterval(fetchCartCount, 5000)
      return () => clearInterval(interval)
    }
  }, [token])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 bg-white z-50">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <Link to="/shop" className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              FoodShop
            </Link>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/shop" className="text-sm font-medium hover:text-primary transition-colors">
                  Home
                </Link>
                <Link to="/shop/products" className="text-sm font-medium hover:text-primary transition-colors">
                  Products
                </Link>
                <Link to="/shop/categories" className="text-sm font-medium hover:text-primary transition-colors">
                  Categories
                </Link>
              </nav>
              <div className="flex items-center gap-2">
                <Link to="/shop/cart">
                  <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center shadow-sm ring-1 ring-primary/20 animate-in fade-in zoom-in duration-200">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                </Link>
                <Link to="/shop/account">
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <div className={`md:hidden mt-4 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <nav className="flex flex-col space-y-4 py-4">
              <Link 
                to="/shop" 
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/shop/products" 
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/shop/categories" 
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t bg-muted/40">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-lg">Shop</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/shop" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/shop/products" className="hover:text-primary transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link to="/shop/categories" className="hover:text-primary transition-colors">
                    Categories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Account</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/shop/account" className="hover:text-primary transition-colors">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link to="/shop/account/orders" className="hover:text-primary transition-colors">
                    Order History
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Information</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/shop/about" className="hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/shop/contact" className="hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/shop/faq" className="hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/shop/terms" className="hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/shop/privacy" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/shop/returns" className="hover:text-primary transition-colors">
                    Return Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} FoodShop. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
} 