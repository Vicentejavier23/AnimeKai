import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Agregar producto al carrito
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // si ya existe, aumenta cantidad
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // si no existe, lo agrega con cantidad 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Eliminar un ítem
  const removeItem = (id) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id));

  // Vaciar carrito
  const emptyCart = () => setCartItems([]);

  // Calcular total general
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Contador total de ítems
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeItem, emptyCart, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
