import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img src={product.img} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <button
        className="add-to-cart"
        onClick={() => addToCart(product)}
      >
        Añadir al carrito
      </button>
    </div>
  );
}
