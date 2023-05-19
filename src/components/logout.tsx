"use client";
import { logOut } from "@/utils/firebase-setup";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { signUp, db, auth } from "@/utils/firebase-setup";

const Logout = ({ isAuthenticated, setIsAuthenticated }: any) => {
  //   const router = useRouter()
  const [error, setError] = useState("");
  const [buttonLabel, setButtonLabel] = useState("Log out");
  const [loggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = async () => {
    // setError("You are logged out");
    setButtonLabel("Log in");
    if (loggedIn) {
      await logOut();
      setIsAuthenticated(false);
    } else {
      //redirect to main page
    }
  };

  return (
    <>
      {/* <div>{error}</div> */}
      <button
        className="mx-2 rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white"
        onClick={handleLogout}
      >
        {isAuthenticated ? "Log Out" : "Log In"}
      </button>
    </>
  );
};

export default Logout;
