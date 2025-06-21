export const FlightDetails = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100 space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-base font-semibold text-gray-800">Flight Details</h3>
        <span className="text-sm text-orange-600 font-medium">One Way</span>
      </div>

      {/* Subtext */}
      <p className="text-xs text-gray-600 font-medium">Sun, 29 Jun · IndiGo · Flight 6E-324</p>

      {/* Flight Timeline */}
      <div className="flex flex-col sm:flex-row items-center justify-between">
        {/* From */}
        <div className="flex items-center gap-3 sm:w-1/3">
          <img
            src="https://images.ixigo.com/img/common-resources/airline-new/6E.png"
            alt="IndiGo"
            className="w-12 h-12 object-contain"
          />
          <div>
            <p className="text-lg font-bold text-gray-800">08:25</p>
            <p className="text-sm font-medium text-gray-700">Chennai – MAA</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative flex-1 mx-4 my-4 sm:my-0">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white px-2 text-xs text-gray-600">
            2h 10m
          </div>
          <div className="border-t border-gray-400"></div>
          <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[11px] text-gray-500">
            Non-stop
          </div>
        </div>

        {/* To */}
        <div className="text-right sm:w-1/3">
          <p className="text-lg font-bold text-gray-800">10:35</p>
          <p className="text-sm font-medium text-gray-700">Trivandrum – TRV</p>
        </div>
      </div>
    </div>
  );
};

