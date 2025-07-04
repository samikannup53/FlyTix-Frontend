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
  const outboundSeg = outbound.segments[0];
  const returnSeg = returnTrip?.segments?.[0];

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
    <div className="relative bg-white/80 px-6 py-4 rounded-xl shadow-md flex flex-col gap-6">
      {/* Badge Section */}
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

      {/* Outbound & Return Flight Sections */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Outbound */}
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Outbound</h4>
          <div className="flex items-center gap-4">
            <img
              src={FlightTailLogo}
              alt={validatingAirline}
              className="w-12 object-contain"
            />
            <div>
              <h3 className="font-semibold text-gray-800">{validatingAirline}</h3>
              <p className="text-xs text-gray-500">{outboundSeg.flightNumber}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-left">
              <p className="text-lg font-semibold text-gray-700">{outboundSeg.departure.time}</p>
              <p className="text-sm text-gray-500">
                {outboundSeg.departure.city} ({outboundSeg.departure.cityCode})
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">{outbound.duration}</p>
              <div className="w-24 h-px bg-gray-400 my-1 mx-auto" />
              <p className="text-xs text-gray-500">
                {outbound.stops === 0 ? "Non-stop" : `${outbound.stops} stop(s)`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-700">{outboundSeg.arrival.time}</p>
              <p className="text-sm text-gray-500">
                {outboundSeg.arrival.city} ({outboundSeg.arrival.cityCode})
              </p>
            </div>
          </div>
        </div>

        {/* Return */}
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Return</h4>
          {returnSeg ? (
            <>
              <div className="flex items-center gap-4">
                <img
                  src={FlightTailLogo}
                  alt={validatingAirline}
                  className="w-12 object-contain"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{validatingAirline}</h3>
                  <p className="text-xs text-gray-500">{returnSeg.flightNumber}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-left">
                  <p className="text-lg font-semibold text-gray-700">{returnSeg.departure.time}</p>
                  <p className="text-sm text-gray-500">
                    {returnSeg.departure.city} ({returnSeg.departure.cityCode})
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">{returnTrip.duration}</p>
                  <div className="w-24 h-px bg-gray-400 my-1 mx-auto" />
                  <p className="text-xs text-gray-500">
                    {returnTrip.stops === 0 ? "Non-stop" : `${returnTrip.stops} stop(s)`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-700">{returnSeg.arrival.time}</p>
                  <p className="text-sm text-gray-500">
                    {returnSeg.arrival.city} ({returnSeg.arrival.cityCode})
                  </p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-red-500">Return trip data missing</p>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center pt-4">
        <div className="text-xl font-bold text-pink-700">₹{fare.totalFare}</div>
        <button className="px-4 py-2 bg-gradient-to-br from-orange-700 via-pink-700 to-pink-800 hover:from-orange-700 hover:to-pink-700 text-white rounded-full text-sm font-medium transition cursor-pointer">
          Book Now
        </button>
      </div>
    </div>
  );
};
