import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

export default function Productos() {
  const [filter, setFilter] = useState("all");
  const [Productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos([
      { id: 1, name: "Figura Naruto", price: 20000, category: "figuras", img: "/imagenes/6i9s4cff.png" },
      { id: 2, name: "One Piece Vol. 100", price: 40000, category: "mangas", img: "/imagenes/81rEhhwbubL._SL1500_.jpg" },
      { id: 3, name: "Poster Attack on Titan", price: 25000, category: "accesorios", img: "/imagenes/il_1080xN.5944656713_5rty.webp" },
      { id: 4, name: "Camiseta Naruto", price: 15000, category: "ropa", img: "/imagenes/OI.webp" },
      { id: 5, name: "Poleron Alucard", price: 25000, category: "ropa", img: "/imagenes/poleronalucard.avif" },
      { id: 6, name: "Poleron Gohan", price: 18000, category: "ropa", img: "/imagenes/polerongohan.webp" },
      { id: 6, name: "Traje Padre Anderson", price: 50000, category: "ropa", img: "/imagenes/trajeanderson.jpg" }
    ]);
  }, []);

  const filtered = filter === "all" ? Productos : Productos.filter((p) => p.category === filter);

  return (
    <main className="container">
      <section id="productos">
        <h2>Nuestros Productos</h2>
        <div className="filters">
          {["all", "figuras", "mangas", "ropa", "accesorios"].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "Todos" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="Productos-grid">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </main>
  );
}
