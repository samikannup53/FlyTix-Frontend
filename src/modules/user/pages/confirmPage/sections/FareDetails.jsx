import { Link } from 'react-router-dom'; // If you're using React Router

export const FareDetails = () => {
  return (
    <div className="w-full md:w-[320px] space-y-5 md:sticky md:top-[64px]">
      {/* Fare Summary */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100 space-y-3 text-sm text-gray-700">
        <h3 className="text-base font-semibold text-gray-700 mb-2">Fare Summary</h3>
        <div className="flex justify-between">
          <span>Base Fare</span>
          <span>₹3,000</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes & Surcharges</span>
          <span>₹249</span>
        </div>
        <div className="flex justify-between">
          <span>Convenience Fee</span>
          <span>₹150</span>
        </div>
        <div className="border-t pt-3 border-dashed flex justify-between font-semibold text-base">
          <span>Total Paid</span>
          <span className="text-orange-600">₹3,399</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3">
        <Link
          to="/dashboard"
          className="w-full flex justify-center items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white font-semibold text-sm hover:brightness-110 transition-all duration-300"
        >
          <i className="fas fa-folder-open"></i> Go to Bookings
        </Link>
        <Link
          to="/"
          className="block text-center text-sm text-gray-500 hover:underline"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};
