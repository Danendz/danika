import {Skeleton} from "@/components/ui/skeleton";

export const ProfileCardLoader = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="relative flex-1">
        <div className="h-[180px]">
          <Skeleton
            className="h-full w-full rounded-b-sm"
          />
        </div>
        <div className="absolute md:-left-1 -bottom-9 z-10 left-0">
          <div className="relative w-[100px] h-[100px]">
            <Skeleton className="rounded-full w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  )
}