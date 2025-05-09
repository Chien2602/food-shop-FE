"use client"

import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, Truck, ShieldCheck, ArrowLeft, Heart, Minus, Plus, Share2, ShoppingCart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { FadeIn } from "@/components/ui/fade-in"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ImageZoom } from "@/components/ui/image-zoom"
import { AnimatedButton } from "@/components/ui/animated-button"
import { ProductCard } from "@/components/product-card"
import { Card } from "@/components/ui/card"

// This would normally come from a database
const getProduct = (id) => {
  return {
    id: Number.parseInt(id),
    name: "Premium Wireless Headphones",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.5,
    reviewCount: 127,
    description:
      "Experience premium sound quality with our wireless headphones. Featuring active noise cancellation, long battery life, and comfortable ear cushions for extended listening sessions.",
    features: [
      "Active Noise Cancellation",
      "40-hour battery life",
      "Bluetooth 5.0",
      "Built-in microphone",
      "Foldable design",
      "Carrying case included",
    ],
    specifications: {
      Brand: "AudioTech",
      Model: "WH-1000X",
      Color: "Black",
      Connectivity: "Bluetooth 5.0",
      "Battery Life": "Up to 40 hours",
      Weight: "250g",
      Charging: "USB-C",
      Warranty: "2 years",
    },
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    stock: 15,
    category: "Electronics",
    isNew: true,
    relatedProducts: [
      {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "Electronics",
      },
      {
        id: 5,
        name: "Smartphone",
        price: 699.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "Electronics",
      },
      {
        id: 6,
        name: "Laptop",
        price: 1299.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "Electronics",
      },
    ],
  }
}

export default function ShopProductDetail() {
  const { id } = useParams()
  const product = getProduct(id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <FadeIn>
        <Link to="/shop/products" className="inline-flex items-center text-sm mb-6 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <FadeIn>
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden border">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full w-full"
                >
                  <ImageZoom
                    src={product.images[selectedImage] || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                    zoomScale={1.5}
                  />
                </motion.div>
              </AnimatePresence>
              {product.isNew && <Badge className="absolute top-4 left-4 z-10">New</Badge>}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative aspect-square rounded-md overflow-hidden border cursor-pointer ${
                    selectedImage === index ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Product Info */}
        <div>
          <FadeIn direction="right">
            <div className="mb-6">
              <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : i < product.rating
                            ? "text-yellow-400 fill-yellow-400 opacity-50"
                            : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              <motion.div
                className="flex items-baseline gap-2 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.originalPrice && (
                  <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                )}
              </motion.div>

              <motion.p
                className="text-muted-foreground mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {product.description}
              </motion.p>

              <motion.div
                className="space-y-4 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                  <span>2-year warranty included</span>
                </div>
              </motion.div>

              <motion.div
                className="border-t border-b py-4 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Availability:</span>
                  <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                    {product.stock > 0 ? `In Stock (${product.stock} left)` : "Out of Stock"}
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-md">
                    <Button variant="ghost" size="icon" className="rounded-none" onClick={decreaseQuantity}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button variant="ghost" size="icon" className="rounded-none" onClick={increaseQuantity}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <AnimatedButton className="flex-1">Add to Cart</AnimatedButton>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="outline" size="icon">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Product Details Tabs */}
      <ScrollReveal>
        <Tabs defaultValue="details" className="mb-12">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
            <TabsTrigger
              value="details"
              className="rounded-none py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="rounded-none py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Reviews ({product.reviewCount})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                {product.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    className="flex border-b pb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span className="font-medium w-1/3">{key}:</span>
                    <span className="w-2/3">{value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-5xl font-bold">{product.rating}</div>
                  <div className="flex justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : i < product.rating
                              ? "text-yellow-400 fill-yellow-400 opacity-50"
                              : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Based on {product.reviewCount} reviews</div>
                </div>
                <div className="flex-1">
                  {/* Placeholder for review distribution bars */}
                  <div className="space-y-1">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-sm w-6">{star} ★</span>
                        <div className="h-2 bg-muted rounded-full flex-1 overflow-hidden">
                          <motion.div
                            className="h-full bg-yellow-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 5 : star === 2 ? 3 : 2}%`,
                            }}
                            transition={{ duration: 1, delay: 0.2 }}
                          ></motion.div>
                        </div>
                        <span className="text-sm w-8 text-right">
                          {star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 5 : star === 2 ? 3 : 2}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <AnimatedButton>Write a Review</AnimatedButton>

              {/* Sample reviews */}
              <div className="space-y-6 mt-8">
                {[1, 2, 3].map((review) => (
                  <motion.div
                    key={review}
                    className="border-b pb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: review * 0.1 }}
                  >
                    <div className="flex justify-between mb-2">
                      <h4 className="font-semibold">John Doe</h4>
                      <span className="text-sm text-muted-foreground">2 weeks ago</span>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p>
                      These headphones are amazing! The sound quality is excellent and the noise cancellation works
                      perfectly. Battery life is impressive and they're very comfortable to wear for long periods.
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </ScrollReveal>

      {/* Related Products */}
      <ScrollReveal>
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={relatedProduct} />
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
