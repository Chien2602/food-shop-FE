"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import Cookies from "js-cookie"
import { usePlayer } from "@/product-provider"


export default function ShopCart() {
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedItems, setSelectedItems] = useState([])
  const token = Cookies.get('token')
  const { setSelectProduct } = usePlayer()
  const navigate = useNavigate()
  const fetchCart = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/cart', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const data = await response.json();
        console.log('Cart data:', data)
        setCartItems(data.data.cart.items || [])
      } else {
        setCartItems([])
      }
    } catch (error) {
      setCartItems([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
    // eslint-disable-next-line
  }, [token])

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    setIsLoading(true)
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/cart/items/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      })
      if (response.ok) {
        await fetchCart()
      } else {
        alert('Failed to update quantity!')
      }
    } catch (error) {
      alert('Connection error!')
    } finally {
      setIsLoading(false)
    }
  }

  const removeItem = async (cartItemId) => {
    setIsLoading(true)
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/cart/items/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        await fetchCart()
      } else {
        alert('Failed to remove product!')
      }
    } catch (error) {
      alert('Connection error!')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectItem = (cartItemId) => {
    setSelectedItems(prev =>
      prev.includes(cartItemId)
        ? prev.filter(id => id !== cartItemId)
        : [...prev, cartItemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(cartItems.map(item => item.id))
    }
  };
  

  const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
  const subtotal = selectedCartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = selectedCartItems.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  const handleSelectProduct = () => {
    setSelectProduct(selectedCartItems)
    navigate("/shop/checkout")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cartItems.length === 0 && !isLoading ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
          <Link to="/shop/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center mb-4 px-2">
              <input
                type="checkbox"
                checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                onChange={handleSelectAll}
                className="mr-2 h-5 w-5 accent-primary border-2 border-primary rounded focus:ring-2 focus:ring-primary transition"
              />
              <span className="font-medium select-none">Select All</span>
              <span className="ml-4 text-sm text-gray-500">
                {selectedItems.length}/{cartItems.length} items selected
              </span>
            </div>
            {cartItems.map((item) => {
              const isChecked = selectedItems.includes(item.id);
              return (
                <Card
                  key={item.id}
                  className={`p-4 relative flex transition-all duration-200 ${
                    isChecked
                      ? 'border-2 border-primary bg-primary/5 shadow-lg'
                      : 'hover:border-primary/50'
                  }`}
                >
                  <div className="flex gap-4 w-full">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleSelectItem(item.id)}
                      className="mt-2 h-5 w-5 accent-primary border-2 border-primary rounded focus:ring-2 focus:ring-primary transition"
                    />
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="w-full h-full object-cover rounded-md border"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product.title}</h3>
                      <p className="text-muted-foreground">{item.product.price.toLocaleString('vi-VN')} ₫</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isLoading}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={isLoading}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right flex flex-col justify-between">
                      <p className="font-semibold">
                        {(item.product.price * item.quantity).toLocaleString('vi-VN')} ₫
                      </p>
                    </div>
                  </div>
                  {isLoading && (
                    <div className="absolute top-2 right-2">
                      <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></span>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
          <div className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{subtotal.toLocaleString('vi-VN')} ₫</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>{shipping.toLocaleString('vi-VN')} ₫</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{total.toLocaleString('vi-VN')} ₫</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <Button
                  className="w-full"
                  disabled={selectedItems.length === 0}
                  onClick={handleSelectProduct}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
