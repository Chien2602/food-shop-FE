"use client"

import { useEffect, useState } from "react"
// import Image from "next/image"
import {Link, useNavigate} from "react-router"
import { ArrowRight, Loader2, Heart, ShoppingCart, Star, Tag, ChevronRight } from "lucide-react"
import Cookies from "js-cookie"

import { FadeIn } from "@/components/ui/fade-in"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ParallaxHero } from "@/components/ui/parallax-hero"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {usePlayer} from "../../product-provider"

export default function ShopHomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const {setCurrentProduct} = usePlayer()
  const navigate = useNavigate()

  // Get token from cookie
  const token = Cookies.get("token")

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products data
        const productsRes = await fetch("http://127.0.0.1:8000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        // Check if request was successful
        if (!productsRes.ok) {
          throw new Error(`Failed to fetch products: ${productsRes.statusText}`)
        }

        const productsData = await productsRes.json()
        setFeaturedProducts(productsData.data.products.data.slice(0, 4))
        console.log(productsData.data.products.data)

        // Fetch categories data
        const categoriesRes = await fetch("http://127.0.0.1:8000/api/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        // Check if request was successful
        if (!categoriesRes.ok) {
          throw new Error(`Failed to fetch categories: ${categoriesRes.statusText}`)
        }

        const categoriesData = await categoriesRes.json()
        setCategories(categoriesData.data.data)
        console.log(categoriesData.data.data)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [token])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading shop data...</p>
        </div>
      </div>
    )
  }

  const handleClickProduct = (product) => {
    setCurrentProduct(product);
    navigate(`/shop/products/${product.id}`)
  }

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <ParallaxHero className="rounded-2xl mt-10 mx-5" height="600px">
        <div className="container mx-auto px-4">
          <div className="max-w-lg">
            <FadeIn direction="up" delay={0.2}>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Delicious Food Collection</h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.4}>
              <p className="text-xl text-white mb-6">Discover our fresh and tasty dishes with amazing discounts</p>
            </FadeIn>
            <FadeIn direction="up" delay={0.6}>
              <Link to="/shop/products">
                <AnimatedButton size="lg">Order Now</AnimatedButton>
              </Link>
            </FadeIn>
          </div>
        </div>
      </ParallaxHero>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Food Categories</h2>
              <Link
                to="/shop/categories"
                className="text-sm font-medium flex items-center group hover:text-primary transition-colors"
              >
                View All Categories
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories?.map((category, index) => (
              <ScrollReveal key={category.id} delay={index * 0.1}>
                <Link to={`/shop/categories/${category.id}`} className="group">
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/80 to-primary shadow-lg transition-all duration-300 hover:shadow-xl group-hover:scale-[1.02]">
                    <div className="aspect-square p-6 flex flex-col justify-between">
                      {category.thumbnail ? (
                        <div className="absolute inset-0 opacity-20">
                          <img
                            src={category.thumbnail || "/placeholder.svg"}
                            alt={category.title}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-primary/10"></div>
                      )}
                      <div className="relative z-10">
                        <Tag className="h-10 w-10 text-white mb-2" />
                      </div>
                      <div className="relative z-10 text-white">
                        <h3 className="text-xl font-bold mb-1 line-clamp-2">{category.title}</h3>
                        <div className="flex items-center mt-2 group-hover:translate-x-1 transition-transform">
                          <span className="text-sm">Explore</span>
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
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
              <h2 className="text-3xl font-bold">Popular Dishes</h2>
              <Link
                to="/shop/products"
                className="text-sm font-medium flex items-center group hover:text-primary transition-colors"
              >
                View All Dishes
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 0.1}>
                <div onClick={() => handleClickProduct(product)} className="group relative bg-white dark:bg-gray-950 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden">
                    {product.thumbnail ? (
                      <img
                        src={product.thumbnail || "/placeholder.svg"}
                        alt={product.title}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">No image</span>
                      </div>
                    )}

                    {/* Discount Badge */}
                    {product.discount > 0 && (
                      <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">-{product.discount}%</Badge>
                    )}

                    {/* Quick Actions */}
                    <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <Button size="icon" variant="secondary" className="rounded-full h-9 w-9 shadow-md">
                        <Heart className="h-4 w-4" />
                        <span className="sr-only">Add to wishlist</span>
                      </Button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <Link href={`/shop/products/${product.id}`}>
                      <h3 className="font-medium text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                    </Link>

                    {/* Category
                    {product.category && (
                      <div className="text-xs text-muted-foreground mb-2">{product.category.name}</div>
                    )} */}

                    {/* Rating
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3.5 w-3.5 ${
                              star <= (product.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground ml-1">({product.rating_count || 0})</span>
                    </div> */}

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      {product.discount > 0 ? (
                        <>
                          <span className="font-bold text-primary">
                            ${(Number(product.price) * (1 -Number( product.discount) / 100)).toFixed(2)}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            ${Number(product.price).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="font-bold text-primary">${Number(product.price).toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="px-4 pb-4">
                    <Button 
                      className="w-full group-hover:bg-primary/90 transition-colors"
                      onClick={() => handleClickProduct(product)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Promotion Banner */}
      <ScrollReveal>
        <section className="py-16 bg-primary text-primary-foreground rounded-lg mx-4 md:mx-8">
          <div className="container mx-auto px-4 text-center">
            <FadeIn direction="up">
              <h2 className="text-3xl font-bold mb-4">Special Food Offer</h2>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <p className="text-xl mb-6 max-w-2xl mx-auto">
                Get 20% off on all dishes with code{" "}
                <strong className="bg-primary-foreground/20 px-2 py-1 rounded">FOOD2024</strong>
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.4}>
              <Link to="/shop/products">
                <AnimatedButton variant="secondary" size="lg">
                  Order Now
                </AnimatedButton>
              </Link>
            </FadeIn>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}
