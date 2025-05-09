"use client"

import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Search, SlidersHorizontal, ShoppingCart, Heart } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FadeIn } from "@/components/ui/fade-in"
import { ProductCard } from "@/components/product-card"
import { SkeletonCard } from "@/components/ui/skeleton-card"
import { Card } from '../../../../components/ui/card'

// Mock data for categories
const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "/placeholder.svg?height=300&width=300",
    description: "Discover the latest gadgets and electronic devices for your home and office.",
  },
  {
    id: 2,
    name: "Clothing",
    image: "/placeholder.svg?height=300&width=300",
    description: "Explore our collection of trendy and comfortable clothing for all seasons.",
  },
  {
    id: 3,
    name: "Footwear",
    image: "/placeholder.svg?height=300&width=300",
    description: "Step into style with our range of shoes for every occasion.",
  },
  {
    id: 4,
    name: "Accessories",
    image: "/placeholder.svg?height=300&width=300",
    description: "Complete your look with our fashionable accessories and jewelry.",
  },
]

// Mock data for products
const allProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    categoryId: 1,
    isNew: true,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    categoryId: 1,
    isNew: true,
  },
  {
    id: 5,
    name: "Smartphone",
    price: 699.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    categoryId: 1,
    isNew: true,
  },
  {
    id: 6,
    name: "Laptop",
    price: 1299.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    categoryId: 1,
    isNew: false,
  },
  {
    id: 7,
    name: "T-Shirt",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Clothing",
    categoryId: 2,
    isNew: false,
  },
  {
    id: 8,
    name: "Jeans",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Clothing",
    categoryId: 2,
    isNew: false,
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Footwear",
    categoryId: 3,
    isNew: false,
  },
  {
    id: 4,
    name: "Backpack",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    categoryId: 4,
    isNew: false,
  },
]

export default function ShopCategoryDetail() {
  const { id } = useParams()

  // Mock data - replace with actual API call
  const category = {
    id,
    name: "Electronics",
    description: "Browse our collection of electronic devices and accessories.",
    products: [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "https://placehold.co/400x400",
        rating: 4.5,
        reviews: 128
      },
      {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        image: "https://placehold.co/400x400",
        rating: 4.3,
        reviews: 89
      },
      {
        id: 3,
        name: "Bluetooth Speaker",
        price: 79.99,
        image: "https://placehold.co/400x400",
        rating: 4.7,
        reviews: 256
      },
      {
        id: 4,
        name: "Power Bank",
        price: 49.99,
        image: "https://placehold.co/400x400",
        rating: 4.2,
        reviews: 64
      }
    ]
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <p className="text-muted-foreground mt-2">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {category.products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-semibold">{product.name}</h3>
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold">${product.price}</div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span>{product.rating}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
