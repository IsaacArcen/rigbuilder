import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Builder from "./components/Builder";

// App är huvudkomponenten som bygger upp sidans övergripande layout.
function App() {
  return (
    <div className="page">
      <main className="homepage">
        {/* Navbar visas högst upp på startsidan */}
        <Navbar />

        {/* Hero */}
        <Hero />
        {/* Builder */}
        <Builder />
      </main>
    </div>
  );
}

export default App;