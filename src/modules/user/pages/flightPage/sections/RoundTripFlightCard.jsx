import FlightTailLogo from "../../../../../assets/images/flight_tail.png";

export const RoundTripFlightCard = ({
  validatingAirline,
  outbound,
  returnTrip,
  fare,
  refundable,
  isBestValue,
  isLimitedTime,
  isFastest,
  isDirect,
}) => {
  const renderFlightRow = (label, segmentData) => {
    const segment = segmentData.segments[0];
    return (
      <div className="w-full flex flex-col gap-3">
        <p className="text-sm font-semibold text-gray-800">
          {label}:{" "}
          <span className="text-gray-700 font-normal ">
            {segment.flightNumber}
          </span>
        </p>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Airline Logo + Name */}
          <div className="">
            <img
              src={FlightTailLogo}
              alt={validatingAirline}
              className="w-10 object-contain"
            />
          </div>

          {/* Departure */}
          <div className="text-left w-1/5">
            <p className="text-lg font-semibold text-gray-700">
              {segment.departure.time}
            </p>
            <p className="text-sm text-gray-500">
              {segment.departure.city} ({segment.departure.cityCode})
            </p>
          </div>

          {/* Duration + Stops */}
          <div className="text-center w-1/5">
            <p className="text-sm text-gray-600">{segmentData.duration}</p>
            <div className="w-20 h-px bg-gray-400 mx-auto my-1"></div>
            <p className="text-xs text-gray-500">
              {segmentData.stops === 0
                ? "Non-stop"
                : `${segmentData.stops} stop(s)`}
            </p>
          </div>

          {/* Arrival */}
          <div className="text-right w-1/5">
            <p className="text-lg font-semibold text-gray-700">
              {segment.arrival.time}
            </p>
            <p className="text-sm text-gray-500">
              {segment.arrival.city} ({segment.arrival.cityCode})
            </p>
          </div>
        </div>
      </div>
    );
  };

  const Badge = ({ icon, text, bgColor, textColor, borderColor }) => (
    <span
      className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 border 
        ${bgColor} ${textColor} ${borderColor}`}
    >
      <i className={`fa-solid ${icon}`} />
      {text}
    </span>
  );

  return (
    <div className="relative bg-white/80 px-6 py-5 rounded-xl shadow-md hover:shadow-lg border border-gray-200 transition duration-300 flex flex-col gap-6">
      {/* Badge Row */}
      <div className="absolute -top-2 left-4 flex flex-wrap gap-2 z-10">
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
        {isBestValue && (
          <Badge
            icon="fa-tag"
            text="Cheapest"
            bgColor="bg-yellow-50"
            textColor="text-yellow-700"
            borderColor="border-yellow-300"
          />
        )}
        {isFastest && (
          <Badge
            icon="fa-bolt"
            text="Fastest"
            bgColor="bg-blue-50"
            textColor="text-blue-700"
            borderColor="border-blue-300"
          />
        )}
        {isDirect && (
          <Badge
            icon="fa-route"
            text="Non-stop"
            bgColor="bg-indigo-50"
            textColor="text-indigo-700"
            borderColor="border-indigo-300"
          />
        )}
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

      {/* Onward & Return Flight Rows */}
      <div className="flex gap-4">
        {renderFlightRow("Onward", outbound)}

        <div className="border-l border-gray-300" />

        {returnTrip && renderFlightRow("Return", returnTrip)}
      </div>

      {/* Bottom Action Row */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-200 pt-4">
        {/* Left: Actions */}
        <div className="flex gap-4">
          <button className="flex items-center gap-2 text-pink-700 text-sm font-medium hover:text-pink-800 transition cursor-pointer">
            <i className="fa fa-plus-circle"></i> Add to Compare
          </button>
          <span className="text-pink-700">|</span>
          <button className="flex items-center gap-2 text-pink-700 text-sm font-medium hover:text-pink-800 transition cursor-pointer">
            <i className="fa-solid fa-magnifying-glass"></i> View Details
          </button>
        </div>

        {/* Right: Fare + Button */}
        <div className="text-center flex items-center gap-6">
          <p className="text-xl font-bold text-pink-700">₹{fare.totalFare}</p>
          <button className="px-4 py-2 bg-gradient-to-br from-orange-700 via-pink-700 to-pink-800 hover:from-orange-700 hover:to-pink-700 text-white rounded-full text-sm font-medium transition cursor-pointer">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};
