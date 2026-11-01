import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
