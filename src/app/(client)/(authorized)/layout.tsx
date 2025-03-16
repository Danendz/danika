import {MobileNavigation} from "@/components/navigation/MobileNavigation";

export default function Layout({
                                 children,
                               }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <main>
        {children}
      </main>
      <MobileNavigation/>
    </div>
  );
}
