import type React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageHeight?: number
}

export function SkeletonCard({ className, imageHeight = 200, ...props }: SkeletonCardProps) {
  return (
    <div className={cn("rounded-lg border bg-card overflow-hidden", className)} {...props}>
      <Skeleton className={`w-full h-[${imageHeight}px]`} />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="pt-2 flex gap-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      </div>
    </div>
  )
}
