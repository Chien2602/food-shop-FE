"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Save, Trash2, Upload, ImageIcon, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Cookies from "js-cookie"
import { usePlayer } from "@/product-provider"

export default function AdminCategoryDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const token = Cookies.get("token")
  const { category, updateCategory, deleteCategory } = usePlayer()

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedCategory, setEditedCategory] = useState(category)

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
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
      setEditedCategory((prev) => ({ ...prev, thumbnail: data.secure_url }))

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await fetch(`http://127.0.0.1:8000/api/admin/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editedCategory.title,
          description: editedCategory.description,
          thumbnail: editedCategory.thumbnail,
          status: editedCategory.status,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update category")
      }

      const data = await response.json()
      updateCategory(id, data)
      toast({
        title: "Success",
        description: "Category updated successfully",
      })
      navigate("/admin/categories")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update category",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setLoading(true)
      await deleteCategory(id)
      toast({
        title: "Success",
        description: "Category deleted successfully",
      })
      navigate("/admin/categories")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setShowDeleteDialog(false)
    }
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={() => navigate("/admin/categories")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Categories
        </Button>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">Loading category details...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/categories")}
            aria-label="Back to categories"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{isEditing ? "Edit Category" : "Category Details"}</h1>
        </div>

        {!isEditing && !loading && <Button onClick={() => setIsEditing(true)}>Edit Category</Button>}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {category.thumbnail ? (
              <img
                src={category.thumbnail || "/placeholder.svg"}
                alt={category.title}
                className="h-8 w-8 rounded-md object-cover"
              />
            ) : (
              <div className="h-8 w-8 bg-muted rounded-md flex items-center justify-center">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
            {loading ? <Skeleton className="h-8 w-48" /> : category.title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Category Name</Label>
                {loading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Input
                    id="title"
                    value={editedCategory.title}
                    onChange={(e) => setEditedCategory({ ...editedCategory, title: e.target.value })}
                    disabled={!isEditing || loading}
                    placeholder="Enter category name"
                    required
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="flex items-center gap-2">
                  Status
                  {loading ? (
                    <Skeleton className="h-5 w-10" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Switch
                        id="status"
                        checked={editedCategory.status}
                        onCheckedChange={(checked) => setEditedCategory({ ...editedCategory, status: checked })}
                        disabled={!isEditing || loading}
                      />
                      <span className={`text-sm ${editedCategory.status ? "text-green-600" : "text-red-600"}`}>
                        {editedCategory.status ? "Active" : "Inactive"}
                      </span>
                    </div>
                  )}
                </Label>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                {loading ? (
                  <Skeleton className="h-24 w-full" />
                ) : (
                  <Textarea
                    id="description"
                    value={editedCategory.description}
                    onChange={(e) => setEditedCategory({ ...editedCategory, description: e.target.value })}
                    disabled={!isEditing || loading}
                    placeholder="Enter category description"
                    rows={4}
                  />
                )}
              </div>

              <div className="space-y-3 md:col-span-2">
                <Label>Category Image</Label>
                {loading ? (
                  <Skeleton className="h-40 w-full" />
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <Input
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={!isEditing || loading || uploading}
                        className="hidden"
                      />
                      {isEditing && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("thumbnail")?.click()}
                          disabled={loading || uploading}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {uploading ? "Uploading..." : "Upload Image"}
                        </Button>
                      )}
                    </div>

                    {editedCategory.thumbnail ? (
                      <div className="relative border rounded-md overflow-hidden w-full max-w-md h-40">
                        <img
                          src={editedCategory.thumbnail || "/placeholder.svg"}
                          alt="Category preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center border border-dashed rounded-md w-full max-w-md h-40 bg-muted/20">
                        <div className="text-center text-muted-foreground">
                          <ImageIcon className="h-10 w-10 mx-auto mb-2" />
                          <p>No image uploaded</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-end gap-2 pt-4 border-t">
          {isEditing ? (
            <>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)} disabled={loading}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={loading || uploading}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button type="button" variant="destructive" onClick={() => setShowDeleteDialog(true)} disabled={loading}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Category
              </Button>
            </>
          )}
        </CardFooter>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the category and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
