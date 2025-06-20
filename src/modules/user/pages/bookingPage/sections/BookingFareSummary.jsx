export const BookingFareSummary = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg text-sm text-gray-800 space-y-6">
      {/* Title + Traveller */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-orange-700">Fare Summary</h2>
        <span className="text-sm text-gray-500">1 Traveller</span>
      </div>

      {/* Fare Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Base Fare</span>
          <span>₹3,000</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes & Fees</span>
          <span>₹499</span>
        </div>

        {/* Instant Off with borders */}
        <div className="border-t border-b border-gray-200 py-2 flex justify-between text-green-600 font-medium">
          <span>Instant Off</span>
          <span>-₹100</span>
        </div>

        <div className="pt-3 flex justify-between font-semibold">
          <span>Total Fare</span>
          <span className="text-orange-600">₹3,399</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">Inclusive of all taxes</p>
      </div>
    </div>
  );
};
