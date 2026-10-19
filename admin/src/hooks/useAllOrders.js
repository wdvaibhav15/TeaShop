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

        if (!token) {
          throw new Error(
            "Admin token not found in localStorage."
          );
        }

        const response = await axios.get(
          `${baseUrl}/api/orders/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (cancelled) return;

        if (response.data?.success !== true) {
          throw new Error(
            response.data?.message || "Failed to fetch orders."
          );
        }

        const fetchedOrders = Array.isArray(response.data.orders)
          ? response.data.orders
          : [];

        console.log("Fetched admin orders:", fetchedOrders);

        dispatch(setAllOrders(fetchedOrders));
      } catch (error) {
        if (cancelled) return;

        console.error("Error fetching all orders:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });

        // Keep existing orders visible if a temporary request fails.
      }
    };

    fetchAllOrders();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  const totalRevenue = orders.reduce((total, order) => {
    return total + (Number(order.amount) || 0);
  }, 0);

  return {
    orders,
    totalOrders: orders.length,
    totalRevenue,
  };
};

export default useAllOrders;