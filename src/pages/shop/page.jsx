"use client"

import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ParallaxHero } from "@/components/ui/parallax-hero"
import { ProductCard } from "@/components/product-card"
import { CategoryCard } from "@/components/category-card"
import { AnimatedButton } from "@/components/ui/animated-button"

// Mock data for featured products
const featuredProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    isNew: true,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    isNew: true,
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Footwear",
    isNew: false,
  },
  {
    id: 4,
    name: "Backpack",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    isNew: false,
  },
]

// Mock data for categories
const categories = [
  { id: 1, name: "Electronics", image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Clothing", image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Footwear", image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "Accessories", image: "/placeholder.svg?height=200&width=200" },
]

export default function ShopHomePage() {
  return (
    <div>
      {/* Hero Section */}
      <ParallaxHero backgroundImage="/placeholder.svg?height=500&width=1200" height="600px">
        <div className="container mx-auto px-4">
          <div className="max-w-lg">
            <FadeIn direction="up" delay={0.2}>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Summer Collection 2025</h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.4}>
              <p className="text-xl text-white mb-6">Discover our latest products with amazing discounts</p>
            </FadeIn>
            <FadeIn direction="up" delay={0.6}>
              <Link to="/shop/products">
                <AnimatedButton size="lg">Shop Now</AnimatedButton>
              </Link>
            </FadeIn>
          </div>
        </div>
      </ParallaxHero>

      {/* Categories Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Shop by Category</h2>
              <Link to="/shop/categories" className="text-sm font-medium flex items-center group">
                View All Categories
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <ScrollReveal key={category.id} delay={index * 0.1}>
                <CategoryCard category={category} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <Link to="/shop/products" className="text-sm font-medium flex items-center group">
                View All Products
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 0.1}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Promotion Banner */}
      <ScrollReveal>
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <FadeIn direction="up">
              <h2 className="text-3xl font-bold mb-4">Special Offer</h2>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <p className="text-xl mb-6 max-w-2xl mx-auto">
                Get 20% off on all products with code <strong>SUMMER2025</strong>
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.4}>
              <Link to="/shop/products">
                <AnimatedButton variant="secondary" size="lg">
                  Shop Now
                </AnimatedButton>
              </Link>
            </FadeIn>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}
