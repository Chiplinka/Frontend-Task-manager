"use client";
import { logOut } from "@/utils/firebase-setup";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { signUp, db, auth } from "@/utils/firebase-setup";
import ticketIF from "../utils/ticketIF";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import formatDate from "@/utils/formatDate";
import { getDatabase, ref, child, push, update } from "firebase/database";
import { addDoc } from "firebase/firestore";
const ticket: ticketIF = {
  name: "New card",
  status: false,
  creationDate: "",
  dueDate: "",
};

const NewCard = ({ getCurrentTasks }: any) => {
  //   const router = useRouter()
  // const [error, setError] = useState("");

  const handle = async () => {
    const uid = auth.currentUser?.uid;

    if (uid) {
      console.log("Add new card handle: enter");
      console.log(uid);
      console.log(`users/${uid}/tickets`);

      const currentDate = new Date();
      const futureDate = new Date();
      futureDate.setDate(currentDate.getDate() + 2);
      ticket.creationDate = formatDate(currentDate);
      ticket.dueDate = formatDate(futureDate);

      const docRef = await addDoc(collection(db, `users/${uid}/tickets`), {
        ticket,
      });
      console.log("Document written with ID: ", docRef.id);

      // const db = getDatabase();
      // const newTicketKey = push(child(ref(db), `users/${uid}/tickets`)).key;
      // console.log(newTicketKey);
      // const updates: any = {};
      // updates["/users/" + uid + "/" + newTicketKey] = ticket;

      // await update(ref(db), updates);

      console.log("Add new card handle: done");
      getCurrentTasks();
    }
  };
  // h-50vh w-50vw border-dotted border-4 border-blue-500 bg-blue-200
  return (
    <>
      <div className="w-70 h-40 border-dotted border-4 border-blue-500 bg-blue-200">
        <button
          // className="mx-2 rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white"
          onClick={handle}
        >
          Add new card
        </button>
      </div>
    </>
  );
};

export default NewCard;
