import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@radix-ui/react-separator';
import React from 'react'

const FoodCardsSkeleton = () => {
    const skeletonCards = Array(12).fill(null);
  return (
    <>
      {skeletonCards.map((_,index)=>(
        <div key={index} className="flex flex-col gap-3 rounded-lg border p-7">
            <div className='flex justify-between'>
                <Skeleton className='h-5 w-24'/>
                <div className='flex gap-1'>
                    <Skeleton className='size-6'/>
                    <Skeleton className='size-6'/>
                </div>
            </div>
            <Separator/>
            <div className="grid grid-cols-2 gap-5">
            <div>
              <Skeleton className="mb-1 h-4 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div>
              <Skeleton className="mb-1 h-4 w-24" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div>
              <Skeleton className="mb-1 h-4 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div>
              <Skeleton className="mb-1 h-4 w-12" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default FoodCardsSkeleton
