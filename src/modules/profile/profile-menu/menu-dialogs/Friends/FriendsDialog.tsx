"use client"
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
import {trpc} from "@/trpc/client";
import {Button} from "@/components/ui/button";
import {PlusIcon, RefreshCwIcon, UserPlus} from "lucide-react";
import FriendsLoading from "@/modules/profile/profile-menu/menu-dialogs/Friends/FriendsLoading";
import FriendsList from "@/modules/profile/profile-menu/menu-dialogs/Friends/FriendsList";
import {useMemo, useState} from "react";
import FriendAddDialog from "@/modules/profile/profile-menu/menu-dialogs/Friends/FriendAddDialog";
import DrawerDialog from "@/components/dialog/DrawerDialog";
import FriendsTextCard from "@/modules/profile/profile-menu/menu-dialogs/Friends/FriendsTextCard";
import FriendRequestsDialog from "@/modules/profile/profile-menu/menu-dialogs/Friends/FriendRequestsDialog";

export default function FriendsDialog({showFriendsDialog}: { showFriendsDialog: boolean }) {
  const {data, isLoading, isError, refetch} = trpc.friend.listFriends.useQuery(
    undefined,
    {
      enabled: showFriendsDialog
    }
  )

  const {data: friendRequests} = trpc.friendRequest.listFriendRequests.useQuery()

  const [isAddDialogVisible, setIsAddDialogVisible] = useState(false)
  const [isFriendRequestsDialogVisible, setIsFriendRequestsDialogVisible] = useState(false)

  const bodyComponent = useMemo(() => {
    if (isLoading) {
      return <FriendsLoading/>
    }

    if (isError) {
      return (
        <FriendsTextCard>
          Unable to get your friends :(
        </FriendsTextCard>
      )
    }

    if (!data) {
      return (
        <FriendsTextCard>
          Add your first friend!
        </FriendsTextCard>
      )
    }

    return <FriendsList list={data}/>
  }, [isLoading, isError, data])

  return (
    <>
      <DrawerDialog isDialogVisible={isAddDialogVisible} setIsDialogVisible={setIsAddDialogVisible}>
        <FriendAddDialog/>
      </DrawerDialog>

      <DrawerDialog isDialogVisible={isFriendRequestsDialogVisible}
                    setIsDialogVisible={setIsFriendRequestsDialogVisible}>
        <FriendRequestsDialog/>
      </DrawerDialog>

      <DrawerContent className="h-screen mt-0">
        <DrawerHeader>
          <div className="flex justify-between items-center">
            <DrawerTitle>Your friends list</DrawerTitle>
            <Button variant="ghost" size="icon" onClick={() => refetch()} disabled={isLoading}><RefreshCwIcon /></Button>
          </div>
        </DrawerHeader>
        <div className="px-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Button className="justify-start h-12" variant="secondary" onClick={() => setIsAddDialogVisible(true)}>
              <PlusIcon/>Add new friend
            </Button>

            <Button className="items-center justify-start h-12" variant="secondary"
                    onClick={() => setIsFriendRequestsDialogVisible(true)}>
              <UserPlus/>Friend requests {!!friendRequests?.length &&
                <div className="bg-red-500 rounded-full w-5 h-5">{friendRequests.length}</div>}
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            {bodyComponent}
          </div>
        </div>
        {/*<DrawerFooter>*/}
        {/*  <Button>Submit</Button>*/}
        {/*  <DrawerClose asChild>*/}
        {/*    <Button variant="outline">Cancel</Button>*/}
        {/*  </DrawerClose>*/}
        {/*</DrawerFooter>*/}
      </DrawerContent>
    </>
  )
}