import {Skeleton} from "@/components/ui/skeleton";

export default function FriendLoadingCard () {
  return (
    <Skeleton className="w-full h-12">
      <div className="flex h-full primary-px gap-2 py-1.5">
        <div className="flex items-center">
          <Skeleton className="w-10 h-10 rounded-full bg-primary-foreground"/>
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-25 h-4 bg-primary-foreground"/>
          <Skeleton className="w-20 h-3 bg-primary-foreground"/>
        </div>
      </div>
    </Skeleton>
  )
}