import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

// App är huvudkomponenten som bygger upp sidans övergripande layout.
function App() {
  return (
    <div className="page">
      <main className="homepage">
        {/* Navbar visas högst upp på startsidan */}
        <Navbar />

        {/* Hero */}
        <Hero />
      </main>
    </div>
  );
}

export default App;