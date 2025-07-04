import FlightTailLogo from "../../../../../assets/images/flight_tail.png";

export const RoundTripFlightCard = ({
  flight,
  isSelected,
  onSelect,
  refundable,
  isCheapest,
  isFastest,
  isNonStop,
  isLimitedTime,
}) => {
  if (!flight || !flight.outbound || !flight.returnTrip) {
    return (
      <div className="p-4 bg-red-50 border border-red-300 rounded text-red-700">
        Invalid roundtrip flight data
      </div>
    );
  }

  const { outbound, returnTrip, fare, validatingAirline } = flight;

  const outboundSegment = outbound.segments[0];
  const returnSegment = returnTrip.segments[0];

  return (
    <div
      className={`relative bg-white/80 px-6 py-4 rounded-xl shadow-md flex flex-col gap-6 border-2 transition ${
        isSelected ? "border-orange-500" : "border-transparent"
      }`}
      onClick={onSelect}
    >
      {/* Badges */}
      <div className="absolute -top-2 left-4 flex flex-wrap gap-2 z-10">
        {refundable && refundable !== "Not Specified" && (
          <span className="text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 border bg-green-50 text-green-700 border-green-300">
            <i className="fa-solid fa-circle-check" />
            {refundable}
          </span>
        )}
        {isCheapest && (
          <span className="text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 border bg-yellow-50 text-yellow-700 border-yellow-300">
            <i className="fa-solid fa-tag" />
            Cheapest
          </span>
        )}
        {isFastest && (
          <span className="text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 border bg-blue-50 text-blue-700 border-blue-300">
            <i className="fa-solid fa-bolt" />
            Fastest
          </span>
        )}
        {isNonStop && (
          <span className="text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 border bg-indigo-50 text-indigo-700 border-indigo-300">
            <i className="fa-solid fa-route" />
            Non-stop
          </span>
        )}
        {isLimitedTime && (
          <span className="text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 border bg-orange-50 text-orange-700 border-orange-300">
            <i className="fa-solid fa-hourglass-half" />
            Limited Time
          </span>
        )}
      </div>

      {/* Flight Info: Outbound and Return Columns */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
        {/* Outbound */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="text-sm text-gray-500">Outbound</div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-700">{outboundSegment.departure.time}</div>
            <div className="text-sm text-gray-500">
              {outboundSegment.departure.city} ({outboundSegment.departure.cityCode})
            </div>
          </div>
          <div className="text-xs text-gray-400">{outbound.duration}</div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-700">{outboundSegment.arrival.time}</div>
            <div className="text-sm text-gray-500">
              {outboundSegment.arrival.city} ({outboundSegment.arrival.cityCode})
            </div>
          </div>
        </div>

        {/* Return */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="text-sm text-gray-500">Return</div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-700">{returnSegment.departure.time}</div>
            <div className="text-sm text-gray-500">
              {returnSegment.departure.city} ({returnSegment.departure.cityCode})
            </div>
          </div>
          <div className="text-xs text-gray-400">{returnTrip.duration}</div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-700">{returnSegment.arrival.time}</div>
            <div className="text-sm text-gray-500">
              {returnSegment.arrival.city} ({returnSegment.arrival.cityCode})
            </div>
          </div>
        </div>

        {/* Fare + Select */}
        <div className="flex flex-col items-center">
          <img src={FlightTailLogo} className="w-12 mb-2" alt="flight tail" />
          <p className="text-xl font-bold text-pink-700 mb-2">₹{fare.totalFare}</p>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              isSelected
                ? "bg-orange-500 text-white"
                : "bg-pink-600 text-white hover:bg-pink-700"
            }`}
          >
            {isSelected ? "Selected" : "Select"}
          </button>
        </div>
      </div>
    </div>
  );
};
