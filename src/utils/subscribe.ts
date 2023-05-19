import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import {db} from "./firebase-setup"
// Get a Firestore instance

// Reference the collection you want to subscribe to
const collectionRef = collection(db, `users`);

// Subscribe to the collection
const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      // Handle added documents
      const documentData = change.doc.data();
      console.log("Document added: ", documentData);
    }
    if (change.type === "modified") {
      // Handle modified documents
      const documentData = change.doc.data();
      console.log("Document modified: ", documentData);
    }
    if (change.type === "removed") {
      // Handle removed documents
      const documentData = change.doc.data();
      console.log("Document removed: ", documentData);
    }
  });
});
