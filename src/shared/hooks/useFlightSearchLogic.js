// src/hooks/useFlightSearchLogic.js
import { useEffect, useState, useCallback } from "react";
import { fetchAirports } from "../../modules/user/services/airportService";
import { useNavigate } from "react-router-dom";

export const useFlightSearchLogic = ({ mode, onSearch, initialValues }) => {
  const navigate = useNavigate();

  // UI ↔ API travel class mapping
  const classMap = {
    Economy: "ECONOMY",
    "Premium Economy": "PREMIUM_ECONOMY",
    Business: "BUSINESS",
    First: "FIRST",
  };
  const classReverseMap = {
    ECONOMY: "Economy",
    PREMIUM_ECONOMY: "Premium Economy",
    BUSINESS: "Business",
    FIRST: "First",
  };

  // Flight search state
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

  // Airport dropdown
  const [fromOptions, setFromOptions] = useState([]);
  const [toOptions, setToOptions] = useState([]);
  const [cachedTamilNaduAirports, setCachedTamilNaduAirports] = useState([]);

  // Dropdown UI
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [passengersText, setPassengersText] = useState("");

  const [errors, setErrors] = useState({});

  const formatAirportDisplay = useCallback(
    (airport) => (airport ? `${airport.city} (${airport.iataCode})` : ""),
    []
  );

  const extractCityName = (input) => {
    const match = input.match(/(.*)\s\(([^)]+)\)/);
    return match ? match[1].trim().toLowerCase() : input.trim().toLowerCase();
  };

  // Prefill localStorage-based data after Tamil Nadu airports loaded
  useEffect(() => {
    fetchAirports("Tamil-Nadu").then(setCachedTamilNaduAirports);
  }, []);

  // useEffect(() => {
  //   const metaStr = localStorage.getItem("searchMeta");
  //   if (!metaStr || !cachedTamilNaduAirports.length) return;

  //   try {
  //     const meta = JSON.parse(metaStr);
  //     setTripType(meta.tripType || "oneway");
  //     setAdults(meta.adults || 1);
  //     setChildren(meta.children || 0);
  //     setInfants(meta.infants || 0);
  //     setSelectedClass(classReverseMap[meta.travelClass] || "Economy");
  //     setDepartureDate(meta.date ? new Date(meta.date) : null);
  //     setReturnDate(meta.returnDate ? new Date(meta.returnDate) : null);

  //     const handlePrefill = async (code, setFn, setCodeFn) => {
  //       const fromCache = cachedTamilNaduAirports.find(
  //         (a) => a.iataCode === code
  //       );
  //       if (fromCache) {
  //         setFn(formatAirportDisplay(fromCache));
  //         setCodeFn(code);
  //       } else {
  //         const fetched = await fetchAirports(code);
  //         const match = fetched.find((a) => a.iataCode === code);
  //         if (match) {
  //           setFn(formatAirportDisplay(match));
  //           setCodeFn(code);
  //         }
  //       }
  //     };

  //     if (meta.from) handlePrefill(meta.from, setFrom, setFromCode);
  //     if (meta.to) handlePrefill(meta.to, setTo, setToCode);
  //   } catch (e) {
  //     console.error("Invalid searchMeta:", e);
  //   }
  // }, [cachedTamilNaduAirports]);

  //  useEffect(() => {
  //   if (initialValues) {
  //     setFrom(initialValues.from || "");
  //     setTo(initialValues.to || "");
  //     setDepartureDate(
  //       initialValues.departureDate
  //         ? new Date(initialValues.departureDate)
  //         : null
  //     );
  //     setReturnDate(
  //       initialValues.returnDate ? new Date(initialValues.returnDate) : null
  //     );
  //     setTripType(initialValues.tripType || "oneway");
  //     setAdults(initialValues.adults ?? 1);
  //     setChildren(initialValues.children ?? 0);
  //     setInfants(initialValues.infants ?? 0);
  //     setSelectedClass(initialValues.selectedClass || "Economy");
  //   }
  // }, [initialValues]);

  /* ------------------------------------------------------------------
   *  Prefill from initialValues (passed by Flights page)
   * -----------------------------------------------------------------*/
  useEffect(() => {
    if (!initialValues) return;

    // 1. simple text / numbers
    setTripType(initialValues.tripType || "oneway");
    setFrom(initialValues.from || "");
    setTo(initialValues.to || "");
    setAdults(initialValues.adults ?? 1);
    setChildren(initialValues.children ?? 0);
    setInfants(initialValues.infants ?? 0);

    // 2. class code → UI string
    if (initialValues.travelClass) {
      setSelectedClass(classReverseMap[initialValues.travelClass] || "Economy");
    }

    // 3. dates (note: key in meta is "date", not "departureDate")
    setDepartureDate(initialValues.date ? new Date(initialValues.date) : null);
    setReturnDate(
      initialValues.returnDate ? new Date(initialValues.returnDate) : null
    );

    // 4. **VERY IMPORTANT:** set IATA codes so validation works
    setFromCode(initialValues.from || "");
    setToCode(initialValues.to || "");
  }, [initialValues]);

  useEffect(() => {
    if (tripType === "oneway") setReturnDate(null);
  }, [tripType]);

  // Dropdown filtering
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

  // Fetch suggestions
  useEffect(() => {
    if (from.trim() && !from.includes(" (")) {
      const timer = setTimeout(
        () => fetchAirports(from).then(setFromOptions),
        300
      );
      return () => clearTimeout(timer);
    }
    setFromOptions(cachedTamilNaduAirports);
  }, [from, cachedTamilNaduAirports]);

  useEffect(() => {
    if (to.trim() && !to.includes(" (")) {
      const timer = setTimeout(() => fetchAirports(to).then(setToOptions), 300);
      return () => clearTimeout(timer);
    }
    setToOptions(cachedTamilNaduAirports);
  }, [to, cachedTamilNaduAirports]);

  // Dropdown interaction handlers
  const handleFromFocus = () => {
    if (!from.trim() || !fromCode) {
      setFromOptions(cachedTamilNaduAirports);
    } else {
      const selected = cachedTamilNaduAirports.find(
        (a) => a.iataCode === fromCode
      );
      if (selected && from === formatAirportDisplay(selected)) {
        setFromOptions([selected]);
      } else {
        fetchAirports(extractCityName(from))
          .then(setFromOptions)
          .catch(() => setFromOptions([]));
      }
    }
    setShowFromDropdown(true);
  };

  const handleToFocus = () => {
    if (!to.trim() || !toCode) {
      setToOptions(cachedTamilNaduAirports);
    } else {
      const selected = cachedTamilNaduAirports.find(
        (a) => a.iataCode === toCode
      );
      if (selected && to === formatAirportDisplay(selected)) {
        setToOptions([selected]);
      } else {
        fetchAirports(extractCityName(to))
          .then(setToOptions)
          .catch(() => setToOptions([]));
      }
    }
    setShowToDropdown(true);
  };

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

  const handleSwap = () => {
    [setFrom, setTo](to, from);
    [setFromCode, setToCode](toCode, fromCode);
  };

  // Main search handler
  const handleSearch = () => {
    const validation = {};
    if (!fromCode) validation.from = "Select Departure City";
    if (!toCode) validation.to = "Select Arrival City";
    if (fromCode && toCode && fromCode === toCode)
      validation.to = "Arrival and Departure should differ";
    if (!departureDate) validation.departureDate = "Select Departure Date";
    if (tripType === "roundtrip" && !returnDate)
      validation.returnDate = "Select Return Date";
    if (!(adults + children + infants))
      validation.passengers = "Select Passengers";

    setErrors(validation);
    if (Object.keys(validation).length) return;

    const meta = {
      from: fromCode,
      to: toCode,
      date: departureDate?.toLocaleDateString("en-CA"),
      returnDate: returnDate?.toLocaleDateString("en-CA"),
      adults,
      children,
      infants,
      travelClass: classMap[selectedClass],
      tripType,
    };

    if (mode === "flights") {
      onSearch?.(meta); // prevents reload
    } else if (mode === "landing") {
      localStorage.setItem("searchMeta", JSON.stringify(meta));
      navigate("/flights");
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
