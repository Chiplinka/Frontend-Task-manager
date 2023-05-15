"use client";
import { signUp, db, auth } from "@/utils/firebase-setup";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import queryIF from "@/utils/queryIF";
import { useState } from "react";

export default function TaskApp() {
  const [ticketsList, setTickets] = useState<queryIF>();

  async function getTasks(e: any) {
    e.preventDefault();
    console.log("Handle");
    const uid = auth.currentUser?.uid;
    if (uid) {
      console.log("Read data");
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        const data: queryIF = docSnap.data() as queryIF;
        console.log(data.tickets[0].creationDate);
        setTickets(data);
      }
    } else {
      console.log("You are not logged in");
    }
  }

  return (
    <>
      <h1>TaskApp</h1>
      <form onSubmit={getTasks}>
        <button type="submit">getTasks</button>
      </form>
      <div>
        <h1>My Tickets</h1>
        <ul>
          {ticketsList?.tickets.map((ticket, index) => (
            <li key={index}>
              <strong>Name:</strong> {ticket.name} | <strong>Status:</strong>{" "}
              {ticket.status ? "Completed" : "Pending"} |{" "}
              <strong>Creation Date:</strong> {ticket.creationDate} |{" "}
              <strong>Due Date:</strong> {ticket.dueDate}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
