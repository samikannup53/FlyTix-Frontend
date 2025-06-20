import { Link } from "react-router-dom";

export const BookingContinue = () => {
  return (
    <div className="sticky bottom-0 z-50 bg-gradient-to-tr from-orange-300 to-pink-300 rounded-t-xl shadow-md py-4 px-6 flex items-center justify-between">
      {/* Left: Price & Travelers */}
      <div className="flex items-center gap-4 text-gray-800 text-sm">
        <div className="flex items-center gap-1">
          <i className="fas fa-indian-rupee-sign text-orange-500"></i>
          <span className="text-lg font-bold">5,840</span>
        </div>
        <span className="text-gray-400">|</span>
        <div className="flex items-center gap-1">
          <i className="fas fa-user-group text-orange-500"></i>
          <span>2 Travelers</span>
        </div>
      </div>

      {/* Right: Continue Button */}
      <Link to={'/booking/payment'} className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-md transition duration-200">
        Continue
        <i className="fas fa-arrow-right"></i>
      </Link>
    </div>
  );
};

