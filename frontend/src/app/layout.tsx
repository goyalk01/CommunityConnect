import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VolunteerHub AI — Community Management Platform",
  description:
    "Connect passionate volunteers with meaningful causes. VolunteerHub AI helps community initiatives manage volunteers, programs, and community impact — all in one place.",
  keywords: "community, volunteer management, social impact, organization",
  openGraph: {
    title: "VolunteerHub AI",
    description: "Connect passionate volunteers with meaningful causes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          href="https://db.onlinewebfonts.com/c/04e6981992c0e2e7642af2074ebe3901?family=Helvetica+Now+Display+Bold"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
