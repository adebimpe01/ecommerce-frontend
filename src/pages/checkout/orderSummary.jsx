import axios from "axios";
import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import DeliveryOption from "./DeliveryOption";

// ✅ axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export default function OrderSummary({ cart, deliveryOptions, loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 && cart?.map((cartItem) => {

        const selectedDeliveryOption = deliveryOptions.find(
          (deliveryOption) =>
            deliveryOption.id === cartItem.deliveryOptionId
        );

        const deleteCartItem = async () => {
          try {
            await api.delete(`/api/cart-items/${cartItem.productId}`);
            await loadCart();
          } catch (err) {
            console.error("Delete error:", err);
          }
        };

        return (
          <div key={cartItem.productId} className="cart-item-container">

            <div className="delivery-date">
              Delivery date:{" "}
              {dayjs(selectedDeliveryOption?.estimatedDeliveryTimeMs)
                .format("dddd, MMM D")}
            </div>

            <div className="cart-item-details-grid">

              {/* ✅ FIXED IMAGE PATH */}
              <img
                className="product-image"
                src={`${import.meta.env.VITE_API_URL}/${cartItem.product.image}`}
                alt={cartItem.product.name}
              />

              <div className="cart-item-details">

                <div className="product-name">
                  {cartItem.product.name}
                </div>

                <div className="product-price">
                  {formatMoney(cartItem.product.priceCents)}
                </div>

                <div className="product-quantity">
                  <span>
                    Quantity:
                    <span className="quantity-label">
                      {cartItem.quantity}
                    </span>
                  </span>

                  <span className="update-quantity-link link-primary">
                    Update
                  </span>

                  <span
                    className="delete-quantity-link link-primary"
                    onClick={deleteCartItem}
                  >
                    Delete
                  </span>

                </div>
              </div>

              <DeliveryOption
                deliveryOptions={deliveryOptions}
                cartItem={cartItem}
                loadCart={loadCart}
              />

            </div>
          </div>
        );
      })}
    </div>
  );
}