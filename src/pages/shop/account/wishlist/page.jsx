import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { ProductCard } from "@/components/product-card"
import { Heart, ShoppingBag } from "lucide-react"

const mockWishlist = [
  {
    id: "1",
    name: "Premium Headphones",
    price: 199.99,
    image: "/placeholder.svg",
    category: "Electronics"
  },
  {
    id: "2",
    name: "Wireless Mouse",
    price: 49.99,
    image: "/placeholder.svg",
    category: "Electronics"
  },
  {
    id: "3",
    name: "Mechanical Keyboard",
    price: 129.99,
    image: "/placeholder.svg",
    category: "Electronics"
  }
]

export default function AccountWishlist() {
  const [wishlist, setWishlist] = useState(mockWishlist)

  const handleRemoveFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id))
  }

  const handleAddToCart = (id) => {
    // TODO: Implement add to cart functionality
    console.log("Add to cart:", id)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Wishlist</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Heart className="h-5 w-5" />
          <span>{wishlist.length} items</span>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <Card className="p-8 text-center">
          <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground mb-4">
            Save items you like by clicking the heart icon
          </p>
          <Button asChild>
            <Link to="/shop/products">Browse Products</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="aspect-square relative mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full rounded-lg"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => handleRemoveFromWishlist(item.id)}
                >
                  <Heart className="h-5 w-5 fill-current" />
                </Button>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  {item.category}
                </div>
                <h3 className="font-semibold">{item.name}</h3>
                <div className="font-bold">${item.price.toFixed(2)}</div>
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="default"
                    className="w-full"
                    size="sm"
                    onClick={() => handleAddToCart(item.id)}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    size="sm"
                    asChild
                  >
                    <Link to={`/shop/products/${item.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 