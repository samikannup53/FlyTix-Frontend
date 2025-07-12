import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { BookingFooter, UserHeader } from "../../components";
import { FiltersSideBar } from "./sections/FilterSideBar";
import { FlightResults } from "./sections/FlightResults";
import { FlightSearchBar } from "./sections/FlightSearchBar";
import { SortBySection } from "./sections/SortBySection";
import { useAuth } from "../../../../shared/contexts/AuthContext";

import brandIcon from "../../../../assets/images/brandIcon.png";

export const Flights = () => {
  const navigate      = useNavigate();
  const { isLoggedIn } = useAuth();

  // ────────────────────────────────────────────────────────────────
  // ►  Main page state
  // ────────────────────────────────────────────────────────────────
  const [flights,          setFlights]          = useState([]);
  const [originalFlights,  setOriginalFlights]  = useState([]);
  const [loading,          setLoading]          = useState(false);
  const [error,            setError]            = useState(false);
  const [hasSearched,      setHasSearched]      = useState(false);
  const [searchMeta,       setSearchMeta]       = useState({});
  const [tripType,         setTripType]         = useState("oneway");

  // Filters
  const [selectedStops,    setSelectedStops]    = useState([]);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [maxPrice,         setMaxPrice]         = useState(20000);
  const [selectedTimes,    setSelectedTimes]    = useState([]);

  // Sorting
  const [sortOption,       setSortOption]       = useState("smart");

  const indianAirlines = ["AI", "IX", "6E", "QP", "SG", "9I", "UK", "EK"];

  // Prevent double‑initialisation ────────────────────────────────
  const initRef = useRef(false);

  /*───────────────────────────────────────────────────────────────
   *  REQUIREMENT 2 & 3  
   *  ─ Triggers auto‑search only once when coming from Landing.  
   *  ─ On hard refresh we use cached results and DON’T auto‑search.  
   *───────────────────────────────────────────────────────────────*/
  useEffect(() => {
    if (initRef.current) return;          // already handled
    initRef.current = true;

    const metaStr     = localStorage.getItem("searchMeta");          // set in Landing
    const cachedData  = localStorage.getItem("cachedFlightResults"); // set after a success

    // 2A ▸ Coming from Landing → run search once, then delete flag
    if (metaStr && !cachedData) {
      try {
        const meta = JSON.parse(metaStr);
        setSearchMeta(meta);              // keeps data in search bar
        handleSearch(meta);               // trigger once
      } catch (e) {
        console.error("Invalid searchMeta:", e);
      } finally {
        localStorage.removeItem("searchMeta"); // 3 ▸ prevents re‑trigger on refresh
      }
      return;
    }

    // 2B ▸ Page refresh with cached flights → just restore
    if (cachedData) {
      try {
        const flights = JSON.parse(cachedData);
        setFlights(flights);
        setOriginalFlights(flights);
        setHasSearched(true);
      } catch (e) {
        console.error("Invalid cachedFlightResults:", e);
      }

      // Restore form values for persistence
      const cachedMeta = localStorage.getItem("cachedSearchMeta");
      if (cachedMeta) {
        try {
          setSearchMeta(JSON.parse(cachedMeta));
        } catch (e) {
          console.error("Invalid cachedSearchMeta:", e);
        }
      }
    }
  }, []);

  /*───────────────────────────────────────────────────────────────
   *  handleSearch — Requirement 4 (Retry uses this) & normal flow
   *───────────────────────────────────────────────────────────────*/
  const handleSearch = async (meta) => {
    setSearchMeta(meta);          // keep search bar populated

    setLoading(true);
    setError(false);
    setHasSearched(true);
    setFlights([]);
    setOriginalFlights([]);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/flights/search`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(meta),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Failed to fetch flights");
        setError(true);
        return;
      }

      setFlights(data.data);
      setOriginalFlights(data.data);
      setTripType(meta.tripType);

      // Save for persistence on refresh
      localStorage.setItem("cachedFlightResults", JSON.stringify(data.data));
      localStorage.setItem("cachedSearchMeta",  JSON.stringify(meta));

      toast.success("Flights Loaded Successfully");
    } catch (err) {
      console.error("Flight fetch error:", err);
      toast.error("Something went wrong. Please try again.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  /*───────────────────────────────────────────────────────────────
   *  Book Now   (unchanged)
   *───────────────────────────────────────────────────────────────*/
  const handleBookNow = async (flightId) => {
    try {
      const res  = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/flights/validate`, {
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
        tripType:  searchMeta.tripType   || "roundtrip",
        adults:    `${searchMeta.adults    ?? 2}`,
        children:  `${searchMeta.children  ?? 1}`,
        infants:   `${searchMeta.infants   ?? 1}`,
      }).toString();

      navigate(`/booking/initiate?${query}`);
    } catch (err) {
      console.error("Validate error:", err);
      toast.error("Server error. Please try again.");
    }
  };

  /*───────────────────────────────────────────────────────────────
   *  Clear Filters (unchanged)
   *───────────────────────────────────────────────────────────────*/
  const handleClearFilters = () => {
    setSelectedStops([]);
    setSelectedAirlines([]);
    setMaxPrice(20000);
    setSelectedTimes([]);
  };

  /*───────────────────────────────────────────────────────────────
   *  Filtering + Sorting  (your original logic, trimmed for brevity)
   *───────────────────────────────────────────────────────────────*/
  const parseDuration = (d) => {
    const h = +(d?.match(/(\\d+)\\s*H/)?.[1] ?? 0);
    const m = +(d?.match(/(\\d+)\\s*M/)?.[1] ?? 0);
    return h * 60 + m;
  };

  const filteredFlights = originalFlights
    .filter((f) => {
      const stopLabel = f.outbound.stops === 0 ? "Non-stop"
                    : f.outbound.stops === 1 ? "1 Stop" : "2+ Stops";
      const priceOk   = parseFloat(f.fare.totalFare) <= maxPrice;
      const stopOk    = !selectedStops.length    || selectedStops.includes(stopLabel);
      const airlineOk = !selectedAirlines.length || selectedAirlines.includes(f.validatingAirline);

      const hour   = +(f.outbound.segments?.[0]?.departure?.time?.split(":")[0] ?? 0);
      const timeOk = !selectedTimes.length || selectedTimes.some((t) =>
        (t === "morning"   && hour >= 5  && hour < 12) ||
        (t === "afternoon" && hour >= 12 && hour < 17) ||
        (t === "evening"   && hour >= 17 && hour < 21) ||
        (t === "night"     && (hour >= 21 || hour < 5))
      );

      return stopOk && airlineOk && priceOk && timeOk;
    })
    .sort((a, b) => {
      const durA = parseDuration(a.outbound.duration) +
                   (a.returnTrip ? parseDuration(a.returnTrip.duration) : 0);
      const durB = parseDuration(b.outbound.duration) +
                   (b.returnTrip ? parseDuration(b.returnTrip.duration) : 0);

      if (sortOption === "price")    return +a.fare.totalFare - +b.fare.totalFare;
      if (sortOption === "fastest")  return durA - durB;
      if (sortOption === "earliest") {
        const tA = a.outbound.segments?.[0]?.departure?.time ?? "00:00";
        const tB = b.outbound.segments?.[0]?.departure?.time ?? "00:00";
        return tA.localeCompare(tB);
      }
      // smart
      const hA = +(a.outbound.segments?.[0]?.departure?.time?.split(":")[0] ?? 0);
      const hB = +(b.outbound.segments?.[0]?.departure?.time?.split(":")[0] ?? 0);
      return (+a.fare.totalFare + durA * 0.5 + hA * 1.5) -
             (+b.fare.totalFare + durB * 0.5 + hB * 1.5);
    });

  /*───────────────────────────────────────────────────────────────
   *  RENDER
   *───────────────────────────────────────────────────────────────*/
  return (
    <>
      <UserHeader />
      <FlightSearchBar onSearch={handleSearch} initialValues={searchMeta} />

      {/* ——— STATES: Idle | Loading | Error | Results ——— */}
      {!hasSearched ? (
        <IdleScreen />
      ) : loading ? (
        <LoadingScreen />
      ) : error ? (
        <ErrorScreen onRetry={() => handleSearch(searchMeta)} />
      ) : (
        <ResultsScreen
          flights={filteredFlights}
          tripType={tripType}
          sortOption={sortOption}
          setSortOption={setSortOption}
          filterProps={{
            selectedStops,
            setSelectedStops,
            selectedAirlines,
            setSelectedAirlines,
            maxPrice,
            setMaxPrice,
            selectedTimes,
            setSelectedTimes,
            indianAirlines,
            onClearFilters: handleClearFilters,
          }}
          onBookNow={handleBookNow}
        />
      )}

      <BookingFooter />
    </>
  );
};

/*───────── Helper sub‑components (pure UI, unchanged logic) ─────*/
const IdleScreen   = () => (
  <section className="text-center px-6 py-24 min-h-[70vh] flex flex-col items-center gap-4 bg-gradient-to-br from-orange-50 via-pink-50 to-orange-50">
    <img src={brandIcon} className="w-24 animate-bounce" />
    <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 via-orange-600 to-pink-700 text-transparent bg-clip-text">
      Search and explore the best flights across India
    </h2>
    <p className="text-gray-600 -mt-2">Use the search bar above to get started</p>
  </section>
);

const LoadingScreen = () => (
  <section className="text-center px-6 py-24 min-h-[70vh] flex flex-col items-center gap-6">
    <div className="relative">
      <div className="border-6 rounded-full h-40 w-40 border-t-pink-800 border-pink-200 animate-spin" />
      <img src={brandIcon} className="absolute w-24 top-7 left-7 animate-pulse" />
    </div>
    <div className="space-y-3">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-700 via-orange-600 to-pink-800 text-transparent bg-clip-text">
        Hold On... Finding the Best Flights for You...
      </h2>
      <p className="text-base text-gray-600 px-6">Please wait while we search top Routes and Deals.</p>
    </div>
  </section>
);

const ErrorScreen = ({ onRetry }) => (
  <section className="py-24 px-6 text-center min-h-[70vh] flex flex-col items-center gap-2">
    <div className="text-6xl mb-2 bg-gradient-to-tr from-pink-700 via-pink-600 to-orange-600 text-transparent bg-clip-text">
      <i className="fa fa-exclamation-triangle text-8xl"></i>
    </div>
    <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-700 via-orange-600 to-pink-800 text-transparent bg-clip-text">
      Error In Fetching Flights
    </h2>
    <p className="text-base text-gray-600 px-6">We couldn’t connect to our servers, Please Try Again.</p>
    <button
      className="mt-2 px-6 py-2 bg-gradient-to-br from-orange-600 via-pink-700 to-pink-800 text-white font-medium rounded-full shadow hover:opacity-90 transition"
      onClick={onRetry}
    >
      Retry
    </button>
  </section>
);

const ResultsScreen = ({
  flights,
  tripType,
  sortOption,
  setSortOption,
  filterProps,
  onBookNow,
}) => (
  <section className="bg-gradient-to-tr from-orange-50 via-pink-50 to-orange-50 min-h-screen py-10">
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6">
      <FiltersSideBar {...filterProps} />
      <div className="lg:w-3/4 w-full pr-2">
        <div className="space-y-6">
          <SortBySection selectedSortOption={sortOption} onSortChange={setSortOption} />
          <FlightResults flights={flights} loading={false} tripType={tripType} onBookNow={onBookNow} />
        </div>
      </div>
    </div>
  </section>
);
