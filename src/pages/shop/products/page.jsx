"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, SlidersHorizontal, ShoppingCart, Eye } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FadeIn } from "@/components/ui/fade-in"
import { ProductCard } from "@/components/product-card"
import { SkeletonCard } from "@/components/ui/skeleton-card"
import Cookies from "js-cookie"
import { usePlayer } from "@/product-provider"
import { useNavigate } from "react-router-dom"

export default function ProductsPage() {
  const navigate = useNavigate()
  const { setCurrentProduct } = usePlayer()
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [maxPrice, setMaxPrice] = useState(500000)
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [perPage, setPerPage] = useState(12)
  const token = Cookies.get('token')
  
  const handleProductClick = (product) => {
    setCurrentProduct(product)
    navigate(`/shop/products/${product.id}`)
  }

  // Handle add to cart
  const handleAddToCart = async (product, e) => {
    e.stopPropagation() // Prevent triggering parent click
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
    }
  }

  // Handle view details
  const handleViewDetails = (productId, e) => {
    e.stopPropagation() // Prevent triggering parent click
    navigate(`/shop/products/${productId}`)
  }

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/categories", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        })
        const data = await res.json()
        setCategories(data.data.data || [])
      } catch (err) {
        setCategories([])
      }
    }
    fetchCategories()
  }, [token])

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const params = new URLSearchParams()
        if (searchTerm) params.append("search", searchTerm)
        if (selectedCategory && selectedCategory !== "all") params.append("category_id", selectedCategory)
        if (maxPrice < 500000) params.append("price_max", maxPrice)
        params.append("page", page)
        params.append("per_page", perPage)
        const url = `http://127.0.0.1:8000/api/products?${params.toString()}`
        const res = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        })
        const data = await res.json()
        console.log(data)
        const products = data.data.products.data || []
        console.log(products)
        setProducts(products || [])
        setLastPage(data.data.products.last_page || 1)
        setTotal(data.data.products.total || 0)
      } catch (err) {
        setProducts([])
        setLastPage(1)
        setTotal(0)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [searchTerm, selectedCategory, maxPrice, page, perPage, token])

  // Handle price slider
  const handlePriceChange = (value) => {
    setMaxPrice(value[0])
    setPage(1)
  }

  // Handle category filter
  const handleCategoryChange = (value) => {
    setSelectedCategory(value)
    setPage(1)
  }

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setPage(1)
  }

  // Pagination controls
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= lastPage) setPage(newPage)
  }

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
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-4">
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories
                  .filter(category => category.id !== undefined && category.id !== null && category.id !== "")
                  .map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>{category.title || category.name}</SelectItem>
                  ))}
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
                          <Checkbox id={`category-${category.id}`} checked={selectedCategory === category.id.toString()} onCheckedChange={() => handleCategoryChange(category.id.toString())} />
                          <Label htmlFor={`category-${category.id}`}>{category.title || category.name}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Maximum Price</h3>
                    <div className="space-y-4">
                      <Slider 
                        value={[maxPrice]} 
                        min={0} 
                        max={500000} 
                        step={5000} 
                        onValueChange={handlePriceChange}
                        className="[&_[role=slider]]:bg-primary [&_[role=slider]]:hover:bg-primary/90 [&_[role=slider]]:focus:bg-primary/90 [&_[role=track]]:bg-primary/20"
                      />
                      <div className="flex justify-between text-sm">
                        <span>0₫</span>
                        <span>{maxPrice.toLocaleString()}₫</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1" onClick={() => { setMaxPrice(500000); setSelectedCategory(""); setPage(1); }}>Reset</Button>
                    <Button className="flex-1" onClick={() => { setPage(1); }}>Apply Filters</Button>
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
          ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
          : products.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <h2 className="text-xl font-semibold mb-2">No products found</h2>
              <p className="text-muted-foreground mb-6">Try a different search or filter</p>
            </div>
          ) : (
            products.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 0.05}>
                <div className="group relative cursor-pointer" onClick={() => handleProductClick(product)}>
                  <ProductCard product={product} />
                  <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <Button 
                      variant="secondary" 
                      size="icon"
                      className="rounded-full h-9 w-9 shadow-md"
                      onClick={(e) => handleViewDetails(product.id, e)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="icon"
                      className="rounded-full h-9 w-9 shadow-md"
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            ))
          )}
      </div>

      {/* Pagination */}
      <ScrollReveal>
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
              &lt;
            </Button>
            {Array.from({ length: Math.min(5, lastPage) }).map((_, i) => {
              let pageNumber;
              if (lastPage <= 5) {
                pageNumber = i + 1;
              } else if (page <= 3) {
                pageNumber = i + 1;
              } else if (page >= lastPage - 2) {
                pageNumber = lastPage - 4 + i;
              } else {
                pageNumber = page - 2 + i;
              }
              return (
                <Button 
                  key={pageNumber} 
                  variant={page === pageNumber ? "default" : "outline"} 
                  size="icon" 
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Button>
              );
            })}
            <Button variant="outline" size="icon" onClick={() => handlePageChange(page + 1)} disabled={page === lastPage}>
              &gt;
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
