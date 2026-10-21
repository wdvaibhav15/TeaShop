
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllOrders } from "../redux/allordersSlice.js";

const useAllOrders = () => {
  const dispatch = useDispatch();

  const orders = useSelector(
    (state) => state.allOrders?.orders ?? []
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchAllOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const baseUrl = (
          import.meta.env.VITE_CLIENT_API_URL ||
          "http://localhost:3000"
        ).replace(/\/+$/, "");

        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error(
            "Admin token not found. Please log in again."
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
        console.log("all Orders Response------------", response.data);

        if (cancelled) return;

        if (response.data?.success !== true) {
          throw new Error(
            response.data?.message ||
              "Failed to fetch orders."
          );
        }

        const fetchedOrders = Array.isArray(
          response.data.orders
        )
          ? response.data.orders
          : [];

        console.log(
          "Fetched admin orders:",
          fetchedOrders
        );

        dispatch(setAllOrders(fetchedOrders));
      } catch (err) {
        if (cancelled) return;

        const message =
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch admin orders.";

        console.error("Error fetching all orders:", {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message,
        });

        setError(message);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchAllOrders();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (total, order) =>
      total + (Number(order.amount) || 0),
    0
  );

  return {
    orders,
    totalOrders,
    totalRevenue,
    loading,
    error,
  };
};

export default useAllOrders;
