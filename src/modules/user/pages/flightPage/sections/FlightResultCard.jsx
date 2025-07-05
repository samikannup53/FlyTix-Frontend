import FlightTailLogo from "../../../../../assets/images/flight_tail.png";

export const FlightResultCard = ({
  validatingAirline,
  flightId,
  outbound,
  fare,
  refundable,
  isBestValue,
  isLimitedTime,
  isFastest,
  isDirect,
  onViewDetails,
  onAddToCompare,
  compareFlights,
}) => {
  const segment = outbound.segments[0]; // First leg of the flight

  // Utility function to render a badge with icon and styles
  const Badge = ({ icon, text, bgColor, textColor, borderColor }) => (
    <span
      className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 border 
        ${bgColor} ${textColor} ${borderColor}`}
    >
      <i className={`fa-solid ${icon}`} />
      {text}
    </span>
  );

  const isAlreadyAdded = compareFlights?.some((f) => f.flightId === flightId);

  return (
    <div className="relative bg-white/80 px-6 py-4 rounded-xl shadow-md flex flex-col gap-6">
      {/* Badge Section */}
      <div className="absolute -top-2 left-4 flex flex-wrap gap-2 z-10">
        {/* Refundable Badge */}
        {refundable && refundable !== "Not Specified" && (
          <Badge
            icon={
              refundable === "Refundable"
                ? "fa-circle-check"
                : "fa-circle-xmark"
            }
            text={refundable}
            bgColor={refundable === "Refundable" ? "bg-green-50" : "bg-red-50"}
            textColor={
              refundable === "Refundable" ? "text-green-700" : "text-red-700"
            }
            borderColor={
              refundable === "Refundable"
                ? "border-green-300"
                : "border-red-300"
            }
          />
        )}

        {/* Cheapest Badge */}
        {isBestValue && (
          <Badge
            icon="fa-tag"
            text="Cheapest"
            bgColor="bg-yellow-50"
            textColor="text-yellow-700"
            borderColor="border-yellow-300"
          />
        )}

        {/* Fastest Badge */}
        {isFastest && (
          <Badge
            icon="fa-bolt"
            text="Fastest"
            bgColor="bg-blue-50"
            textColor="text-blue-700"
            borderColor="border-blue-300"
          />
        )}

        {/* Non-Stop Badge */}
        {isDirect && (
          <Badge
            icon="fa-route"
            text="Non-stop"
            bgColor="bg-indigo-50"
            textColor="text-indigo-700"
            borderColor="border-indigo-300"
          />
        )}

        {/* Limited Time Badge */}
        {isLimitedTime && (
          <Badge
            icon="fa-hourglass-half"
            text="Limited Time"
            bgColor="bg-orange-50"
            textColor="text-orange-700"
            borderColor="border-orange-300"
          />
        )}
      </div>

      {/* Top Section: Airline & Flight Info */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Airline */}
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

        {/* Departure */}
        <div className="text-left">
          <p className="text-lg font-semibold text-gray-700">
            {segment.departure.time}
          </p>
          <p className="text-sm text-gray-500">
            {segment.departure.city} ({segment.departure.cityCode})
          </p>
        </div>

        {/* Duration and Stops */}
        <div className="text-center">
          <p className="text-sm text-gray-600">{outbound.duration}</p>
          <div className="w-24 h-px bg-gray-400 mx-auto my-1"></div>
          <p className="text-xs text-gray-500">
            {outbound.stops === 0 ? "Non-stop" : `${outbound.stops} stop(s)`}
          </p>
        </div>

        {/* Arrival */}
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-700">
            {segment.arrival.time}
          </p>
          <p className="text-sm text-gray-500">
            {segment.arrival.city} ({segment.arrival.cityCode})
          </p>
        </div>

        {/* Fare + Book Button */}
        <div className="text-center">
          <p className="text-xl font-bold text-pink-700">₹{fare.totalFare}</p>
          <button className="mt-2 px-4 py-2 bg-gradient-to-br from-orange-700 via-pink-700 to-pink-800 hover:from-orange-700 hover:to-pink-700 text-white rounded-full text-sm font-medium transition cursor-pointer">
            Book Now
          </button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-end items-center gap-2">
        <button
          onClick={onAddToCompare}
          disabled={isAlreadyAdded}
          className={`flex items-center gap-2 text-sm font-medium transition  ${
            isAlreadyAdded
              ? "text-pink-700 cursor-not-allowed"
              : "text-pink-700 hover:text-pink-800 cursor-pointer"
          }`}
        >
          <i
            className={`fa ${
              isAlreadyAdded ? "fa-check-circle" : "fa-plus-circle"
            }`}
          ></i>
          {isAlreadyAdded ? "Added" : "Add to Compare"}
        </button>
        <span className="text-pink-700">|</span>
        <button
          onClick={onViewDetails}
          className="flex items-center gap-2 text-pink-700 text-sm font-medium hover:text-pink-800 transition cursor-pointer"
        >
          <i className="fa-solid fa-magnifying-glass"></i> View Details
        </button>
      </div>
    </div>
  );
};
