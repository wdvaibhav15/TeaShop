
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllOrders } from "../redux/allordersSlice.js";

const useAllOrders = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.allOrders);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_CLIENT_API_URL}/api/orders/orders`,
          {
            withCredentials: true,
          }
        );

        console.log("All Orders:", response.data);

        if (response.data.success) {
          dispatch(setAllOrders(response.data.orders || []));
        }
      } catch (error) {
        console.error("Error fetching all orders:", error);
      }
    };

    fetchAllOrders();
  }, [dispatch]);

  // Calculate total revenue from all orders
  const totalRevenue = (orders || []).reduce((total, order) => {
    return total + (Number(order.amount) || 0);
  }, 0);

  return { orders, totalRevenue };
};

export default useAllOrders;
