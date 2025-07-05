import { useState } from "react";
import { FlightResultCard } from "./FlightResultCard";
import { RoundTripFlightCard } from "./RoundTripFlightCard";
import { FlightDetailsModal } from "./FlightDetailsModal";
import { CompareFlightsModal } from "./CompareFlightsModal";
import FlightTailLogo from "../../../../../assets/images/flight_tail.png";

export const FlightResults = ({ flights, loading, tripType }) => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showFlightDetailsModal, setShowFlightDetailsModal] = useState(false);

  const [compareFlights, setCompareFlights] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const handleViewDetails = (flight) => {
    setSelectedFlight(flight);
    setShowFlightDetailsModal(true);
  };

  const handleCloseModal = () => {
    setSelectedFlight(null);
    setShowFlightDetailsModal(false);
  };

  const handleAddToCompare = (flight) => {
    setCompareFlights((prev) => {
      if (prev.find((f) => f.flightId === flight.flightId)) return prev; // Already added
      if (prev.length >= 3) return prev; // Limit to 3
      return [...prev, flight];
    });
  };

  const handleRemoveFromCompare = (flightId) => {
    setCompareFlights((prev) => prev.filter((f) => f.flightId !== flightId));
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
      ) : filteredByTripType.length === 0 ? (
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
              onAddToCompare={() => handleAddToCompare(flight)}
            />
          ) : (
            <FlightResultCard
              key={key}
              {...commonProps}
              onViewDetails={() => handleViewDetails(flight)}
              onAddToCompare={() => handleAddToCompare(flight)}
            />
          );
        })
      )}
      <FlightDetailsModal
        isOpen={showFlightDetailsModal}
        flight={selectedFlight}
        onClose={handleCloseModal}
      />
      {showCompareModal && (
        <CompareFlightsModal
          flights={compareFlights}
          onClose={() => setShowCompareModal(false)}
        />
      )}
      {compareFlights.length > 0 && (
        <div className="fixed bottom-4 right-4 w-80 rounded-xl shadow-2xl border border-gray-200 z-40 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-700 to-pink-800 text-white px-4 py-3">
            <h4 className="font-semibold">Selected Flights</h4>
          </div>

          {/* Body */}
          <div className="bg-white max-h-64 overflow-y-auto px-4 py-3 space-y-3">
            {compareFlights.map((flight) => {
              const segment = flight.outbound.segments[0];
              const airlineName =
                segment?.marketingCarrier?.name || flight.validatingAirline;
              const flightNumber = segment?.flightNumber || "NA";
              const fromTime = segment?.departure?.time?.slice(0, 5);
              const toTime = segment?.arrival?.time?.slice(0, 5);

              return (
                <div
                  key={flight.flightId}
                  className="flex items-center justify-between text-xs text-gray-700"
                >
                  {/* Left: Logo + Airline */}
                  <div className="flex items-center gap-2 w-4/5">
                    <img
                      src={FlightTailLogo}
                      alt="logo"
                      className="w-6 h-6 object-contain"
                    />
                    <div className="flex gap-4 text-[14px]">
                      <span className="font-medium">
                        {airlineName} {flightNumber}
                      </span>
                      <span className="text-gray-500 ">
                        {fromTime} → {toTime}
                      </span>
                    </div>
                  </div>

                  {/* Right: Remove Button */}
                  <button
                    onClick={() => handleRemoveFromCompare(flight.flightId)}
                    className="text-pink-700 hover:text-pink-800 cursor-pointer font-bold text-sm"
                    title="Remove flight"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-pink-700 to-pink-800 px-4 py-2.5 flex justify-center">
            <button
              onClick={() => setShowCompareModal(true)}
              className=" cursor-pointer text-white hover:bg-pink-800 transition-all duration-200 font-semibold text-sm px-3 py-1 rounded-full shadow-sm border border-pink-200"
            >
              Compare Flights
            </button>
          </div>
        </div>
      )}
    </>
  );
};
