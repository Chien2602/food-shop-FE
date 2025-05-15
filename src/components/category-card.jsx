"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

export function CategoryCard({ category, className }) {
  return (
    <Link to={`/shop/categories/${category.id}`} className="block h-full">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
        }}
        className={cn("h-full cursor-pointer", className)}
      >
        <Card className="overflow-hidden h-full rounded-2xl shadow-lg border-0 group">
          <div className="relative aspect-square">
            <motion.img
              src={category.thumbnail || "/placeholder.svg"}
              alt={category.title}
              className="object-cover w-full h-full absolute inset-0 transition-transform duration-500"
              whileHover={{ scale: 1.08 }}
            />

            {/* Gradient overlay with enhanced colors */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end transition-all duration-300 group-hover:from-black/90">
              <div className="p-5 w-full text-white">
                <motion.div
                  initial={{ opacity: 0.9, y: 5 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-1"
                >
                  <motion.h3
                    className="font-bold text-xl md:text-2xl leading-tight"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                  >
                    {category.title}
                  </motion.h3>

                  {category.products !== undefined && (
                    <p className="text-sm text-white/80 mb-2">{category.products} sản phẩm</p>
                  )}

                  {/* Added explore button that appears on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center text-sm font-medium text-white/90 group-hover:text-white mt-1 opacity-0 group-hover:opacity-100"
                  >
                    <span>Khám phá</span>
                    <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/80 rotate-45 translate-x-8 -translate-y-8"></div>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  )
}
