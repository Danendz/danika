import "./globals.css";
import {SessionProvider} from "next-auth/react";
import {TRPCProvider} from "@/trpc/client";
import {ThemeProvider} from "@/components/theme/ThemeProvider";
import {Metadata, Viewport} from "next";
import {Toaster} from "@/components/ui/sonner";
import {APP_DEFAULT_TITLE, APP_DESCRIPTION, APP_NAME, APP_TITLE_TEMPLATE} from "@/constants/app";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  description: 'Danika is the best super app',
  icons: [
    {
      sizes: '96x96',
      type: 'image/png',
      url: '/favico/favicon-96x96.png',
      href: '/favico/favicon-96x96.png',
      rel: 'icon'
    },
    {
      rel: 'icon',
      href: '/favico/favicon.svg',
      url: '/favico/favicon.svg',
      type: 'svg+xml'
    },
    {
      rel: 'shortcut icon',
      href: '/favico/favicon.ico',
      url: '/favico/favicon.ico',
    },
    {
      sizes: '180x180',
      url: '/favico/apple-touch-icon.png',
      href: '/favico/apple-touch-icon.png',
      rel: 'apple-touch-icon'
    },
  ]
}

export const viewport: Viewport = {
  themeColor: "#f8fafc",
};

export default async function RootLayout({
                                           children,
                                         }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning dir="ltr">
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
    <Toaster/>
    </body>
    </html>
  );
}
