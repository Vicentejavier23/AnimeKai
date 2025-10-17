import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>AnimeKai Store</h3>
            <p>Tu tienda de confianza para productos de anime</p>
          </div>
          <div className="footer-section">
            <h3>Enlaces Rápidos</h3>
            <ul>
              <li><a href="/">Inicio</a></li>
              <li><a href="/productos">Productos</a></li>
              <li><a href="/series">Serie</a></li>
              <li><a href="/about">Quiénes Somos</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contacto</h3>
            <p>Email: info@AnimeKai.com</p>
            <p>Teléfono: +56 9 1234 5678</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 AnimeKai Store. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
