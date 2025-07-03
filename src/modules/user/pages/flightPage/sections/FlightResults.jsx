import { FlightResultCard } from "./FlightResultCard";

export const FlightResults = ({ flights, loading }) => {
  // -------- Utility Functions --------
  const parseDuration = (durationStr) => {
    const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    const hours = match?.[1] ? parseInt(match[1]) : 0;
    const mins = match?.[2] ? parseInt(match[2]) : 0;
    return hours * 60 + mins;
  };

  const isWithinDays = (dateStr, days) => {
    const today = new Date();
    const target = new Date(dateStr);
    const diff = (target - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= days;
  };

  // -------- Derived Metrics --------
  const bestFare = flights.length
    ? Math.min(...flights.map((f) => parseFloat(f.fare.totalFare)))
    : null;

  const bestDuration = flights.length
    ? Math.min(...flights.map((f) => parseDuration(f.outbound.duration)))
    : null;

  return (
    <>
      {/* Heading */}
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800">
          {flights.length > 0
            ? `${flights[0].outbound.segments[0].departure.city} → ${flights[0].outbound.segments[0].arrival.city}`
            : "Search Results"}
        </div>
        <div className="text-sm text-gray-600">
          {loading ? "Loading..." : `${flights.length} Flights Found`}
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-center text-gray-500">Fetching flights...</p>
      ) : flights.length === 0 ? (
        <p className="text-center text-red-500">No flights found</p>
      ) : (
        flights.map((flight, index) => {
          const flightFare = Number(flight.fare.totalFare);
          const flightDuration = parseDuration(flight.outbound.duration);

          const isBestValue = Math.abs(flightFare - bestFare) < 0.01;
          const isFastest = flightDuration === bestDuration;
          const isLimitedTime = isWithinDays(flight.lastTicketingDate, 3);
          const isDirect = flight.outbound.stops === 0;

          return (
            <FlightResultCard
              key={flight.flightId || index}
              {...flight}
              refundable={flight.refundable}
              isBestValue={isBestValue}
              isFastest={isFastest}
              isLimitedTime={isLimitedTime}
              isDirect={isDirect}
            />
          );
        })
      )}
    </>
  );
};
