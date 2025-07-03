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
    IX: "Air India Express",
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
    <aside className="lg:w-1/4 w-full bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-xl h-fit sticky top-4 space-y-6">
      {/* Filters Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-orange-700 flex items-center gap-2">
          <i className="fa-solid fa-filter text-orange-500" /> Filters
        </h2>
        <button
          onClick={onClearFilters}
          className="text-sm text-orange-600 font-medium hover:underline flex items-center gap-1"
        >
          <i className="fa-solid fa-rotate-left" /> Clear
        </button>
      </div>

      {/* Stops Filter */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-route text-orange-500" /> Stops
        </h3>
        <div className="space-y-4 px-2">
          {allStops.map((label) => (
            <label
              key={label}
              className="flex justify-between items-center cursor-pointer"
            >
              <span className="text-sm font-medium text-gray-700">{label}</span>
              <input
                type="checkbox"
                checked={selectedStops.includes(label)}
                onChange={() =>
                  handleToggle(label, selectedStops, setSelectedStops)
                }
                className="w-5 h-5 rounded-sm border border-gray-400 appearance-none flex items-center justify-center cursor-pointer
                  checked:border-orange-500 checked:bg-transparent
                  checked:before:content-['✔'] checked:before:block checked:before:text-[12px] checked:before:leading-none checked:before:text-orange-500"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Airlines Filter */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-plane text-orange-500" /> Airlines
        </h3>
        <div className="space-y-4 px-2">
          {allAirlines.map((code) => (
            <label
              key={code}
              className="flex items-center justify-between cursor-pointer"
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
                  checked:border-orange-500 checked:bg-transparent
                  checked:before:content-['✔'] checked:before:block checked:before:text-[12px] checked:before:leading-none checked:before:text-orange-500"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <i className="fa-solid fa-indian-rupee-sign text-orange-600" /> Price
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
            className="w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full appearance-none outline-none accent-orange-500 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>₹2,000</span>
            <span>₹20,000</span>
          </div>
          <p className="text-sm text-orange-600 font-medium mt-1 text-center">
            Up to ₹{maxPrice.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Departure Time Filter */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <i className="fa-solid fa-clock text-orange-500" /> Departure Time
        </h3>
        <div className="grid grid-cols-2 gap-3">
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
          ].map(({ label, time, icon, value }) => (
            <label
              key={value}
              className="group relative cursor-pointer block bg-white border border-gray-300 rounded-xl px-3 py-4 text-center shadow-sm hover:border-orange-500 transition"
            >
              <input
                type="checkbox"
                className="absolute opacity-0 peer"
                checked={selectedTimes.includes(value)}
                onChange={() =>
                  handleToggle(value, selectedTimes, setSelectedTimes)
                }
              />
              <div className="flex flex-col items-center text-sm">
                <i
                  className={`fa-solid ${icon} text-lg mb-1 text-gray-600 group-hover:text-orange-600`}
                />
                <span className="font-medium text-gray-800 group-hover:text-orange-600">
                  {label}
                </span>
                <span className="text-[12px] text-gray-500 group-hover:text-orange-600">
                  {time}
                </span>
              </div>
              <div className="absolute inset-0 rounded-xl border-2 border-orange-500 opacity-0 peer-checked:opacity-100 transition"></div>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};
