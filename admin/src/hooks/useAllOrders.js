
// import { useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setAllOrders } from "../redux/allordersSlice.js";

// const useAllOrders = () => {
//   const dispatch = useDispatch();

//   const { orders } = useSelector((state) => state.allOrders);

//   useEffect(() => {
//     const fetchAllOrders = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_CLIENT_API_URL}/api/orders/orders`,
//           {
//             withCredentials: true,
//           }
//         );

//         console.log("All Orders:", response.data);

//         if (response.data.success) {
//           const allOrders = response.data.orders || [];

//           // Hide orders whose coffee reference is missing
//           const filteredOrders = allOrders.filter((order) => {
//             if (order.coffeeId === null) return false;
//             if (order.coffee === null) return false;

//             return true;
//           });

//           dispatch(setAllOrders(filteredOrders));
//         }
//       } catch (error) {
//         console.error("Error fetching all orders:", error);
//       }
//     };

//     fetchAllOrders();
//   }, [dispatch]);

//   // Calculate revenue using the filtered orders
//   const totalRevenue = (orders || []).reduce((total, order) => {
//     return total + (Number(order.amount) || 0);
//   }, 0);

//   return { orders: orders || [], totalRevenue };
// };

// export default useAllOrders;

import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllOrders } from "../redux/allordersSlice.js";

const useAllOrders = () => {
  const dispatch = useDispatch();

  const orders = useSelector(
    (state) => state.allOrders?.orders || []
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
          // Keep every order, including those with deleted coffee references.
          dispatch(setAllOrders(response.data.orders || []));
        } else {
          dispatch(setAllOrders([]));
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

        dispatch(setAllOrders([]));
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
    totalRevenue,
  };
};

export default useAllOrders;
