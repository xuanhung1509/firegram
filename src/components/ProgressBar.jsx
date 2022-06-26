import { useEffect } from 'react';
import useStorage from '../hooks/useStorage';

function ProgressBar({ file, setFile }) {
  const { progress, url } = useStorage('images', file);
  useEffect(() => {
    if (url) {
      setFile(null);
    }
    // eslint-disable-next-line
  }, [url]);

  return <div className='progress-bar' style={{ width: progress + '%' }}></div>;
}

export default ProgressBar;
