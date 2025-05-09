"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FadeIn } from "@/components/ui/fade-in"
import { CategoryCard } from "@/components/category-card"
import { Search } from "lucide-react"

// Mock data for categories
const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "/placeholder.svg?height=300&width=300",
    products: 120,
    description: "Discover the latest gadgets and electronic devices for your home and office.",
  },
  {
    id: 2,
    name: "Clothing",
    image: "/placeholder.svg?height=300&width=300",
    products: 85,
    description: "Explore our collection of trendy and comfortable clothing for all seasons.",
  },
  {
    id: 3,
    name: "Footwear",
    image: "/placeholder.svg?height=300&width=300",
    products: 64,
    description: "Step into style with our range of shoes for every occasion.",
  },
  {
    id: 4,
    name: "Accessories",
    image: "/placeholder.svg?height=300&width=300",
    products: 92,
    description: "Complete your look with our fashionable accessories and jewelry.",
  },
  {
    id: 5,
    name: "Home & Kitchen",
    image: "/placeholder.svg?height=300&width=300",
    products: 78,
    description: "Transform your living space with our home decor and kitchen essentials.",
  },
  {
    id: 6,
    name: "Beauty & Personal Care",
    image: "/placeholder.svg?height=300&width=300",
    products: 56,
    description: "Discover premium beauty products and personal care items.",
  },
  {
    id: 7,
    name: "Sports & Outdoors",
    image: "/placeholder.svg?height=300&width=300",
    products: 43,
    description: "Gear up for your active lifestyle with our sports and outdoor equipment.",
  },
  {
    id: 8,
    name: "Books & Stationery",
    image: "/placeholder.svg?height=300&width=300",
    products: 37,
    description: "Explore our collection of books, notebooks, and stationery items.",
  },
]

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <FadeIn>
        <h1 className="text-3xl font-bold mb-6">Shop by Category</h1>
      </FadeIn>

      {/* Search Bar */}
      <FadeIn delay={0.1}>
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search categories..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </FadeIn>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCategories.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No categories found</h2>
            <p className="text-muted-foreground mb-6">Try a different search term</p>
            <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
          </div>
        ) : (
          filteredCategories.map((category, index) => (
            <ScrollReveal key={category.id} delay={index * 0.05}>
              <CategoryCard category={category} />
            </ScrollReveal>
          ))
        )}
      </div>
    </div>
  )
}
