import {MobileNavigation} from "@/components/navigation/MobileNavigation";

export default function Layout({
                                 children,
                               }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex justify-center">
      <main className="container mobile-nav-offset-pb">
        {children}
      </main>
      <MobileNavigation/>
    </div>
  );
}
