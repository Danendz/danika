import {DrawerContent, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import {trpc} from "@/trpc/client";
import {useCallback} from "react";
import FriendsLoading from "@/modules/profile/profile-menu/menu-dialogs/friends/FriendsLoading";
import FriendsTextCard from "@/modules/profile/profile-menu/menu-dialogs/friends/FriendsTextCard";
import FriendCard from "@/modules/profile/profile-menu/menu-dialogs/friends/FriendCard";
import {Button} from "@/components/ui/button";
import {CheckIcon, RefreshCwIcon, XIcon} from "lucide-react";
import {toast} from "sonner";

export default function FriendRequestsDialog() {
  const trpcUtils = trpc.useUtils()
  const {data, isLoading, isError, refetch} = trpc.friendRequest.listFriendRequests.useQuery()
  const {
    isPending: isRejectPending,
    mutateAsync: rejectFriendRequest
  } = trpc.friendRequest.rejectFriendRequest.useMutation({
    onError: (error) => {
      toast(error.message)
    },
    onSuccess: (data) => {
      toast(`User: ${data.sender.name} successfully was rejected`)
    }
  })

  const {
    isPending: isAcceptPending,
    mutateAsync: acceptFriendRequest
  } = trpc.friendRequest.acceptFriendRequest.useMutation({
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

  const bodyComponent = () => {
    if (isLoading) {
      return <FriendsLoading/>
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
        {data.map(({id, sender: {user_id, picture, name}}) => (
          <FriendCard key={id} picture={picture} name={name} user_id={user_id} append={(
            <div className="flex gap-2">
              <Button disabled={isRejectPending || isAcceptPending} variant="icon" size="xsIcon"
                      className="bg-red-500/80 text-white" onClick={() => rejectRequest(id)}><XIcon/></Button>
              <Button disabled={isRejectPending || isAcceptPending} variant="icon" size="xsIcon"
                      className="bg-green-500/80 text-white" onClick={() => acceptRequest(id)}><CheckIcon/></Button>
            </div>
          )}/>
        ))}
      </>
    )
  }
  return (
    <DrawerContent className="h-screen">
      <DrawerHeader>
        <div className="flex justify-between items-center">
          <DrawerTitle>Friend requests</DrawerTitle>
          <Button onClick={() => refetch()} disabled={isLoading} size="icon" variant="ghost"><RefreshCwIcon /></Button>
        </div>
      </DrawerHeader>

      <div className="flex gap-2 flex-col px-4">
        {bodyComponent()}
      </div>
    </DrawerContent>
  )
}