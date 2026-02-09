import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Lego Design System Dashboard",
  description:
    "A playful dashboard built with the Lego Design System featuring chunky borders, rounded corners, and tactile interactions.",
}

export const viewport: Viewport = {
  themeColor: "#60A5FA",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
