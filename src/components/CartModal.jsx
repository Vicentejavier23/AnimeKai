import React from "react";
import { useCart } from "../context/CartContext";

export default function CartModal({ isOpen, onClose }) {
  const { cartItems, removeItem, emptyCart, total } = useCart();

  if (!isOpen) return null;

  return (
    <div className="cart-modal show">
      <div className="cart-content">
        <span className="close-cart" onClick={onClose}>
          &times;
        </span>
        <h3>Tu Carrito</h3>

        <div id="cart-items">
          {cartItems.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} />
                <div className="cart-item-details">
                  <strong>{item.name}</strong>
                  <p>
                    ${item.price} x {item.quantity} = $
                    {item.price * item.quantity}
                  </p>
                </div>
                <button
                  className="remove-item"
                  onClick={() => removeItem(item.id)}
                >
                  ✖
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <>
            <div className="cart-total">
              <strong>Total:</strong> ${total}
            </div>
            <button className="empty-cart-btn" onClick={emptyCart}>
              Vaciar Carrito
            </button>
          </>
        )}
      </div>
    </div>
  );
}
