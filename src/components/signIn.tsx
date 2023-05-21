import { useState } from "react";
import { signIn, db, signUp, auth } from "@/utils/firebase-setup";
import { collection, doc, getDocs, setDoc, addDoc } from "firebase/firestore";
import ticketIF from "../utils/ticketIF";
import formatDate from "../utils/formatDate";

const SignIn = ({ setIsLoggedIn }: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let ticket: ticketIF = {
    name: "Do frontend project",
    status: false,
    creationDate: "",
    dueDate: "",
  };
  let ticket2: ticketIF = {
    name: "Wash the dishes",
    status: false,
    creationDate: "",
    dueDate: "",
  };

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (isLogin) {
      handleSignIn();
    } else {
      handleSignUp();
    }
  }

  const handleSignIn = async () => {
    setEmail("");
    setPassword("");
    const res = await signIn(email, password);
    if (typeof res !== "boolean" && res?.error) {
      setError(res.error.toString().slice(10));
    } else {
      setError("You are logged in");
      setIsLoggedIn(true);
    }
  };

  async function handleSignUp() {
    const res = await signUp(email, password);
    console.log(res);
    if (typeof res !== "boolean" && res?.error) {
      setError(res.error.toString().slice(10));
      setEmail("");
      setPassword("");
    } else {
      const uid = auth.currentUser?.uid;
      if (uid) {
        setIsLoggedIn(true);
        await setDoc(doc(db, "users", uid), {
          email: email,
          password: password,
        });

        console.log(uid);
        setError("You are sign up");
        const currentDate = new Date();
        const futureDate = new Date();
        futureDate.setDate(currentDate.getDate() + 2);

        ticket.creationDate = formatDate(currentDate);
        ticket.dueDate = formatDate(futureDate);

        addDoc(collection(db, `users/${uid}/tickets`), {
          ...ticket,
        });

        ticket2.creationDate = formatDate(currentDate);
        ticket2.dueDate = formatDate(futureDate);

        addDoc(collection(db, `users/${uid}/tickets`), {
          ...ticket2,
        });
      }
    }
  }

  function handleChangeMode(e: { preventDefault: () => void }) {
    e.preventDefault();
    setIsLogin(!isLogin);
    setError("");
  }

  return (
    <>
      {isLogin ? (
        <h2 className="text-2xl font-bold mb-4">Login</h2>
      ) : (
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          {isLogin ? "Log in" : "Sign up"}
        </button>
      </form>
      <p className="mt-4 text-center">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          className="text-blue-500 hover:underline"
          onClick={handleChangeMode}
        >
          {isLogin ? "Sign up" : "Log in"}
        </button>
      </p>
    </>
  );
};

export default SignIn;
