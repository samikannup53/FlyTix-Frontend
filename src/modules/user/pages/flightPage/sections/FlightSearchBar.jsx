import { useEffect, useState } from "react";
import swapIcon from "../../../../../assets/images/swap.png";
import { mockFlightResults } from "../../../../../data/mockFlightResults";
import { fetchAirports } from "../../../services/airportService";

export const FlightSearchBar = ({ onSearch }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [fromCode, setFromCode] = useState("");
  const [toCode, setToCode] = useState("");

  const [departureDate, setDepartureDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState("");
  const [travelClass] = useState("ECONOMY");
  const [passengersText] = useState("1 Adult, Economy");

  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const [fromOptions, setFromOptions] = useState([]);
  const [toOptions, setToOptions] = useState([]);

  // Cache Tamil Nadu airports
  const [cachedTamilNaduAirports, setCachedTamilNaduAirports] = useState([]);

  // Fetch Tamil Nadu airports on first load
  useEffect(() => {
    fetchAirports("Tamil-Nadu").then((res) => setCachedTamilNaduAirports(res));
  }, []);

  const handleSwap = () => {
    const tempCity = from;
    const tempCode = fromCode;
    setFrom(to);
    setFromCode(toCode);
    setTo(tempCity);
    setToCode(tempCode);
  };

  const handleSearch = () => {
    const searchParams = {
      from: fromCode,
      to: toCode,
      date: departureDate,
      returnDate,
      travelClass,
      adults: 1,
      children: 0,
      infants: 0,
    };

    onSearch?.({
      results: mockFlightResults,
      // params: searchParams,
    });

    console.log(searchParams);
  };

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

  // Fetch from options on typing
  useEffect(() => {
    if (from.trim()) {
      const timer = setTimeout(() => {
        fetchAirports(from).then(setFromOptions);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [from]);

  // Fetch to options on typing
  useEffect(() => {
    if (to.trim()) {
      const timer = setTimeout(() => {
        fetchAirports(to).then(setToOptions);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [to]);

  const handleSelectFrom = (option) => {
    setFrom(`${option.city} (${option.iataCode})`);
    setFromCode(option.iataCode);
    setShowFromDropdown(false);
  };

  const handleSelectTo = (option) => {
    setTo(`${option.city} (${option.iataCode})`);
    setToCode(option.iataCode);
    setShowToDropdown(false);
  };

  const handleFromFocus = () => {
    if (!from.trim()) {
      setFromOptions(cachedTamilNaduAirports);
    } else if (fromCode && from.includes(fromCode)) {
      const selected = cachedTamilNaduAirports.find(
        (a) => a.iataCode === fromCode
      );
      setFromOptions(selected ? [selected] : []);
    }
    setShowFromDropdown(true);
  };

  const handleToFocus = () => {
    if (!to.trim()) {
      setToOptions(cachedTamilNaduAirports);
    } else if (toCode && to.includes(toCode)) {
      const selected = cachedTamilNaduAirports.find(
        (a) => a.iataCode === toCode
      );
      setToOptions(selected ? [selected] : []);
    }
    setShowToDropdown(true);
  };

  return (
    <div className="sticky top-0 z-40 bg-gradient-to-r from-orange-900 to-pink-900 text-white shadow-xl">
      <div className="max-w-[1600px] mx-auto p-5">
        {/* Trip Type Toggle */}
        <div className="flex gap-3 mb-3">
          <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium border border-white/40 rounded-full bg-transparent hover:bg-white/20 transition-all">
            <i className="fa-solid fa-arrow-right"></i> One Way
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium border border-white/40 rounded-full bg-transparent hover:bg-white/20 transition-all">
            <i className="fa-solid fa-retweet"></i> Round Trip
          </button>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-1 items-stretch">
          {/* From */}
          <div className="relative flex-1 px-2 py-1.5 bg-white/20 rounded-l-lg border-b-4 border-transparent transition-all focus-within:border-yellow-300">
            <label className="block text-xs text-white mb-1">From</label>
            <input
              type="text"
              placeholder="Departure City"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              onFocus={handleFromFocus}
              onBlur={() => setTimeout(() => setShowFromDropdown(false), 150)}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/70"
            />
            <div className="absolute top-4 -right-4 z-10">
              <button
                onClick={handleSwap}
                className="bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white p-1 rounded-full shadow-lg"
                title="Swap"
              >
                <img src={swapIcon} alt="swap" className="w-6" />
              </button>
            </div>
            {showFromDropdown && (
              <div className="absolute z-50 mt-4 left-0 bg-white rounded shadow text-gray-800 max-h-80 w-85 overflow-y-auto">
                {filteredFromOptions.length ? (
                  filteredFromOptions.map((opt) => (
                    <div
                      key={`${opt.iataCode}-${opt.city}`}
                      onClick={() => handleSelectFrom(opt)}
                      className="px-3 py-2 text-sm hover:bg-orange-100 cursor-pointer"
                    >
                      <span className="bg-gray-200 text-xs font-semibold px-1 rounded mr-2">
                        {opt.iataCode}
                      </span>
                      {opt.city}
                      {opt.country ? `, ${opt.country}` : ""}
                      {opt.name ? ` - ${opt.name}` : ""}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-400">
                    No matches found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* To */}
          <div className="relative flex-1 px-2 py-1.5 bg-white/20 border-b-4 border-transparent transition-all focus-within:border-yellow-300">
            <label className="block text-xs text-white mb-1 ml-3">To</label>
            <input
              type="text"
              value={to}
              placeholder="Arrival City"
              onChange={(e) => setTo(e.target.value)}
              onFocus={handleToFocus}
              onBlur={() => setTimeout(() => setShowToDropdown(false), 150)}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/70 ml-3"
            />
            {showToDropdown && (
              <div className="absolute z-50 mt-4 left-0 bg-white rounded shadow text-gray-800 max-h-80 w-85 overflow-y-auto">
                {filteredToOptions.length ? (
                  filteredToOptions.map((opt) => (
                    <div
                      key={`${opt.iataCode}-${opt.city}`}
                      onClick={() => handleSelectTo(opt)}
                      className="px-3 py-2 text-sm hover:bg-orange-100 cursor-pointer"
                    >
                      <span className="bg-gray-200 text-xs font-semibold px-1 rounded mr-2">
                        {opt.iataCode}
                      </span>
                      {opt.city}
                      {opt.country ? `, ${opt.country}` : ""}
                      {opt.name ? ` - ${opt.name}` : ""}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-400">
                    No matches found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Departure */}
          <div className="flex-1 px-2 py-1.5 bg-white/20">
            <label className="block text-xs text-white mb-1">Departure</label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full bg-transparent text-sm text-white outline-none"
            />
          </div>

          {/* Return */}
          <div className="flex-1 px-2 py-1.5 bg-white/20">
            <label className="block text-xs text-white mb-1">Return</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full bg-transparent text-sm text-white outline-none"
            />
          </div>

          {/* Passengers & Class */}
          <div className="flex-1 px-2 py-1.5 bg-white/20">
            <label className="block text-xs text-white mb-1">
              Passengers & Class
            </label>
            <input
              type="text"
              value={passengersText}
              readOnly
              className="w-full bg-transparent text-sm text-white outline-none"
            />
          </div>

          {/* Search */}
          <div>
            <button
              onClick={handleSearch}
              className="h-full px-5 py-1.5 text-sm font-semibold text-white bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 rounded-r-lg shadow transition-all flex items-center gap-2"
            >
              <i className="fa-solid fa-magnifying-glass"></i> Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
