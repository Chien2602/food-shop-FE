"use client"

import React, { useState } from "react"
import { cn } from "../../lib/utils"

interface ImageZoomProps {
  src: string
  alt: string
  className?: string
  containerClassName?: string
  zoomScale?: number
}

export function ImageZoom({
  src,
  alt,
  className,
  containerClassName,
  zoomScale = 1.5,
  ...props
}: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setPosition({ x, y })
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        containerClassName
      )}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-transform duration-200",
          isZoomed && "scale-150",
          className
        )}
        style={
          isZoomed
            ? {
                transformOrigin: `${position.x}% ${position.y}%`,
                transform: `scale(${zoomScale})`,
              }
            : {}
        }
        {...props}
      />
    </div>
  )
}
