import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setItems,
  setLoading,
  setError,
} from "../redux/productSlice";

const useProductsData = () => {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (items.length > 0) return;

    const fetchProducts = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const response = await axios.get(
          `${import.meta.env.VITE_CLIENT_API_URL}/api/coffee/get-coffees`,
          {
            withCredentials: true,
          }
        );

        const coffees =
          response.data.coffees ||
          response.data ||
          [];

        dispatch(setItems(coffees));
      } catch (err) {
        dispatch(
          setError(
            err.response?.data?.message ||
            err.message ||
            "Something went wrong"
          )
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProducts();
  }, [dispatch, items.length]);

  return { items, loading, error };
};

export default useProductsData;