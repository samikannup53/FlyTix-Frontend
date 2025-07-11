import { useEffect, useState, useCallback } from "react"; // Import useCallback
import { fetchAirports } from "../../modules/user/services/airportService";
import { useNavigate } from "react-router-dom";

export const useFlightSearchLogic = ({ mode, onSearch }) => {
  const classReverseMap = {
    ECONOMY: "Economy",
    PREMIUM_ECONOMY: "Premium Economy",
    BUSINESS: "Business",
    FIRST: "First",
  };

  const classMap = {
    Economy: "ECONOMY",
    "Premium Economy": "PREMIUM_ECONOMY",
    Business: "BUSINESS",
    First: "FIRST",
  };

  const navigate = useNavigate();
  
  const [tripType, setTripType] = useState("oneway");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [selectedClass, setSelectedClass] = useState("Economy");

  const [fromCode, setFromCode] = useState("");
  const [toCode, setToCode] = useState("");
  const [fromOptions, setFromOptions] = useState([]);
  const [toOptions, setToOptions] = useState([]);
  const [cachedTamilNaduAirports, setCachedTamilNaduAirports] = useState([]);

  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [passengersText, setPassengersText] = useState("");

  const [errors, setErrors] = useState({});

  // Memoize the airport formatting function
  const formatAirportDisplay = useCallback((airport) => {
    if (!airport) return "";
    return `${airport.city} (${airport.iataCode})`;
  }, []);

  // Fetch cached Tamil Nadu Airports once
  useEffect(() => {
    fetchAirports("Tamil-Nadu").then(setCachedTamilNaduAirports);
  }, []);

  // Load cached searchMeta if exists (Landing Page use case)
  useEffect(() => {
    const metaStr = localStorage.getItem("searchMeta");
    if (metaStr && cachedTamilNaduAirports.length > 0) {
      // Ensure cached airports are loaded
      try {
        const meta = JSON.parse(metaStr);

        setTripType(meta.tripType || "oneway");
        setAdults(meta.adults || 1);
        setChildren(meta.children || 0);
        setInfants(meta.infants || 0);
        setSelectedClass(classReverseMap[meta.travelClass] || "Economy");
        setDepartureDate(meta.date ? new Date(meta.date) : null);
        setReturnDate(meta.returnDate ? new Date(meta.returnDate) : null);

        // Resolve From City/Airport details
        const foundFromAirport = cachedTamilNaduAirports.find(
          (a) => a.iataCode === meta.from
        );
        if (foundFromAirport) {
          setFrom(formatAirportDisplay(foundFromAirport));
          setFromCode(meta.from);
        } else if (meta.from) {
          // If not found in cache, try fetching just this airport
          fetchAirports(meta.from)
            .then((data) => {
              if (data && data.length > 0) {
                const airport = data.find((a) => a.iataCode === meta.from);
                if (airport) {
                  setFrom(formatAirportDisplay(airport));
                  setFromCode(meta.from);
                }
              }
            })
            .catch((e) => console.error("Failed to fetch from airport:", e));
        }

        // Resolve To City/Airport details
        const foundToAirport = cachedTamilNaduAirports.find(
          (a) => a.iataCode === meta.to
        );
        if (foundToAirport) {
          setTo(formatAirportDisplay(foundToAirport));
          setToCode(meta.to);
        } else if (meta.to) {
          // If not found in cache, try fetching just this airport
          fetchAirports(meta.to)
            .then((data) => {
              if (data && data.length > 0) {
                const airport = data.find((a) => a.iataCode === meta.to);
                if (airport) {
                  setTo(formatAirportDisplay(airport));
                  setToCode(meta.to);
                }
              }
            })
            .catch((e) => console.error("Failed to fetch to airport:", e));
        }

        localStorage.removeItem("searchMeta");
      } catch (e) {
        console.error("Invalid searchMeta:", e);
      }
    }
  }, [cachedTamilNaduAirports, onSearch, formatAirportDisplay]);

  useEffect(() => {
    if (tripType === "oneway") setReturnDate(null);
  }, [tripType]);

  const extractCityName = (input) => {
    const match = input.match(/(.*)\s\(([^)]+)\)/);
    if (match) {
      return match[1].trim().toLowerCase();
    }
    return input.trim().toLowerCase();
  };

  const filteredFromOptions = from.trim()
    ? fromOptions.filter(
        (opt) =>
          opt.city.toLowerCase().includes(extractCityName(from)) ||
          opt.iataCode.toLowerCase().includes(from.toLowerCase()) ||
          opt.name.toLowerCase().includes(from.toLowerCase())
      )
    : fromOptions;

  const filteredToOptions = to.trim()
    ? toOptions.filter(
        (opt) =>
          opt.city.toLowerCase().includes(extractCityName(to)) ||
          opt.iataCode.toLowerCase().includes(to.toLowerCase()) ||
          opt.name.toLowerCase().includes(to.toLowerCase())
      )
    : toOptions;

  useEffect(() => {
    if (from.trim() && !from.includes(" (")) {
      // Only fetch if it's not already a formatted string
      const timer = setTimeout(
        () => fetchAirports(from).then(setFromOptions),
        300
      );
      return () => clearTimeout(timer);
    } else {
      setFromOptions(cachedTamilNaduAirports); // Reset if user clears or it's formatted
    }
  }, [from, cachedTamilNaduAirports]);

  useEffect(() => {
    if (to.trim() && !to.includes(" (")) {
      // Only fetch if it's not already a formatted string
      const timer = setTimeout(() => fetchAirports(to).then(setToOptions), 300);
      return () => clearTimeout(timer);
    } else {
      setToOptions(cachedTamilNaduAirports); // Reset if user clears or it's formatted
    }
  }, [to, cachedTamilNaduAirports]);

  const handleSelectFrom = (opt) => {
    setFrom(formatAirportDisplay(opt));
    setFromCode(opt.iataCode);
    setShowFromDropdown(false);
  };

  const handleSelectTo = (opt) => {
    setTo(formatAirportDisplay(opt));
    setToCode(opt.iataCode);
    setShowToDropdown(false);
  };

  const handleFromFocus = () => {
    if (!from.trim() || !fromCode) {
      setFromOptions(cachedTamilNaduAirports);
    } else {
      const selectedFromCache = cachedTamilNaduAirports.find(
        (a) => a.iataCode === fromCode
      );

      if (
        selectedFromCache &&
        from === formatAirportDisplay(selectedFromCache)
      ) {
        setFromOptions([selectedFromCache]);
      } else {
        //  Sanitize query before sending to API
        const query = extractCityName(from) || fromCode;
        fetchAirports(query)
          .then((fetched) => {
            if (fetched?.length) {
              setFromOptions(fetched);
            } else {
              setFromOptions([]);
            }
          })
          .catch(() => setFromOptions([]));
      }
    }
    setShowFromDropdown(true);
  };

  const handleToFocus = () => {
    if (!to.trim() || !toCode) {
      setToOptions(cachedTamilNaduAirports);
    } else {
      const selectedToCache = cachedTamilNaduAirports.find(
        (a) => a.iataCode === toCode
      );

      if (selectedToCache && to === formatAirportDisplay(selectedToCache)) {
        setToOptions([selectedToCache]);
      } else {
        const query = extractCityName(to) || toCode;
        fetchAirports(query)
          .then((fetched) => {
            if (fetched?.length) {
              setToOptions(fetched);
            } else {
              setToOptions([]);
            }
          })
          .catch(() => setToOptions([]));
      }
    }
    setShowToDropdown(true);
  };

  const handleSwap = () => {
    const tempCity = from;
    const tempCode = fromCode;
    setFrom(to);
    setFromCode(toCode);
    setTo(tempCity);
    setToCode(tempCode);
  };

  const handleSearch = () => {
    const validation = {};
    if (!fromCode) validation.from = "Select Departure City";
    if (!toCode) validation.to = "Select Arrival City";
    if (fromCode && toCode && fromCode === toCode)
      validation.to = "Arrival City should be different from Departure";
    if (!departureDate) validation.departureDate = "Select Departure Date";
    if (tripType === "roundtrip" && !returnDate)
      validation.returnDate = "Select Return Date";
    if (!(adults + children + infants))
      validation.passengers = "Select Passengers";

    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    const meta = {
      from: fromCode, // Store only the code in localStorage
      to: toCode, // Store only the code in localStorage
      date: departureDate ? departureDate.toLocaleDateString("en-CA") : null,
      returnDate: returnDate ? returnDate.toLocaleDateString("en-CA") : null,
      adults,
      children,
      infants,
      travelClass: classMap[selectedClass],
      tripType,
    };

    if (mode === "flights") {
      onSearch?.(meta);
    } else if (mode === "landing") {
      localStorage.setItem("searchMeta", JSON.stringify(meta));
      onSearch?.(meta);
      window.location.href = "/flights";
    }
  };

  useEffect(() => {
    const total = adults + children + infants;
    setPassengersText(
      `${total} Traveller${total > 1 ? "s" : ""} / ${selectedClass}`
    );
  }, [adults, children, infants, selectedClass]);

  return {
    tripType,
    setTripType,
    from,
    setFrom,
    to,
    setTo,
    departureDate,
    setDepartureDate,
    returnDate,
    setReturnDate,
    adults,
    setAdults,
    children,
    setChildren,
    infants,
    setInfants,
    selectedClass,
    setSelectedClass,
    fromCode,
    toCode,
    showFromDropdown,
    setShowFromDropdown,
    showToDropdown,
    setShowToDropdown,
    fromOptions,
    toOptions,
    filteredFromOptions,
    filteredToOptions,
    cachedTamilNaduAirports,
    passengersText,
    showPassengerDropdown,
    setShowPassengerDropdown,
    errors,
    handleSwap,
    handleSelectFrom,
    handleSelectTo,
    handleFromFocus,
    handleToFocus,
    handleSearch,
  };
};
