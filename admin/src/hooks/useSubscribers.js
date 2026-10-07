import { useEffect, useState } from "react";
import axios from "axios";

const useSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_CLIENT_API_URL}/api/auth/subscribers`
        );

        if (response.data.success) {
          setSubscribers(response.data.subscribers);
        }
      } catch (error) {
        console.error("Failed to fetch subscribers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  return { subscribers, loading };
};

export default useSubscribers;