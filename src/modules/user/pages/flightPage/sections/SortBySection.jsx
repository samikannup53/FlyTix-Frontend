export const SortBySection = ({ selectedSortOption, onSortChange }) => {
  const sortOptions = [
    { key: "smart", label: "Smart", icon: "fa-wand-magic-sparkles" },
    { key: "price", label: "Price", icon: "fa-indian-rupee-sign" },
    { key: "fastest", label: "Fastest", icon: "fa-gauge-high" },
    { key: "earliest", label: "Earliest", icon: "fa-clock" },
  ];

  return (
    <div className="w-full ">
      {/* Sort By Header */}
      <div className="flex items-center gap-2 mb-3 text-gray-800 font-semibold text-base ">
        <i className="fa-solid fa-arrow-up-wide-short text-pink-700"></i>
        <span>Sort By</span>
      </div>

      {/* Sort Options */}
      <div className="bg-white rounded-lg shadow flex divide-x divide-gray-200 text-sm font-medium overflow-hidden">
        {sortOptions.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => onSortChange(key)}
            className={`flex-1 px-4 py-2 hover:bg-pink-100 flex items-center justify-center gap-2 ${
              selectedSortOption === key
                ? "text-pink-700 font-semibold bg-pink-100"
                : "text-gray-700"
            }`}
          >
            <i className={`fa-solid ${icon} text-pink-700`} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
