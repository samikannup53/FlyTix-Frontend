export const FlightSummary = ({ booking }) => {
  if (!booking) return null;

  const journey = booking.journey?.[0];
  if (!journey) return null;

  const { outbound, returnTrip } = journey;

  const getTripInfo = (trip) => {
    const first = trip?.segments?.[0];
    const last = trip?.segments?.[trip.segments.length - 1];
    return {
      airlineCode: first?.airlineCode || "6E",
      airlineName: first?.airlineName || "N/A",
      flightNumber: first?.flightNumber || "N/A",
      departure: first?.from || {},
      arrival: last?.to || {},
      duration: trip?.duration || "N/A",
      stops: trip?.stops === 0 ? "Non-stop" : `${trip?.stops} Stop(s)`,
    };
  };

  const outboundInfo = getTripInfo(outbound);
  const returnInfo = returnTrip ? getTripInfo(returnTrip) : null;

  const getFormattedDate = (dateStr) => {
    const options = { weekday: "short", day: "2-digit", month: "short" };
    const date = new Date(dateStr);
    return isNaN(date) ? "N/A" : date.toLocaleDateString("en-GB", options);
  };

  const renderTrip = (label, info, isFirst) => (
    <div className={!isFirst ? "pt-4 mt-4 border-t border-gray-200" : ""}>
      {/* Trip Label */}

      {booking.tripType === "Roundtrip" && (
        <div className="flex gap-4 items-center mb-2">
          <p className="text-base font-semibold text-gray-800">
            {info.departure.city || "N/A"}
            <span className="mx-2">
              <i className="fa fa-arrow-right"></i>
            </span>
            {info.arrival.city || "N/A"}
          </p>
          <span className="text-xs font-semibold text-pink-700 bg-pink-100 border border-pink-300 px-2 py-0.5 rounded-full">
            {label}
          </span>
        </div>
      )}

      {/* Date & Flight Info */}

      <p className="text-sm text-gray-500 mt-2">
        {getFormattedDate(info.departure.date)} &nbsp;|&nbsp;
        {info.airlineName} &nbsp;|&nbsp; Flight {info.flightNumber}{" "}
        &nbsp;|&nbsp;
        {booking.journey?.[0]?.travelClass.charAt(0) +
          booking.journey?.[0]?.travelClass.slice(1).toLowerCase()}{" "}
        Class
      </p>

      {/* Timeline */}
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
              {info.departure.time || "--:--"}
            </p>
            <p className="text-sm font-medium text-gray-700">
              {info.departure.city || "N/A"} –{" "}
              {info.departure.cityCode || "N/A"}
            </p>
          </div>
        </div>

        {/* Timeline Graphic */}
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
            {info.arrival.time || "--:--"}
          </p>
          <p className="text-sm font-medium text-gray-700">
            {info.arrival.city || "N/A"} – {info.arrival.cityCode || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-pink-100 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-pink-700">Flight Details</h3>
        <span className="text-sm text-pink-700 font-medium">
          {booking.tripType === "Roundtrip" ? "Round Trip" : "One Way"}
        </span>
      </div>

      {/* Flight Segment(s) */}
      {renderTrip("Onward", outboundInfo, true)}
      {returnInfo && renderTrip("Return Trip", returnInfo, false)}
    </div>
  );
};
