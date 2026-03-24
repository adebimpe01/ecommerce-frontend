import axios from 'axios';
import { useState } from "react";
import { formatMoney } from "../../utils/money";

// ✅ Optional: create a reusable axios instance
const api = axios.create({
  baseURL: 'https://ecommerce-backend-6-dupy.onrender.com'
});

export function Product({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    try {
      // Use full backend URL via api instance
      await api.post('/api/cart-items', {
        productId: product.id,
        quantity
      });

      // Reload cart
      await loadCart();
    } catch (err) {
      console.error('Add to Cart Error:', err.response?.data || err.message);
      alert('Failed to add to cart. Try again!');
    }
  };

  const selectQuantity = (event) => {
    setQuantity(Number(event.target.value));
  };

  return (
    <div className="product-container" data-testid="product-container">
      <div className="product-image-container">
        <img
          className="product-image"
          data-testid="product-image"
          src={`https://ecommerce-backend-6-dupy.onrender.com/${product.image}`}
          alt={product.name}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">
        {product.name}
      </div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          data-testid="product-rating-stars-image"
          src={`https://ecommerce-backend-6-dupy.onrender.com/images/ratings/rating-${product.rating.stars * 10}.png`}
          alt={`${product.rating.stars} stars`}
        />
        <div className="product-rating-count link-primary" data-testid="product-rating-count">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={selectQuantity}>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <button
        className="add-to-cart-button button-primary"
        data-testid="add-to-cart-button"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}