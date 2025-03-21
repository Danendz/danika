import {Avatar} from "@/components/ui/avatar";
import {ImageAsync} from "@/components/shared/image-async/ImageAsync";
import {ReactNode} from "react";

interface Props {
  picture: string | null,
  name: string,
  user_id: string | null
  append?: ReactNode
}

export default function FriendCard({picture, name, user_id, append}: Props) {
  return (
    <div className="w-full h-14 bg-primary-foreground rounded">
      <div className="flex h-full primary-px gap-2 items-center">
        <div className="flex items-center">
          <Avatar className="w-10 h-10">
            <ImageAsync src={picture ?? 'no-image'} alt="friend's avatar" width={40} height={40}/>
          </Avatar>
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-bold" style={{lineHeight: 'normal'}}>
            {name}
          </div>
          <div className="text-xs">
            DanikaID: {user_id}
          </div>
        </div>

        <div className="flex items-center ml-auto">
          {append}
        </div>
      </div>
    </div>
  )
}