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
import { useToast } from "@/components/ui/use-toast"
import { usePlayer } from "@/product-provider"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

export default function ShopCategoryDetail() {
  const { id } = useParams()
  const { toast } = useToast()
  const [category, setCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [addingToCart, setAddingToCart] = useState({})
  const token = Cookies.get('token')
  const { setCurrentProduct } = usePlayer()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch category details
        const categoryResponse = await fetch(`http://127.0.0.1:8000/api/categories/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
        if (!categoryResponse.ok) {
          throw new Error('Failed to fetch category')
        }
        const categoryData = await categoryResponse.json()
        setCategory(categoryData.data)

        // Fetch products in this category
        const productsResponse = await fetch(`http://127.0.0.1:8000/api/categories/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        })
        if (!productsResponse.ok) {
          throw new Error('Failed to fetch products')
        }
        const productsData = await productsResponse.json()
        console.log(productsData)
        setProducts(productsData.data.products || [])
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err.message)
        toast({
          title: "Error",
          description: "Failed to load category data",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchCategoryAndProducts()
    }
  }, [id, token, toast])

  const handleAddToCart = async (productId) => {
    try {
      setAddingToCart(prev => ({ ...prev, [productId]: true }))
      
      const response = await fetch('http://127.0.0.1:8000/api/cart/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: 1,
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to add to cart')
      }

      toast({
        title: "Success",
        description: "Product added to cart successfully",
      })
    } catch (err) {
      console.error('Error adding to cart:', err)
      toast({
        title: "Error",
        description: err.message || "Failed to add product to cart",
        variant: "destructive"
      })
    } finally {
      setAddingToCart(prev => ({ ...prev, [productId]: false }))
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (error || !category) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center text-red-500">
          {error || "Category not found"}
        </div>
      </div>
    )
  }

  const handleProductClick = (product) => {
    setCurrentProduct(product)
    navigate(`/shop/products/${product.id}`)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{category.title}</h1>
        <p className="text-muted-foreground mt-2">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden" onClick={() => handleProductClick(product)}>
            <div className="aspect-square">
              <img
                src={product.thumbnail || '/placeholder.png'}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/placeholder.png'
                }}
              />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-semibold">{product.title}</h3>
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(product.price || 0)}
                </div>
                {product.discount > 0 && (
                  <div className="text-sm text-red-500">
                    -{product.discount}%
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button 
                  className="flex-1"
                  onClick={() => handleAddToCart(product.id)}
                  disabled={addingToCart[product.id]}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {addingToCart[product.id] ? 'Adding...' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
