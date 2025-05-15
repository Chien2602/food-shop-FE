"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Cookies from "js-cookie"
import { usePlayer } from "@/product-provider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AdminProducts() {
  const { toast } = useToast()
  const { setCurrentProduct } = usePlayer()
  const token = Cookies.get('token')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState({})
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10
  })

  const handleEdit = (product) => {
    setCurrentProduct(product)
  }

  const fetchProducts = async (page = 1) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/products?page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()
      const products = data.data.data || []
      const productsData = Array.isArray(products) ? products : []
      setProducts(productsData)
      setPagination({
        current_page: data.data.current_page || 1,
        last_page: data.data.last_page || 1,
        total: data.data.total || 0,
        per_page: data.data.per_page || 10
      })
    } catch (err) {
      setError(err.message)
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive"
      })
    }
  }

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
        const categories = data.data.data || []
        const categoriesMap = {}
        categories.forEach(category => {
          if (category && category.id) {
            categoriesMap[category.id] = category
          }
        })
        setCategories(categoriesMap)
      } catch (err) {
        console.error('Error fetching categories:', err)
      }
    }

    fetchCategories()
    fetchProducts()
  }, [token, toast])

  const getCategoryName = (categoryId) => {
    if (!categoryId || !categories[categoryId]) {
      return 'Uncategorized'
    }
    return categories[categoryId].title || 'Uncategorized'
  }

  const filteredProducts = products.filter(product => {
    if (!product) return false
    
    const productTitle = product.title || ''
    const categoryName = getCategoryName(product.category_id)
    const searchLower = searchQuery.toLowerCase()

    const matchesSearch = productTitle.toLowerCase().includes(searchLower) ||
                         categoryName.toLowerCase().includes(searchLower)
    
    const matchesCategory = selectedCategory === 'all' || 
                          categoryName === selectedCategory

    console.log('Product:', {
      title: productTitle,
      categoryName,
      selectedCategory,
      matchesCategory
    })

    return matchesSearch && matchesCategory
  })

  console.log('Selected Category:', selectedCategory)
  console.log('Categories:', categories)

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      fetchProducts(newPage)
    }
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button asChild>
          <Link to="/admin/products/create">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={selectedCategory} onValueChange={(value) => {
            console.log('Category selected:', value)
            setSelectedCategory(value)
          }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {Object.values(categories).map((category) => (
                <SelectItem key={category.id} value={category.title}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="w-12 h-12 relative">
                      <img
                        src={product.thumbnail || '/placeholder.png'}
                        alt={product.title}
                        className="object-cover rounded-md w-full h-full"
                        onError={(e) => {
                          e.target.src = '/placeholder.png'
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.title || 'Unnamed'}</TableCell>
                  <TableCell>{getCategoryName(product.category_id)}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(product.price || 0)}
                  </TableCell>
                  <TableCell>{product.stock || 0}</TableCell>
                  <TableCell>
                    <Badge
                      variant={product.isDeleted ? "secondary" : "default"}
                    >
                      {product.isDeleted ? "Inactive" : "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      asChild
                      onClick={() => handleEdit(product)}
                    >
                      <Link to={`/admin/products/${product.id}`}>
                        Edit
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Showing {((pagination.current_page - 1) * pagination.per_page) + 1} to {Math.min(pagination.current_page * pagination.per_page, pagination.total)} of {pagination.total} products
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              Page {pagination.current_page} of {pagination.last_page}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.current_page + 1)}
              disabled={pagination.current_page === pagination.last_page}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
