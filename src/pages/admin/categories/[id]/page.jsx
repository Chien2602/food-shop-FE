import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Trash2 } from "lucide-react"

const mockCategory = {
  id: "1",
  name: "Electronics",
  description: "Electronic devices and accessories",
  image: "/placeholder.svg",
  isActive: true,
  productCount: 15
}

export default function AdminCategoryDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [category, setCategory] = useState(mockCategory)
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement category update
    setIsEditing(false)
  }

  const handleDelete = () => {
    // TODO: Implement category deletion
    navigate("/admin/categories")
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
        <h1 className="text-2xl font-bold">
          {isEditing ? "Edit Category" : "Category Details"}
        </h1>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                value={category.name}
                onChange={(e) => setCategory({ ...category, name: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productCount">Products</Label>
              <Input
                id="productCount"
                value={category.productCount}
                disabled
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={category.description}
                onChange={(e) => setCategory({ ...category, description: e.target.value })}
                disabled={!isEditing}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={category.image}
                onChange={(e) => setCategory({ ...category, image: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={category.isActive}
                onCheckedChange={(checked) => setCategory({ ...category, isActive: checked })}
                disabled={!isEditing}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setCategory(mockCategory)
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
                  Delete Category
                </Button>
                <Button type="button" onClick={() => setIsEditing(true)}>
                  Edit Category
                </Button>
              </>
            )}
          </div>
        </form>
      </Card>
    </div>
  )
} 