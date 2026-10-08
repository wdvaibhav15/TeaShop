import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeedBackUser } from "../redux/feedbackSlice";
import toast from "react-hot-toast";
const useDeleteFeedback = () => {
  const dispatch = useDispatch();

  const deleteFeedback = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this feedback?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_CLIENT_API_URL}/api/admin/userfeedback/${id}`
      );
      toast.success("Feedback deleted successfully");
      if (response.data.success) {
        dispatch(removeFeedBackUser(id));
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete feedback");
    }
  };

  return deleteFeedback;
};

export default useDeleteFeedback;