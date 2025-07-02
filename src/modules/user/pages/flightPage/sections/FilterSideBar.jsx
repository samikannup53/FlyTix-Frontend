export const FiltersSideBar = () => {
  return (
    <aside className="lg:w-1/4 w-full bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-xl h-fit sticky top-4 space-y-6">
      <h2 className="text-xl font-bold text-orange-700 flex items-center gap-2">
        <i className="fa-solid fa-filter text-orange-500" /> Filters
      </h2>

      {/* Stops */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <i className="fa-solid fa-route text-orange-500" /> Stops
        </h3>

        <div className="">
          {["Non-stop", "1 Stop", "2+ Stops"].map((label, index) => (
            <label
              key={index}
              className="flex justify-between items-center px-4 py-2 cursor-pointer "
            >
              <span className="text-sm font-medium text-gray-700">{label}</span>
              <input
                type="checkbox"
                className="w-5 h-5 rounded-sm border border-gray-400 checked:border-orange-500 checked:text-orange-500 appearance-none flex items-center justify-center cursor-pointer
                checked:bg-transparent checked:before:content-['✔'] checked:before:block checked:before:text-[12px] checked:before:leading-none checked:before:text-orange-500"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Airlines */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <i className="fa-solid fa-plane text-orange-500" /> Airlines
        </h3>

        <div className="">
          {["IndiGo", "Air India", "SpiceJet", "Vistara"].map((label) => (
            <label
              key={label}
              className="flex items-center justify-between px-3 py-2 cursor-pointer"
            >
              <span className="text-sm font-medium text-gray-800">{label}</span>

              <input
                type="checkbox"
                className="w-5 h-5 rounded-sm border border-gray-400 appearance-none flex items-center justify-center cursor-pointer transition-colors duration-200
              checked:border-orange-500 checked:bg-transparent checked:before:content-['✔'] checked:before:block checked:before:text-[12px] checked:before:leading-none checked:before:text-orange-500"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="">
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
            defaultValue="10000"
            className="w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full appearance-none outline-none accent-orange-500 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>₹2,000</span>
            <span>₹20,000</span>
          </div>
        </div>
      </div>

      {/* Departure Time */}
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
                name="departureTime"
                value={value}
              />
              <div className="flex flex-col items-center text-sm">
                <i
                  className={`fa-solid ${icon} text-lg mb-1 text-gray-600 group-hover:text-orange-600 `}
                ></i>
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
