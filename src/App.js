import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="page">
      <main className="homepage">
        <Navbar />
        <Hero />
      </main>
    </div>
  );
}

export default App;