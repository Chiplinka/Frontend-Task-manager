"use client";
import { useState, useEffect } from "react";
import SignUp from "./signUp";
import SignIn from "./signIn";
import Logout from "./logout";
import { signUp, db, auth } from "@/utils/firebase-setup";
const AccountManagment = ({ isAuthenticated, setIsAuthenticated }: any) => {
  const [isToSignUp, setModeSignUp] = useState(false);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-200 p-8 rounded-lg">
          {isAuthenticated ? (
            <Logout
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          ) : (
            <div className="">
              {isToSignUp ? (
                <div>
                  <SignUp setIsAuthenticated={setIsAuthenticated} />
                </div>
              ) : (
                <div>
                  <SignIn setIsAuthenticated={setIsAuthenticated} />
                </div>
              )}
              {!isToSignUp ? (
                <button onClick={() => setModeSignUp(true)} className="">
                  Sign up
                </button>
              ) : (
                <button onClick={() => setModeSignUp(false)} className="">
                  Sign in
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* <div className="bg-gray-300 flex justify-center">
        {isAuthenticated ? (
          <Logout isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
           />
        ) : (
          <div className="">
            {isToSignUp ? (
              <div>
                <SignUp setIsAuthenticated={setIsAuthenticated} />
              </div>
            ) : (
              <div>
                <SignIn setIsAuthenticated={setIsAuthenticated} />
              </div>
            )}
            <button onClick={() => setModeSignUp(true)} className="">
              Sign up
            </button>
            <button onClick={() => setModeSignUp(false)} className="">
              Sign in
            </button>
          </div>
        )}
      </div> */}
    </>
  );
};

export default AccountManagment;
