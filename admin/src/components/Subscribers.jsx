import React from "react";
import useSubscribers from "../hooks/useSubscribers";

const Subscribers = () => {
  const { subscribers, loading } = useSubscribers();

  if (loading) {
    return (
      <div className="p-6 text-center">
        Loading Subscribers...
      </div>
    );
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Newsletter Subscribers
      </h1>

      <div className="overflow-x-auto rounded-xl border">

        <table className="w-full">

          <thead>
            <tr className="bg-emerald-900">
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Subscribed At</th>
            </tr>
          </thead>

          <tbody>

            {subscribers.map((subscriber, index) => (
              <tr
                key={subscriber._id}
                className="border-t"
              >
                <td className="p-3">
                  {index + 1}
                </td>

                <td className="p-3">
                  {subscriber.email}
                </td>

                <td className="p-3">
                  {new Date(
                    subscriber.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default Subscribers;