
import { useState, useEffect } from "react";
import axios from "axios";

const useMenuItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const baseUrl =
          import.meta.env.VITE_CLIENT_API_URL ||
          "http://localhost:3000";

        const response = await axios.get(
          `${baseUrl}/api/coffee/get-coffees`,
          {
            withCredentials: true,
          }
        );

        const data = response.data;
        

        setItems(
          Array.isArray(data)
            ? data
            : Array.isArray(data?.coffees)
              ? data.coffees
              : Array.isArray(data?.data)
                ? data.data
                : []
        );
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  return { items, loading, error };
};

export default useMenuItems;
