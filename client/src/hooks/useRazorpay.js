import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_CLIENT_API_URL || "http://localhost:3000";

const useRazorpay = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const startPayment = async ({
    coffeeId,
    quantity,
    amount,
    userId,
    title,
    image,
  }) => {
    try {
      setLoading(true);

      console.log("Payment Payload:", {
        coffeeId,
        quantity,
        amount,
        userId,
      });

      if (!userId) {
        alert("User ID not found. Please login again.");
        setLoading(false);
        return;
      }

      const { data: orderData } = await axios.post(
        `${API_URL}/api/payment/create-order`,
        {
          coffeeId,
          quantity,
          amount,
          userId,
        },
        {
          withCredentials: true,
        }
      );

      if (!orderData.success) {
        alert(orderData.message);
        setLoading(false);
        return;
      }

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        setLoading(false);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        order_id: orderData.order.id,

        name: "Tea & Coffee Shop",
        description: `${quantity} x ${title}`,
        image,

        handler: async function (response) {
          try {
            const { data: verifyData } = await axios.post(
              `${API_URL}/api/payment/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                withCredentials: true,
              }
            );

            if (verifyData.success) {
              navigate("/my-orders");
            } else {
              alert("Payment Verification Failed");
            }
          } catch (error) {
            console.error(error);
            alert("Verification Error");
          } finally {
            setLoading(false);
          }
        },

        prefill: {
          name: "Customer",
          email: "customer@example.com",
        },

        theme: {
          color: "#065f46",
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        alert(response.error.description);
        setLoading(false);
      });

      razorpay.open();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Failed to initialize payment"
      );

      setLoading(false);
    }
  };

  return {
    startPayment,
    loading,
  };
};

export default useRazorpay;