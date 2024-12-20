import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import MobileNav from "@/components/MobileNav";
import Link from "next/link";
// import { CameraIcon, HomeIcon, LayoutGridIcon, SearchIcon, UserIcon } from "lucide-react";
import DesktopNav from "@/components/DesktopNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Theme>
          {modal}
          <div className="flex min-h-screen">
            <DesktopNav />
            <div className="pb-24 lg:pb-4 pt-8 px-4 lg:px-8 flex justify-around w-full">
              <div className="">
                {children}
              </div>
            </div>
          </div>
          <MobileNav />
        </Theme>
      </body>
    </html>
  );
}

//p-4 pt-8
