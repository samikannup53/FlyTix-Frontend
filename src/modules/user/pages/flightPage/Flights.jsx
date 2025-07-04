import { useState } from "react";
import { LandingFooter, UserHeader } from "../../components";
import { FiltersSideBar } from "./sections/FilterSideBar";
import { FlightResults } from "./sections/FlightResults";
import { FlightSearchBar } from "./sections/FlightSearchBar";
import { SortBySection } from "./sections/SortBySection";

export const Flights = () => {
  const [flights, setFlights] = useState([]); // Final filtered flights
  const [originalFlights, setOriginalFlights] = useState([]); // Raw API response
  const [loading, setLoading] = useState(false); // Loading state

  const [tripType, setTripType] = useState("oneway");

  // Filters State
  const [selectedStops, setSelectedStops] = useState([]);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [selectedTimes, setSelectedTimes] = useState([]);

  // Sort State
  const [sortOption, setSortOption] = useState("smart");

  // Static list of Indian domestic airline codes
  const indianAirlines = ["AI", "IX", "6E", "QP", "SG", "9I", "UK", "EK"];

  // Called when user clicks the search button in FlightSearchBar
  const handleSearch = async (searchInput) => {
    // If using mock data
    if (searchInput?.results) {
      setFlights(searchInput.results);
      setOriginalFlights(searchInput.results); // Store raw data for filtering
      setTripType(searchInput.tripType); // ✅ capture tripType
      return;
    }

    try {
      setLoading(true);
      setFlights([]);
      setOriginalFlights([]);

      const res = await fetch("http://localhost:8000/api/flights/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchInput),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Failed to fetch flights");
      }

      setFlights(data.data);
      setOriginalFlights(data.data);
      setTripType(searchInput.tripType);
    } catch (err) {
      console.error("Flight fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset all filters to default values
  const handleClearFilters = () => {
    setSelectedStops([]);
    setSelectedAirlines([]);
    setMaxPrice(20000);
    setSelectedTimes([]);
  };

  // Filter logic
  const filteredFlights = originalFlights
    .filter((flight) => {
      // 1. Stops Filter
      const stopsLabel =
        flight.outbound.stops === 0
          ? "Non-stop"
          : flight.outbound.stops === 1
          ? "1 Stop"
          : "2+ Stops";
      const stopsMatch =
        selectedStops.length === 0 || selectedStops.includes(stopsLabel);

      // 2. Airline Filter
      const airlineMatch =
        selectedAirlines.length === 0 ||
        selectedAirlines.includes(flight.validatingAirline);

      // 3. Price Filter
      const price = parseFloat(flight.fare.totalFare || "0");
      const priceMatch = price <= maxPrice;

      // 4. Time of Day Filter
      const time = flight.outbound.segments?.[0]?.departure?.time || "00:00:00";
      const hour = parseInt(time.split(":")[0]);
      const timeMatch =
        selectedTimes.length === 0 ||
        selectedTimes.some((range) => {
          if (range === "morning") return hour >= 5 && hour < 12;
          if (range === "afternoon") return hour >= 12 && hour < 17;
          if (range === "evening") return hour >= 17 && hour < 21;
          if (range === "night") return hour >= 21 || hour < 5;
          return false;
        });

      return stopsMatch && airlineMatch && priceMatch && timeMatch;
    })
    .sort((a, b) => {
      // Utility: Convert ISO duration like "PT2H30M" to total minutes
      const parseDuration = (isoDuration) => {
        const match = isoDuration.match(/PT(\d+H)?(\d+M)?/);
        const hours = match[1] ? parseInt(match[1]) : 0;
        const minutes = match[2] ? parseInt(match[2]) : 0;
        return hours * 60 + minutes;
      };

      // Compute total duration in minutes for A
      const aOutboundDuration = parseDuration(a.outbound.duration || "PT0M");
      const aReturnDuration = a.returnTrip
        ? parseDuration(a.returnTrip.duration || "PT0M")
        : 0;
      const aTotalDuration = aOutboundDuration + aReturnDuration;

      // Compute total duration in minutes for B
      const bOutboundDuration = parseDuration(b.outbound.duration || "PT0M");
      const bReturnDuration = b.returnTrip
        ? parseDuration(b.returnTrip.duration || "PT0M")
        : 0;
      const bTotalDuration = bOutboundDuration + bReturnDuration;

      // Price Sort
      if (sortOption === "price") {
        return parseFloat(a.fare.totalFare) - parseFloat(b.fare.totalFare);

        // Fastest Duration Sort
      } else if (sortOption === "fastest") {
        return aTotalDuration - bTotalDuration;

        // Earliest Departure Time Sort (based on outbound segment 0)
      } else if (sortOption === "earliest") {
        const aTime = a.outbound.segments?.[0]?.departure?.time || "00:00";
        const bTime = b.outbound.segments?.[0]?.departure?.time || "00:00";
        return aTime.localeCompare(bTime);

        // Smart Sort: Mix of price + duration + departure hour (weighted)
      } else {
        const aTime = a.outbound.segments?.[0]?.departure?.time || "00:00";
        const bTime = b.outbound.segments?.[0]?.departure?.time || "00:00";

        const aHour = parseInt(aTime.split(":")[0]) || 0;
        const bHour = parseInt(bTime.split(":")[0]) || 0;

        const aScore =
          parseFloat(a.fare.totalFare) + aTotalDuration * 0.5 + aHour * 1.5;
        const bScore =
          parseFloat(b.fare.totalFare) + bTotalDuration * 0.5 + bHour * 1.5;

        return aScore - bScore;
      }
    });

  return (
    <>
      <UserHeader />
      <FlightSearchBar onSearch={handleSearch} />
      <section className="bg-gradient-to-tr from-orange-50 via-pink-50 to-orange-50 min-h-screen py-10">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6">
          <FiltersSideBar
            // Pass filter states and handlers
            selectedStops={selectedStops}
            setSelectedStops={setSelectedStops}
            selectedAirlines={selectedAirlines}
            setSelectedAirlines={setSelectedAirlines}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            selectedTimes={selectedTimes}
            setSelectedTimes={setSelectedTimes}
            airlineOptions={indianAirlines}
            onClearFilters={handleClearFilters}
          />
          <div className="lg:w-3/4 w-full no-scrollbar pr-2">
            <div className="space-y-6">
              <SortBySection
                selectedSortOption={sortOption}
                onSortChange={setSortOption}
              />
              <FlightResults
                flights={filteredFlights}
                loading={loading}
                tripType={tripType}
              />
            </div>
          </div>
        </div>
      </section>
      <LandingFooter />
    </>
  );
};
