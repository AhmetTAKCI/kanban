import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import Navbar from "./components/Navbar";
import ToasterContext from "@/context/ToasterContext";




const ubuntu = Ubuntu({ 
  subsets: ["latin"] ,

  weight: ["300", "400", "500", "700"]

 });

export const metadata: Metadata = {
  title: "My Kanban",
  description: "Personal Kanban Board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={`${ubuntu.className}
        bg-gray-900 text-white`}
        suppressHydrationWarning
        >
        
          <ToasterContext />
        <Navbar />
        {children}
        
      </body>
    </html>
    </ClerkProvider>
  );
}