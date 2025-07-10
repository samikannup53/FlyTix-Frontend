import { useFlightSearchLogic } from "../../../shared/hooks/useFlightSearchLogic";
import swapIcon from "../../../assets/images/swap.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const FlightSearchBarShared = ({ mode = "flights", onSearch }) => {
  const {
    tripType,
    setTripType,
    from,
    to,
    fromCode,
    toCode,
    fromOptions,
    toOptions,
    showFromDropdown,
    showToDropdown,
    cachedTamilNaduAirports,
    errors,
    departureDate,
    returnDate,
    setDepartureDate,
    setReturnDate,
    adults,
    children,
    infants,
    passengersText,
    selectedClass,
    showPassengerDropdown,
    setFrom,
    setTo,
    handleSearch,
    handleSwap,
    handleSelectFrom,
    handleSelectTo,
    handleFromFocus,
    handleToFocus,
    filteredFromOptions,
    filteredToOptions,
    setShowFromDropdown,
    setShowToDropdown,
    setShowPassengerDropdown,
    setSelectedClass,
    setAdults,
    setChildren,
    setInfants,
  } = useFlightSearchLogic({ mode, onSearch });

  return (
    <div
      className={`${
        mode === "landing"
          ? "" // Landing layout
          : "lg:sticky top-0 lg:z-50 bg-gradient-to-r from-orange-900 to-pink-900 text-white shadow-xl" // Flights layout
      }`}
    >
      {/* Wrapper Container */}
      <div
        className={`${
          mode === "landing"
            ? "hidden lg:block min-w-[1000px] xl:min-w-6xl max-w-7xl px-6 py-10 z-20 rounded-2xl bg-gradient-to-r from-orange-900 to-pink-900 text-white shadow-xl absolute left-1/2 -translate-x-1/2"
            : "max-w-[1600px] mx-auto px-8 py-6"
        }`}
      >
        {/* Trip Type Toggle */}
        <div className="flex gap-3 mb-3">
          {["oneway", "roundtrip"].map((type, idx) => (
            <button
              key={type}
              className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium border text-white border-white/40 rounded-full transition-all ${
                tripType === type
                  ? "bg-white/20"
                  : "bg-transparent hover:bg-white/20"
              }`}
              onClick={() => setTripType(type)}
            >
              <i
                className={`fa-solid ${
                  type === "oneway" ? "fa-arrow-right" : "fa-retweet"
                }`}
              ></i>{" "}
              {type === "oneway" ? "One Way" : "Round Trip"}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-1">
          {/* From Input */}
          <div className="relative flex-2">
            <div
              className={`px-2 py-1.5 bg-white/20 rounded-l-lg border-b-4 transition-all ${
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
                {errors.from}
              </div>
            )}
          </div>

          {/* To Input */}
          <div className="relative flex-2">
            <div
              className={`px-2 py-1.5 bg-white/20 border-b-4 transition-all ${
                errors.to
                  ? "border-red-500"
                  : "focus-within:border-yellow-300 border-transparent"
              }`}
            >
              <label className="block text-xs text-white mb-1 ml-3">To</label>
              <input
                type="text"
                placeholder="Arrival City"
                value={to}
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
              <div className="text-xs text-red-400 mt-1 ml-1">{errors.to}</div>
            )}
          </div>

          {/* Departure Date */}
          <div className="flex-1.5">
            <div
              className={`px-2 py-1.5 bg-white/20 border-b-4 transition-all ${
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
                  if (tripType === "oneway") setReturnDate(null);
                }}
                minDate={new Date()}
                maxDate={
                  new Date(new Date().setDate(new Date().getDate() + 60))
                }
                dateFormat="yyyy-MM-dd"
                className="w-full bg-transparent text-sm text-white outline-none"
                placeholderText="Departure Date"
                wrapperClassName="w-full"
              />
            </div>
            {errors.departureDate && (
              <div className="text-xs text-red-400 mt-1 ml-1">
                {errors.departureDate}
              </div>
            )}
          </div>

          {/* Return Date */}
          <div className="flex-1.5">
            <div
              className={`px-2 py-1.5 bg-white/20 border-b-4 transition-all ${
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
                minDate={departureDate || new Date()}
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
                placeholderText="Return Date"
                wrapperClassName="w-full"
              />
            </div>
            {errors.returnDate && (
              <div className="text-xs text-red-400 mt-1 ml-1">
                {errors.returnDate}
              </div>
            )}
          </div>

          {/* Passengers & Class Dropdown */}
          <div className="relative flex-2">
            <div
              className={`px-2 py-1.5 bg-white/20 border-b-4 transition-all ${
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
                  {[
                    {
                      label: "Adults",
                      count: adults,
                      setCount: setAdults,
                      min: 1,
                      max: 10,
                      hint: "Age 12+",
                    },
                    {
                      label: "Children",
                      count: children,
                      setCount: setChildren,
                      min: 0,
                      max: 9,
                      hint: "Age 2–11",
                    },
                    {
                      label: "Infants",
                      count: infants,
                      setCount: setInfants,
                      min: 0,
                      max: 5,
                      hint: "Below 2 yrs",
                    },
                  ].map(({ label, count, setCount, min, max, hint }) => {
                    const total = adults + children + infants;
                    return (
                      <div
                        key={label}
                        className="mb-8 w-full flex items-center"
                      >
                        <div className="w-24">
                          <div className="text-sm font-semibold">{label}</div>
                          <div className="text-xs text-gray-500">{hint}</div>
                        </div>
                        <div className="flex flex-wrap border rounded-md border-gray-300 divide-x divide-gray-300 ml-4">
                          {Array.from(
                            { length: max - min + 1 },
                            (_, i) => i + min
                          ).map((num) => {
                            const isDisabled =
                              label === "Adults"
                                ? num + children + infants > 10
                                : label === "Children"
                                ? adults + num + infants > 10
                                : adults + children + num > 10;
                            return (
                              <button
                                key={num}
                                className={`w-8 h-8 text-sm font-medium transition-all ${
                                  count === num
                                    ? "bg-pink-600 text-white border-pink-600 shadow"
                                    : "bg-white text-gray-800 hover:bg-pink-100 border-gray-300"
                                } ${
                                  isDisabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }
                                first:rounded-l-md last:rounded-r-md`}
                                onClick={() => !isDisabled && setCount(num)}
                                disabled={isDisabled}
                              >
                                {num}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {/* Travel Class */}
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
                      onClick={() => setShowPassengerDropdown(false)}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
            {errors.passengers && (
              <div className="text-xs text-red-400 mt-1 ml-1">
                {errors.passengers}
              </div>
            )}
          </div>

          {/* Search Button */}
          <div>
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
