import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { db } from '../firebase.config';

function useStorage(collectionName, file) {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storage = getStorage();
    const storageRef = ref(storage, `${collectionName}/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgress(progress);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        setError(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setUrl(url);

        await addDoc(collection(db, collectionName), {
          name: file.name,
          url,
          timestamp: serverTimestamp(),
        });
      }
    );
  }, [collectionName, file]);

  return { progress, error, url };
}

export default useStorage;
