"use client";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase-setup";
import ticketIF from "../utils/ticketIF";

const ticket: ticketIF = {
  name: "Create fronted prj",
  status: true,
  creationDate: "",
  dueDate: "",
};

const NewCard = ({ getCurrentTasks }: any) => {
  const { push } = useRouter();

  const handleRedirect = () => {
    push("/tasks/new");
  };

  const handle = async () => {
    const uid = auth.currentUser?.uid;

    if (uid) {
      // console.log("Add new card handle: enter");
      // console.log(uid);
      // console.log(`users/${uid}/tickets`);

      // const currentDate = new Date();
      // const futureDate = new Date();
      // futureDate.setDate(currentDate.getDate() + 2);
      // ticket.creationDate = formatDate(currentDate);
      // ticket.dueDate = formatDate(futureDate);

      // const docRef = await addDoc(collection(db, `users/${uid}/tickets`), {
      //   ticket,
      // });
      // console.log("Document written with ID: ", docRef.id);

      // // const db = getDatabase();
      // // const newTicketKey = push(child(ref(db), `users/${uid}/tickets`)).key;
      // // console.log(newTicketKey);
      // // const updates: any = {};
      // // updates["/users/" + uid + "/" + newTicketKey] = ticket;

      // // await update(ref(db), updates);

      // console.log("Add new card handle: done");
      // getCurrentTasks();
      handleRedirect();
    }
  };
  // h-50vh w-50vw border-dotted border-4 border-blue-500 bg-blue-200
  return (
    <>
      <div className="w-70 h-48 shadow-md rounded-lg p-4 mt-2 border-dotted border-4 border-blue-500 bg-blue-200">
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
