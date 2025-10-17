import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Series from "./pages/Series";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartModal from "./components/CartModal";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Header onCartClick={() => setCartOpen(true)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/series" element={<Series />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
