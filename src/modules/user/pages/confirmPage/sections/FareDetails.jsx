import { Link } from "react-router-dom";

export const FareDetails = ({ booking }) => {
  if (!booking || !booking.fareDetails) return null;

  const {
    baseFare = 0,
    taxes = 0,
    convenienceFee = 0,
    totalFare = 0,
  } = booking.fareDetails;

  const renderAmount = (value) => (
    <span className="flex items-center gap-1">
      <i className="fa-solid fa-indian-rupee-sign"></i>
      {value}
    </span>
  );

  return (
    <div className="w-full md:w-[320px] space-y-5 md:sticky md:top-24">
      {/* Fare Summary */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-pink-100 space-y-3 text-sm text-gray-700">
        <h3 className="text-lg font-semibold text-pink-700 mb-2">
          Fare Summary
        </h3>
        <div className="flex justify-between">
          <span>Base Fare</span>
          {renderAmount(baseFare)}
        </div>
        <div className="flex justify-between">
          <span>Taxes & Surcharges</span>
          {renderAmount(taxes)}
        </div>
        <div className="flex justify-between">
          <span>Convenience Fee</span>
          {renderAmount(convenienceFee)}
        </div>
        <div className="border-t pt-3 border-dashed flex justify-between font-semibold text-base">
          <span>Total Paid</span>
          <span className="text-pink-700">{renderAmount(totalFare)}</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3">
        <Link
          to="/dashboard"
          className="w-full flex justify-center items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-br from-orange-700 via-pink-700 to-pink-800 hover:from-orange-800 hover:to-pink-900 text-white font-semibold text-base shadow-md transition-all duration-300"
        >
          <i className="fas fa-folder-open"></i> Go to Bookings
        </Link>
        <Link
          to="/"
          className="block text-center text-sm text-gray-500 hover:text-pink-700 hover:underline"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};
