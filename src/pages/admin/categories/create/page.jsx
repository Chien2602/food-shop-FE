"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Upload } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Cookies from "js-cookie"

export default function AdminCategoryCreate() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const token = Cookies.get('token')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [category, setCategory] = useState({
    title: "",
    description: "",
    thumbnail: ""
  })

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
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to upload image')
      }

      const data = await response.json()
      setCategory(prev => ({ ...prev, thumbnail: data.secure_url }))
      
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!category.thumbnail) {
      toast({
        title: "Error",
        description: "Please upload an image first",
        variant: "destructive"
      })
      return
    }

    try {
      setLoading(true)
      const response = await fetch('http://127.0.0.1:8000/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: category.title,
          description: category.description,
          thumbnail: category.thumbnail
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create category')
      }

      toast({
        title: "Success",
        description: "Category created successfully",
      })

      navigate("/admin/categories")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create category",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/admin/categories")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Create New Category</h1>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Category Name</Label>
              <Input
                id="title"
                value={category.title}
                onChange={(e) => setCategory({ ...category, title: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={category.description}
                onChange={(e) => setCategory({ ...category, description: e.target.value })}
                required
                rows={4}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
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
                {category.thumbnail && (
                  <img
                    src={category.thumbnail}
                    alt="Category preview"
                    className="h-10 w-10 object-cover rounded-md"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/categories")}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || uploading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Creating..." : "Create Category"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
} 