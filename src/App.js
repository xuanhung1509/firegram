import Header from './components/Header';
import UploadForm from './components/UploadForm';
import ImageGrid from './components/ImageGrid';

function App() {
  return (
    <>
      <Header />
      <main>
        <div className='container'>
          <UploadForm />
          <ImageGrid />
        </div>
      </main>
    </>
  );
}

export default App;
