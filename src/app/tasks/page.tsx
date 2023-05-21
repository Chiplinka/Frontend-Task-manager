"use client";
import { db, auth } from "@/utils/firebase-setup";
import { collection } from "firebase/firestore";
import ticketIF from "@/utils/ticketIF";
import { useState, useEffect } from "react";
import NewCard from "@/components/newcard";
import { query, getDocs } from "firebase/firestore";
import { updatedCards } from "@/utils/ticketIF";
import ListCardsPending from "@/components/cardListPending";
import ListCardsResolved from "@/components/cardListResolved";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "InnoTask Tasks",
//   description: "Manage your work! View, create, modify, and resolve tasks",
// };

export default function TaskApp() {
  const [ticketsListPending, setTicketsPending] = useState<updatedCards[]>();
  const [ticketsListResolved, setTicketsResolved] = useState<updatedCards[]>();

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
      // let data: ticketIF[] = [];
      let dataPending: updatedCards[] = [];
      let dataResolved: updatedCards[] = [];
      querySnapshot.docs.map((doc) => {
        console.log("doc.data()", doc.data());

        if (doc.data().status) {
          dataResolved.push({
            id: doc.id,
            ...(doc.data() as ticketIF),
          });
        } else {
          dataPending.push({
            id: doc.id,
            ...(doc.data() as ticketIF),
          });
        }
      });

      // querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   // console.log(doc.id, " => ", doc.data());
      //   data.push((doc.data()["ticket"] as ticketIF, doc.id as string) as listTicket );
      // });

      setTicketsPending(dataPending);
      setTicketsResolved(dataResolved);
      console.log("dataPending");
      console.log(dataPending);
      console.log("dataResolved");
      console.log(dataResolved);
    } else {
      console.log("You are not logged in");
    }
  }

  return (
    <>
      {/* <form onSubmit={getCurrentTasks}>
        <button type="submit">getCurrentTasks</button>
      </form> */}
      <div className="mb-8 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Pending tasks</h2>
        <div className="border-b-2 border-gray-300"></div>
      </div>

      <div className="container mx-auto ">
        <div className="grid grid-cols-4 gap-4 gap-y-4  ">
          <ListCardsPending
            ticketsListPending={ticketsListPending}
            setTicketsPending={setTicketsPending}
            getCurrentTasks={getCurrentTasks}
          />
          <NewCard getCurrentTasks={getCurrentTasks} />
        </div>
      </div>

      <div className="mb-8 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Completed tasks</h2>
        <div className="border-b-2 border-gray-300"></div>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-4 gap-y-4  ">
          <ListCardsResolved
            ticketsListResolved={ticketsListResolved}
            setTicketsResolved={setTicketsResolved}
            getCurrentTasks={getCurrentTasks}
          />
        </div>
      </div>
    </>
  );
}
