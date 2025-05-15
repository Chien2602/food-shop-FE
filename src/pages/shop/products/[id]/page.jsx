"use client"

import { useState, useEffect } from "react"
import {Link} from "react-router"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, Truck, ShieldCheck, ArrowLeft, Minus, Plus, ShoppingCart, Check, Info } from "lucide-react"
import { motion } from "framer-motion"
import Cookies from "js-cookie"
import { Skeleton } from "@/components/ui/skeleton"
import {usePlayer} from "../../../../product-provider"

// Image zoom component
const ImageZoom = ({ src, alt, className }) => {
  const [isZoomed, setIsZoomed] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!isZoomed) return
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setPosition({ x, y })
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src || "/placeholder.svg?height=600&width=600"}
        alt={alt}
        className={`object-cover w-full h-full transition-transform duration-300 ${
          isZoomed ? "scale-150" : "scale-100"
        }`}
        style={
          isZoomed
            ? {
                transformOrigin: `${position.x}% ${position.y}%`,
              }
            : {}
        }
      />
    </div>
  )
}

// Animated button component
const AnimatedButton = ({ children, className, onClick, disabled }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  )
}

// Quantity control component
const QuantityControl = ({ quantity, onDecrease, onIncrease, maxStock, disabled }) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationType, setAnimationType] = useState(null) // 'increase' or 'decrease'
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipMessage, setTooltipMessage] = useState("")

  const handleDecrease = () => {
    if (quantity > 1 && !disabled) {
      setAnimationType('decrease')
      setIsAnimating(true)
      onDecrease()
      setTimeout(() => {
        setIsAnimating(false)
        setAnimationType(null)
      }, 300)
    } else if (quantity <= 1) {
      setTooltipMessage("Minimum quantity is 1")
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 2000)
    }
  }

  const handleIncrease = () => {
    if (quantity < maxStock && !disabled) {
      setAnimationType('increase')
      setIsAnimating(true)
      onIncrease()
      setTimeout(() => {
        setIsAnimating(false)
        setAnimationType(null)
      }, 300)
    } else if (quantity >= maxStock) {
      setTooltipMessage(`Maximum quantity is ${maxStock}`)
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 2000)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      handleIncrease()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      handleDecrease()
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <div 
          className="flex items-center border-2 rounded-xl shadow-sm overflow-hidden bg-white focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-200"
          tabIndex="0"
          onKeyDown={handleKeyPress}
        >
          <motion.button
            whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
            whileTap={{ scale: 0.95 }}
            className={`h-14 w-14 flex items-center justify-center text-gray-600 hover:text-primary transition-colors ${
              quantity <= 1 || disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleDecrease}
            disabled={quantity <= 1 || disabled}
            aria-label="Decrease quantity"
          >
            <Minus className="h-5 w-5" />
          </motion.button>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: isAnimating ? (animationType === 'increase' ? 1.2 : 0.8) : 1,
              opacity: 1,
              y: isAnimating ? (animationType === 'increase' ? -5 : 5) : 0
            }}
            transition={{ duration: 0.2 }}
            className="w-16 text-center relative"
          >
            <span className="text-2xl font-medium">{quantity}</span>
            {isAnimating && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className={`absolute inset-0 flex items-center justify-center rounded-lg ${
                  animationType === 'increase' ? 'bg-green-100' : 'bg-red-100'
                }`}
              />
            )}
          </motion.div>
          <motion.button
            whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
            whileTap={{ scale: 0.95 }}
            className={`h-14 w-14 flex items-center justify-center text-gray-600 hover:text-primary transition-colors ${
              quantity >= maxStock || disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleIncrease}
            disabled={quantity >= maxStock || disabled}
            aria-label="Increase quantity"
          >
            <Plus className="h-5 w-5" />
          </motion.button>
        </div>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap"
          >
            {tooltipMessage}
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Fade in animation component
const FadeIn = ({ children, direction = "up", delay = 0, className = "" }) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
      x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function ShopProductDetail() {
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(null)
  const [category, setCategory] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [addedToCart, setAddedToCart] = useState(false)
  const {currentProduct} = usePlayer()
  
  
  useEffect(() => {}, [currentProduct])

  const token = Cookies.get("token")

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${currentProduct.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        const json = await response.json()
        const productData = json.data.product
        setProduct(productData)

        // Fetch category data
        if (productData?.category_id) {
          fetchCategory(productData.category_id)
        }
      } catch (error) {
        console.error("Error fetching product data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    const fetchCategory = async (categoryId) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/categories/${categoryId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        const result = await response.json()
        const title = result?.data?.title
        setCategory(title)
      } catch (error) {
        console.error("Error fetching category data:", error)
      }
    }

    fetchProduct()
  }, [currentProduct.id, token])

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      const response = await fetch('http://127.0.0.1:8000/api/cart/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: quantity,
        }),
      });
      if (response.ok) {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to add to cart!');
      }
    } catch (error) {
      alert('Server connection error!');
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((_, index) => (
                <Skeleton key={index} className="aspect-square rounded-md" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-10 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="pt-4">
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn>
        <Link href="/shop/products" className="inline-flex items-center text-sm mb-8 hover:underline group">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to list
        </Link>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
        {/* Product Images */}
        <FadeIn>
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden border bg-background shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <ImageZoom
                src={product?.thumbnail || "/placeholder.svg?height=600&width=600"}
                alt={product?.title || "Product image"}
                className="w-full h-full"
              />
              {product?.is_new && (
                <Badge className="absolute top-6 left-6 z-10 bg-primary shadow-lg text-base px-4 py-1.5">
                  New
                </Badge>
              )}
            </div>
          </div>
        </FadeIn>

        {/* Product Info */}
        <div>
          <FadeIn direction="right">
            <div className="mb-8">
              <div className="text-sm text-muted-foreground mb-4 flex items-center gap-4">
                <Badge variant="outline" className="px-4 py-1.5 text-base border-2">
                  {category || "Product"}
                </Badge>

                {product?.in_stock && (
                  <span className="text-green-600 text-sm flex items-center bg-green-50 px-3 py-1.5 rounded-full font-medium">
                    <Check className="h-4 w-4 mr-1.5" /> In Stock
                  </span>
                )}
              </div>

              <h1 className="text-5xl font-bold mb-4 tracking-tight leading-tight">{product?.title || "Product Name"}</h1>

              <motion.div
                className="flex items-baseline gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-5xl font-bold text-primary">
                  {Number(product?.price || 0).toLocaleString('vi-VN')} ₫
                </span>
                {product?.original_price && (
                  <span className="text-2xl text-muted-foreground line-through">
                    {Number(product.original_price).toLocaleString('vi-VN')} ₫
                  </span>
                )}
                {product?.original_price && (
                  <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200 px-4 py-1.5 text-base">
                    Save {Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                  </Badge>
                )}
              </motion.div>

              <motion.p
                className="text-muted-foreground text-xl leading-relaxed mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {product?.description || "No description available for this product."}
              </motion.p>

              <motion.div
                className="space-y-5 mb-10 bg-gray-50 p-8 rounded-2xl shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    <Truck className="h-7 w-7 text-primary" />
                  </div>
                  <span className="text-gray-700 text-lg">Fast delivery within 2 hours</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    <ShieldCheck className="h-7 w-7 text-primary" />
                  </div>
                  <span className="text-gray-700 text-lg">Guaranteed fresh every day</span>
                </div>
              </motion.div>

              <motion.div
                className="border-t border-b py-8 mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-xl">Status:</span>
                  <span className={`text-xl font-medium ${(product?.stock || 0) > 0 ? "text-green-600" : "text-red-600"}`}>
                    {(product?.stock || 0) > 0 ? `In Stock (${product?.stock} items)` : "Out of Stock"}
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-6">
                    <QuantityControl
                      quantity={quantity}
                      onDecrease={decreaseQuantity}
                      onIncrease={increaseQuantity}
                      maxStock={product?.stock || 0}
                      disabled={(product?.stock || 0) <= 0}
                    />
                    <AnimatedButton 
                      className="flex-1 h-14 text-xl font-medium shadow-xl hover:shadow-2xl transition-all duration-300" 
                      onClick={handleAddToCart} 
                      disabled={(product?.stock || 0) <= 0}
                    >
                      {addedToCart ? (
                        <>
                          <Check className="h-6 w-6 mr-2" /> Added to Cart
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-6 w-6 mr-2" /> Add to Cart
                        </>
                      )}
                    </AnimatedButton>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-gray-50 p-4 rounded-xl"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <Info className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium mb-1">Quick Notes:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Use + and - buttons to change quantity</li>
                          <li>You can use ↑ and ↓ keys for quick changes</li>
                          <li>Maximum quantity is limited by stock</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
