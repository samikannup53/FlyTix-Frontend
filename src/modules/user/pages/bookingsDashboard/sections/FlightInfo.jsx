export const FlightInfo = () => {
  return (
    <div className="md:w-1/2 space-y-2 border border-orange-100 rounded-xl p-4">
      {/* Top info */}
      <p className="text-sm text-gray-600 font-medium">
        29 June 2025 · IndiGo · Flight 6E-324
      </p>

      {/* Flight Details Layout */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
        {/* From */}
        <div className="flex items-center gap-3 sm:w-1/3">
          <img
            src="https://images.ixigo.com/img/common-resources/airline-new/6E.png"
            alt="IndiGo"
            className="w-12 h-12 object-contain"
          />
          <div>
            <p className="text-xs text-gray-400 mb-1">Sun, 29 Jun</p>
            <p className="text-base font-bold text-gray-800">08:25</p>
            <p className="text-sm text-gray-700">Chennai – MAA</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative flex-1 mx-4 my-4 sm:my-0">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white px-2 text-xs text-gray-600">
            2h 10m
          </div>
          <div className="border-t border-gray-400"></div>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[11px] text-gray-500">
            Non-stop
          </div>
        </div>

        {/* To */}
        <div className="text-right sm:w-1/3">
          <p className="text-xs text-gray-400 mb-1">Sun, 29 Jun</p>
          <p className="text-base font-bold text-gray-800">10:35</p>
          <p className="text-sm text-gray-700">Trivandrum – TRV</p>
        </div>
      </div>
    </div>
  );
};

