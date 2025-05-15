"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Upload, ImageIcon, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import Cookies from "js-cookie"

export default function AdminProductCreate() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const token = Cookies.get("token")

  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(null)
  const [fetchingCategories, setFetchingCategories] = useState(true)

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category_id: null,
    stock: "",
    thumbnail: "",
    isDeleted: false,
    discount: 0,
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setFetchingCategories(true)
        setError(null)

        const response = await fetch("http://127.0.0.1:8000/api/admin/categories", {
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
        const categoriesData = data.data?.data || []
        setCategories(categoriesData)
        console.log(categoriesData)

        if (categoriesData.length > 0) {
          setProduct((prev) => ({ ...prev, category_id: categoriesData[0].id }))
        }
      } catch (err) {
        console.error("Error fetching categories:", err)
        setError("Failed to fetch categories. Please try again.")
        toast({
          title: "Error",
          description: "Failed to fetch categories",
          variant: "destructive",
        })
      } finally {
        setFetchingCategories(false)
      }
    }

    if (token) {
      fetchCategories()
    }
  }, [token, toast])

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", "foodShop")

      const response = await fetch("https://api.cloudinary.com/v1_1/dxkqibtzv/image/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload image")
      }

      const data = await response.json()
      setProduct((prev) => ({ ...prev, thumbnail: data.secure_url }))

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      })
    } catch (err) {
      console.error("Error uploading image:", err)
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const validateForm = () => {
    console.log('Validating form with data:', product) // Debug log

    const errors = []

    if (!product.title?.trim()) {
      errors.push('Product name is required')
    }

    if (!product.description?.trim()) {
      errors.push('Description is required')
    }

    if (!product.price || isNaN(Number(product.price)) || Number(product.price) <= 0) {
      errors.push('Valid price is required')
    }

    if (!product.stock || isNaN(Number(product.stock)) || Number(product.stock) < 0) {
      errors.push('Valid stock quantity is required')
    }

    if (!product.thumbnail) {
      errors.push('Product image is required')
    }

    if (product.discount && (isNaN(Number(product.discount)) || Number(product.discount) < 0 || Number(product.discount) > 100)) {
      errors.push('Discount must be between 0 and 100')
    }

    if (errors.length > 0) {
      console.log('Validation errors:', errors) // Debug log
      toast({
        title: "Validation Error",
        description: errors.join(', '),
        variant: "destructive",
      })
      return false
    }

    console.log('Form validation passed') // Debug log
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted') // Debug log

    if (!validateForm()) {
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const productData = {
        title: product.title.trim(),
        description: product.description.trim(),
        price: Number(product.price),
        category_id: product.category_id,
        stock: Number(product.stock),
        thumbnail: product.thumbnail,
        isDeleted: product.isDeleted,
        discount: Number(product.discount || "0"),
      }

      console.log('Product data to send:', productData) // Debug log
      console.log('Token:', token) // Debug log

      const response = await fetch("http://127.0.0.1:8000/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      })

      console.log('Response status:', response.status) // Debug log
      const responseData = await response.json()
      console.log('Server response:', responseData) // Debug log

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to create product")
      }

      toast({
        title: "Success",
        description: "Product created successfully",
      })
    navigate("/admin/products")
    } catch (err) {
      console.error("Error creating product:", err)
      setError(err.message || "Failed to create product")
      toast({
        title: "Error",
        description: err.message || "Failed to create product",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Check for token on component mount
  useEffect(() => {
    if (!token) {
      toast({
        title: "Authentication Error",
        description: "Please login to continue",
        variant: "destructive",
      })
      navigate("/login")
    }
  }, [token, navigate, toast])

  if (!token) {
    return null // Don't render anything if not authenticated
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/admin/products")}
            aria-label="Back to products"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Create New Product</h1>
      </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="title">Product Name *</Label>
              <Input
                  id="title"
                  value={product.title}
                  onChange={(e) => setProduct({ ...product, title: e.target.value })}
                  disabled={isLoading}
                  placeholder="Enter product name"
                required
              />
            </div>

            <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                {fetchingCategories ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
              <Select
                    value={product.category_id ? product.category_id.toString() : undefined}
                    onValueChange={(value) => {
                      console.log('Selected category value:', value) // Debug log
                      setProduct((prev) => ({
                        ...prev,
                        category_id: value,
                      }))
                    }}
                    disabled={isLoading || categories.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                      {categories.length === 0 ? (
                        <SelectItem value="no-categories" disabled>
                          No categories available
                        </SelectItem>
                      ) : (
                        categories.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.title}
                    </SelectItem>
                        ))
                      )}
                </SelectContent>
              </Select>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <div className="relative">
              <Input
                id="price"
                type="number"
                    step="1000"
                    min="0"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    disabled={isLoading}
                    placeholder="0"
                required
                    className="pl-12"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    ₫
                  </div>
                </div>
                {product.price && (
                  <p className="text-sm text-muted-foreground">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(product.price)}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={product.discount}
                  onChange={(e) => setProduct({ ...product, discount: e.target.value })}
                  disabled={isLoading}
                  placeholder="0"
              />
            </div>

            <div className="space-y-2">
                <Label htmlFor="stock">Stock *</Label>
              <Input
                id="stock"
                type="number"
                  min="0"
                value={product.stock}
                onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                  disabled={isLoading}
                  placeholder="0"
                required
              />
            </div>

              <div className="flex items-center space-x-2 h-full self-end">
                <Switch
                  id="isDeleted"
                  checked={!product.isDeleted}
                  onCheckedChange={(checked) => setProduct({ ...product, isDeleted: !checked })}
                  disabled={isLoading}
                />
                <Label htmlFor="isDeleted" className="flex items-center gap-2">
                  <span>Status:</span>
                  <span className={!product.isDeleted ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {!product.isDeleted ? "Active" : "Inactive"}
                  </span>
                </Label>
              </div>

            <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                  disabled={isLoading}
                  placeholder="Enter product description"
                rows={4}
                required
              />
            </div>

              <div className="space-y-3 md:col-span-2">
                <Label htmlFor="thumbnail">Product Image *</Label>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <Input
                      id="thumbnail"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isLoading || isUploading}
                      className={product.thumbnail ? "hidden" : ""}
                    />
                    {isUploading ? (
                      <Button disabled variant="outline">
                        <Upload className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </Button>
                    ) : (
                      product.thumbnail && (
            <Button
              type="button"
              variant="outline"
                          onClick={() => document.getElementById("thumbnail")?.click()}
                          disabled={isLoading}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Change Image
                        </Button>
                      )
                    )}
                  </div>

                  {product.thumbnail ? (
                    <div className="relative border rounded-md overflow-hidden w-full max-w-md h-40">
                      <img
                        src={product.thumbnail || "/placeholder.svg"}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center border border-dashed rounded-md w-full max-w-md h-40 bg-muted/20">
                      <div className="text-center text-muted-foreground">
                        <ImageIcon className="h-10 w-10 mx-auto mb-2" />
                        <p>No image uploaded</p>
                        <p className="text-xs mt-1">Click browse to select an image</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/products")} disabled={isLoading}>
              Cancel
            </Button>
          <Button 
            type="submit" 
            form="product-form" 
            disabled={isLoading || isUploading} 
            className="min-w-[140px]"
            onClick={(e) => {
              e.preventDefault()
              console.log('Create button clicked') // Debug log
              handleSubmit(e)
            }}
          >
              <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Creating..." : "Create Product"}
            </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 
