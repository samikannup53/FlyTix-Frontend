export const BookingFlightDetails = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      {/* Title */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          Chennai
          <i className="fas fa-arrow-right text-orange-600 text-sm"></i>
          Bangalore
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Sun, 29 Jun &nbsp;|&nbsp; 1 Stop &nbsp;|&nbsp; 2h 45m &nbsp;|&nbsp; Economy Class
        </p>
      </div>

      {/* Airline Info */}
      <div className="flex items-center gap-3 mb-6">
        <img
          src="https://images.ixigo.com/img/common-resources/airline-new/6E.png"
          className="w-10 h-10 object-contain"
          alt="IndiGo"
        />
        <p className="font-medium text-gray-800 text-base">
          IndiGo <span className="text-gray-400 font-normal">|</span>{' '}
          <span className="text-sm text-gray-500 font-normal">Flight 6E-324</span>
        </p>
      </div>

      {/* Flight Timeline + Baggage Layout */}
      <div className="flex flex-col lg:flex-row justify-between gap-6 w-full">
        {/* Flight Timeline */}
        <div className="w-full lg:w-4/6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            {/* From */}
            <div className="text-center sm:text-left">
              <p className="text-xs text-gray-400 mb-1">Sun, 29 Jun</p>
              <p className="text-2xl font-bold text-gray-800">08:25</p>
              <p className="text-sm font-semibold text-gray-700">Chennai – MAA</p>
              <p className="text-xs text-gray-500 mt-2">Chennai Intl Airport</p>
              <p className="text-xs text-gray-500">Terminal 1</p>
            </div>

            {/* Timeline */}
            <div className="relative flex-1 mx-6 my-4 sm:my-0">
              {/* Duration */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-2 text-xs text-gray-600">
                2h 10m
              </div>
              {/* Line */}
              <div className="border-t border-gray-400 h-0"></div>
              {/* Stops */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[11px] text-gray-500">
                Non-stop
              </div>
            </div>

            {/* To */}
            <div className="text-center sm:text-right">
              <p className="text-xs text-gray-400 mb-1">Sun, 29 Jun</p>
              <p className="text-2xl font-bold text-gray-800">10:35</p>
              <p className="text-sm font-semibold text-gray-700">Trivandrum – TRV</p>
              <p className="text-xs text-gray-500 mt-2">Trivandrum Intl Airport</p>
              <p className="text-xs text-gray-500">Terminal 2</p>
            </div>
          </div>
        </div>

        {/* Baggage Info */}
        <div className="w-full lg:w-2/6 ml-6">
          <h3 className="text-sm font-semibold text-orange-700 mb-4">Baggage</h3>
          <div className="space-y-3 text-xs text-gray-500">
            {/* Cabin */}
            <div className="flex items-center gap-2">
              <i className="fas fa-briefcase text-orange-500 text-base"></i>
              <p className="text-sm text-gray-700 font-semibold">
                <span className="font-medium">Cabin</span>: <span>7 Kg</span> per Adult
              </p>
            </div>

            {/* Check-in */}
            <div className="flex items-center gap-2">
              <i className="fas fa-suitcase-rolling text-orange-500 text-lg"></i>
              <p className="text-sm text-gray-700 font-semibold">
                <span className="font-medium">Check-in</span>: <span>15 Kg</span> per Adult
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

