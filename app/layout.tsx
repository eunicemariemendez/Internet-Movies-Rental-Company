/* File: layout.tsx
Author: Eunice Mendez
Date: November 21, 2026

Overview: This component creates the main layout for the IMR movie portal. 
Input: it gets one prop, children and the pages that are being shown.
Processing: it puts the NavBar on top and the Footer at the bottom so they dont have to be added on every page. 
Output: it shows a light gray page with the dark navbar and footer around the page content.

*/

import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

//describes the layout props
interface RootLayoutProps {
  children: ReactNode;
}

//set the website title and description
export const metadata: Metadata = {
  title: "IMR Movie Rental",
  description: "View and manage movies at the Internet Movies Rental Company.",
};

//arange the navigation, page content and footer
const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-neutral-100 font-sans text-neutral-800">
        <NavBar />
        <main className="mx-auto w-full min-w-0 max-w-6xl flex-1 px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
