import { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

export default function useLivros() {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "livros"), (snapshot) => {
      setLivros(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { livros, loading };
}