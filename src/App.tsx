import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center">🚀 To-Do App Colaborativa</h1>
        <p className="text-center">¡Tu proyecto con React, TypeScript, Bootstrap y Firebase está listo!</p>
      </div>
      <Footer />
    </>
  );
}

export default App;
