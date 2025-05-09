"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedCard } from "@/components/ui/animated-card"
import { cn } from "@/lib/utils"

export function ProductCard({ product, className }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <AnimatedCard
      className={cn("group", className)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="aspect-square relative overflow-hidden">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
          className="h-full w-full"
        >
          <img 
            src={product.image || "/placeholder.svg"} 
            alt={product.name} 
            className="object-cover w-full h-full absolute inset-0" 
          />
        </motion.div>
        {product.isNew && <Badge className="absolute top-2 right-2 z-10">New</Badge>}
        <motion.div
          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link to={`/shop/products/${product.id}`} className="w-full px-4">
            <Button variant="secondary" className="w-full">
              Quick View
            </Button>
          </Link>
        </motion.div>
      </div>
      <div className="p-4">
        <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
        <div className="font-bold">${product.price.toFixed(2)}</div>
        <div className="pt-4 flex gap-2">
          <Button variant="default" className="w-full" size="sm">
            Add to Cart
          </Button>
          <Link to={`/shop/products/${product.id}`} className="w-full">
            <Button variant="outline" className="w-full" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </AnimatedCard>
  )
}
