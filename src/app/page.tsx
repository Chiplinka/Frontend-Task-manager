"use client";
import { use, useState, useEffect } from "react";
import AccountManagment from "../components/authorization";
import { useRouter } from "next/router";
import { auth } from "@/utils/firebase-setup";
import Head from "next/head";
import { Helmet } from "react-helmet";

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (uid) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
      <Head>
        <title>InnoTask</title>
        <meta key="description" name="description" content="InnoTask" />
        <meta property="og:title" content="InnoTask" />
        <meta property="og:description" content="InnoTask" />
      </Head>
      <AccountManagment
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      ></AccountManagment>
    </>
  );
}
