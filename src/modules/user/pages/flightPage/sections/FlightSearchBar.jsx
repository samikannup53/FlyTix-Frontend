import { useEffect, useState } from "react";
import swapIcon from "../../../../../assets/images/swap.png";
import { mockFlightResults } from "../../../../../data/mockFlightResults";
import { fetchAirports } from "../../../services/airportService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const FlightSearchBar = ({ onSearch }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromCode, setFromCode] = useState("");
  const [toCode, setToCode] = useState("");

  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [selectedClass, setSelectedClass] = useState("Economy");

  const [passengersText, setPassengersText] = useState("");

  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const [fromOptions, setFromOptions] = useState([]);
  const [toOptions, setToOptions] = useState([]);
  const [cachedTamilNaduAirports, setCachedTamilNaduAirports] = useState([]);

  const [tripType, setTripType] = useState("oneway");
  const [errors, setErrors] = useState({});

  // Clear return date when switching to oneway
  useEffect(() => {
    if (tripType === "oneway") {
      setReturnDate("");
    }
  }, [tripType]);

  // Fetch Tamil Nadu airports on First Load
  useEffect(() => {
    fetchAirports("Tamil-Nadu").then((res) => setCachedTamilNaduAirports(res));
  }, []);

  // Swap Departure and Arrival City Names
  const handleSwap = () => {
    const tempCity = from;
    const tempCode = fromCode;
    setFrom(to);
    setFromCode(toCode);
    setTo(tempCity);
    setToCode(tempCode);
  };

  // Validate Inputs and Search Flights
  const handleSearch = () => {
    const validationErrors = {};

    if (!fromCode) validationErrors.from = "Select Departure City";
    if (!toCode) validationErrors.to = "Select Arrival City";
    if (fromCode === toCode)
      validationErrors.to = "Arrival City Should be Different";
    if (!departureDate)
      validationErrors.departureDate = "Select Departure Date";
    if (tripType === "roundtrip" && !returnDate)
      validationErrors.returnDate = "Select Return Date";
    if (!(adults + children + infants))
      validationErrors.passengers = "Select Passengers";
    if (!selectedClass) validationErrors.travelClass = "Select Travel Class";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const searchParams = {
      from: fromCode,
      to: toCode,
      date: departureDate ? departureDate.toISOString().split("T")[0] : null,
      returnDate: returnDate ? returnDate.toISOString().split("T")[0] : null,
      adults,
      children,
      infants,
      travelClass: selectedClass,
      tripType,
    };

    onSearch?.({
      results: mockFlightResults,
      tripType,
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
          <button
            className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium border text-white border-white/40 rounded-full transition-all ${
              tripType === "oneway"
                ? "bg-white/20 "
                : "bg-transparent hover:bg-white/20"
            }`}
            onClick={() => setTripType("oneway")}
          >
            <i className="fa-solid fa-arrow-right"></i> One Way
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium border text-white border-white/40 rounded-full transition-all ${
              tripType === "roundtrip"
                ? "bg-white/20"
                : "bg-transparent hover:bg-white/20"
            }`}
            onClick={() => setTripType("roundtrip")}
          >
            <i className="fa-solid fa-retweet"></i> Round Trip
          </button>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-1">
          {/* From */}
          <div className="relative flex-2">
            <div
              className={` px-2 py-1.5 bg-white/20 rounded-l-lg border-b-4 transition-all ${
                errors.from
                  ? "border-red-500"
                  : "focus-within:border-yellow-300 border-transparent"
              }`}
            >
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
            {errors.from && (
              <div className="text-xs text-red-400 mt-1 ml-1">
                {errors.from || ""}
              </div>
            )}
          </div>

          {/* To */}
          <div className="relative flex-2 ">
            <div
              className={` px-2 py-1.5 bg-white/20 border-b-4 transition-all ${
                errors.to
                  ? "border-red-500"
                  : "focus-within:border-yellow-300 border-transparent"
              }`}
            >
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
            {errors.to && (
              <div className="text-xs text-red-400 mt-1 ml-1 ">
                {errors.to || ""}
              </div>
            )}
          </div>

          {/* Departure */}
          <div className="flex-1.5 ">
            <div
              className={` px-2 py-1.5 bg-white/20 border-b-4 transition-all ${
                errors.departureDate
                  ? "border-red-500"
                  : "focus-within:border-yellow-300 border-transparent"
              }`}
            >
              <label className="block text-xs text-white mb-1">Departure</label>
              <DatePicker
                selected={departureDate}
                onChange={(date) => {
                  setDepartureDate(date);
                  setReturnDate(null); // Optional: reset return when departure changes
                }}
                minDate={new Date()}
                maxDate={
                  new Date(new Date().setDate(new Date().getDate() + 60))
                }
                dateFormat="yyyy-MM-dd"
                className="w-full bg-transparent text-sm text-white outline-none"
                wrapperClassName="w-full"
                placeholderText="Departure Date"
              />
            </div>
            {errors.departureDate && (
              <div className="text-xs text-red-400 mt-1 ml-1 ">
                {errors.departureDate || ""}
              </div>
            )}
          </div>

          {/* Return */}
          <div className="flex-1.5 ">
            <div
              className={` px-2 py-1.5 bg-white/20 border-b-4 transition-all ${
                errors.returnDate
                  ? "border-red-500"
                  : "focus-within:border-yellow-300 border-transparent"
              }`}
            >
              <label className="block text-xs text-white mb-1">Return</label>
              <DatePicker
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                disabled={tripType !== "roundtrip"}
                minDate={departureDate}
                maxDate={
                  departureDate
                    ? new Date(
                        new Date(departureDate).setDate(
                          new Date(departureDate).getDate() + 60
                        )
                      )
                    : new Date(new Date().setDate(new Date().getDate() + 60))
                }
                dateFormat="yyyy-MM-dd"
                className="w-full bg-transparent text-sm text-white outline-none"
                wrapperClassName="w-full"
                placeholderText="Return Date"
              />
            </div>
            {errors.returnDate && (
              <div className="text-xs text-red-400 mt-1 ml-1 ">
                {errors.returnDate || ""}
              </div>
            )}
          </div>

          {/* Passengers & Class */}
          <div className="relative flex-2">
            <div
              className={` px-2 py-1.5 bg-white/20 border-b-4 transition-all ${
                errors.passengers
                  ? "border-red-500"
                  : "focus-within:border-yellow-300 border-transparent"
              }`}
            >
              <label className="block text-xs text-white mb-1">
                Passengers & Class
              </label>
              <input
                type="text"
                value={passengersText}
                placeholder="1 Traveller / Economy"
                readOnly
                onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                className="w-full bg-transparent text-sm text-white outline-none cursor-pointer"
              />

              {showPassengerDropdown && (
                <div className="absolute z-50 mt-4 right-0 bg-white text-gray-800 rounded-lg shadow-lg w-120 p-4 space-y-4">
                  {/* Close Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => setShowPassengerDropdown(false)}
                      className="text-gray-500 hover:text-red-500 text-lg"
                      title="Close"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>

                  {/* Passenger counts */}
                  {["Adults", "Children", "Infants"].map((label, idx) => {
                    const count = [adults, children, infants][idx];
                    const setCount = [setAdults, setChildren, setInfants][idx];
                    const limits = {
                      Adults: [1, 10],
                      Children: [0, 9],
                      Infants: [0, 5],
                    };
                    const ageGroup = {
                      Adults: "Age 12+",
                      Children: "Age 2–11",
                      Infants: "Below 2 yrs",
                    };

                    const [min, max] = limits[label];
                    const totalPassengers = adults + children + infants;

                    return (
                      <div
                        key={label}
                        className="mb-8 w-full flex items-center"
                      >
                        <div className="w-24 flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold text-gray-700">
                              {label}
                            </div>
                            <div className="text-xs text-gray-500">
                              {ageGroup[label]}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap border rounded-md border-gray-300 divide-x divide-gray-300">
                          {Array.from(
                            { length: max - min + 1 },
                            (_, i) => i + min
                          ).map((num) => {
                            const newTotal =
                              label === "Adults"
                                ? num + children + infants
                                : label === "Children"
                                ? adults + num + infants
                                : adults + children + num;

                            const isDisabled = newTotal > 10;

                            return (
                              <button
                                key={num}
                                className={`w-8 h-8 text-sm font-medium transition-all 
                              ${
                                count === num
                                  ? "bg-pink-600 text-white border-pink-600 shadow"
                                  : "bg-white text-gray-800 hover:bg-pink-100 border-gray-300"
                              }
                              ${
                                isDisabled
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }
                              first:rounded-l-md last:rounded-r-md`}
                                onClick={() => {
                                  if (!isDisabled) setCount(num);
                                }}
                                disabled={isDisabled}
                                title={
                                  isDisabled
                                    ? "Max 10 passengers allowed per booking"
                                    : ""
                                }
                              >
                                {num}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {/* Travel class */}
                  <div>
                    <div className="text-sm font-semibold mb-1">
                      Travel Class
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["Economy", "Premium Economy", "Business", "First"].map(
                        (cls) => (
                          <button
                            key={cls}
                            className={`px-3 py-1 text-sm rounded border border-gray-300 ${
                              selectedClass === cls
                                ? "bg-pink-700 text-white"
                                : "bg-white hover:bg-pink-200"
                            }`}
                            onClick={() => setSelectedClass(cls)}
                          >
                            {cls}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Done Button */}
                  <div className="text-right">
                    <button
                      className="bg-gradient-to-br from-pink-700 to-pink-800 text-white px-4 py-1.5 rounded-full shadow hover:bg-pink-900 cursor-pointer text-sm"
                      onClick={() => {
                        const totalTravellers = adults + children + infants;
                        const summary = `${totalTravellers} Traveller${
                          totalTravellers > 1 ? "s" : ""
                        } / ${selectedClass}`;
                        setPassengersText(summary);
                        setShowPassengerDropdown(false);
                      }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
            {errors.passengers && (
              <div className="text-xs text-red-400 mt-1 ml-1 ">
                {errors.passengers || ""}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="">
            <button
              onClick={handleSearch}
              className="h-[3.75rem] px-5 py-1.5 text-sm font-semibold text-white bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 rounded-r-lg shadow transition-all flex items-center gap-2"
            >
              <i className="fa-solid fa-magnifying-glass"></i> Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
