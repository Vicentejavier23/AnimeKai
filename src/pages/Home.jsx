import React from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const featured = [
    { id: 1, name: "Figura Naruto", price: 20000, img: "/imagenes/6i9s4cff.png" },
    { id: 2, name: "One Piece Vol. 100", price: 40000, img: "/imagenes/81rEhhwbubL._SL1500_.jpg" },
    { id: 3, name: "Poster Attack on Titan", price: 25000, img: "/imagenes/il_1080xN.5944656713_5rty.webp" },
    { id: 4, name: "Poleron Alucard", price: 25000, img: "/imagenes/poleronalucard.avif" }
  ];

  return (
    <main>
      <section id="inicio">
        <div className="hero">
          <h2>Bienvenido a AnimeKai Store</h2>
          <p>Encuentra los mejores productos de anime y manga</p>
          <a href="/productos" className="cta-button">Ver Productos</a>
        </div>
        <div className="featured-Productos">
          <h2>Productos Destacados</h2>
          <div className="Productos-grid">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
