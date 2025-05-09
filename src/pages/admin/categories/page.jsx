"use client"

import { useState } from "react"
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
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock data for categories
const mockCategories = [
  {
    id: "1",
    name: "Electronics",
    productCount: 15,
    status: "active"
  },
  {
    id: "2",
    name: "Clothing",
    productCount: 25,
    status: "active"
  },
  {
    id: "3",
    name: "Books",
    productCount: 10,
    status: "inactive"
  }
]

export default function AdminCategories() {
  const { toast } = useToast()
  const [categories] = useState(mockCategories)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    description: "",
  })

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddCategory = () => {
    // In a real app, this would be an API call
    toast({
      title: "Category added",
      description: `Category "${newCategory.name}" has been added successfully.`,
    })

    // Reset form and close dialog
    setNewCategory({
      name: "",
      slug: "",
      description: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleDeleteCategory = (id) => {
    // In a real app, this would be an API call
    toast({
      title: "Category deleted",
      description: "The category has been deleted successfully.",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button asChild>
          <Link to="/admin/categories/create">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Link>
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
                <TableHead>Name</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.productCount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={category.status === "active" ? "default" : "secondary"}
                    >
                      {category.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/categories/${category.id}`}>
                        Edit
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
