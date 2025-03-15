import "./globals.css";
import {SessionProvider} from "next-auth/react";
import {TRPCProvider} from "@/plugins/trpc/client";

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
    <SessionProvider>
      <TRPCProvider>
        {children}
      </TRPCProvider>
    </SessionProvider>
    </body>
    </html>
  );
}
