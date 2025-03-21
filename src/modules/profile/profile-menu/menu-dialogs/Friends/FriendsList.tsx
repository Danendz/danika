import { RouterOutput } from "@/trpc/routers/_app"
import FriendCard from "@/modules/profile/profile-menu/menu-dialogs/Friends/FriendCard";
import FriendsTextCard from "@/modules/profile/profile-menu/menu-dialogs/Friends/FriendsTextCard";

export default function FriendsList ({list}: { list: RouterOutput['friend']['listFriends'] }) {
  if (!list.length) {
    return (
      <FriendsTextCard>No Friends :(</FriendsTextCard>
    )
  }
  return (
    <>
      {list.map(({id, user}) => (
        <FriendCard key={id} picture={user.picture} name={user.name} user_id={user.user_id} />
      ))}
    </>
  )
}
