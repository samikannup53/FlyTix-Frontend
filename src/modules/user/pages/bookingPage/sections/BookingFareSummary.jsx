export const BookingFareSummary = ({ flight }) => {
  if (!flight || !flight.fare) return null;

  const baseFare = parseFloat(flight.fare.baseFare || 0);
  const taxes = parseFloat(flight.fare.taxes || 0);
  const instantOff = parseFloat(flight.fare.instantDiscount || 0);
  const totalFare = parseFloat(flight.fare.totalFare || 0);

  const formatted = (amount) => (
    <span className="text-sm text-gray-700">
      <i className="fas fa-indian-rupee-sign mr-1" />
      {amount.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
    </span>
  );

  return (
    <div className="bg-white px-6 py-4 rounded-2xl shadow-lg text-sm text-gray-800 space-y-6">
      {/* Title + Traveller */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-pink-700">Fare Summary</h2>
        <span className="text-sm text-gray-500">
          {flight.passengers?.adults || 1}{" "}
          {flight.passengers?.adults > 1 ? "Travellers" : "Traveller"}
        </span>
      </div>

      {/* Fare Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Base Fare</span>
          <span>{formatted(baseFare)}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes & Fees</span>
          <span>{formatted(taxes)}</span>
        </div>

        {/* Instant Off with borders */}
        <div className="border-t border-b border-gray-200 py-2 flex justify-between text-green-600 font-medium">
          <span>Instant Off</span>
          <span>- &nbsp;{formatted(instantOff)}</span>
        </div>

        <div className="pt-3 flex justify-between font-semibold">
          <span>Total Fare</span>
          <span className="text-orange-600">{formatted(totalFare)}</span>
        </div>

        <p className="text-xs text-gray-500 mt-2">Inclusive of all taxes</p>
      </div>
    </div>
  );
};
