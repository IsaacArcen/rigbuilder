import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Builder from "./components/Builder";
//pages
import ComponentPage from "./pages/ComponentPage";
import { BuildProvider } from "./context/BuildContext";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FavoritesPage from "./pages/FavoritesPage";
//context
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";


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
    <AuthProvider>
      <FavoritesProvider>
    <BuildProvider>
      <div className="page">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/builder/:category" element={<ComponentTypePage />} />
          <Route path="/cart" element={<CartRoutePage />} />
          <Route path="/checkout" element={<CheckoutRoutePage />} />
          <Route path="/confirmation" element={<ConfirmationRoutePage />} />
          <Route path="/login" element={<LoginRoutePage />} />
          <Route path="/register" element={<RegisterRoutePage />} />
          <Route path="/favorites" element={<FavoritesRoutePage />} />
        </Routes>
      </div>
    </BuildProvider>
    </FavoritesProvider>
    </AuthProvider>
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

function CartRoutePage() {
  return (
    <main className="app-page app-page--background">
      <Navbar/>
      <CartPage/>
    </main>
  );
}

function CheckoutRoutePage() {
  return (
    <main className="app-page app-page--background">
      <Navbar/>
      <CheckoutPage/>
    </main>
  );
}

function ConfirmationRoutePage() {
  return (
    <main className="app-page app-page--background">
      <Navbar/>
      <ConfirmationPage/>
    </main>
  );
}

function LoginRoutePage() {
  return (
    <main className="app-page app-page--background">
      <Navbar />
      <LoginPage />
    </main>
  );
}

function RegisterRoutePage() {
  return (
    <main className="app-page app-page--background">
      <Navbar />
      <RegisterPage />
    </main>
  );
}

function FavoritesRoutePage() {
  return (
    <main className="app-page app-page--background">
      <Navbar />
      <FavoritesPage />
    </main>
  );
}

export default App;