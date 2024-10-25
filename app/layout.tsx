import type { Metadata } from "next";
import {Ubuntu} from "next/font/google";
import "./globals.css";


const ubuntu = Ubuntu({
  subsets: ["latin"] ,
  weight:["300","400","500","700"]
});


export const metadata: Metadata = {
  title: "my Kanban",
  description: "personal Kanban app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={ubuntu.className}
      >
        {children}
      </body>
    </html>
  );
}
