import FlightTailLogo from "../../../../../assets/images/flight_tail.png";

export const CompareFlightsModal = ({ flights, onClose }) => {
  if (!flights || flights.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50 px-4 h-screen">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl 2xl:max-w-7xl w-full max-h-[85vh] flex flex-col relative">
        {/* === Header === */}
        <div className="flex justify-between items-center px-4 md:px-6 py-4 border-b border-gray-300 bg-pink-100/50 rounded-t-xl">
          <h2 className="text-base md:text-lg font-semibold text-gray-800">
            Compare Your Flights
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-pink-700 text-2xl md:text-3xl"
          >
            &times;
          </button>
        </div>

        {/* === Flight Card Titles === */}
        <div className="sticky top-0 z-10 bg-white flex pt-4">
          {/* Sidebar Title */}
          <div className="min-w-[180px] md:min-w-[200px] 2xl:min-w-[224px] py-4 px-6 font-semibold text-sm text-gray-800 bg-white flex-shrink-0">
            Flight Summary
          </div>
          {/* Flight Card Headers */}
          <div className="flex overflow-x-hidden gap-4 md:gap-6 pr-4 flex-1">
            {flights.map((flight) => (
              <div
                key={flight.flightId}
                className="flex items-center gap-2 min-w-[220px] md:min-w-[240px] lg:min-w-[250px] border border-gray-300 rounded-t-lg text-sm font-medium text-gray-800 p-4 bg-white"
              >
                {/* Flight Info */}
                <div className="flex flex-col w-full">
                  {/* Airline and Flight Number */}
                  <p className="flex gap-2  items-center">
                    <img
                      src={FlightTailLogo}
                      className="w-6"
                      alt="flight-logo"
                    />
                    {flight.outbound.segments[0]?.airlineName || flight.validatingAirline} | Flight:{" "}
                    {flight.outbound.segments[0]?.flightNumber}
                  </p>

                  {/* Route Row: 3 columns in one line */}
                  <div className="flex justify-between items-center text-xs text-gray-600 font-normal mt-1">
                    {/* From City & Time */}
                    <div className="flex-1 flex flex-col items-start">
                      <span>
                        {flight.outbound.segments[0]?.departure.cityCode}
                      </span>
                      <span>
                        {flight.outbound.segments[0]?.departure.time?.slice(
                          0,
                          5
                        )}
                      </span>
                    </div>

                    {/* Duration and Stops */}
                    <div className="flex-1 flex flex-col items-center text-center">
                      <span>{flight.outbound.duration}</span>
                      <div className=" w-full border-b border-b-gray-300"></div>
                      <span>
                        {flight.outbound.stops === 0
                          ? "Non-stop"
                          : `${flight.outbound.stops} stop${
                              flight.outbound.stops > 1 ? "s" : ""
                            }`}
                      </span>
                    </div>

                    {/* To City & Time */}
                    <div className="flex-1 flex flex-col items-end">
                      <span>
                        {flight.outbound.segments[0]?.arrival.cityCode}
                      </span>
                      <span>
                        {flight.outbound.segments[0]?.arrival.time?.slice(0, 5)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === Main Content Section === */}
        <div className="flex-1 overflow-y-auto pb-8">
          <div className="flex">
            {/* Sidebar Labels */}
            <div className="min-w-[180px] md:min-w-[200px] 2xl:min-w-[224px] flex flex-col gap-8 mt-1 py-4 px-8 text-sm text-gray-700 flex-shrink-0">
              <div>
                <i className="fa fa-plane mr-2 text-pink-700" />
                Fleet
              </div>
              <div>
                <i className="fa fa-chair mr-2 text-pink-700" />
                Seating
              </div>
              <div>
                <i className="fa fa-plug mr-2 text-pink-700" />
                Power
              </div>
              <div>
                <i className="fa fa-tv mr-2 text-pink-700" />
                Infotainment
              </div>
              <div>
                <i className="fa fa-utensils mr-2 text-pink-700" />
                Meals
              </div>
              <div>
                <i className="fa fa-suitcase mr-2 text-pink-700" />
                Cabin Bag
              </div>
              <div>
                <i className="fa fa-luggage-cart mr-2 text-pink-700" />
                Check-in
              </div>
              <div>
                <i className="fa fa-ban mr-2 text-pink-700" />
                Cancellation
              </div>
              <div>
                <i className="fa fa-indian-rupee-sign mr-2 text-pink-700" />
                Price
              </div>
            </div>

            {/* Flight Info Columns */}
            <div className="flex gap-4 md:gap-6 pr-4 overflow-x-hidden">
              {flights.map((flight) => (
                <div
                  key={flight.flightId}
                  className="min-w-[220px] md:min-w-[240px] lg:min-w-[250px] flex flex-col gap-7 p-4 text-sm text-gray-700 border-x border-x-gray-300 border-b border-b-gray-300 rounded-b-lg bg-white"
                >
                  <div className="flex items-center justify-center   gap-2 text-sm text-gray-700">
                    {flight.outbound.segments[0]?.aircraft ? (
                      <span>{flight.outbound.segments[0].aircraft}</span>
                    ) : (
                      <>
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full text-xs">
                          <i className="fa fa-circle-info" />
                        </span>
                        <span>Not Available</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-center  gap-2 text-sm text-gray-700">
                    {flight.outbound.segments[0]?.aircraft ? (
                      <span>{flight.seating}</span>
                    ) : (
                      <>
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full text-xs">
                          <i className="fa fa-circle-info" />
                        </span>
                        <span>Not Available</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-center  gap-2 text-sm text-gray-700">
                    {flight.outbound.segments[0]?.aircraft ? (
                      <span>{flight.power}</span>
                    ) : (
                      <>
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full text-xs">
                          <i className="fa fa-circle-info" />
                        </span>
                        <span>Not Available</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-center  gap-2 text-sm text-gray-700">
                    {flight.outbound.segments[0]?.aircraft ? (
                      <span>{flight.infotainment}</span>
                    ) : (
                      <>
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full text-xs">
                          <i className="fa fa-circle-info" />
                        </span>
                        <span>Not Available</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-center  gap-2 text-sm text-gray-700">
                    {flight.outbound.segments[0]?.aircraft ? (
                      <span>{flight.meals}</span>
                    ) : (
                      <>
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full text-xs">
                          <i className="fa fa-circle-info" />
                        </span>
                        <span>Not Available</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                    {flight.baggage?.cabin ? (
                      <>
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-pink-100 text-pink-700 rounded-full text-xs">
                          <i className="fa fa-suitcase-rolling" />
                        </span>
                        <span>{flight.baggage.cabin}</span>
                      </>
                    ) : (
                      <>
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs">
                          <i className="fa fa-circle-info" />
                        </span>
                        <span className="text-gray-500">7 Kg</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                    {flight.baggage?.checkIn ? (
                      <>
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-pink-100 text-pink-700 rounded-full text-xs">
                          <i className="fa fa-suitcase-rolling" />
                        </span>
                        <span>{flight.baggage.checkIn}</span>
                      </>
                    ) : (
                      <>
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs">
                          <i className="fa fa-circle-info" />
                        </span>
                        <span className="text-gray-500">15 Kg</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 text-orange-600 rounded-full text-xs">
                      <i className="fa fa-circle-info" />
                    </span>
                    <span>Charges applicable</span>
                  </div>
                  <div className="flex items-center  justify-center gap-2 text-sm font-semibold text-gray-800">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-full text-xs">
                      <i className="fa fa-indian-rupee-sign" />
                    </span>
                    ₹{flight.fare.totalFare}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* === Footer === */}
        <div className="flex sticky bottom-0 bg-white border-t py-4 rounded-b-xl">
          <div className="min-w-[180px] md:min-w-[200px] 2xl:min-w-[224px]" />
          <div className="flex gap-8 overflow-x-hidden flex-1 pr-4">
            {flights.map((flight) => (
              <button
                key={flight.flightId}
                className="min-w-[220px] md:min-w-[240px] py-2 px-4 rounded-full font-medium text-white transition relative overflow-hidden group bg-gradient-to-br from-pink-700 to-orange-700 shadow-md hover:from-pink-800 hover:to-orange-700"
              >
                <div className="flex items-center justify-center gap-2">
                  <i className="fa fa-plane-departure text-sm text-white drop-shadow-sm" />
                  <span>Book Now</span>
                  <span className="flex items-center gap-1 font-semibold text-base">
                    <i className="fa fa-indian-rupee-sign text-xs" />
                    {flight.fare.totalFare}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
