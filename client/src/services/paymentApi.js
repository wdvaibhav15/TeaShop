import axios from "axios";

const API_URL =
  import.meta.env.VITE_CLIENT_API_URL || "http://localhost:3000";

export const createOrder = async (payload) => {
  const { data } = await axios.post(
    `${API_URL}/api/payment/create-order`,
    payload,
    {
      withCredentials: true,
    }
  );

  return data;
};

export const verifyPayment = async (payload) => {
  const { data } = await axios.post(
    `${API_URL}/api/payment/verify-payment`,
    payload,
    {
      withCredentials: true,
    }
  );

  return data;
};