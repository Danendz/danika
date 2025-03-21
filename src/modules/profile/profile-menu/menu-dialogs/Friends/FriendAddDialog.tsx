import {DrawerContent, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {trpc} from "@/trpc/client";
import {ChangeEvent, useCallback, useMemo, useState} from "react";
import {toast} from "sonner";
import FriendLoadingCard from "@/modules/profile/profile-menu/menu-dialogs/Friends/FriendLoadingCard";
import FriendCard from "@/modules/profile/profile-menu/menu-dialogs/Friends/FriendCard";
import FriendsTextCard from "@/modules/profile/profile-menu/menu-dialogs/Friends/FriendsTextCard";
import {PlusIcon} from "lucide-react";

export default function FriendAddDialog() {
  const [search, setSearch] = useState('')
  const [lastSearch, setLastSearch] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const trpcUtils = trpc.useUtils()

  const {data, isLoading, refetch, isRefetchError} = trpc.user.searchUser.useQuery(
    {search},
    {
      enabled: false
    }
  )

  const {isPending, mutateAsync} = trpc.friendRequest.sendFriendRequest.useMutation({
    onError: error => {
      toast(error.message)
    },
    onSuccess: () => {
      toast("Friend request was sent")
      void trpcUtils.user.getCurrent.invalidate()
    }
  })

  const {data: sent_requests} = trpc.user.getCurrentUserSentRequests.useQuery()
  const {data: friends} = trpc.friend.listFriends.useQuery()

  const handleSearch = () => {
    if (!search || search.length < 3) {
      toast("Danika ID should be at least 3 characters")
      return
    }

    if (lastSearch === search) {
      return
    }

    setLastSearch(search)
    setHasSearched(true)
    void refetch()
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
    setHasSearched(false)
  }

  const handleSendRequest = useCallback(async () => {
    if (!data || isPending) return

    await mutateAsync({id: data.id})
    void trpcUtils.user.getCurrentUserSentRequests.invalidate()
  }, [data, mutateAsync, trpcUtils.user.getCurrentUserSentRequests, isPending])

  const isAlreadyRequestSent = useMemo(() => {
    if (!sent_requests || !data || !friends) {
      return true
    }

    return !!sent_requests.find(({recipient}) => recipient.id === data.id)
      || !!friends.find((friend) => friend.user.id === data.id)
  }, [sent_requests, data, friends])

  const bodyComponent = useMemo(() => {
    if (!hasSearched) {
      return (
        <FriendsTextCard>
          Find your friend
        </FriendsTextCard>
      )
    }

    if (isLoading) {
      return <FriendLoadingCard/>
    }

    if (isRefetchError) {
      return (
        <FriendsTextCard>
          Error occured while search your friend, please try again later :(
        </FriendsTextCard>
      )
    }

    if (!data) {
      return (
        <FriendsTextCard>
          Unable to find your friend :(
        </FriendsTextCard>
      )
    }

    return <FriendCard picture={data.picture} user_id={data.user_id} name={data.name} append={(
      <Button disabled={isAlreadyRequestSent || isPending} variant="icon" size="xsIcon" onClick={handleSendRequest}>
        <PlusIcon/>
      </Button>
    )}/>
  }, [isRefetchError, isLoading, data, hasSearched, isAlreadyRequestSent, handleSendRequest, isPending])

  return (
    <DrawerContent className="h-[50vh]">
      <DrawerHeader>
        <DrawerTitle>Add friend</DrawerTitle>
      </DrawerHeader>
      <div className="px-3">
        <div className="flex gap-2 items-center">
          <Input placeholder="Danika ID" onChange={handleOnChange}/>
          <Button disabled={isLoading || isPending} onClick={handleSearch}>Search</Button>
        </div>

        <div className="mt-4">
            {bodyComponent}
        </div>
      </div>
    </DrawerContent>
  )
}