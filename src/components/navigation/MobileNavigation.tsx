'use client';
import {CalendarIcon, HomeIcon, LanguagesIcon, MessageCircleIcon} from "lucide-react";
import {usePathname} from "next/navigation";
import {clsx} from "clsx";
import Link from "next/link";
import {useSession} from "next-auth/react";

const items = [
  {
    name: 'Home',
    Icon: HomeIcon,
    to: '/'
  },
  {
    name: 'Messenger',
    Icon: MessageCircleIcon,
    to: '/chat'
  },
  {
    name: 'Translator',
    Icon: LanguagesIcon,
    to: '/translate'
  },
  {
    name: 'Calendar',
    Icon: CalendarIcon,
    to: '/calendar'
  },
] as const

export const MobileNavigation = () => {
  const pathname = usePathname()
  const session = useSession()

  if (session.status !== 'authenticated')
  {
    return (<></>)
  }

  return (
    <nav className="fixed bottom-0 left-0 w-full">
      <div className="flex">
        {items.map(({name, Icon, to}) => (
          <Link key={name} href={to} className={clsx("flex-1 flex justify-center border-t-1 p-2 ", to === pathname ? 'text-blue-600' : 'text-blue-400')}>
            <Icon/>
          </Link>
        ))}
      </div>
    </nav>
  )
}