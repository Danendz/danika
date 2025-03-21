import {DrawerContent, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import {trpc} from "@/trpc/client";
import {useCallback, useMemo} from "react";
import FriendsLoading from "@/modules/profile/profile-menu/menu-dialogs/Friends/FriendsLoading";
import FriendsTextCard from "@/modules/profile/profile-menu/menu-dialogs/Friends/FriendsTextCard";
import FriendCard from "@/modules/profile/profile-menu/menu-dialogs/Friends/FriendCard";
import {Button} from "@/components/ui/button";
import {CheckIcon, XIcon} from "lucide-react";
import {toast} from "sonner";

export default function FriendRequestsDialog() {
  const trpcUtils = trpc.useUtils()
  const {data, isLoading, isError, refetch} = trpc.friendRequest.listFriendRequests.useQuery()
  const {mutateAsync: rejectFriendRequest} = trpc.friendRequest.rejectFriendRequest.useMutation({
    onError: (error) => {
      toast(error.message)
    },
    onSuccess: (data) => {
      toast(`User: ${data.sender.name} successfully was rejected`)
    }
  })

  const {mutateAsync: acceptFriendRequest} = trpc.friendRequest.acceptFriendRequest.useMutation({
    onError: (error) => {
      toast(error.message)
    },
    onSuccess: (data) => {
      toast(`User: ${data.user.name} successfully added to your friend list!`)
    }
  })

  const rejectRequest = useCallback(async (id: string) => {
    await rejectFriendRequest({request_id: id})
    void refetch()
    void trpcUtils.friend.invalidate()
  }, [rejectFriendRequest, refetch, trpcUtils.friend])

  const acceptRequest = useCallback(async (id: string) => {
    await acceptFriendRequest({request_id: id})
    void refetch()
    void trpcUtils.friend.invalidate()
  }, [acceptFriendRequest, refetch, trpcUtils.friend])

  const bodyComponent = useMemo(() => {
    if (isLoading) {
      return <FriendsLoading />
    }

    if (isError) {
      return (
        <FriendsTextCard>
          Unable to get your friend requests :(
        </FriendsTextCard>
      )
    }

    if (!data?.length) {
      return (
        <FriendsTextCard>
          No friend requests arrived yet!
        </FriendsTextCard>
      )
    }

    return (
      <>
        {data.map(({id,  sender: {user_id,  picture, name}}) => (
          <FriendCard key={id} picture={picture} name={name} user_id={user_id} append={(
            <div className="flex gap-2">
              <Button variant="icon" size="xsIcon" className="bg-red-500/80 text-white" onClick={() => rejectRequest(id)}><XIcon/></Button>
              <Button variant="icon" size="xsIcon" className="bg-green-500/80 text-white" onClick={() => acceptRequest(id)}><CheckIcon /></Button>
            </div>
          )} />
        ))}
      </>
    )
  }, [isLoading, isError, data, rejectRequest, acceptRequest])
  return (
    <DrawerContent className="h-screen">
      <DrawerHeader>
        <DrawerTitle>Friend requests</DrawerTitle>
      </DrawerHeader>

      <div className="px-4">
        {bodyComponent}
      </div>
    </DrawerContent>
  )
}