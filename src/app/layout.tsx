import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <Head>
          <title>Welcome InnoTask</title>
          <meta
            key="description"
            name="description"
            content="Manage your tasks efficiently with our powerful task management platform. Stay organized, collaborate with your team, and increase productivity. Try it now!"
          />
          <meta property="og:title" content="Welcome InnoTask" />
          <meta
            property="og:description"
            content="Manage your tasks efficiently with our powerful task management platform. Stay organized, collaborate with your team, and increase productivity. Try it now!"
          />
        </Head>
        <body>
          <Navbar></Navbar>
          {children}
          {/* <Footer></Footer> */}
        </body>
      </html>
    </>
  );
}
