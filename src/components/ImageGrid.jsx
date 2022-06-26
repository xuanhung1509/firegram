import useFirestore from '../hooks/useFirestore';
import { doc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { db } from '../firebase.config';
import { FaTrash } from 'react-icons/fa';

function ImageGrid() {
  const { docs: imgUrls } = useFirestore('images');

  const handleDelete = async (id, fileName) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      // Delete from storage
      const storage = getStorage();
      const fileRef = ref(storage, 'images/' + fileName);
      try {
        await deleteObject(fileRef);
      } catch (error) {
        console.error(error);
      }

      // Remove from firestore
      await deleteDoc(doc(db, 'images', id));
    }
  };

  return (
    <div className='img-grid'>
      {imgUrls.map(({ id, url, name }) => (
        <div key={id} className='img-container'>
          <img src={url} alt={name} />
          <div className='icon-delete' onClick={() => handleDelete(id, name)}>
            <FaTrash fill='#ff3333' />
          </div>
        </div>
      ))}
    </div>
  );
}
export default ImageGrid;
