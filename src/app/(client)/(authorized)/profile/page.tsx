import {ProfileCard} from "@/modules/profile/profile-card/ProfileCard";
import {ProfileMenu} from "@/modules/profile/profile-menu/ProfileMenu";

export default async function Page() {
  return (
    <div>
      <ProfileCard/>
      <ProfileMenu />
    </div>
  )
}