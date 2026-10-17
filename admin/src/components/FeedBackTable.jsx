
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
    <div className="w-full min-w-0 p-3 sm:p-5 lg:p-6">
      <h1 className="mb-5 text-2xl sm:text-3xl font-bold text-white">
        User Feedback
      </h1>

      {!feedbacks || feedbacks.length === 0 ? (
        <div className="rounded-xl bg-stone-900 py-10 text-center text-stone-400">
          No feedback available.
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto rounded-xl bg-stone-900 shadow-lg">
            <table className="w-full min-w-[850px] table-auto">
              <thead>
                <tr className="bg-emerald-700 text-white">
                  <th className="px-4 py-4 text-left">User Name</th>
                  <th className="px-4 py-4 text-left">User Email</th>
                  <th className="px-4 py-4 text-left">Subject</th>
                  <th className="px-4 py-4 text-left">Feedback</th>
                  <th className="px-4 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {feedbacks.map((feedback) => (
                  <tr
                    key={feedback._id}
                    className="border-b border-stone-700 hover:bg-stone-800"
                  >
                    <td className="break-words px-4 py-4 text-stone-200">
                      {feedback.name}
                    </td>

                    <td className="break-all px-4 py-4 text-stone-200">
                      {feedback.email}
                    </td>

                    <td className="break-words px-4 py-4 text-stone-200">
                      {feedback.subject}
                    </td>

                    <td className="px-4 py-4 text-stone-200">
                      <p className="max-w-xs break-words">
                        {feedback.message?.length > 35
                          ? `${feedback.message.slice(0, 35)}...`
                          : feedback.message}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleView(feedback)}
                          className="rounded-lg bg-[#C88A4B] px-3 py-2 text-sm text-white hover:bg-[#B97D43]"
                        >
                          View
                        </button>

                        <button
                          onClick={() => handleDelete(feedback._id)}
                          className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile and Tablet Cards */}
          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {feedbacks.map((feedback) => (
              <div
                key={feedback._id}
                className="min-w-0 rounded-xl border border-stone-700 bg-stone-900 p-4 shadow-lg sm:p-5"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="break-words text-lg font-semibold text-white">
                      {feedback.name}
                    </h2>
                    <p className="break-all text-sm text-stone-400">
                      {feedback.email}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-emerald-800 px-2 py-1 text-xs text-emerald-100">
                    Feedback
                  </span>
                </div>

                <div className="mb-3">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-400">
                    Subject
                  </p>
                  <p className="break-words text-stone-200">
                    {feedback.subject}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-400">
                    Message
                  </p>
                  <p className="break-words text-sm leading-6 text-stone-300">
                    {feedback.message?.length > 120
                      ? `${feedback.message.slice(0, 120)}...`
                      : feedback.message}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 border-t border-stone-700 pt-3">
                  <button
                    onClick={() => handleView(feedback)}
                    className="flex-1 rounded-lg bg-[#C88A4B] px-4 py-2 text-sm font-medium text-white hover:bg-[#B97D43]"
                  >
                    View Message
                  </button>

                  <button
                    onClick={() => handleDelete(feedback._id)}
                    className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

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
