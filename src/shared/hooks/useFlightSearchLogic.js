// -----------------------------------------------------------------------------
//  Shared hook for both Landing‑page and Flights‑page search bars
// -----------------------------------------------------------------------------
import { useState, useEffect, useCallback } from "react";
import { fetchAirports } from "../../modules/user/services/airportService";
import { useNavigate } from "react-router-dom";

/* ▸ UI <> API travel‑class mapping */
const CLASS_UI_TO_API = {
  Economy: "ECONOMY",
  "Premium Economy": "PREMIUM_ECONOMY",
  Business: "BUSINESS",
  First: "FIRST",
};
const CLASS_API_TO_UI = Object.fromEntries(
  Object.entries(CLASS_UI_TO_API).map(([k, v]) => [v, k])
);

const codeCache = new Map();

/* ─────────────────────────────────────────────────────────────────────────── */
export const useFlightSearchLogic = ({ mode, onSearch, initialValues }) => {
  /*──────── state (unchanged) ────────*/
  const [tripType, setTripType] = useState("oneway");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromCode, setFromCode] = useState("");
  const [toCode, setToCode] = useState("");

  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [selectedClass, setSelectedClass] = useState("Economy");

  const [errors, setErrors] = useState({});
  const [passengersText, setPassengersText] = useState("");
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);

  const [cachedTN, setCachedTN] = useState([]); // preload
  const [fromOptions, setFromOptions] = useState([]);
  const [toOptions, setToOptions] = useState([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const navigate = useNavigate();

  /*──────── helpers ────────*/
  const formatDisplay = useCallback(
    (a) => (a ? `${(a.city || a.name || "").trim()} (${a.iataCode})` : ""),
    []
  );

  /** Resolve an IATA code ➜ “City (CODE)” string. */
  const resolveIATAToDisplay = async (code, setter, codeSetter) => {
    if (!code) return;

    // 1️memory‑cache first
    if (codeCache.has(code)) {
      const hit = codeCache.get(code);
      setter(formatDisplay(hit));
      codeSetter(code);
      return;
    }

    // local preload (Tamil‑Nadu list)
    const preload = cachedTN.find((a) => a.iataCode === code);
    if (preload) {
      codeCache.set(code, preload);
      setter(formatDisplay(preload));
      codeSetter(code);
      return;
    }

    // as a last resort hit the API
    try {
      const res = await fetchAirports(code);
      const match = res.find((a) => a.iataCode === code);
      if (match) {
        codeCache.set(code, match);
        setter(formatDisplay(match));
        codeSetter(code);
      } else {
        // still unknown → show CODE
        setter(code);
        codeSetter(code);
      }
    } catch {
      setter(code);
      codeSetter(code);
    }
  };

  const extractCityName = (s) =>
    s
      .match(/(.*)\s\(/)?.[1]
      ?.trim()
      .toLowerCase() ?? s.trim().toLowerCase();

  /*──────── 1. preload TN once ────────*/
  useEffect(() => {
    fetchAirports("Tamil-Nadu").then(setCachedTN);
  }, []);

  /*──────── 2. prefill from Flights page ────────*/
  useEffect(() => {
    if (!initialValues || !Array.isArray(cachedTN) || cachedTN.length === 0)
      return;

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
  }, [initialValues, cachedTN.length]);

  /*──────── 3. derived UI helpers ────────*/
  useEffect(() => {
    if (tripType === "oneway") setReturnDate(null);
  }, [tripType]);

  useEffect(() => {
    const t = adults + children + infants;
    setPassengersText(`${t} Traveller${t > 1 ? "s" : ""} / ${selectedClass}`);
  }, [adults, children, infants, selectedClass]);

  /*──────── 4. live suggestions ────────*/
  const refreshOpts = (val, cached, set) => {
    if (val.trim() && !val.includes(" (")) {
      const id = setTimeout(() => fetchAirports(val).then(set), 300);
      return () => clearTimeout(id);
    }
    set(cached);
  };
  useEffect(
    () => refreshOpts(from, cachedTN, setFromOptions),
    [from, cachedTN]
  );
  useEffect(() => refreshOpts(to, cachedTN, setToOptions), [to, cachedTN]);

  /*──────── 5. dropdown handlers / swap ────────*/
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
    resolveIATAToDisplay(toCode, setFrom, setFromCode);
    resolveIATAToDisplay(fromCode, setTo, setToCode);
  };

  /*──────── 6. validate & emit meta  ────────*/
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

    // ensure input boxes keep the nice form
    resolveIATAToDisplay(fromCode, setFrom, setFromCode);
    resolveIATAToDisplay(toCode, setTo, setToCode);

    if (mode === "flights") {
      onSearch?.(meta);
    } else if (mode === "landing") {
      localStorage.setItem("searchMeta", JSON.stringify(meta));
      localStorage.removeItem("cachedFlightResults");
      localStorage.removeItem("cachedSearchMeta");
      navigate("/flights");
    }
  };

  /*──────── exposed API to component ────────*/
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
    passengersText,
    fromCode,
    toCode,

    /* dropdown */
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

    /* errors + event handlers */
    errors,
    handleSearch,
    handleSwap,
    handleSelectFrom: (opt) => {
      codeCache.set(opt.iataCode, opt); // remember full object
      setFrom(formatDisplay(opt));
      setFromCode(opt.iataCode);
      setShowFromDropdown(false);
    },
    handleSelectTo: (opt) => {
      codeCache.set(opt.iataCode, opt); // remember full object
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
