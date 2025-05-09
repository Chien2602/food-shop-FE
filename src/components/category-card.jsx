"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function CategoryCard({ category, className }) {
  return (
    <Link to={`/shop/categories/${category.id}`}>
      <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
        <Card className={cn("overflow-hidden h-full", className)}>
          <div className="aspect-square relative">
            <img 
              src={category.image || "/placeholder.svg"} 
              alt={category.name} 
              className="object-cover w-full h-full absolute inset-0" 
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end"
              whileHover={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}
            >
              <div className="p-4 w-full text-white">
                <motion.h3
                  className="font-semibold text-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {category.name}
                </motion.h3>
                {category.products !== undefined && (
                  <p className="text-sm text-white/80">{category.products} products</p>
                )}
              </div>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </Link>
  )
}
