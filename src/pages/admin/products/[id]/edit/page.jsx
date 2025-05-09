"use client"

import { useState, useEffect } from "react"
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
import { useToast } from "@/components/ui/use-toast"

// Mock product data
const getProduct = (id) => {
  return {
    id: Number.parseInt(id),
    name: "Wireless Headphones",
    description:
      "Experience premium sound quality with our wireless headphones. Featuring active noise cancellation, long battery life, and comfortable ear cushions for extended listening sessions.",
    category: "Electronics",
    brand: "AudioTech",
    price: 129.99,
    comparePrice: 159.99,
    cost: 80.0,
    sku: "WH-1000X",
    inventory: 15,
    lowStockThreshold: 5,
    trackInventory: true,
    continueSellingWhenOutOfStock: false,
    status: "Active",
    features: [
      "Active Noise Cancellation",
      "40-hour battery life",
      "Bluetooth 5.0",
      "Built-in microphone",
      "Foldable design",
      "Carrying case included",
    ],
    images: [
      { id: 1, url: "/placeholder.svg?height=200&width=200" },
      { id: 2, url: "/placeholder.svg?height=200&width=200" },
      { id: 3, url: "/placeholder.svg?height=200&width=200" },
    ],
    weight: 0.25,
    dimensions: {
      length: 18,
      width: 15,
      height: 8,
    },
    shippingClass: "Standard",
    taxClass: "Standard",
    seo: {
      metaTitle: "Wireless Headphones | AudioTech",
      metaDescription:
        "Experience premium sound quality with our wireless headphones featuring active noise cancellation and 40-hour battery life.",
      metaKeywords: "wireless headphones, noise cancellation, bluetooth headphones, audiotech",
    },
  }
}

export default function EditProductPage({ params }) {
  const { toast } = useToast()
  const productId = params.id
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [images, setImages] = useState([])
  const [features, setFeatures] = useState("")

  // Fetch product data
  useEffect(() => {
    const fetchedProduct = getProduct(productId)
    setProduct(fetchedProduct)
    setImages(fetchedProduct.images || [])
    setFeatures(fetchedProduct.features.join("\n"))
    setIsLoading(false)
  }, [productId])

  const handleAddImage = () => {
    const newId = images.length > 0 ? Math.max(...images.map((img) => img.id)) + 1 : 1
    setImages([...images, { id: newId, url: "/placeholder.svg?height=200&width=200" }])
  }

  const handleRemoveImage = (id) => {
    setImages(images.filter((img) => img.id !== id))
  }

  const handleSave = () => {
    toast({
      title: "Product updated",
      description: "The product has been updated successfully.",
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link to="/admin/products" className="inline-flex items-center text-sm hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
          <h1 className="text-2xl font-bold">Edit Product</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button onClick={handleSave}>Update Product</Button>
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
                <Input id="name" defaultValue={product.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" defaultValue={product.description} className="min-h-32" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue={product.category}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Footwear">Footwear</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input id="brand" defaultValue={product.brand} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="features">Features</Label>
                <Textarea id="features" defaultValue={features} className="min-h-20" />
                <p className="text-sm text-muted-foreground">Enter each feature on a new line</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="published" defaultChecked={product.status === "Active"} />
                <Label htmlFor="published">Product is active</Label>
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
                    <Input id="price" type="number" defaultValue={product.price} className="pl-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compare-price">Compare at Price</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                    <Input id="compare-price" type="number" defaultValue={product.comparePrice} className="pl-8" />
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
                    <Input id="cost" type="number" defaultValue={product.cost} className="pl-8" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Used to calculate profit margins (not shown to customers)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax">Tax Class</Label>
                  <Select defaultValue={product.taxClass}>
                    <SelectTrigger id="tax">
                      <SelectValue placeholder="Select tax class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Reduced">Reduced Rate</SelectItem>
                      <SelectItem value="Zero">Zero Rate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                <Input id="sku" defaultValue={product.sku} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inventory">Inventory</Label>
                  <Input id="inventory" type="number" defaultValue={product.inventory} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="low-stock">Low Stock Threshold</Label>
                  <Input id="low-stock" type="number" defaultValue={product.lowStockThreshold} />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="track-inventory" defaultChecked={product.trackInventory} />
                <Label htmlFor="track-inventory">Track inventory</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="continue-selling" defaultChecked={product.continueSellingWhenOutOfStock} />
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
                <Input id="weight" type="number" defaultValue={product.weight} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length">Length (cm)</Label>
                  <Input id="length" type="number" defaultValue={product.dimensions.length} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width (cm)</Label>
                  <Input id="width" type="number" defaultValue={product.dimensions.width} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input id="height" type="number" defaultValue={product.dimensions.height} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="shipping-class">Shipping Class</Label>
                <Select defaultValue={product.shippingClass}>
                  <SelectTrigger id="shipping-class">
                    <SelectValue placeholder="Select shipping class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Express">Express</SelectItem>
                    <SelectItem value="Free">Free Shipping</SelectItem>
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
                <Input id="meta-title" defaultValue={product.seo.metaTitle} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea id="meta-description" defaultValue={product.seo.metaDescription} className="min-h-20" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-keywords">Meta Keywords</Label>
                <Input id="meta-keywords" defaultValue={product.seo.metaKeywords} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
