import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Head from "next/head";
import { Helmet } from "react-helmet";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <Helmet>
          <meta property="og:title" content="InnoTask" />
          <meta
            property="og:description"
            content="Manage your tasks efficiently with our powerful task management platform. Stay organized, collaborate with your team, and increase productivity. Try it now!"
          />
        </Helmet>
        <body>
          <Navbar></Navbar>
          {children}
        </body>
      </html>
    </>
  );
}
