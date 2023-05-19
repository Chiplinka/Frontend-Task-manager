"use client";
import { signUp, db, auth } from "@/utils/firebase-setup";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import queryIF from "@/utils/queryIF";
import { useState, useEffect } from "react";

export default function TaskApp() {
  const [ticketsList, setTickets] = useState<queryIF>();

  useEffect(() => {
    getTasks()
  }, []);

  async function getTasks() {
    // e.preventDefault();
    console.log("Handle");
    const uid = auth.currentUser?.uid;
    if (uid) {
      console.log("You are logged in");
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
      {/* <form onSubmit={getTasks}>
        <button type="submit">getTasks</button>
      </form> */}
      <h1>My Tickets</h1>

      <div className="flex border border-gray-300 justify-around">
          {ticketsList?.tickets.map((ticket, index) => (
            <div className="border border-gray-300" key={index}>
              <strong>Name:</strong> {ticket.name} <br></br>{" "}
              <strong>Status:</strong> {ticket.status ? "Completed" : "Pending"}
              <br></br>
              <strong>Creation Date:</strong> {ticket.creationDate}
              <br></br>
              <strong>Due Date:</strong> {ticket.dueDate}
            </div>
          ))}
      </div>
    </>
  );
}
