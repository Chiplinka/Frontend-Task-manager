import { useState } from "react";
import { signUp, db, auth } from "@/utils/firebase-setup";
import { useRouter } from "next/router";
import { collection, doc, getDocs, addDoc, setDoc } from "firebase/firestore";
import ticketIF from "../utils/ticketIF";
import formatDate from "../utils/formatDate";

const SignUp = ({ setIsAuthenticated }: any) => {
  const [username, setUsername] = useState("");
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

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await signUp(email, password);
    console.log(res);
    if (typeof res !== "boolean" && res?.error) {
      setError(res.error.toString().slice(10));
      setUsername("");
      setEmail("");
      setPassword("");
    } else {
      const uid = auth.currentUser?.uid;
      if (uid) {
        setIsAuthenticated(true);

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

  return (
    <>
      <div>{error}</div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="m-3">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Your Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="m-3">
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Your Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default SignUp;
