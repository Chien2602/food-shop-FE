"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FadeIn } from "@/components/ui/fade-in"
import { ProductCard } from "@/components/product-card"
import { SkeletonCard } from "@/components/ui/skeleton-card"

// Mock data for products
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    isNew: true,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    isNew: true,
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Footwear",
    isNew: false,
  },
  {
    id: 4,
    name: "Backpack",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    isNew: false,
  },
  {
    id: 5,
    name: "Smartphone",
    price: 699.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    isNew: true,
  },
  {
    id: 6,
    name: "Laptop",
    price: 1299.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    isNew: false,
  },
  {
    id: 7,
    name: "T-Shirt",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Clothing",
    isNew: false,
  },
  {
    id: 8,
    name: "Jeans",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Clothing",
    isNew: false,
  },
]

// Mock data for categories
const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Footwear" },
  { id: 4, name: "Accessories" },
]

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <FadeIn>
        <h1 className="text-3xl font-bold mb-6">All Products</h1>
      </FadeIn>

      {/* Search and Filter Bar */}
      <FadeIn delay={0.1}>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Select defaultValue={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Narrow down products by applying filters</SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox id={`category-${category.id}`} />
                          <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Price Range</h3>
                    <div className="space-y-4">
                      <Slider defaultValue={[0, 1000]} min={0} max={2000} step={10} />
                      <div className="flex justify-between text-sm">
                        <span>$0</span>
                        <span>$2000</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Availability</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="in-stock" />
                        <Label htmlFor="in-stock">In Stock</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="on-sale" />
                        <Label htmlFor="on-sale">On Sale</Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1">
                      Reset
                    </Button>
                    <Button className="flex-1">Apply Filters</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </FadeIn>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? // Skeleton loading state
            Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
          : // Actual products
            products.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 0.05}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
      </div>

      {/* Pagination */}
      <ScrollReveal>
        <div className="flex justify-center mt-12">
          <div className="flex gap-1">
            <Button variant="outline" size="icon" disabled>
              &lt;
            </Button>
            <Button variant="default" size="icon">
              1
            </Button>
            <Button variant="outline" size="icon">
              2
            </Button>
            <Button variant="outline" size="icon">
              3
            </Button>
            <Button variant="outline" size="icon">
              &gt;
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
