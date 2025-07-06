import React from "react";

// Format date like "29 Jun, Sun"
const formatDate = (dateStr) => {
  const options = { weekday: "short", day: "numeric", month: "short" };
  return new Date(dateStr).toLocaleDateString("en-IN", options);
};

const FlightCard = ({
  badgeLabel,
  segmentData,
  duration,
  stops,
  travelClass,
  baggage,
}) => {
  const segments = segmentData?.segments || [];
  if (segments.length === 0) return null;

  const first = segments[0];
  const last = segments[segments.length - 1];
  const stopsText =
    stops === 0 ? "Non-stop" : `${stops} Stop${stops > 1 ? "s" : ""}`;

  return (
    <div className="relative p-6 bg-white">
      {/* Badge label like "Onward" or "Return Trip" */}
      {badgeLabel && (
        <div className="absolute top-0 left-0 bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-br-xl">
          {badgeLabel}
        </div>
      )}

      {/* Title Row */}
      <div className="mt-2 flex items-center gap-2 text-xl font-semibold text-gray-800">
        {first.departure.city}
        <i className="fas fa-arrow-right text-pink-700 text-sm" />
        {last.arrival.city}
      </div>

      <p className="text-sm text-gray-500 mt-2">
        {formatDate(first.departure.date)} &nbsp;|&nbsp; {stopsText}{" "}
        &nbsp;|&nbsp; {duration} &nbsp;|&nbsp;{" "}
        {travelClass.charAt(0) + travelClass.slice(1).toLowerCase()} Class
      </p>

      {/* Airline Info */}
      <div className="flex items-center gap-3 mb-6 mt-4">
        <img
          src={`https://images.ixigo.com/img/common-resources/airline-new/${first.airlineCode}.png`}
          className="w-10 h-10 object-contain"
          alt={first.airlineName}
        />
        <p className="font-medium text-gray-800 text-base">
          {first.airlineName}{" "}
          <span className="text-gray-400 font-normal">|</span>{" "}
          <span className="text-sm text-gray-500 font-normal">
            Flight {first.flightNumber}
          </span>
        </p>
      </div>

      {/* Timeline and Baggage Info */}
      <div className="flex flex-col lg:flex-row justify-between gap-6 w-full">
        {/* Timeline */}
        <div className="w-full lg:w-4/6 flex flex-col">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            {/* Departure */}
            <div className="text-center sm:text-left flex-1">
              <p className="text-xs text-gray-400 mb-1">
                {formatDate(first.departure.date)}
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {first.departure.time}
              </p>
              <p className="text-sm font-semibold text-gray-700">
                {first.departure.city} – {first.departure.cityCode}
              </p>
            </div>

            {/* Visual Timeline */}
            <div className="relative flex-1 mx-6 my-4 sm:my-0">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-2 text-xs text-gray-600">
                {duration}
              </div>
              <div className="border-t border-gray-400 h-0"></div>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[11px] text-gray-500">
                {stopsText}
              </div>
            </div>

            {/* Arrival */}
            <div className="text-center sm:text-right flex-1">
              <p className="text-xs text-gray-400 mb-1">
                {formatDate(last.arrival.date)}
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {last.arrival.time}
              </p>
              <p className="text-sm font-semibold text-gray-700">
                {last.arrival.city} – {last.arrival.cityCode}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-gray-500 mt-2">
                {first.departure.airport}
              </p>
              <p className="text-xs text-gray-500">
                Terminal {first.departure.terminal}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mt-2">
                {last.arrival.airport}
              </p>
              <p className="text-xs text-gray-500">
                Terminal {last.arrival.terminal}
              </p>
            </div>
          </div>
        </div>

        {/* Baggage */}
        <div className="w-full lg:w-2/6 ml-6">
          <h3 className="text-sm font-semibold text-pink-700 mb-4">Baggage</h3>
          <div className="space-y-3 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <i className="fas fa-briefcase text-pink-700 text-base"></i>
              <p className="text-sm text-gray-700 font-semibold">
                <span className="font-medium">Cabin</span>:{" "}
                {baggage?.cabin || "7 Kg per Adult"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-suitcase-rolling text-pink-700 text-lg"></i>
              <p className="text-sm text-gray-700 font-semibold">
                <span className="font-medium">Check-in</span>:{" "}
                {baggage?.checkIn || "15 Kg per Adult"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BookingFlightDetails = ({ flight, bookingMeta }) => {
  if (!flight || !flight.outbound) return null;

  const { outbound, returnTrip, class: travelClass, baggage } = flight;
  const tripType = bookingMeta?.tripType || "oneway";
  const isRoundTrip = tripType === "roundtrip";

  return (
    <div className="space-y-4">
      {/* Flight container with trip type header */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden divide-y divide-gray-200">
        {/* Header Row: Trip Type + Change Flight */}
        <div className="flex justify-between items-center px-6 py-4">
          <span className="text-sm font-medium text-gray-600">
            <span className="capitalize text-pink-700 font-semibold text-base ">
              {tripType}
            </span>
          </span>
          <button className="cursor-pointer flex items-center gap-1 text-sm font-medium text-pink-700 hover:underline">
            <i className="fa-solid fa-arrows-rotate text-pink-600"></i>
            Change Flight
          </button>
        </div>

        {/* Outbound (with badge only for roundtrip) */}
        <FlightCard
          badgeLabel={isRoundTrip ? "Onward" : null}
          segmentData={outbound}
          duration={outbound.duration}
          stops={outbound.stops}
          travelClass={travelClass}
          baggage={baggage}
        />

        {/* Return Trip (only for roundtrip) */}
        {isRoundTrip && returnTrip && (
          <FlightCard
            badgeLabel="Return Trip"
            segmentData={returnTrip}
            duration={returnTrip.duration}
            stops={returnTrip.stops}
            travelClass={travelClass}
            baggage={baggage}
          />
        )}
      </div>
    </div>
  );
};
