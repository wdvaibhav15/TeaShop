import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFeedBackUser } from "../redux/feedbackSlice";

const useFeedBack = () => {
  const dispatch = useDispatch();

  const { feedbackUser } = useSelector((state) => state.feedback);

  useEffect(() => {
    const feedBackData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_CLIENT_API_URL}/api/admin/userfeedback`,
        );
        console.log(response.data);
        if (response.data.success) {
          dispatch(setFeedBackUser(response.data.feedbacks));
        }
      } catch (error) {
        console.log(error);
      }
    };

    feedBackData();
  }, [dispatch]);

  return feedbackUser;
};

export default useFeedBack;
