"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ImagePlus, Trash2 } from "lucide-react"

export default function NewProductPage() {
  const [images, setImages] = useState([
    { id: 1, url: "/placeholder.svg?height=200&width=200" },
    { id: 2, url: "/placeholder.svg?height=200&width=200" },
  ])

  const handleAddImage = () => {
    const newId = images.length > 0 ? Math.max(...images.map((img) => img.id)) + 1 : 1
    setImages([...images, { id: newId, url: "/placeholder.svg?height=200&width=200" }])
  }

  const handleRemoveImage = (id) => {
    setImages(images.filter((img) => img.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link to="/admin/products" className="inline-flex items-center text-sm hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
          <h1 className="text-2xl font-bold">Add New Product</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button>Publish Product</Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="pricing">Pricing & Inventory</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="Enter product name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter product description" className="min-h-32" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="footwear">Footwear</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input id="brand" placeholder="Enter brand name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="features">Features</Label>
                <Textarea id="features" placeholder="Enter product features (one per line)" className="min-h-20" />
                <p className="text-sm text-muted-foreground">Enter each feature on a new line</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="published" />
                <Label htmlFor="published">Publish product immediately</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Product Images</Label>
                <p className="text-sm text-muted-foreground">
                  Upload images for your product. The first image will be used as the product thumbnail.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="relative aspect-square border rounded-md overflow-hidden group">
                    <img src={image.url || "/placeholder.svg"} alt="Product" className="w-full h-full object-cover" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveImage(image.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <button
                  className="aspect-square border rounded-md flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                  onClick={handleAddImage}
                >
                  <ImagePlus className="h-8 w-8" />
                  <span className="text-sm">Add Image</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                    <Input id="price" type="number" placeholder="0.00" className="pl-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compare-price">Compare at Price</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                    <Input id="compare-price" type="number" placeholder="0.00" className="pl-8" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    To show a reduced price, set this higher than the price
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cost">Cost per Item</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                    <Input id="cost" type="number" placeholder="0.00" className="pl-8" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Used to calculate profit margins (not shown to customers)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax">Tax Class</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger id="tax">
                      <SelectValue placeholder="Select tax class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="reduced">Reduced Rate</SelectItem>
                      <SelectItem value="zero">Zero Rate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                <Input id="sku" placeholder="Enter SKU" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inventory">Inventory</Label>
                  <Input id="inventory" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="low-stock">Low Stock Threshold</Label>
                  <Input id="low-stock" type="number" placeholder="5" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="track-inventory" />
                <Label htmlFor="track-inventory">Track inventory</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="continue-selling" />
                <Label htmlFor="continue-selling">Continue selling when out of stock</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" type="number" placeholder="0.0" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length">Length (cm)</Label>
                  <Input id="length" type="number" placeholder="0.0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width (cm)</Label>
                  <Input id="width" type="number" placeholder="0.0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input id="height" type="number" placeholder="0.0" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="shipping-class">Shipping Class</Label>
                <Select>
                  <SelectTrigger id="shipping-class">
                    <SelectValue placeholder="Select shipping class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="express">Express</SelectItem>
                    <SelectItem value="free">Free Shipping</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input id="meta-title" placeholder="Enter meta title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea id="meta-description" placeholder="Enter meta description" className="min-h-20" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-keywords">Meta Keywords</Label>
                <Input id="meta-keywords" placeholder="Enter keywords separated by commas" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
