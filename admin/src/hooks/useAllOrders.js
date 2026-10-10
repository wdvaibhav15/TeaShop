
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
          const allOrders = response.data.orders || [];

          // Hide orders whose coffee reference is missing
          const filteredOrders = allOrders.filter((order) => {
            if (order.coffeeId === null) return false;
            if (order.coffee === null) return false;

            return true;
          });

          dispatch(setAllOrders(filteredOrders));
        }
      } catch (error) {
        console.error("Error fetching all orders:", error);
      }
    };

    fetchAllOrders();
  }, [dispatch]);

  // Calculate revenue using the filtered orders
  const totalRevenue = (orders || []).reduce((total, order) => {
    return total + (Number(order.amount) || 0);
  }, 0);

  return { orders: orders || [], totalRevenue };
};

export default useAllOrders;
