export const BookingCancellation = ({ flight }) => {
  const baseFare = flight.fare.baseFare;

  const fare = parseFloat(baseFare || "0");

  const before24Fee = Math.round(fare * 0.25);
  const within24Fee = Math.round(fare * 0.5);
  const rescheduleFee = Math.round(fare * 0.2);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      {/* Section Header */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between mb-10">
        <h3 className="text-lg font-semibold text-pink-700">
          Refund & Cancellation
        </h3>
        <button className="text-sm text-pink-700 flex items-center gap-1 cursor-pointer">
          <span className="hover:underline">
            Cancellation & Rescheduling Policy
          </span>
          <span className="text-xl font-bold">{">"}</span>
        </button>
      </div>

      {/* Timeline Section */}
      <div className="relative flex justify-between items-center text-sm text-gray-700">
        {/* Horizontal Line */}
        <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-pink-600 z-0"></div>

        {/* Step 1 - Before 24 Hrs */}
        <div className="relative z-10 flex flex-col items-center w-1/5 mt-2">
          <div className="mt-16 text-center"></div>
          <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center shadow-md text-sm z-10">
            ₹
          </div>
          <div className="mt-4 text-center">
            <p className="font-semibold">Before 24 hrs</p>
            <p>₹{before24Fee} Fee</p>
            <p className="text-xs text-gray-500">Up to 75% refund</p>
          </div>
        </div>

        {/* Step 2 - Within 24 Hrs */}
        <div className="relative z-10 flex flex-col items-center w-1/5 mb-2">
          <div className="mb-4 text-center">
            <p className="font-semibold">Within 24 hrs</p>
            <p>₹{within24Fee} Fee</p>
            <p className="text-xs text-gray-500">Up to 50% refund</p>
          </div>
          <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center shadow-md text-sm z-10">
            ₹
          </div>
          <div className="mt-16 text-center"></div>
        </div>

        {/* Step 3 - Departure Day */}
        <div className="relative z-10 flex flex-col items-center w-1/5 mt-2">
          <div className="mt-16 text-center"></div>
          <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md text-sm z-10">
            ✖
          </div>
          <div className="mt-4 text-center">
            <p className="font-semibold">Departure Day</p>
            <p>No refund</p>
            <p className="text-xs text-gray-500">Reschedule if eligible</p>
          </div>
        </div>

        {/* Step 4 - No-show */}
        <div className="relative z-10 flex flex-col items-center w-1/5 mb-2">
          <div className="mb-4 text-center">
            <p className="font-semibold">No-show</p>
            <p>No refund</p>
            <p className="text-xs text-gray-500">Flight missed not eligible</p>
          </div>
          <div className="w-10 h-10 bg-gray-700 text-white rounded-full flex items-center justify-center shadow-md text-sm z-10">
            🚫
          </div>
          <div className="mt-16 text-center"></div>
        </div>

        {/* Step 5 - Rescheduling */}
        <div className="relative z-10 flex flex-col items-center w-1/5 mt-2">
          <div className="mt-16 text-center"></div>
          <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md text-sm z-10">
            🔁
          </div>
          <div className="mt-4 text-center">
            <p className="font-semibold">Rescheduling</p>
            <p>₹{rescheduleFee} fee</p>
            <p className="text-xs text-gray-500">Fare diff. may apply</p>
          </div>
        </div>
      </div>
    </div>
  );
};
