"use client";
import { signUp, db, auth } from "@/utils/firebase-setup";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import ticketIF from "@/utils/ticketIF";
import { useState, useEffect } from "react";
import NewCard from "@/components/newcard";
import { ref, onValue } from "firebase/database";
import { query, where, getDocs } from "firebase/firestore";
import { getFirestore, onSnapshot } from "firebase/firestore";

export default function TaskApp() {
  const [ticketsList, setTickets] = useState<ticketIF[]>();

  useEffect(() => {
    getCurrentTasks();
  }, []);

  // Reference the collection you want to subscribe to

  // const collectionRef = collection(
  //   db,
  //   `users/2ScnVKC9h4TDtOk7cs1qqcDoAeu1/tickets`
  // );
  // // Subscribe to the collection
  // const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
  //   snapshot.docChanges().forEach((change) => {
  //     if (change.type === "added") {
  //       // Handle added documents
  //       const documentData = change.doc.data();
  //       console.log("Document added: ", documentData);
  //       // setTickets([]);
  //     }
  //     if (change.type === "modified") {
  //       // Handle modified documents
  //       const documentData = change.doc.data();
  //       console.log("Document modified: ", documentData);
  //     }
  //     if (change.type === "removed") {
  //       // Handle removed documents
  //       const documentData = change.doc.data();
  //       console.log("Document removed: ", documentData);
  //     }
  //   });
  // });

  async function getCurrentTasks() {
    // e.preventDefault();
    console.log("Handle");
    const uid = auth.currentUser?.uid;

    if (uid) {
      // console.log(`You are logged in ${uid}`);
      // console.log("Read data");

      const q = query(collection(db, `users/${uid}/tickets`));
      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot);
      let data: ticketIF[] = [];

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        data.push(doc.data()["ticket"] as ticketIF);
      });

      setTickets(data);
      // console.log(data);
    } else {
      console.log("You are not logged in");
    }
  }

  return (
    <>
      {/* <form onSubmit={getCurrentTasks}>
        <button type="submit">getCurrentTasks</button>
      </form> */}
      <h1>Pending tasks:</h1>
      {/* min-h-screen */}
      <div className="container mx-auto ">
        <div className="grid grid-cols-4 gap-4 gap-y-4  ">
          {ticketsList?.map((ticket, index) => (
            <div className="w-70 h-40 border border-gray-300" key={index}>
              <strong>Name:</strong> {ticket.name} <br></br>{" "}
              <strong>Status:</strong> {ticket.status ? "Completed" : "Pending"}
              <br></br>
              <strong>Creation Date:</strong> {ticket.creationDate}
              <br></br>
              <strong>Due Date:</strong> {ticket.dueDate}
            </div>
          ))}
          <NewCard getCurrentTasks={getCurrentTasks} />
        </div>      
      </div>

      <h1>Done:</h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-4 gap-y-4  ">
          {ticketsList?.map((ticket, index) => (
            <div className="w-70 h-40 border border-gray-300 bg-gray-400" key={index}>
              <strong>Name:</strong> {ticket.name} <br></br>{" "}
              <strong>Status:</strong> {ticket.status ? "Completed" : "Pending"}
              <br></br>
              <strong>Creation Date:</strong> {ticket.creationDate}
              <br></br>
              <strong>Due Date:</strong> {ticket.dueDate}
            </div>
          ))}
        </div>      
      </div>
    </>
  );
}
