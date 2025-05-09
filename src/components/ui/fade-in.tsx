"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
}

export function FadeIn({ children, className, direction = "up", delay = 0, duration = 0.5, ...props }: FadeInProps) {
  const directionVariants = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{
        opacity: 0,
        ...directionVariants[direction],
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut",
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
