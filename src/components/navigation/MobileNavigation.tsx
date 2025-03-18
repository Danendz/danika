'use client';
import {CalendarIcon, HomeIcon, LanguagesIcon, MessageCircleIcon, UserIcon} from "lucide-react";
import {usePathname} from "next/navigation";
import {clsx} from "clsx";
import Link from "next/link";

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
  {
    name: 'Profile',
    Icon: UserIcon,
    to: '/profile'
  },
] as const

export const MobileNavigation = () => {
  const pathname = usePathname()

  return (
    <nav className="flex justify-center fixed bottom-3 left-0 w-full">
      <div className="container primary-px">
        <div
          className="flex border-1 rounded-xl container shadow-white/20 shadow-2xl bg-primary-foreground">
          {items.map(({name, Icon, to}) => (
            <Link key={name} href={to}
                  className={clsx("flex-1 flex justify-center py-2", to === pathname ? 'text-primary' : 'text-muted-foreground')}>
              <Icon/>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}