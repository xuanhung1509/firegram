import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase.config';

function useFirestore(collectionName) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, collectionName),
      orderBy('timestamp', 'desc')
    );
    const unsub = onSnapshot(q, (querySnap) => {
      const docs = [];
      querySnap.forEach((doc) => {
        docs.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setDocs(docs);
    });

    return () => unsub();
  }, [collectionName]);

  return { docs };
}
export default useFirestore;
