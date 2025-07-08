export const FlightSummary = ({ booking }) => {
  if (!booking || !Array.isArray(booking.journey)) return null;

  const journey = booking.journey[0];
  const { outbound, returnTrip } = journey || {};

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date)
      ? "N/A"
      : date.toLocaleDateString("en-GB", {
          weekday: "short",
          day: "2-digit",
          month: "short",
        });
  };

  const getTripInfo = (trip) => {
    if (!trip || !trip.segments?.length) return null;

    const first = trip.segments[0];
    const last = trip.segments[trip.segments.length - 1];

    return {
      airlineCode: first.airlineCode || "NA",
      airlineName: first.airlineName || "NA",
      flightNumber: first.flightNumber || "NA",
      departureTime: first.from?.time || "--:--",
      departureCity: first.from?.city || "NA",
      departureCode: first.from?.cityCode || "NA",
      departureDate: first.from?.date || null,
      arrivalTime: last.to?.time || "--:--",
      arrivalCity: last.to?.city || "NA",
      arrivalCode: last.to?.cityCode || "NA",
      duration: trip.duration || "NA",
      stops: trip.stops === 0 ? "Non-stop" : `${trip.stops} Stop(s)`,
    };
  };

  const renderTrip = (label, info, isFirst) => {
    if (!info) return null;

    return (
      <div className={!isFirst ? "pt-4 mt-4 border-t border-gray-200" : ""}>
        {booking.tripType === "Roundtrip" && (
          <div className="flex gap-4 items-center mb-2">
            <p className="text-base font-semibold text-gray-800">
              {info.departureCity} <i className="fa fa-arrow-right mx-2" />{" "}
              {info.arrivalCity}
            </p>
            <span className="text-xs font-semibold text-pink-700 bg-pink-100 border border-pink-300 px-2 py-0.5 rounded-full">
              {label}
            </span>
          </div>
        )}

        <p className="text-sm text-gray-500 mt-2">
          {formatDate(info.departureDate)} &nbsp;|&nbsp;
          {info.airlineName} &nbsp;|&nbsp; Flight {info.flightNumber}{" "}
          &nbsp;|&nbsp;
          {journey.travelClass?.[0].toUpperCase() +
            journey.travelClass?.slice(1).toLowerCase()}{" "}
          Class
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-between mt-2">
          {/* From */}
          <div className="flex items-center gap-3 sm:w-1/3">
            <img
              src={`https://images.ixigo.com/img/common-resources/airline-new/${info.airlineCode}.png`}
              alt={info.airlineName}
              className="w-12 h-12 object-contain"
            />
            <div>
              <p className="text-lg font-bold text-gray-800">
                {info.departureTime}
              </p>
              <p className="text-sm font-medium text-gray-700">
                {info.departureCity} – {info.departureCode}
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative flex-1 mx-4 my-4 sm:my-0">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white px-2 text-xs text-gray-600">
              {info.duration}
            </div>
            <div className="border-t border-gray-400"></div>
            <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[11px] text-gray-500">
              {info.stops}
            </div>
          </div>

          {/* To */}
          <div className="text-right sm:w-1/3">
            <p className="text-lg font-bold text-gray-800">
              {info.arrivalTime}
            </p>
            <p className="text-sm font-medium text-gray-700">
              {info.arrivalCity} – {info.arrivalCode}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const outboundInfo = getTripInfo(outbound);
  const returnInfo = returnTrip ? getTripInfo(returnTrip) : null;

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-pink-100 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-pink-700">Flight Details</h3>
        <span className="text-sm text-pink-700 font-medium">
          {booking.tripType === "Roundtrip" ? "Round Trip" : "One Way"}
        </span>
      </div>

      {renderTrip("Onward", outboundInfo, true)}
      {returnInfo && renderTrip("Return", returnInfo, false)}
    </div>
  );
};
