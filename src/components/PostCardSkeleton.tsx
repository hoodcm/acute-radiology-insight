
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function PostCardSkeleton() {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4">
      <div className="bg-card rounded-lg shadow-lg dark:shadow-2xl overflow-hidden border border-border flex flex-col justify-between">
        <Skeleton className="aspect-video w-full" />
        <div className="p-4 md:p-5 flex flex-col flex-1">
          <Skeleton className="h-7 w-3/4 mb-2" />
          <div className="space-y-2 mb-auto">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-12 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
