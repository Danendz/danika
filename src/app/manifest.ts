import {MetadataRoute} from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Danika App',
    short_name: 'Danika',
    description: 'Danika App is a super app!',
    start_url: '/',
    display: 'standalone',
    background_color: "#020817",
    theme_color: "#f8fafc",
    icons: [
      {
        src: '/favico/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/favico/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}