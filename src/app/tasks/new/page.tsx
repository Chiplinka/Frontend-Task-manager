"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "@/utils/firebase-setup"; // Assuming you have already set up Firebase in your project
import formatDate from "@/utils/formatDate";
import ticketIF from "@/utils/ticketIF";

function NewCardPage() {
  const { push } = useRouter();
  const [name, setName] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [status, setStatus] = useState(false);
  const [error, setError] = useState("");

  function checkUserDate(dateString: string): boolean {
    const pattern =
      /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{2}) ([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

    if (!pattern.test(dateString)) {
      return false;
    }
    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("/").map(Number);
    const [hours, minutes] = timePart.split(":").map(Number);
    if (year < 0 || year > 99) {
      return false;
    }
    if (month < 1 || month > 12) {
      return false;
    }
    if (day < 1 || day > 31) {
      return false;
    }
    if (hours < 0 || hours > 23) {
      return false;
    }
    if (minutes < 0 || minutes > 59) {
      return false;
    }

    return true;
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const uid = auth.currentUser?.uid;
    console.log(uid);
    setError("");
    if (uid) {
      console.log(checkUserDate(deadlineDate), deadlineDate);

      if (checkUserDate(deadlineDate) && name) {
        let ticket: ticketIF = {
          name: name,
          status: status,
          creationDate: "",
          dueDate: deadlineDate,
        };
        const currentDate = new Date();
        ticket.creationDate = formatDate(currentDate);
        addDoc(collection(db, `users/${uid}/tickets`), {
          ...ticket,
        });
        console.log("/tasks/new The card is added: ", ticket);
        push("/tasks");
      } else {
        console.log(
          "/tasks/new The string dont match the pattern/Name cannot be empty"
        );
        setError("The string dont match the pattern/Name cannot be empty");
      }
    } else {
      setError("You are not logged in");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3 bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Add New Card</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="deadlineDate" className="block font-bold mb-1">
              Deadline Date (Ex. &quot;20/05/23 15:51&quot;)
            </label>
            <input
              type="text"
              id="deadlineDate"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block font-bold mb-1">
              Status
            </label>
            <label htmlFor="status" className="inline-flex items-center">
              <input
                type="checkbox"
                id="status"
                className="form-checkbox"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
              />
              <span className="ml-2">Complete</span>
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
// (
//   <div className="flex justify-center items-center h-screen">
//     <div className="w-1/3 bg-white p-8 shadow-md rounded-lg">
//       <h1 className="text-2xl font-bold mb-4">Add New Card</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="name" className="block font-bold mb-1">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="deadlineDate" className="block font-bold mb-1">
//             Deadline Date (Ex. "20/05/23 15:51")
//           </label>
//           <input
//             type="text"
//             id="deadlineDate"
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             value={deadlineDate}
//             onChange={(e) => setDeadlineDate(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="status" className="block font-bold mb-1">
//             Status
//           </label>
//           <label htmlFor="status" className="inline-flex items-center">
//             <input
//               type="checkbox"
//               id="status"
//               className="form-checkbox"
//               checked={status}
//               onChange={(e) => setStatus(e.target.checked)}
//             />
//             <span className="ml-2">Completed</span>
//             {/* <button
//               onClick={() => setStatus(!status)}
//               className={`${
//                 status ? "bg-green-500" : "bg-red-500"
//               } text-white px-4 py-2 rounded-md`}
//             >
//               {status ? "Completed" : "Pending"}
//             </button> */}
//           </label>
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Save
//         </button>
//       </form>
//     </div>
//   </div>
// );
//   (
//     <div>
//       <h1>New Card</h1>

//       <div className="flex flex-col">
//         <label className="text-left">
//           Name:
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="text-left"
//           />
//         </label>

//         <label className="text-left">
//           Deadline Date:
//           <input
//             type="text"
//             value={deadlineDate}
//             onChange={(e) => setDeadlineDate(e.target.value)}
//             className="text-left"
//           />
//         </label>

//         <label className="text-left">
//           Status:
// <button
//   onClick={() => setStatus(!status)}
//   className={`${
//     status ? 'bg-green-500' : 'bg-red-500'
//   } text-white px-4 py-2 rounded-md`}
// >
//   {status ? 'Completed' : 'Pending'}
// </button>
//         </label>

//         <button onClick={handleSubmit}>Save</button>
//       </div>
//     </div>
//   );
// }

export default NewCardPage;
