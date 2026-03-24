import axios from 'axios';
import { useEffect, useState } from 'react';
import OrderSummary from './orderSummary';
import { PaymentSummary } from './paymentSummary';
import '../checkout-header.css';
import { Link } from 'react-router-dom';
import './CheckoutPage.css';

// ✅ axios instance
const api = axios.create({
  baseURL: 'https://ecommerce-backend-6-dupy.onrender.com'
});

export function CheckoutPage({ cart = [], loadCart }) {

  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {

    const fetchCheckoutData = async () => {
      try {
        const deliveryRes = await api.get('/api/delivery-options');
        setDeliveryOptions(deliveryRes.data);

        const paymentRes = await api.get('/api/payment-summary');
        setPaymentSummary(paymentRes.data);

      } catch (err) {
        console.error('Checkout error:', err);
      }
    };

    fetchCheckoutData();
  }, [cart]);

  return (
    <>
      <title>Checkout</title>

      <div className="checkout-header">
        <div className="header-content">

          <div className="checkout-header-left-section">
            <Link to="/">
              <img 
                className="logo" 
                src="https://ecommerce-backend-6-dupy.onrender.com/images/logo.png"
                alt="Logo"
              />
              <img 
                className="mobile-logo" 
                src="https://ecommerce-backend-6-dupy.onrender.com/images/mobile-logo.png"
                alt="Mobile Logo"
              />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              {cart.length} items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img 
              src="https://ecommerce-backend-6-dupy.onrender.com/images/icons/checkout-lock-icon.png"
              alt="Secure Checkout"
            />
          </div>

        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary 
            cart={cart} 
            deliveryOptions={deliveryOptions} 
            loadCart={loadCart} 
          />

          <PaymentSummary 
            paymentSummary={paymentSummary} 
            loadCart={loadCart}
          />
        </div>
      </div>
    </>
  );
}