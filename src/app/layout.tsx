import "./globals.css";
import {SessionProvider} from "next-auth/react";
import {TRPCProvider} from "@/trpc/client";
import {ThemeProvider} from "@/components/theme/ThemeProvider";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: {
    default: 'Danika',
    template: '%s | Danika'
  }
}

export default async function RootLayout({
                                           children,
                                         }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body>
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <TRPCProvider>
          {children}
        </TRPCProvider>
      </SessionProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
