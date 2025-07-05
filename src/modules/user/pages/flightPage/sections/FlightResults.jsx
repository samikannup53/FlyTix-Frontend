import { useState } from "react";
import { FlightResultCard } from "./FlightResultCard";
import { RoundTripFlightCard } from "./RoundTripFlightCard";
import { FlightDetailsModal } from "./FlightDetailsModal";

export const FlightResults = ({ flights, loading, tripType }) => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (flight) => {
    setSelectedFlight(flight);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedFlight(null);
    setShowModal(false);
  };

  // Convert duration string like 'PT2H30M' into total minutes
  const parseDuration = (durationStr) => {
    const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    const hours = match?.[1] ? parseInt(match[1]) : 0;
    const mins = match?.[2] ? parseInt(match[2]) : 0;
    return hours * 60 + mins;
  };

  // Check if a date is within the next `days` days
  const isWithinDays = (dateStr, days) => {
    const today = new Date();
    const target = new Date(dateStr);
    const diff = (target - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= days;
  };

  const filteredByTripType = flights.filter((flight) => {
    // Skip round-trip cards if returnTrip is null
    if (tripType === "roundtrip" && !flight.returnTrip) return false;

    // Skip one-way cards if returnTrip exists
    if (tripType === "oneway" && flight.returnTrip) return false;

    return true;
  });

  // Lowest total fare among all flights
  const lowestFare = flights.length
    ? Math.min(...flights.map((f) => parseFloat(f.fare.totalFare)))
    : null;

  // Shortest duration among all flights
  const shortestDuration = flights.length
    ? Math.min(...flights.map((f) => parseDuration(f.outbound.duration)))
    : null;

  // -------- Render --------

  return (
    <>
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800">
          {filteredByTripType.length > 0
            ? `${filteredByTripType[0].outbound.segments[0].departure.city} → ${filteredByTripType[0].outbound.segments[0].arrival.city}`
            : "Search Results"}
        </div>
        <div className="text-sm text-gray-600">
          {loading
            ? "Loading..."
            : `${filteredByTripType.length} Flights Found`}
        </div>
      </div>

      {/* Result List */}
      {loading ? (
        <p className="text-center text-gray-500">Fetching flights...</p>
      ) : flights.length === 0 ? (
        <p className="text-center text-red-500">No flights found</p>
      ) : (
        filteredByTripType.map((flight, index) => {
          const flightFare = parseFloat(flight.fare.totalFare);
          const flightDuration = parseDuration(flight.outbound.duration);
          const stops = flight.outbound.stops;

          const isCheapest = flightFare === lowestFare;
          const isFastest = flightDuration === shortestDuration;
          const isNonStop = stops === 0;
          const isLimitedTime = isWithinDays(flight.lastTicketingDate, 3);
          const isRefundable =
            flight.refundable && flight.refundable !== "Not Specified";

          const commonProps = {
            ...flight,
            refundable: isRefundable ? flight.refundable : null,
            isCheapest,
            isFastest,
            isNonStop,
            isLimitedTime,
          };

          const key = flight.flightId || index;

          return tripType === "roundtrip" ? (
            <RoundTripFlightCard
              key={key}
              {...commonProps}
              onViewDetails={() => handleViewDetails(flight)}
            />
          ) : (
            <FlightResultCard
              key={key}
              {...commonProps}
              onViewDetails={() => handleViewDetails(flight)}
            />
          );
        })
      )}
      <FlightDetailsModal
        isOpen={showModal}
        flight={selectedFlight}
        onClose={handleCloseModal}
      />
    </>
  );
};
