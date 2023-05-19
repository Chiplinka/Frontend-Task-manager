"use client";
import { use, useState, useEffect } from "react";
import AccountManagment from "../components/authorization";
import { useRouter } from "next/router";
import { auth } from "@/utils/firebase-setup";

export default function Page({ isAuthenticated, setIsAuthenticated }: any) {
  // const router = useRouter()

  // if (router.basePath === '/') {
  //   return
  // }

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
      <AccountManagment
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      ></AccountManagment>
    </>
  );
}
