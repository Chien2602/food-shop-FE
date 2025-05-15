import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import { usePlayer } from "@/product-provider"
import { useToast } from "@/components/ui/use-toast"
import Cookies from "js-cookie"

export default function AdminProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentProduct, setCurrentProduct } = usePlayer()
  const { toast } = useToast()
  const token = Cookies.get('token')
  const [product, setProduct] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/admin/products/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch product')
        }

        const data = await response.json()
        const productData = data.data
        setCurrentProduct(productData)
        setProduct(productData)
      } catch (err) {
        console.error('Error fetching product:', err)
        toast({
          title: "Error",
          description: "Failed to fetch product details",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id, token, setCurrentProduct, toast])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/admin/categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch categories')
        }

        const data = await response.json()
        setCategories(data.data.data || [])
      } catch (err) {
        console.error('Error fetching categories:', err)
        toast({
          title: "Error",
          description: "Failed to fetch categories",
          variant: "destructive"
        })
      }
    }

    fetchCategories()
  }, [token, toast])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: product.title,
          description: product.description,
          price: product.price,
          category_id: product.category_id,
          stock: product.stock,
          thumbnail: product.thumbnail,
          isDeleted: product.isDeleted
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update product')
      }

      const data = await response.json()
      setCurrentProduct(data.data)
      setProduct(data.data)
      toast({
        title: "Success",
        description: "Product updated successfully"
      })
      setIsEditing(false)
      navigate("/admin/products")
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      toast({
        title: "Success",
        description: "Product deleted successfully"
      })
      navigate("/admin/products")
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive"
      })
    }
  }

  if (isLoading || !product) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/admin/products")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">
          {isEditing ? "Edit Product" : "Product Details"}
        </h1>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Product Name</Label>
              <Input
                id="title"
                value={product.title || ''}
                onChange={(e) => setProduct({ ...product, title: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={product.category_id?.toString()}
                onValueChange={(value) => setProduct({ ...product, category_id: parseInt(value) })}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={product.price || 0}
                onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={product.stock || 0}
                onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value) })}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={product.description || ''}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                disabled={!isEditing}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">Image URL</Label>
              <Input
                id="thumbnail"
                value={product.thumbnail || ''}
                onChange={(e) => setProduct({ ...product, thumbnail: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isDeleted"
                checked={!product.isDeleted}
                onCheckedChange={(checked) => setProduct({ ...product, isDeleted: !checked })}
                disabled={!isEditing}
              />
              <Label htmlFor="isDeleted">Active</Label>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setProduct(currentProduct)
                    setIsEditing(false)
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Product
                </Button>
                <Button 
                  type="button" 
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setIsEditing(true)
                  }}
                >
                  Edit Product
                </Button>
              </>
            )}
          </div>
        </form>
      </Card>
    </div>
  )
} 