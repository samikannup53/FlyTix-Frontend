export const FiltersSideBar = () => {
  return (
    <aside className="lg:w-1/4 w-full bg-white/80 backdrop-blur-md p-5 rounded-xl shadow-lg h-fit sticky top-0">
      <h2 className="text-lg font-semibold text-orange-700 mb-4">Filters</h2>

      <div className="mb-4">
        <h3 className="filter-heading">Stops</h3>
        {["Non-stop", "1 Stop", "2+ Stops"].map((label) => (
          <label className="block mb-1" key={label}>
            <input type="checkbox" className="mr-2" /> {label}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="filter-heading">Airlines</h3>
        {["IndiGo", "Air India", "SpiceJet", "Vistara"].map((label) => (
          <label className="block mb-1" key={label}>
            <input type="checkbox" className="mr-2" /> {label}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="filter-heading">Price Range</h3>
        <input type="range" min="2000" max="20000" step="1000" className="w-full accent-orange-500" />
        <div className="text-sm text-gray-700 mt-1">₹2,000 - ₹20,000</div>
      </div>

      <div className="mb-4">
        <h3 className="filter-heading">Departure Time</h3>
        {["Morning (5AM - 12PM)", "Afternoon (12PM - 5PM)", "Evening (5PM - 9PM)", "Night (9PM - 5AM)"].map((label) => (
          <label className="block mb-1" key={label}>
            <input type="checkbox" className="mr-2" /> {label}
          </label>
        ))}
      </div>
    </aside>
  );
};

