import "./globals.css";
import {SessionProvider} from "next-auth/react";
import {TRPCProvider} from "@/trpc/client";

export default async function RootLayout({
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
