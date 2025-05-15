"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FadeIn } from "@/components/ui/fade-in"
import { Search } from "lucide-react"
import Cookies from "js-cookie"
import { usePlayer } from "@/product-provider"
import { Card, CardContent } from "@/components/ui/card"

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const token = Cookies.get("token")
  const { setCategory } = usePlayer()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://127.0.0.1:8000/api/categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error("Failed to fetch categories")
        }
        const data = await response.json()
        setCategories(data.data.data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [token])

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading categories...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    )
  }

  const handleCategoryClick = (category) => {
    setCategory(category)
    navigate(`/shop/categories/${category.id}`)
  }

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
              <Card
                className="cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="relative h-40 w-full">
                  {category.thumbnail ? (
                    <img
                      src={category.thumbnail || "/placeholder.svg"}
                      alt={category.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="h-full w-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">No image</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{category.title}</h3>
                  {category.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{category.description}</p>
                  )}
                  {category.productCount !== undefined && (
                    <p className="text-sm mt-2">{category.productCount} products</p>
                  )}
                </CardContent>
              </Card>
            </ScrollReveal>
          ))
        )}
      </div>
    </div>
  )
}
