// import React from "react";
// import useSubscribers from "../hooks/useSubscribers";

// const Subscribers = () => {
//   const { subscribers, loading } = useSubscribers();

//   if (loading) {
//     return (
//       <div className="p-6 text-center">
//         Loading Subscribers...
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">

//       <h1 className="text-3xl font-bold mb-6">
//         Newsletter Subscribers
//       </h1>

//       <div className="overflow-x-auto rounded-xl border">

//         <table className="w-full">

//           <thead>
//             <tr className="bg-emerald-900">
//               <th className="p-3 text-left">#</th>
//               <th className="p-3 text-left">Email</th>
//               <th className="p-3 text-left">Subscribed At</th>
//             </tr>
//           </thead>

//           <tbody>

//             {subscribers.map((subscriber, index) => (
//               <tr
//                 key={subscriber._id}
//                 className="border-t"
//               >
//                 <td className="p-3">
//                   {index + 1}
//                 </td>

//                 <td className="p-3">
//                   {subscriber.email}
//                 </td>

//                 <td className="p-3">
//                   {new Date(
//                     subscriber.createdAt
//                   ).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))}

//           </tbody>

//         </table>

//       </div>
//     </div>
//   );
// };

// export default Subscribers;

import React from "react";
import useSubscribers from "../hooks/useSubscribers";

const Subscribers = () => {
  const { subscribers, loading } = useSubscribers();

  if (loading) {
    return (
      <div className="min-w-0 p-4 sm:p-6">
        <div className="flex min-h-48 items-center justify-center rounded-xl border border-[#264436] bg-[#12231B] text-sm text-[#A2C4B7]">
          Loading Subscribers...
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-0 w-full p-3 sm:p-5 lg:p-6 text-[#F3EFE6]">
      {/* Header */}
      <div className="mb-5 sm:mb-6">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#A2C4B7]">
          Customer Management
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Newsletter Subscribers
          </h1>

          <span className="w-fit rounded-full border border-[#264436] bg-[#172D23] px-3 py-1.5 text-sm text-[#A2C4B7]">
            Total: {subscribers?.length || 0}
          </span>
        </div>
      </div>

      {!subscribers || subscribers.length === 0 ? (
        <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-[#264436] bg-[#12231B] px-4 py-10 text-center">
          <h2 className="text-lg font-semibold text-[#F3EFE6]">
            No subscribers yet
          </h2>
          <p className="mt-2 text-sm text-[#A2C4B7]">
            Newsletter subscribers will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile Cards */}
          <div className="space-y-3 md:hidden">
            {subscribers.map((subscriber, index) => (
              <div
                key={subscriber._id}
                className="min-w-0 rounded-xl border border-[#264436] bg-[#12231B] p-4 shadow-sm"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-[#A2C4B7]">
                    Subscriber #{index + 1}
                  </span>

                  <span className="shrink-0 rounded-full bg-emerald-900/60 px-2.5 py-1 text-xs text-emerald-200">
                    Subscribed
                  </span>
                </div>

                <p className="mb-1 text-xs font-medium text-[#A2C4B7]">
                  Email Address
                </p>

                <p className="break-all text-sm font-semibold text-[#F3EFE6]">
                  {subscriber.email}
                </p>

                <div className="mt-3 border-t border-[#264436] pt-3">
                  <p className="mb-1 text-xs font-medium text-[#A2C4B7]">
                    Subscribed At
                  </p>

                  <p className="text-sm text-[#F3EFE6]">
                    {subscriber.createdAt
                      ? new Date(
                          subscriber.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Tablet and Desktop Table */}
          <div className="hidden overflow-hidden rounded-xl border border-[#264436] bg-[#12231B] shadow-lg md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left">
                <thead>
                  <tr className="bg-[#172D23] text-[#F3EFE6]">
                    <th className="whitespace-nowrap px-4 py-4 text-sm font-semibold lg:px-6">
                      #
                    </th>

                    <th className="px-4 py-4 text-sm font-semibold lg:px-6">
                      Email Address
                    </th>

                    <th className="whitespace-nowrap px-4 py-4 text-sm font-semibold lg:px-6">
                      Subscribed At
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {subscribers.map((subscriber, index) => (
                    <tr
                      key={subscriber._id}
                      className="border-t border-[#264436] transition-colors hover:bg-[#172D23]/70"
                    >
                      <td className="px-4 py-4 text-sm text-[#A2C4B7] lg:px-6">
                        {index + 1}
                      </td>

                      <td className="max-w-[320px] break-all px-4 py-4 text-sm text-[#F3EFE6] lg:px-6">
                        {subscriber.email}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-sm text-[#A2C4B7] lg:px-6">
                        {subscriber.createdAt
                          ? new Date(
                              subscriber.createdAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Subscribers;
