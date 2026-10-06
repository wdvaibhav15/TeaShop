import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  setCafeData,
  setCafeLoading,
} from "../redux/cafeSettingSlice";

const useCafeSettings = () => {
  const dispatch = useDispatch();

  const cafeData = useSelector(
    (state) => state.cafeSetting.cafeData
  );

  useEffect(() => {
    fetchCafeSettings();
  }, []);

  const fetchCafeSettings = async () => {
    try {
      dispatch(setCafeLoading(true));

      const response = await axios.get(
        `${import.meta.env.VITE_CLIENT_API_URL}/api/admin/cafe-settings`
      );

      console.log("Cafe Settings Response:", response.data);

      if (response.data.success) {
        dispatch(setCafeData(response.data.cafe));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setCafeLoading(false));
    }
  };

  return cafeData;
};

export default useCafeSettings;