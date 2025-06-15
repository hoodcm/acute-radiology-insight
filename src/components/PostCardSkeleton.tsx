
import { Skeleton } from "@/components/ui/skeleton"

export function PostCardSkeleton() {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-3">
      <div className="bg-card rounded-lg overflow-hidden border border-border">
        <Skeleton className="aspect-video w-full" />
        <div className="p-md md:p-lg">
          <Skeleton className="h-7 w-3/4 mb-sm" />
          <div className="space-y-2 mb-md">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-sm">
              <Skeleton className="h-6 w-12 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    </div>
  )
}
