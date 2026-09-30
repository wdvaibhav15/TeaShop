import React from "react";

const ViewMessage = ({ feedback, onClose }) => {
  if (!feedback) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-stone-900 text-white w-[600px] max-w-[90%] rounded-xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-emerald-400">
          Feedback Details
        </h2>

        <div className="space-y-4">
          <div>
            <span className="font-semibold text-emerald-300">
              User Name:
            </span>
            <p>{feedback.name}</p>
          </div>

          <div>
            <span className="font-semibold text-emerald-300">
              User Email:
            </span>
            <p>{feedback.email}</p>
          </div>

          <div>
            <span className="font-semibold text-emerald-300">
              Subject:
            </span>
            <p>{feedback.subject}</p>
          </div>

          <div>
            <span className="font-semibold text-emerald-300">
              Message:
            </span>
            <p className="mt-2 bg-stone-800 p-4 rounded-lg">
              {feedback.message}
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewMessage;