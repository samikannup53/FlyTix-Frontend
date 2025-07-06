import { useState, useEffect } from "react";
import { LandingFooter, UserHeader } from "../../components";
import { FiltersSideBar } from "./sections/FilterSideBar";
import { FlightResults } from "./sections/FlightResults";
import { FlightSearchBar } from "./sections/FlightSearchBar";
import { SortBySection } from "./sections/SortBySection";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../shared/contexts/AuthContext";
import { toast } from "react-toastify";

export const Flights = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [flights, setFlights] = useState([]);
  const [originalFlights, setOriginalFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

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

  useEffect(() => {
    const cachedData = localStorage.getItem("cachedFlightResults");
    const cachedTripType = localStorage.getItem("cachedTripType");

    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        setFlights(parsed);
        setOriginalFlights(parsed);
        setHasSearched(true); // 👈 FIX: Show results instead of initial message
      } catch (e) {
        console.error("Invalid cached data in localStorage:", e);
      }
    }

    if (cachedTripType) {
      setTripType(cachedTripType);
    }
  }, []);

  // Called when user clicks the search button in FlightSearchBar
  const handleSearch = async (searchInput) => {
    // If using mock data
    // if (searchInput?.results) {
    //   setFlights(searchInput.results);
    //   setOriginalFlights(searchInput.results); // Store raw data for filtering
    //   setTripType(searchInput.tripType); // Capture Trip Type
    //   return;
    // }

    try {
      setLoading(true);
      setError(false);
      setHasSearched(true);
      setFlights([]);
      setOriginalFlights([]);

      const res = await fetch("http://localhost:8000/api/flights/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(searchInput),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Failed to fetch flights");
        setError(true);
        return;
      }

      setFlights(data.data);
      setOriginalFlights(data.data);
      setTripType(searchInput.tripType);

      // Save to localStorage for persistence
      localStorage.setItem("cachedFlightResults", JSON.stringify(data.data));
      localStorage.setItem("cachedTripType", searchInput.tripType);

      toast.success("Flights Loaded Successfully");
    } catch (err) {
      console.error("Flight fetch error:", err.message);
      toast.error("Something went wrong. Please try again.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Book Now Function
  const handleBookNow = async (flightId) => {
    try {
      const res = await fetch("http://localhost:8000/api/flights/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ flightId }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Failed to Validate Flight");
        return;
      }

      // Save selected flight temporarily
      localStorage.setItem("selectedFlight", JSON.stringify(data.flight));

      if (!isLoggedIn) {
        toast.warn("Please login to continue booking");
        navigate("/login");
        return;
      }

      toast.success("Flight validated successfully!");

      navigate(`/booking/initiate?flightId=${flightId}`);
    } catch (error) {
      console.error("Flight fetch error:", error.message);
      toast.error("Server error. Please try again.");
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
      // Utility: Convert Duration to Total Minutes
      const parseDuration = (durationStr) => {
        if (!durationStr) return 0;

        const hourMatch = durationStr.match(/(\d+)\s*H/i);
        const minuteMatch = durationStr.match(/(\d+)\s*M/i);

        const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
        const minutes = minuteMatch ? parseInt(minuteMatch[1], 10) : 0;

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
      {!hasSearched ? (
        // ✨ Initial UI before search
        <section className="py-24 text-center min-h-[60vh] 2xl:min-h-[70vh] bg-gradient-to-br from-orange-50 via-pink-50 to-orange-50">
          <div className="text-4xl text-amber-500 animate-bounce mb-4 flex justify-center">
            <i className="fa-solid fa-magnifying-glass-location fa-2x" />
          </div>
          <p className="text-xl font-semibold text-gray-700">
            Search and explore the best flights across India
          </p>
          <p className="text-gray-600 mt-2">
            Use the search bar above to get started
          </p>
        </section>
      ) : loading ? (
        // ✨ Loading UI
        <section className="py-24 text-center min-h-[50vh]">
          <div className="text-4xl text-amber-500 animate-bounce mb-4 flex justify-center">
            <i className="fa-solid fa-plane-departure fa-2x" />
          </div>
          <p className="text-xl font-semibold text-gray-700">
            Hold on! We're fetching the best flights for you...
          </p>
        </section>
      ) : error ? (
        // ✨ Error UI
        <section className="py-24 text-center min-h-[50vh]">
          <div className="text-5xl text-red-500 mb-4 flex justify-center">
            <i className="fa-solid fa-wifi-slash" />
          </div>
          <p className="text-xl font-semibold text-gray-800 mb-4">
            Network Problem
          </p>
          <p className="text-gray-600">
            We are unable to connect to our systems from your device.
            <br />
            Please try again after a while.
          </p>
          <button
            className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </section>
      ) : (
        // ✨ Normal UI when flights are loaded
        <section className="bg-gradient-to-tr from-orange-50 via-pink-50 to-orange-50 min-h-screen py-10">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6">
            <FiltersSideBar
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
                  onBookNow={handleBookNow}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <LandingFooter />
    </>
  );
};
