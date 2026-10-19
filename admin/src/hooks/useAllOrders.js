
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllOrders } from "../redux/allordersSlice.js";

const useAllOrders = () => {
  const dispatch = useDispatch();

  const orders = useSelector(
    (state) => state.allOrders?.orders ?? []
  );

  useEffect(() => {
    let cancelled = false;

    const fetchAllOrders = async () => {
      try {
        const baseUrl = (
          import.meta.env.VITE_CLIENT_API_URL ||
          "http://localhost:3000"
        ).replace(/\/+$/, "");

        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${baseUrl}/api/orders/orders`,
          {
            headers: token
              ? { Authorization: `Bearer ${token}` }
              : {},
            withCredentials: true,
          }
        );

        if (cancelled) return;

        console.log("All orders response:", response.data);

        if (response.data?.success) {
          dispatch(
            setAllOrders(response.data.orders ?? [])
          );
        } else {
          console.error(
            "Orders request failed:",
            response.data?.message
          );
        }
      } catch (error) {
        if (cancelled) return;

        console.error("Error fetching all orders:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
      }
    };

    fetchAllOrders();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  const totalRevenue = orders.reduce(
    (total, order) => total + (Number(order.amount) || 0),
    0
  );

  return {
    orders,
    totalRevenue,
  };
};

export default useAllOrders;
