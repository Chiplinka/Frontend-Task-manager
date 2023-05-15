import { useState } from "react";
import { signUp, db, auth } from "@/utils/firebase-setup";
import { useRouter } from "next/router";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import ticketIF from "../utils/ticketIF";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const ticket1: ticketIF = {
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

  // const router = useRouter();
  function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

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
        console.log(uid);
        setError("You are sign up");
        const currentDate = new Date();
        const futureDate = new Date();
        futureDate.setDate(currentDate.getDate() + 2);
        ticket2.creationDate = formatDate(currentDate);
        ticket2.dueDate = formatDate(futureDate);

        ticket1.creationDate = formatDate(currentDate);
        ticket1.dueDate = formatDate(futureDate);
        await setDoc(doc(db, "users", uid), {
          email: email,
          password: password,
          tickets: [ticket1, ticket2],
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
