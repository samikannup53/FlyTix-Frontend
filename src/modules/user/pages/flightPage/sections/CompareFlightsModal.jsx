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
                className="min-w-[220px] md:min-w-[240px] lg:min-w-[250px] border rounded-t-lg text-sm font-medium text-gray-800 p-4 bg-white"
              >
                <p>{flight.validatingAirline}</p>
                <p>
                  {flight.outbound.segments[0]?.departure.city} →{" "}
                  {flight.outbound.segments[0]?.arrival.city}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* === Main Content Section === */}
        <div className="flex-1 overflow-y-auto pb-8">
          <div className="flex">
            {/* Sidebar Labels */}
            <div className="min-w-[180px] md:min-w-[200px] 2xl:min-w-[224px] flex flex-col gap-8 py-4 px-8 text-sm text-gray-700 flex-shrink-0">
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
                  className="min-w-[220px] md:min-w-[240px] lg:min-w-[250px] flex flex-col gap-8 p-4 text-sm text-gray-700 border-x border-b rounded-b-lg bg-white"
                >
                  <div>{flight.outbound.segments[0]?.aircraft || "N/A"}</div>
                  <div>{flight.class || "N/A"}</div>
                  <div>Not Available</div>
                  <div>Not Available</div>
                  <div>Included</div>
                  <div>{flight.baggage?.cabin || "7kg"}</div>
                  <div>{flight.baggage?.checkin || "15kg"}</div>
                  <div>
                    {flight.refundable === "Refundable"
                      ? "Free before 24 hrs"
                      : "Non-refundable"}
                  </div>
                  <div className="font-semibold text-gray-800">
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
                className="min-w-[220px] md:min-w-[240px] bg-pink-700 hover:bg-pink-800 text-white py-2 px-4 rounded-full text-sm font-medium transition"
              >
                Book Now – ₹{flight.fare.totalFare}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
