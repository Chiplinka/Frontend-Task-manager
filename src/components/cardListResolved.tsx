"use client";
import { logOut } from "@/utils/firebase-setup";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { signUp, db, auth } from "@/utils/firebase-setup";
import { updatedCards } from "@/utils/ticketIF";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

const ListCardsResolved = ({
  ticketsListResolved,
  setTicketsPending,
  getCurrentTasks,
}: any) => {
  const modifyDocument = async (id: string) => {
    try {
      const uid = auth.currentUser?.uid;
      if (uid) {
        console.log("modifyDocument");
        // const collectionRef = collection(db, `/users/${uid}/tickets`);

        const itemRef = doc(db, `/users/${uid}/tickets`, id);
        console.log(itemRef);
        await updateDoc(itemRef, {
          status: false,
        }).then(() => {
          getCurrentTasks();
        });
        console.log("Updated document");
      } else {
        console.log("No matching documents found!");
      }
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  async function handleDelete(id: string) {
    console.log("delete", id);
    const uid = auth.currentUser?.uid;
    if (uid) {
      await deleteDoc(doc(db, `/users/${uid}/tickets`, id)).then(() => {getCurrentTasks()});
      console.log("deletion done", id);
    }
  }

  function handleStatusChange(id: string) {
    console.log("status change", id);
    modifyDocument(id);
  }
  function handleModify(id: string) {
    console.log("modify", id);
  }

  return (
    <>
      {ticketsListResolved?.map((ticket: updatedCards) => (
        <div
          className="w-70 bg-gray-500  shadow-md rounded-lg p-4"
          key={ticket.id}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{ticket.name} </h3>
            <button
              className="p-2 bg-red-500 text-white rounded-md"
              onClick={() => handleDelete(ticket.id)}
            >
              Delete
            </button>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 text-sm">
              Creation Date: {ticket.creationDate}
            </p>
            <p className="text-gray-600 text-sm">
              Deadline Date: {ticket.dueDate}
            </p>
            <p className="text-gray-600 text-sm">
              Status: {ticket.status ? "Completed" : "Pending"}
            </p>
          </div>
          <div className="flex justify-between">
            <button
              className="p-2 bg-blue-500 text-white rounded-md"
              onClick={() => handleModify(ticket.id)}
            >
              Modify
            </button>
            <button
              className="p-2 bg-green-500 text-white rounded-md"
              onClick={() => handleStatusChange(ticket.id)}
            >
              Mark as unresolved
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListCardsResolved;
