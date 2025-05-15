"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit, MoreHorizontal, Plus, Search, Trash2, Upload } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Cookies from "js-cookie"
import { Switch } from "@/components/ui/switch"
import { usePlayer } from "@/product-provider"

export default function AdminCategories() {
  const { toast } = useToast()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({
    title: "",
    description: "",
    thumbnail: "",
    status: true
  })
  const { setCategory } = usePlayer()
  const [uploading, setUploading] = useState(false)
  const token = Cookies.get('token')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('http://127.0.0.1:8000/api/admin/categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })
        
        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.status}`)
        }

        const data = await response.json()
        console.log('API Response:', data.data)

        // Validate and transform the data
        let categoriesData = []
        if (Array.isArray(data)) {
          categoriesData = data
        } else if (data && typeof data === 'object') {
          if (Array.isArray(data.data.data)) {
            categoriesData = data.data.data
          } else if (data.categories && Array.isArray(data.categories)) {
            categoriesData = data.categories
          }
        }

        // Ensure each category has required fields
        categoriesData = categoriesData.map(category => ({
          id: category.id || Math.random().toString(),
          title: category.title || category.name || '',
          description: category.description || '',
          thumbnail: category.thumbnail || category.image || '',
          status: category.status ?? true
        }))

        setCategories(categoriesData)
      } catch (err) {
        console.error('Error fetching categories:', err)
        setError(err.message)
        toast({
          title: "Error",
          description: "Failed to fetch categories: " + err.message,
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [token, toast])

  // Ensure categories is always an array before filtering
  const filteredCategories = Array.isArray(categories) 
    ? categories.filter(category =>
        category.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const handleAddCategory = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://127.0.0.1:8000/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newCategory.title,
          description: newCategory.description,
          thumbnail: newCategory.thumbnail,
          status: newCategory.status
        })
      })

      if (!response.ok) {
        throw new Error(`Failed to add category: ${response.status}`)
      }

      const data = await response.json()
      console.log('Add Category Response:', data)

      const newCategoryData = {
        id: data.id || data.data?.id || Math.random().toString(),
        title: data.title || data.data?.title || newCategory.title,
        description: data.description || data.data?.description || newCategory.description,
        thumbnail: data.thumbnail || data.data?.thumbnail || newCategory.thumbnail,
        status: data.status ?? data.data?.status ?? newCategory.status
      }

      setCategories(prevCategories => {
        const currentCategories = Array.isArray(prevCategories) ? prevCategories : []
        return [...currentCategories, newCategoryData]
      })
      
      toast({
        title: "Category added",
        description: `Category "${newCategory.title}" has been added successfully.`,
      })

      setNewCategory({
        title: "",
        description: "",
        thumbnail: "",
        status: true
      })
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error('Error adding category:', error)
      toast({
        title: "Error",
        description: "Failed to add category: " + error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCategory = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete category')
      }

      setCategories(categories.filter(category => category.id !== id))
      
      toast({
        title: "Category deleted",
        description: "The category has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive"
      })
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setUploading(true)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'foodShop')

      const response = await fetch('https://api.cloudinary.com/v1_1/dxkqibtzv/image/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to upload image')
      }

      const data = await response.json()
      setNewCategory(prev => ({ ...prev, thumbnail: data.secure_url }))
      
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      })
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">Loading categories...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    )
  }

  const handleEditCategory = (category) => {
    setCategory(category)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    {category.thumbnail ? (
                      <img
                        src={category.thumbnail}
                        alt={category.title}
                        className="h-10 w-10 object-cover rounded-md"
                      />
                    ) : (
                      <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No image</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{category.title}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <Badge
                      variant={category.status ? "default" : "secondary"}
                    >
                      {category.status ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild onClick={() => handleEditCategory(category)}>
                          <Link to={`/admin/categories/${category.id}`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Fill in the details for the new category.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Name</Label>
              <Input
                id="title"
                value={newCategory.title}
                onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="thumbnail">Category Image</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={loading || uploading}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('thumbnail').click()}
                  disabled={loading || uploading}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? "Uploading..." : "Upload Image"}
                </Button>
                {newCategory.thumbnail && (
                  <img
                    src={newCategory.thumbnail}
                    alt="Category preview"
                    className="h-10 w-10 object-cover rounded-md"
                  />
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="status"
                checked={newCategory.status}
                onCheckedChange={(checked) => setNewCategory({ ...newCategory, status: checked })}
                disabled={loading}
              />
              <Label htmlFor="status">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddCategory}
              disabled={loading || uploading || !newCategory.thumbnail}
            >
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
