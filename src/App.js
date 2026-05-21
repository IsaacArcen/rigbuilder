import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Builder from "./components/Builder";
import ComponentPage from "./pages/ComponentPage";
import { BuildProvider } from "./context/BuildContext";
import CartPage from "./pages/CartPage";


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
    <BuildProvider>
      <div className="page">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/builder/:category" element={<ComponentTypePage />} />
        </Routes>
      </div>
    </BuildProvider>
    </BrowserRouter>
  );
}

//ComponentPage
function ComponentTypePage() {
  return (
    <main className="app-page app-page--background">
      <Navbar />
      <ComponentPage />
    </main>
  );
}

export default App;