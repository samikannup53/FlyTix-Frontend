import { useEffect, useState } from "react";
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

  // Load cached searchMeta if exists (Landing Page use case)
  useEffect(() => {
    const metaStr = localStorage.getItem("searchMeta");
    if (metaStr) {
      try {
        const meta = JSON.parse(metaStr);
        setTripType(meta.tripType || "oneway");
        setFrom(meta.from || "");
        setTo(meta.to || "");
        setDepartureDate(meta.date ? new Date(meta.date) : null);
        setReturnDate(meta.returnDate ? new Date(meta.returnDate) : null);
        setAdults(meta.adults || 1);
        setChildren(meta.children || 0);
        setInfants(meta.infants || 0);
        setSelectedClass(classReverseMap[meta.travelClass] || "Economy");
        setFromCode(meta.from || "");
        setToCode(meta.to || "");
        localStorage.removeItem("searchMeta");
        onSearch?.(meta);
      } catch (e) {
        console.error("Invalid searchMeta:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (tripType === "oneway") setReturnDate(null);
  }, [tripType]);

  useEffect(() => {
    fetchAirports("Tamil-Nadu").then(setCachedTamilNaduAirports);
  }, []);

  const extractCityName = (input) => input.split(" (")[0].trim().toLowerCase();

  const filteredFromOptions = from.trim()
    ? fromOptions.filter((opt) =>
        opt.city.toLowerCase().includes(extractCityName(from))
      )
    : fromOptions;

  const filteredToOptions = to.trim()
    ? toOptions.filter((opt) =>
        opt.city.toLowerCase().includes(extractCityName(to))
      )
    : toOptions;

  useEffect(() => {
    if (from.trim()) {
      const timer = setTimeout(
        () => fetchAirports(from).then(setFromOptions),
        300
      );
      return () => clearTimeout(timer);
    }
  }, [from]);

  useEffect(() => {
    if (to.trim()) {
      const timer = setTimeout(() => fetchAirports(to).then(setToOptions), 300);
      return () => clearTimeout(timer);
    }
  }, [to]);

  const handleSelectFrom = (opt) => {
    setFrom(`${opt.city} (${opt.iataCode})`);
    setFromCode(opt.iataCode);
    setShowFromDropdown(false);
  };

  const handleSelectTo = (opt) => {
    setTo(`${opt.city} (${opt.iataCode})`);
    setToCode(opt.iataCode);
    setShowToDropdown(false);
  };

  const handleFromFocus = () => {
    if (!from.trim()) setFromOptions(cachedTamilNaduAirports);
    setShowFromDropdown(true);
  };

  const handleToFocus = () => {
    if (!to.trim()) setToOptions(cachedTamilNaduAirports);
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
      from: fromCode,
      to: toCode,
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
