import { FlightDateSlider } from "./FlightDateSlider";
import { SortBySection } from "./SortBySection";
import { FlightResultCard } from "./FlightResultCard";

export const FlightResults = ({ flights, loading }) => {
  return (
    <section className="lg:w-3/4 w-full no-scrollbar pr-2">
      <div className="space-y-6">
        <FlightDateSlider />
        <SortBySection />

        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-gray-800">
            {flights.length > 0 ? `${flights[0].outbound.segments[0].departure.city} → ${flights[0].outbound.segments[0].arrival.city}` : "Search Results"}
          </div>
          <div className="text-sm text-gray-600">
            {loading ? "Loading..." : `${flights.length} Flights Found`}
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Fetching flights...</p>
        ) : flights.length === 0 ? (
          <p className="text-center text-red-500">No flights found</p>
        ) : (
          flights.map((flight, index) => (
            <FlightResultCard key={flight.flightId || index} {...flight} />
          ))
        )}
      </div>
    </section>
  );
};
