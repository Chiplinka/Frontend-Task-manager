import "./globals.css";
import Navbar from "@/components/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "InnoTask",
  description:
    "Manage your tasks efficiently with our powerful task management platform. Stay organized, collaborate with your team, and increase productivity. Try it now!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body>
          <Navbar></Navbar>
          {children}
        </body>
      </html>
    </>
  );
}
