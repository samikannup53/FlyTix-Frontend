/* eslint-disable react-hooks/exhaustive-deps */
// -----------------------------------------------------------------------------
//  Shared hook for both Landing‑page and Flights‑page search bars
//  –  Prefills from `initialValues` (Flights page supplies this)
//  –  Converts IATA ↔ nice display (eg "Chennai (MAA)")
//  –  Emits the validated meta object via onSearch()   (Flights page only)
// -----------------------------------------------------------------------------
import { useState, useEffect, useCallback } from "react";
import { fetchAirports } from "../../modules/user/services/airportService";
import { useNavigate } from "react-router-dom";

/* ▸ UI ⇆ API travel‑class mapping */
const CLASS_UI_TO_API = {
  Economy: "ECONOMY",
  "Premium Economy": "PREMIUM_ECONOMY",
  Business: "BUSINESS",
  First: "FIRST",
};
const CLASS_API_TO_UI = Object.fromEntries(
  Object.entries(CLASS_UI_TO_API).map(([k, v]) => [v, k])
);

/* 🗄️  tiny in‑memory cache so we never lose display text */
const codeCache = new Map();

export const useFlightSearchLogic = ({ mode, onSearch, initialValues }) => {
  /*───────────────────────────
   *  Core state
   *───────────────────────────*/
  const [tripType, setTripType] = useState("oneway");
  const [from, setFrom] = useState(""); // display value
  const [to, setTo] = useState("");
  const [fromCode, setFromCode] = useState(""); // IATA only
  const [toCode, setToCode] = useState("");

  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [selectedClass, setSelectedClass] = useState("Economy");

  /* UI helpers */
  const [errors, setErrors] = useState({});
  const [passengersText, setPassengersText] = useState("");
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);

  /* Airport suggestions & cache */
  const [cachedTN, setCachedTN] = useState([]); // Tamil‑Nadu cache
  const [fromOptions, setFromOptions] = useState([]);
  const [toOptions, setToOptions] = useState([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const navigate = useNavigate();

  /*───────────────────────────
   *  Helpers
   *───────────────────────────*/
  const formatDisplay = useCallback(
    (a) => (a ? `${a.city} (${a.iataCode})` : ""),
    []
  );

  /** Resolve an IATA **code** → nice display string,
      using (1) memory cache → (2) TN preload → (3) one‑off API call. */
  const resolveIATAToDisplay = async (code, setter, codeSetter) => {
    if (!code) return;

    const cached = cachedTN.find((a) => a.iataCode === code);
    if (cached) {
      setter(formatDisplay(cached));
      codeSetter(code);
      return;
    }

    try {
      const res = await fetchAirports(code);
      const match = res.find((a) => a.iataCode === code);
      if (match) {
        setter(formatDisplay(match));
        codeSetter(code);
      } else {
        // fallback: just show code
        setter(code);
        codeSetter(code);
      }
    } catch {
      // fallback in case of network/API error
      setter(code);
      codeSetter(code);
    }
  };

  const extractCityName = (s) =>
    s
      .match(/(.*)\s\(/)?.[1]
      ?.trim()
      .toLowerCase() ?? s.trim().toLowerCase();

  /*───────────────────────────
   *  1. Load static TN cache once
   *───────────────────────────*/
  useEffect(() => {
    fetchAirports("Tamil-Nadu").then(setCachedTN);
  }, []);

  /*───────────────────────────
   *  2. Prefill from Flights‑page `initialValues`
   *───────────────────────────*/
  useEffect(() => {
    if (!initialValues) return;
    (async () => {
      setTripType(initialValues.tripType || "oneway");
      setAdults(initialValues.adults ?? 1);
      setChildren(initialValues.children ?? 0);
      setInfants(initialValues.infants ?? 0);
      setSelectedClass(CLASS_API_TO_UI[initialValues.travelClass] || "Economy");

      setDepartureDate(
        initialValues.date ? new Date(initialValues.date) : null
      );
      setReturnDate(
        initialValues.returnDate ? new Date(initialValues.returnDate) : null
      );

      await resolveIATAToDisplay(initialValues.from, setFrom, setFromCode);
      await resolveIATAToDisplay(initialValues.to, setTo, setToCode);
    })();
  }, [initialValues, cachedTN]);

  /* auto‑clear return when switching to oneway */
  useEffect(() => {
    if (tripType === "oneway") setReturnDate(null);
  }, [tripType]);

  /* passengers summary */
  useEffect(() => {
    const t = adults + children + infants;
    setPassengersText(`${t} Traveller${t > 1 ? "s" : ""} / ${selectedClass}`);
  }, [adults, children, infants, selectedClass]);

  /*───────────────────────────
   *  3. Dynamic suggestions
   *───────────────────────────*/
  const updateSuggestions = (val, cached, setter) => {
    if (val.trim() && !val.includes(" (")) {
      const id = setTimeout(() => fetchAirports(val).then(setter), 300);
      return () => clearTimeout(id);
    }
    setter(cached);
  };
  useEffect(
    () => updateSuggestions(from, cachedTN, setFromOptions),
    [from, cachedTN]
  );
  useEffect(
    () => updateSuggestions(to, cachedTN, setToOptions),
    [to, cachedTN]
  );

  /*───────────────────────────
   *  4. Handlers for dropdowns / swap
   *───────────────────────────*/
  const handleFocus = (val, code, setOpts, setShow) => {
    if (!val.trim() || !code) setOpts(cachedTN);
    else {
      const cached = cachedTN.find((a) => a.iataCode === code);
      if (cached && val === formatDisplay(cached)) setOpts([cached]);
      else
        fetchAirports(extractCityName(val))
          .then(setOpts)
          .catch(() => setOpts([]));
    }
    setShow(true);
  };

  const handleSwap = () => {
    // re‑resolve so UI text never blanks out
    resolveIATAToDisplay(toCode, setFrom, setFromCode);
    resolveIATAToDisplay(fromCode, setTo, setToCode);
  };

  /*───────────────────────────
   *  5. VALIDATE & EMIT SEARCH
   *───────────────────────────*/
  const handleSearch = () => {
    const v = {};
    if (!fromCode) v.from = "Select Departure City";
    if (!toCode) v.to = "Select Arrival City";
    if (fromCode && toCode && fromCode === toCode)
      v.to = "Arrival and Departure should differ";
    if (!departureDate) v.departureDate = "Select Departure Date";
    if (tripType === "roundtrip" && !returnDate)
      v.returnDate = "Select Return Date";
    if (!(adults + children + infants)) v.passengers = "Select Passengers";

    setErrors(v);
    if (Object.keys(v).length) return;

    const meta = {
      from: fromCode,
      to: toCode,
      date: departureDate?.toLocaleDateString("en-CA") ?? null,
      returnDate: returnDate?.toLocaleDateString("en-CA") ?? null,
      adults,
      children,
      infants,
      travelClass: CLASS_UI_TO_API[selectedClass],
      tripType,
    };

    // ✅ Fix input box display values
    resolveIATAToDisplay(fromCode, setFrom, setFromCode);
    resolveIATAToDisplay(toCode, setTo, setToCode);

    if (mode === "flights") {
      onSearch?.(meta); // Flights page consumes
    } else if (mode === "landing") {
      localStorage.setItem("searchMeta", JSON.stringify(meta));
      localStorage.removeItem("cachedFlightResults");
      localStorage.removeItem("cachedSearchMeta");
      navigate("/flights");
    }
  };

  /*───────────────────────────
   *  Return view‑model
   *───────────────────────────*/
  return {
    /* — exposed state — */
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
    passengersText,

    /* airport codes (readonly outside) */
    fromCode,
    toCode,

    /* dropdown helpers */
    showFromDropdown,
    setShowFromDropdown,
    showToDropdown,
    setShowToDropdown,
    showPassengerDropdown,
    setShowPassengerDropdown,
    fromOptions,
    toOptions,
    filteredFromOptions: from.trim()
      ? fromOptions.filter(
          (o) =>
            o.city.toLowerCase().includes(extractCityName(from)) ||
            o.iataCode.toLowerCase().includes(from.toLowerCase()) ||
            o.name.toLowerCase().includes(from.toLowerCase())
        )
      : fromOptions,
    filteredToOptions: to.trim()
      ? toOptions.filter(
          (o) =>
            o.city.toLowerCase().includes(extractCityName(to)) ||
            o.iataCode.toLowerCase().includes(to.toLowerCase()) ||
            o.name.toLowerCase().includes(to.toLowerCase())
        )
      : toOptions,

    /* errors + handlers */
    errors,
    handleSearch,
    handleSwap,
    handleSelectFrom: (opt) => {
      setFrom(formatDisplay(opt));
      setFromCode(opt.iataCode);
      setShowFromDropdown(false);
    },
    handleSelectTo: (opt) => {
      setTo(formatDisplay(opt));
      setToCode(opt.iataCode);
      setShowToDropdown(false);
    },
    handleFromFocus: () =>
      handleFocus(from, fromCode, setFromOptions, setShowFromDropdown),
    handleToFocus: () =>
      handleFocus(to, toCode, setToOptions, setShowToDropdown),
  };
};
