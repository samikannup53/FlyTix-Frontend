import { useState, useEffect } from "react";
import { BookingFooter, UserHeader } from "../../components";
import { FiltersSideBar } from "./sections/FilterSideBar";
import { FlightResults } from "./sections/FlightResults";
import { FlightSearchBar } from "./sections/FlightSearchBar";
import { SortBySection } from "./sections/SortBySection";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../shared/contexts/AuthContext";
import { toast } from "react-toastify";
import brandIcon from "../../../../assets/images/brandIcon.png";

export const Flights = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [flights, setFlights] = useState([]);
  const [originalFlights, setOriginalFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [searchMeta, setSearchMeta] = useState({});

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
    const cachedMeta = localStorage.getItem("cachedSearchMeta");

    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        setFlights(parsed);
        setOriginalFlights(parsed);
        setHasSearched(true);
      } catch (e) {
        console.error("Invalid cached data in localStorage:", e);
      }
    }

    if (cachedMeta) {
      try {
        const meta = JSON.parse(cachedMeta);
        setSearchMeta(meta);
      } catch (e) {
        console.error("Failed to parse cachedSearchMeta:", e);
      }
    }
  }, []);

  // Called when user clicks the search button in FlightSearchBar
  const handleSearch = async (searchInput) => {
    setSearchMeta({
      tripType: searchInput.tripType,
      adults: searchInput.adults,
      children: searchInput.children,
      infants: searchInput.infants,
    });

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
      localStorage.setItem("cachedSearchMeta", JSON.stringify(searchInput));

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

      if (!isLoggedIn) {
        toast.warn("Please login to continue booking");
        navigate("/login");
        return;
      }

      toast.success("Flight validated successfully!");

      const query = new URLSearchParams({
        flightId,
        tripType: searchMeta.tripType || "roundtrip",
        adults: searchMeta.adults?.toString() || "2",
        children: searchMeta.children?.toString() || "1",
        infants: searchMeta.infants?.toString() || "1",
      }).toString();

      navigate(`/booking/initiate?${query}`);
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
      <FlightSearchBar onSearch={handleSearch} initialValues={searchMeta} />
      {!hasSearched ? (
        <section className="text-center px-6 py-24   min-h-[70vh] flex flex-col items-center justify-start gap-4 bg-gradient-to-br from-orange-50 via-pink-50 to-orange-50">
          <div className="inline-block animate-bounce">
            <img src={brandIcon} className=" w-24  " />
          </div>

          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 via-orange-600 to-pink-700 text-transparent bg-clip-text">
            Search and explore the best flights across India
          </h2>

          <p className="text-gray-600 -mt-2">
            Use the search bar above to get started
          </p>
        </section>
      ) : loading ? (
        <section className="text-center px-6 py-24  min-h-[70vh] flex flex-col items-center justify-start gap-6">
          <div className="relative inline-block">
            <div className="border-6 rounded-full h-40 w-40 border-t-pink-800 border-pink-200 inline-flex animate-spin"></div>
            <img
              src={brandIcon}
              className="absolute w-24 top-7 left-7 animate-pulse"
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-700 via-orange-600 to-pink-800 text-transparent bg-clip-text">
              Hold On... Finding the Best Flights for You...
            </h2>
            <p className="text-base text-gray-600 max-w-xl px-6">
              Please wait while we search top Routes and Deals.
            </p>
          </div>
        </section>
      ) : error ? ( // ✨ Error UI
        <section className="py-24 px-6 text-center min-h-[70vh] flex flex-col items-center justify-start gap-2">
          {/* Gradient Alert Icon */}
          <div className="text-6xl mb-2 bg-gradient-to-tr from-pink-700 via-pink-600 to-orange-600 text-transparent bg-clip-text">
            <span className="text-8xl">
              <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
            </span>
          </div>

          {/* Gradient Title */}
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-700 via-orange-600 to-pink-800 text-transparent bg-clip-text">
            Error In Fetching Flights
          </h2>

          {/* Subtext */}
          <p className="text-base text-gray-600  px-6">
            We couldn’t connect to our servers, Please Try Again.
          </p>

          {/* Retry Button */}
          <button
            className="cursor-pointer mt-2 px-6 py-2 bg-gradient-to-br from-orange-600 via-pink-700 to-pink-800 text-white font-medium rounded-full shadow hover:opacity-90 transition"
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
      <BookingFooter />
    </>
  );
};
