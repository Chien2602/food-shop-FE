"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedCard } from "@/components/ui/animated-card"
import { cn } from "@/lib/utils"
import { ShoppingCart, Eye } from 'lucide-react'
import Cookies from "js-cookie"

export function ProductCard({ product, className }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const token = Cookies.get('token')

  // Format price with proper currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 2
    }).format(price)
  }

  // Calculate discount percentage if original price exists
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAddingToCart(true)
    try {
      const res = await fetch("http://127.0.0.1:8000/api/cart/items", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1
        })
      })
      
      if (!res.ok) {
        throw new Error('Failed to add to cart')
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <AnimatedCard
      className={cn("group rounded-xl overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow duration-300", className)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="aspect-square relative overflow-hidden">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full w-full"
        >
          <img 
            src={product.thumbnail || "/placeholder.svg"} 
            alt={product.title} 
            className="object-cover w-full h-full absolute inset-0" 
          />
        </motion.div>
        
        {/* Product badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
          {/* {product.isNew && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white px-2 py-1">New</Badge>
          )} */}
          {/* {discountPercentage > 0 && (
            <Badge className="bg-rose-500 hover:bg-rose-600 text-white px-2 py-1">-{discountPercentage}%</Badge>
          )} */}
        </div>
        
        {/* Quick action buttons */}
        <motion.div 
          className="absolute top-2 right-2 flex flex-col gap-2 z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3, staggerChildren: 0.1 }}
        >
        </motion.div>
        
        {/* Overlay with view details button */}
        <motion.div
          className="absolute inset-0 bg-black/30 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link to={`/shop/products/${product.id}`}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
            </motion.div>
          </Link>
        </motion.div>
      </div>
      
      <div className="p-4">
        
        <Link to={`/shop/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 hover:text-primary transition-colors">{product.title}</h3>
        </Link>
        
        {/* Price section with original price if available */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-lg">{formatPrice(Number(product.price))}</span>
          {/* {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
          )} */}
        </div>
        
        {/* Rating stars if available */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="pt-2 flex gap-2">
          <Button 
            variant="default" 
            className="w-full gap-2 bg-primary hover:bg-primary/90 transition-colors" 
            size="sm"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </Button>
          <Link to={`/shop/products/${product.id}`} className="w-full">
            <Button 
              variant="outline" 
              className="w-full hover:bg-muted/50 transition-colors" 
              size="sm"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </AnimatedCard>
  )
}
