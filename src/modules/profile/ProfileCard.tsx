"use client"
import {Avatar} from "@/components/ui/avatar";
import {trpc} from "@/plugins/trpc/client";

export const ProfileCard = () => {
  const [data] = trpc.user.getCurrent.useSuspenseQuery()
  return (
    <div>
      <Avatar>
        {/*TODO: image*/}
        {/*<AvatarImage />*/}
        {data?.username}
      </Avatar>
    </div>
  )
}