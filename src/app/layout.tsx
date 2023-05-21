import "./globals.css";
import Navbar from "@/components/navbar";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        {/* <Head>
          <title>InnoTask</title>
          <meta property="og:title" content="InnoTask" />
          <meta
            name="description"
            content="Manage your tasks efficiently with our powerful task management platform. Stay organized, collaborate with your team, and increase productivity. Try it now!"
          />
        </Head> */}
        <body>
          <Navbar></Navbar>
          {children}
        </body>
      </html>
    </>
  );
}
