export const BookingContinue = () => {
  return (
    <div className="sticky bottom-0 z-50 bg-gradient-to-tr from-orange-300 to-pink-300 rounded-t-xl shadow-md py-4 px-6 flex items-center justify-between">
      {/* Left: Price & Travelers */}
      <div className="flex items-center gap-4 text-gray-800 text-sm">
        <div className="flex items-center gap-1">
          <i className="fas fa-indian-rupee-sign text-pink-700"></i>
          <span className="text-lg font-bold">5,840</span>
        </div>
        <span className="text-gray-400">|</span>
        <div className="flex items-center gap-1">
          <i className="fas fa-user-group text-pink-700"></i>
          <span>2 Travelers</span>
        </div>
      </div>

      {/* Right: Continue Button */}
      <button className="px-6 py-2 bg-gradient-to-br from-orange-700 via-pink-700 to-pink-800 hover:from-orange-800 hover:to-pink-900 text-white rounded-full text-base font-medium transition cursor-pointer">
        Continue
      </button>
    </div>
  );
};
