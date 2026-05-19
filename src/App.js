import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Builder from "./components/Builder";


//Homepage
function Homepage() {
  return (
    <main className="homepage">
      <Navbar />
      <Hero />
    </main>
  );
}

//BuilderPage
function BuilderPage() {
  return (
    <main className="app-page app-page--background">
      <Navbar />
      <Builder />
    </main>
  );
}

// App är huvudkomponenten som bygger upp sidans övergripande layout.
function App() {
  return (
    <BrowserRouter>
    <div className="page">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/builder" element={<BuilderPage />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;