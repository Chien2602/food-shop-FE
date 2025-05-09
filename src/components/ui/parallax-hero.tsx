"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParallaxHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  backgroundImage: string
  height?: string
  overlayOpacity?: number
}

export function ParallaxHero({
  children,
  className,
  backgroundImage,
  height = "500px",
  overlayOpacity = 0.4,
  ...props
}: ParallaxHeroProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5])

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)} style={{ height }} {...props}>
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          y,
          opacity,
        }}
      />
      <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
      <div className="relative h-full z-10 flex items-center">{children}</div>
    </div>
  )
}
