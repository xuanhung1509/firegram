import { useState } from 'react';
import ProgressBar from './ProgressBar';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ['image/png', 'image/jpg', 'image/jpeg'];

  const handleChangeFile = (e) => {
    const selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError(null);
    } else {
      setFile(null);
      setError('Please select an image with extension of jpg/ png/ jpeg');
    }
  };

  return (
    <form className='upload-form'>
      <label>
        <input
          type='file'
          accept='.jpg, .png, .jpeg'
          onChange={handleChangeFile}
        />
        <span>+</span>
      </label>

      <div className='output'>
        {error && <small className='error'>{error}</small>}
        {file && <small className='file-name'>{file.name}</small>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
}

export default UploadForm;
