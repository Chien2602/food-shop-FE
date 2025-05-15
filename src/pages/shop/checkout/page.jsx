"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, CreditCard, Lock } from "lucide-react"
import { usePlayer } from "@/product-provider"
import Cookies from "js-cookie"

export default function ShopCheckout() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const { selectProduct = [] } = usePlayer()
  const token = Cookies.get('token')

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  })

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/users/me", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
          credentials: 'include',
        })

        if (!res.ok) {
          throw new Error('Failed to fetch user info')
        }

        const data = await res.json()
        const user = data.data

        setFormData(prev => ({
          ...prev,
          firstName: user.first_name || "",
          lastName: user.last_name || "",
          email: user.email || "",
          address: user.address || "",
          city: user.city || "",
          zipCode: user.zip_code || "",
          phone: user.phone || ""
        }))
      } catch (error) {
        console.error('Failed to fetch user info:', error)
      } finally {
        setIsLoadingUser(false)
      }
    }

    fetchUserInfo()
  }, [token])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  useEffect(() => {
    if (!selectProduct || selectProduct.length === 0) {
      navigate('/shop/cart')
    }
  }, [selectProduct, navigate])

  const subtotal = selectProduct?.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) || 0
  const shipping = selectProduct?.length > 0 ? 10 : 0
  const total = subtotal + shipping

  const handlePlaceOrder = async () => {
    if (!selectProduct || selectProduct.length === 0) {
      alert("Giỏ hàng trống")
      return
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.city || !formData.zipCode || !formData.phone) {
      alert("Vui lòng điền đầy đủ thông tin giao hàng")
      return
    }

    if (paymentMethod === "credit-card" && (!formData.cardNumber || !formData.expiry || !formData.cvv)) {
      alert("Vui lòng điền đầy đủ thông tin thanh toán")
      return
    }

    setIsLoading(true)
    try {
      const orderData = {
        total_price: total,
        shipping_address: formData.address,
        shipping_city: formData.city,
        shipping_zip_code: formData.zipCode,
        shipping_phone: formData.phone,
        //   first_name: formData.firstName,
        //   last_name: formData.lastName,
        //   email: formData.email,
        //   shipping_address: formData.address,
        //   shipping_city: formData.city,
        //   shipping_zip_code: formData.zipCode,
        //   shipping_phone: formData.phone
        // },
        items: selectProduct.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity
        }))
      }

      const res = await fetch("http://localhost:8000/api/orders", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(orderData)
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to create order')
      }

      const data = await res.json()
      console.log(data)
      navigate(`/shop/products`)
    } catch (error) {
      console.error('Failed to create order:', error)
      alert(error.message || "Có lỗi xảy ra khi tạo đơn hàng")
    } finally {
      setIsLoading(false)
    }
  }

  if (!selectProduct || selectProduct.length === 0) {
    return null
  }

  if (isLoadingUser) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p>Đang tải thông tin...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/shop/cart" className="inline-flex items-center text-sm mb-8 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" value={formData.firstName} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value={formData.lastName} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" value={formData.address} onChange={handleInputChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value={formData.city} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input id="zipCode" value={formData.zipCode} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Credit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
              </RadioGroup>

              {paymentMethod === "credit-card" && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={handleInputChange} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" value={formData.cvv} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {selectProduct.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item?.product?.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      {(item?.product?.price * item.quantity).toLocaleString('vi-VN')} ₫
                    </p>
                  </div>
                ))}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Tạm tính</span>
                    <span>{subtotal.toLocaleString('vi-VN')} ₫</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí giao hàng</span>
                    <span>{shipping.toLocaleString('vi-VN')} ₫</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Tổng cộng</span>
                    <span>{total.toLocaleString('vi-VN')} ₫</span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button className="w-full" onClick={handlePlaceOrder} disabled={isLoading}>
                  <Lock className="mr-2 h-4 w-4" />
                  {isLoading ? "Đang xử lý..." : "Place Order"}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
