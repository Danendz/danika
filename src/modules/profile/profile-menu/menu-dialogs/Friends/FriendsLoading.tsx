import FriendLoadingCard from "@/modules/profile/profile-menu/menu-dialogs/Friends/FriendLoadingCard";

export default function FriendsLoading(){
  const list = new Array(8).fill(undefined)

  return (
    <>
      {list.map((_, i) => (
        <FriendLoadingCard key={i} />
      ))}
    </>
  )
}
