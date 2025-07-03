export const FiltersSideBar = ({
  selectedStops,
  setSelectedStops,
  selectedAirlines,
  setSelectedAirlines,
  maxPrice,
  setMaxPrice,
  selectedTimes,
  setSelectedTimes,
  onClearFilters,
}) => {
  // Static options
  const allStops = ["Non-stop", "1 Stop", "2+ Stops"];
  const allAirlines = ["AI", "IX", "6E", "QP", "SG", "9I", "UK", "EK"];

  // Optional labels to show full airline names
  const airlineLabels = {
    AI: "Air India",
    IX: "AI Express",
    "6E": "IndiGo",
    QP: "Akasa Air",
    SG: "SpiceJet",
    "9I": "Alliance Air",
    UK: "Vistara",
    EK: "Emirates",
  };

  // Toggle handler for checkbox selections
  const handleToggle = (value, selectedList, setSelectedList) => {
    setSelectedList((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <aside className="lg:w-1/4 w-full bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-xl h-fit sticky -top-24 2xl:top-44 space-y-6">
      {/* Filters Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-pink-700 flex items-center gap-2">
          <i className="fa-solid fa-filter text-pink-700" /> Filters
        </h2>
        <button
          onClick={onClearFilters}
          className="text-sm cursor-pointer text-pink-700 font-medium hover:underline flex items-center gap-1"
        >
          <i className="fa-solid fa-rotate-left" /> Clear
        </button>
      </div>

      {/* Stops Filter */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <i className="fa-solid fa-route text-pink-700" /> Stops
        </h3>

        <div className="flex justify-between flex-wrap ">
          {allStops.map((label) => {
            const isSelected = selectedStops.includes(label);
            return (
              <button
                key={label}
                onClick={() =>
                  handleToggle(label, selectedStops, setSelectedStops)
                }
                className={`px-3 py-1 rounded-lg border text-sm transition-all duration-200
            flex items-center justify-center gap-2
            ${
              isSelected
                ? "bg-pink-100 text-pink-700 font-medium border-pink-700"
                : "bg-white text-gray-700 border-gray-300 hover:bg-pink-50"
            }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Airlines Filter */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <i className="fa-solid fa-plane text-pink-700" /> Airlines
        </h3>
        {/* Two-column layout using flex-wrap */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 px-2">
          {allAirlines.map((code) => (
            <label
              key={code}
              className="w-[calc(50%-0.5rem)] flex items-center justify-between cursor-pointer"
            >
              <span className="text-sm font-medium text-gray-800">
                {airlineLabels[code] || code}
              </span>
              <input
                type="checkbox"
                checked={selectedAirlines.includes(code)}
                onChange={() =>
                  handleToggle(code, selectedAirlines, setSelectedAirlines)
                }
                className="w-5 h-5 rounded-sm border border-gray-400 appearance-none flex items-center justify-center cursor-pointer transition-colors duration-200
            checked:border-pink-700 checked:bg-transparent
            checked:before:content-['✔'] checked:before:block checked:before:text-[12px] checked:before:leading-none checked:before:text-pink-700"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <i className="fa-solid fa-indian-rupee-sign text-pink-700" /> Price
          Range
        </h3>
        <div className="p-2">
          <input
            type="range"
            min="2000"
            max="20000"
            step="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-1 bg-gradient-to-r from-orange-600 to-pink-700 rounded-full appearance-none outline-none accent-pink-800 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>₹2,000</span>
            <span>₹20,000</span>
          </div>
          <p className="text-sm text-pink-700 font-medium mt-1 text-center">
            Up to ₹{maxPrice.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Departure Time Filter */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <i className="fa-solid fa-clock text-pink-700" /> Departure Time
        </h3>

        <div className="flex justify-between flex-wrap gap-2 ">
          {[
            {
              label: "Morning",
              time: "5AM - 12PM",
              icon: "fa-sun",
              value: "morning",
            },
            {
              label: "Afternoon",
              time: "12PM - 5PM",
              icon: "fa-cloud-sun",
              value: "afternoon",
            },
            {
              label: "Evening",
              time: "5PM - 9PM",
              icon: "fa-cloud-moon",
              value: "evening",
            },
            {
              label: "Night",
              time: "9PM - 5AM",
              icon: "fa-moon",
              value: "night",
            },
          ].map(({ label, time, icon, value }) => {
            const isSelected = selectedTimes.includes(value);
            return (
              <button
                key={value}
                onClick={() =>
                  handleToggle(value, selectedTimes, setSelectedTimes)
                }
                className={`flex flex-col items-center justify-center px-4 py-3 w-[48%] rounded-xl border text-sm transition-all duration-200 shadow-sm
            ${
              isSelected
                ? "bg-pink-100 text-pink-700 font-medium border-pink-700"
                : "bg-white text-gray-700 border-gray-300 hover:bg-pink-100"
            }
          `}
              >
                <i className={`fa-solid ${icon} text-lg mb-1`} />
                <span className="font-medium">{label}</span>
                <span className="text-[12px] ">{time}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
