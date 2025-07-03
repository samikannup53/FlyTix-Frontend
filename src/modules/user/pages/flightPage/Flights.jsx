import { useState } from "react";
import { LandingFooter, UserHeader } from "../../components";
import { FiltersSideBar } from "./sections/FilterSideBar";
import { FlightResults } from "./sections/FlightResults";
import { FlightSearchBar } from "./sections/FlightSearchBar";
import { FlightDateSlider } from "./sections/FlightDateSlider";
import { SortBySection } from "./sections/SortBySection";

export const Flights = () => {
  const [flights, setFlights] = useState([]); // Final filtered flights
  const [originalFlights, setOriginalFlights] = useState([]); // Raw API response
  const [loading, setLoading] = useState(false); // Loading state

  // Filters state
  const [selectedStops, setSelectedStops] = useState([]);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [selectedTimes, setSelectedTimes] = useState([]);

  // Sort Staet
  const [sortOption, setSortOption] = useState("smart");

  // Static list of Indian domestic airline codes
  const indianAirlines = ["AI", "IX", "6E", "QP", "SG", "9I", "UK", "EK"];

  // Called when user clicks the search button in FlightSearchBar
  const handleSearch = async (searchInput) => {
    // If using mock data
    if (searchInput?.results) {
      setFlights(searchInput.results);
      setOriginalFlights(searchInput.results); // Store raw data for filtering
      return;
    }

    try {
      setLoading(true); // Show loading spinner
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
      if (sortOption === "price") {
        return parseFloat(a.fare.totalFare) - parseFloat(b.fare.totalFare);
      } else if (sortOption === "fastest") {
        return a.totalDurationMinutes - b.totalDurationMinutes;
      } else if (sortOption === "earliest") {
        const aTime = a.outbound.segments?.[0]?.departure?.time || "00:00";
        const bTime = b.outbound.segments?.[0]?.departure?.time || "00:00";
        return aTime.localeCompare(bTime);
      } else {
        // Smart Sort: weighted sum of price, duration, and departure time
        const aTime = a.outbound.segments?.[0]?.departure?.time || "00:00";
        const bTime = b.outbound.segments?.[0]?.departure?.time || "00:00";

        const aHour = parseInt(aTime.split(":")[0]);
        const bHour = parseInt(bTime.split(":")[0]);

        const aScore =
          parseFloat(a.fare.totalFare) +
          a.totalDurationMinutes * 0.5 +
          aHour * 1.5;
        const bScore =
          parseFloat(b.fare.totalFare) +
          b.totalDurationMinutes * 0.5 +
          bHour * 1.5;

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
            airlineOptions={indianAirlines} // ✅ Static Indian airlines
            onClearFilters={handleClearFilters}
          />
          <div className="lg:w-3/4 w-full no-scrollbar pr-2">
            <div className="space-y-6">
              <FlightDateSlider />
              <SortBySection
                selectedSortOption={sortOption}
                onSortChange={setSortOption}
              />
              <FlightResults flights={filteredFlights} loading={loading} />
            </div>
          </div>
        </div>
      </section>
      <LandingFooter />
    </>
  );
};
