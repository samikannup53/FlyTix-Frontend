import { useEffect, useState, useCallback } from "react";
import { fetchAirports } from "../../modules/user/services/airportService";

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
    fetchAirports("Tamil-Nadu")
      .then(setCachedTamilNaduAirports)
      .catch((error) =>
        console.error("Failed to fetch cached Tamil Nadu airports:", error)
      );
  }, []);

  // Load cached searchMeta if exists (Landing Page use case)
  useEffect(() => {
    const metaStr = localStorage.getItem("searchMeta");
    if (!metaStr) {
      // console.log("No searchMeta found in localStorage.");
      return;
    }

    // Ensure cachedTamilNaduAirports is loaded before processing searchMeta
    // This is important because we rely on it for initial lookups.
    if (cachedTamilNaduAirports.length === 0) {
      // console.log("cachedTamilNaduAirports not yet loaded, deferring searchMeta processing.");
      return;
    }

    try {
      const meta = JSON.parse(metaStr);
      // console.log("Parsed searchMeta:", meta);

      // Set basic trip details
      setTripType(meta.tripType || "oneway");
      setAdults(meta.adults || 1);
      setChildren(meta.children || 0);
      setInfants(meta.infants || 0);
      setSelectedClass(classReverseMap[meta.travelClass] || "Economy");
      setDepartureDate(meta.date ? new Date(meta.date) : null);
      setReturnDate(meta.returnDate ? new Date(meta.returnDate) : null);

      // --- Handle From City/Airport details ---
      if (meta.from) {
        let foundFromAirport = cachedTamilNaduAirports.find(
          (a) => a.iataCode === meta.from
        );

        if (foundFromAirport) {
          // console.log("From Airport found in cache:", foundFromAirport);
          setFrom(formatAirportDisplay(foundFromAirport));
          setFromCode(meta.from);
        } else {
          // If not found in cache, try fetching just this airport by its code
          // console.log(`From Airport not in cache. Fetching for code: ${meta.from}`);
          fetchAirports(meta.from)
            .then((data) => {
              if (data && data.length > 0) {
                const airport = data.find((a) => a.iataCode === meta.from);
                if (airport) {
                  // console.log("From Airport fetched successfully:", airport);
                  setFrom(formatAirportDisplay(airport));
                  setFromCode(meta.from);
                } else {
                  console.warn(`Fetched data for '${meta.from}' but no matching IATA code found.`);
                }
              } else {
                console.warn(`No data returned for From Airport code: ${meta.from}`);
              }
            })
            .catch((e) => console.error("Failed to fetch From airport:", e));
        }
      } else {
        // console.log("meta.from is empty or null.");
        setFrom(""); // Ensure from is cleared if meta.from is missing
        setFromCode("");
      }

      // --- Handle To City/Airport details ---
      if (meta.to) {
        let foundToAirport = cachedTamilNaduAirports.find(
          (a) => a.iataCode === meta.to
        );

        if (foundToAirport) {
          // console.log("To Airport found in cache:", foundToAirport);
          setTo(formatAirportDisplay(foundToAirport));
          setToCode(meta.to);
        } else {
          // If not found in cache, try fetching just this airport by its code
          // console.log(`To Airport not in cache. Fetching for code: ${meta.to}`);
          fetchAirports(meta.to)
            .then((data) => {
              if (data && data.length > 0) {
                const airport = data.find((a) => a.iataCode === meta.to);
                if (airport) {
                  // console.log("To Airport fetched successfully:", airport);
                  setTo(formatAirportDisplay(airport));
                  setToCode(meta.to);
                } else {
                  console.warn(`Fetched data for '${meta.to}' but no matching IATA code found.`);
                }
              } else {
                console.warn(`No data returned for To Airport code: ${meta.to}`);
              }
            })
            .catch((e) => console.error("Failed to fetch To airport:", e));
        }
      } else {
        // console.log("meta.to is empty or null.");
        setTo(""); // Ensure to is cleared if meta.to is missing
        setToCode("");
      }

      localStorage.removeItem("searchMeta"); // Clear after processing
      onSearch?.(meta); // Trigger onSearch with the original meta
    } catch (e) {
      console.error("Invalid searchMeta:", e);
    }
  }, [cachedTamilNaduAirports, onSearch, formatAirportDisplay]); // Ensure all relevant dependencies are here

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

  // Add more robust filtering for user typing, including IATA code and airport name
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

  // Optimized fetching logic for 'from' input
  useEffect(() => {
    // Only fetch if 'from' is being actively typed and is not already a formatted string
    if (from.trim() && !from.includes(" (") && from.length >= 2) { // Add length check to prevent too many requests
      const timer = setTimeout(
        () => fetchAirports(from).then(setFromOptions),
        300
      );
      return () => clearTimeout(timer);
    } else if (!from.trim()) {
      // If 'from' is empty, show cached Tamil Nadu airports as suggestions
      setFromOptions(cachedTamilNaduAirports);
    }
    // If it's a formatted string, no new fetch is needed, options should be managed by handleFocus
  }, [from, cachedTamilNaduAirports]);

  // Optimized fetching logic for 'to' input
  useEffect(() => {
    // Only fetch if 'to' is being actively typed and is not already a formatted string
    if (to.trim() && !to.includes(" (") && to.length >= 2) { // Add length check
      const timer = setTimeout(() => fetchAirports(to).then(setToOptions), 300);
      return () => clearTimeout(timer);
    } else if (!to.trim()) {
      // If 'to' is empty, show cached Tamil Nadu airports as suggestions
      setToOptions(cachedTamilNaduAirports);
    }
    // If it's a formatted string, no new fetch is needed, options should be managed by handleFocus
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
    // If the field is empty or no code is set, show local cache
    if (!from.trim() || !fromCode) {
      setFromOptions(cachedTamilNaduAirports);
    } else if (fromCode) {
      // If a code is already set, display the selected airport and potentially close dropdown if exact match
      const selected = cachedTamilNaduAirports.find((a) => a.iataCode === fromCode);
      if (selected && from === formatAirportDisplay(selected)) {
        setFromOptions([selected]); // Show only the selected one if it's an exact match
      } else {
        // If there's text and a code, but the text is modified, refetch
        fetchAirports(from).then(setFromOptions);
      }
    }
    setShowFromDropdown(true);
  };

  const handleToFocus = () => {
    // If the field is empty or no code is set, show local cache
    if (!to.trim() || !toCode) {
      setToOptions(cachedTamilNaduAirports);
    } else if (toCode) {
      // If a code is already set, display the selected airport and potentially close dropdown if exact match
      const selected = cachedTamilNanuAirports.find((a) => a.iataCode === toCode);
      if (selected && to === formatAirportDisplay(selected)) {
        setToOptions([selected]); // Show only the selected one if it's an exact match
      } else {
        // If there's text and a code, but the text is modified, refetch
        fetchAirports(to).then(setToOptions);
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