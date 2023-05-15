"use client";
import { useState } from "react";
import SignUp from "./signUp";
import SignIn from "./signIn";
import Logout from "./logout";

const AccountManagment = () => {
  const [isToSignUp, setModeSignUp] = useState(false);

  return (
    <>
      <div className="bg-gray-300 ">
        <div>
          {isToSignUp ? (
            <div>
              <SignUp />
            </div>
          ) : (
            <div>
              <SignIn />
            </div>
          )}
          <Logout />
        </div>
        <div className="justify-content mx-auto gap-16 md:flex">
          <button onClick={() => setModeSignUp(true)} className="">
            Sign up
          </button>
          <button onClick={() => setModeSignUp(false)} className="">
            Sign in
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountManagment;
