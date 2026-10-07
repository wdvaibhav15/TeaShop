import React from "react";
import {
  useParams,
  Link,
} from "react-router-dom";

const OrderSuccess = () => {
  const { paymentId } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-green-600">
          🎉 Payment Successful
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for your order.
        </p>

        <p className="mt-2 font-semibold">
          Payment ID:
          <br />
          {paymentId}
        </p>

        <Link
          to="/menu"
          className="mt-6 inline-block bg-emerald-800 text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;