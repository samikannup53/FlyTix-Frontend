import FlightTailLogo from "../../../../../assets/images/flight_tail.png";

export const FlightResultCard = ({
  validatingAirline,
  outbound,
  fare,
  refundable,
  isBestValue,
  isLimitedTime,
  isFastest,
  isDirect,
}) => {
  const segment = outbound.segments[0]; // first leg

  return (
    <div className="relative bg-white/80 p-6 rounded-xl shadow-md flex flex-col gap-4">
      {/* Badge Section */}
      <div className="absolute top-3 left-4 flex flex-wrap gap-2 z-10">
        {refundable && refundable !== "Not Specified" && (
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              refundable === "Refundable"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {refundable}
          </span>
        )}

        {isBestValue && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium">
            Best Value
          </span>
        )}

        {isFastest && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">
            Fastest Flight
          </span>
        )}

        {isDirect && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-medium">
            Direct Flight
          </span>
        )}

        {isLimitedTime && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-medium">
            Limited Time
          </span>
        )}
      </div>

      {/* Top Section: Airline Info + Flight Info */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <img
            src={FlightTailLogo}
            alt={validatingAirline}
            className="w-12 object-contain"
          />
          <div>
            <h3 className="font-semibold text-gray-800">{validatingAirline}</h3>
            <p className="text-xs text-gray-500">{segment.flightNumber}</p>
          </div>
        </div>

        <div className="text-left">
          <p className="text-lg font-semibold text-gray-700">
            {segment.departure.time}
          </p>
          <p className="text-sm text-gray-500">
            {segment.departure.city} ({segment.departure.cityCode})
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">{outbound.duration}</p>
          <div className="w-24 h-px bg-gray-400 mx-auto my-1"></div>
          <p className="text-xs text-gray-500">
            {outbound.stops === 0 ? "Non-stop" : `${outbound.stops} stop(s)`}
          </p>
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold text-gray-700">
            {segment.arrival.time}
          </p>
          <p className="text-sm text-gray-500">
            {segment.arrival.city} ({segment.arrival.cityCode})
          </p>
        </div>

        <div className="text-center">
          <p className="text-xl font-bold text-orange-600">₹{fare.totalFare}</p>
          <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600 transition">
            Book Now
          </button>
        </div>
      </div>

      {/* Bottom Buttons Section */}
      <div className="flex justify-start items-center gap-6 mt-2">
        <button className="flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700 transition">
          <i className="fa-regular fa-square-plus"></i>
          Add to Compare
        </button>
        <button className="flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700 transition">
          <i className="fa-solid fa-magnifying-glass"></i>
          View Details
        </button>
      </div>
    </div>
  );
};
