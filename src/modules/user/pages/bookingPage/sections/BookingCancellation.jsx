export const BookingCancellation = () => {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      {/* Section Header */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between mb-10">
        {/* Left Heading */}
        <h3 className="text-lg font-semibold text-orange-700">
          Refund & Cancellation
        </h3>

        {/* Right Sub-link */}
        <a href="#" className="text-sm text-orange-600 flex items-center gap-1">
          <span className="hover:underline">Cancellation & Rescheduling Policy</span>
          <span className="text-xl font-bold">{'>'}</span>
        </a>
      </div>

      {/* Timeline Section */}
      <div className="relative flex justify-between items-center text-sm text-gray-700">
        {/* Horizontal Line */}
        <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-orange-200 z-0"></div>

        {/* Step 1 */}
        <div className="relative z-10 flex flex-col items-center w-1/5 mt-2">
          <div className="mt-16 text-center"></div>
          <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center shadow-md text-sm z-10">
            ₹
          </div>
          <div className="mt-4 text-center">
            <p className="font-semibold">Before 24 hrs</p>
            <p>₹1,000 fee</p>
            <p className="text-xs text-gray-500">Up to 75% refund</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative z-10 flex flex-col items-center w-1/5 mb-2">
          <div className="mb-4 text-center">
            <p className="font-semibold">Within 24 hrs</p>
            <p>₹2,000 fee</p>
            <p className="text-xs text-gray-500">Up to 50% refund</p>
          </div>
          <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center shadow-md text-sm z-10">
            ₹
          </div>
          <div className="mt-16 text-center"></div>
        </div>

        {/* Step 3 */}
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

        {/* Step 4 */}
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

        {/* Step 5 */}
        <div className="relative z-10 flex flex-col items-center w-1/5 mt-2">
          <div className="mt-16 text-center"></div>
          <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md text-sm z-10">
            🔁
          </div>
          <div className="mt-4 text-center">
            <p className="font-semibold">Rescheduling</p>
            <p>Partial refund</p>
            <p className="text-xs text-gray-500">Fare diff. may apply</p>
          </div>
        </div>
      </div>
    </div>
  );
};

