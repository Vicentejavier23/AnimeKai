import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header({ onCartClick }) {
  const { itemCount } = useCart();

  return (
    <header>
      <div className="container">
        <div className="logo"><h1>AnimeKai Store</h1></div>
        <nav>
          <ul>
            <li><Link to="/" className="nav-link">Inicio</Link></li>
            <li><Link to="/productos" className="nav-link">Productos</Link></li>
            <li><Link to="/series"className="nav-link">Series </Link></li>
            <li><Link to="/about" className="nav-link">Quiénes Somos</Link></li>
          </ul>
        </nav>
        <div className="cart-icon" onClick={onCartClick}>
          <span>🛒</span>
          <span className="cart-count">{itemCount}</span>
        </div>
      </div>
    </header>
  );
}
