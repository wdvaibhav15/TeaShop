import React, { useState } from "react";
import useFeedBack from "../hooks/useFeedBack";
import ViewMessage from "./ViewMessage";
import useDeleteFeedback from "../hooks/useDeleteFeedback";

const FeedbackTable = () => {
  const feedbacks = useFeedBack();
  const deleteFeedback = useDeleteFeedback();
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const handleView = (feedback) => {
    setSelectedFeedback(feedback);
  };

  const handleDelete = async (id) => {
    await deleteFeedback(id);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">User Feedback</h1>

      <div className="bg-stone-900 rounded-xl shadow-lg overflow-hidden">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-emerald-700 text-white">
              <th className="w-[15%] px-6 py-4 text-left">User Name</th>

              <th className="w-[25%] px-6 py-4 text-left">User Email</th>

              <th className="w-[15%] px-6 py-4 text-left">Subject</th>

              <th className="w-[30%] px-6 py-4 text-left">Feedback</th>

              <th className="w-[15%] px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {feedbacks?.length > 0 ? (
              feedbacks.map((feedback) => (
                <tr
                  key={feedback._id}
                  className="border-b border-stone-700 hover:bg-stone-800"
                >
                  <td className="px-6 py-4 text-stone-200">{feedback.name}</td>

                  <td className="px-6 py-4 text-stone-200">{feedback.email}</td>

                  <td className="px-6 py-4 text-stone-200">
                    {feedback.subject}
                  </td>

                  <td className="px-6 py-4 text-stone-200">
                    {feedback.message?.length > 35
                      ? `${feedback.message.slice(0, 35)}...`
                      : feedback.message}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleView(feedback)}
                        className="px-3 py-1 bg-[#C88A4B] hover:bg-[#B97D43] text-white rounded-lg text-sm"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleDelete(feedback._id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-stone-400">
                  No feedback available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedFeedback && (
        <ViewMessage
          feedback={selectedFeedback}
          onClose={() => setSelectedFeedback(null)}
        />
      )}
    </div>
  );
};

export default FeedbackTable;
