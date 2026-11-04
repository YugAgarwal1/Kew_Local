import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "KEW Electricals | Engineering Power Since 1961",
  description: "Electrical switchgear, fusegear, controlgear and power distribution solutions from Kusum Engineering Works.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="/" />
        <link rel="preload" href="/video/kew-industrial-background.mp4" as="video" type="video/mp4" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
