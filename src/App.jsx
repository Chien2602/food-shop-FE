import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";
import { Button } from "./components/ui/button";
import { ShoppingBag, Users } from "lucide-react";

// Layouts
import ShopLayout from "./layouts/ShopLayout";
import AdminLayout from "./layouts/AdminLayout";

// Shop pages
import ShopHome from "./pages/shop/page";
import ShopProducts from "./pages/shop/products/page";
import ShopProductDetail from "./pages/shop/products/[id]/page";
import ShopCategories from "./pages/shop/categories/page";
import ShopCategoryDetail from "./pages/shop/categories/[id]/page";
import ShopCart from "./pages/shop/cart/page";
import ShopCheckout from "./pages/shop/checkout/page";
import ShopAccount from "./pages/shop/account/page";
import ShopOrders from "./pages/shop/account/orders/page";
import ShopOrderDetail from "./pages/shop/account/orders/[id]/page";
import ShopProfile from "./pages/shop/account/profile/page";
import ShopAddresses from "./pages/shop/account/addresses/page";
import ShopWishlist from "./pages/shop/account/wishlist/page";
import ShopAbout from "./pages/shop/about/page";
import ShopContact from "./pages/shop/contact/page";
import ShopFaq from "./pages/shop/faq/page";
import ShopTerms from "./pages/shop/terms/page";
import ShopPrivacy from "./pages/shop/privacy/page";
import ShopReturns from "./pages/shop/returns/page";

// Admin pages
import AdminDashboard from "./pages/admin/page";
import AdminProducts from "./pages/admin/products/page";
import AdminProductCreate from "./pages/admin/products/create/page";
import AdminProductDetail from "./pages/admin/products/[id]/page";
import AdminCategories from "./pages/admin/categories/page";
import AdminCategoryCreate from "./pages/admin/categories/create/page";
import AdminCategoryDetail from "./pages/admin/categories/[id]/page";
import AdminOrders from "./pages/admin/orders/page";
import AdminOrderDetail from "./pages/admin/orders/[id]/page";
import AdminCustomers from "./pages/admin/customers/page";
import AdminCustomerDetail from "./pages/admin/customers/[id]/page";
import AdminAnalytics from "./pages/admin/analytics/page";
import AdminSettings from "./pages/admin/settings/page";

import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import { ProductProvider } from "./product-provider";

function App() {
  return (
    <ProductProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            {/* Home page with navigation options */}
            <Route
              path="/"
              element={
                <div className="flex flex-col min-h-screen">
                  <header className="border-b">
                    <div className="container mx-auto py-4 px-4 flex justify-between items-center">
                      <h1 className="text-2xl font-bold">
                        E-Commerce Platform
                      </h1>
                    </div>
                  </header>
                  <main className="flex-1 container mx-auto py-12 px-4">
                    <div className="max-w-3xl mx-auto text-center space-y-8">
                      <h2 className="text-4xl font-bold tracking-tight">
                        Welcome to our E-Commerce Platform
                      </h2>
                      <p className="text-xl text-muted-foreground">
                        Choose which interface you want to access
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                        <Link
                          to="/shop"
                          className="flex-1 max-w-xs mx-auto sm:mx-0"
                        >
                          <Button
                            size="lg"
                            className="w-full h-32 text-lg"
                            variant="default"
                          >
                            <div className="flex flex-col items-center gap-2">
                              <ShoppingBag className="h-8 w-8" />
                              <span>Shop (User Interface)</span>
                            </div>
                          </Button>
                        </Link>
                        <Link
                          to="/admin"
                          className="flex-1 max-w-xs mx-auto sm:mx-0"
                        >
                          <Button
                            size="lg"
                            className="w-full h-32 text-lg"
                            variant="outline"
                          >
                            <div className="flex flex-col items-center gap-2">
                              <Users className="h-8 w-8" />
                              <span>Admin Dashboard</span>
                            </div>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </main>
                  <footer className="border-t py-6">
                    <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                      &copy; {new Date().getFullYear()} E-Commerce Platform. All
                      rights reserved.
                    </div>
                  </footer>
                </div>
              }
            />

            {/* Shop routes */}
            <Route
              element={
                <ProtectedRoute>
                  <ShopLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/shop" element={<ShopHome />} />

              {/* Products routes */}
              <Route path="/shop/products" element={<ShopProducts />} />
              <Route
                path="/shop/products/:id"
                element={<ShopProductDetail />}
              />

              {/* Categories routes */}
              <Route path="/shop/categories" element={<ShopCategories />} />
              <Route
                path="/shop/categories/:id"
                element={<ShopCategoryDetail />}
              />

              {/* Cart and Checkout */}
              <Route path="/shop/cart" element={<ShopCart />} />
              <Route path="/shop/checkout" element={<ShopCheckout />} />

              {/* Account routes */}
              <Route path="/shop/account" element={<ShopAccount />} />
              <Route path="/shop/account/orders" element={<ShopOrders />} />
              <Route
                path="/shop/account/orders/:id"
                element={<ShopOrderDetail />}
              />
              <Route path="/shop/account/profile" element={<ShopProfile />} />
              <Route
                path="/shop/account/addresses"
                element={<ShopAddresses />}
              />
              <Route path="/shop/account/wishlist" element={<ShopWishlist />} />

              {/* Information pages */}
              <Route path="/shop/about" element={<ShopAbout />} />
              <Route path="/shop/contact" element={<ShopContact />} />
              <Route path="/shop/faq" element={<ShopFaq />} />
              <Route path="/shop/terms" element={<ShopTerms />} />
              <Route path="/shop/privacy" element={<ShopPrivacy />} />
              <Route path="/shop/returns" element={<ShopReturns />} />
            </Route>

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Admin routes */}
            <Route
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/admin" element={<AdminDashboard />} />

              {/* Products management */}
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route
                path="/admin/products/create"
                element={<AdminProductCreate />}
              />
              <Route
                path="/admin/products/:id"
                element={<AdminProductDetail />}
              />

              {/* Categories management */}
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route
                path="/admin/categories/create"
                element={<AdminCategoryCreate />}
              />
              <Route
                path="/admin/categories/:id"
                element={<AdminCategoryDetail />}
              />

              {/* Orders management */}
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/orders/:id" element={<AdminOrderDetail />} />

              {/* Customers management */}
              <Route path="/admin/customers" element={<AdminCustomers />} />
              <Route
                path="/admin/customers/:id"
                element={<AdminCustomerDetail />}
              />

              {/* Analytics and Settings */}
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </ProductProvider>
  );
}

export default App;
