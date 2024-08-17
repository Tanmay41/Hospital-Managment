import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

import { ThemeProvider } from "@/components/theme-provider";
import {ModeToggle} from "@/components/ModeToggle";
import { Toaster } from "@/components/ui/toaster"
import {House} from "lucide-react";
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hospital Name",
  description: "Hospital Slogan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
          <div className={"w-full h-[75px] flex justify-between items-center flex-row px-5"}>
              <div>
                  <Link href={"/"} >
                      <House size={25}/>
                  </Link>
                  <Link href={""}>
                  </Link>
              </div>
              <ModeToggle/>
          </div>
          {children}
          <Toaster/>
      </ThemeProvider>
      </body>
    </html>
  );
}
