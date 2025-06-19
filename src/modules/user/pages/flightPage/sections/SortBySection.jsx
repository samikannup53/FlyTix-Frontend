export const SortBySection = () => {
  return (
    <div className="w-full">
      {/* Sort By Header */}
      <div className="flex items-center gap-2 mb-3 text-gray-800 font-semibold text-base">
        <i className="fa-solid fa-arrow-up-wide-short text-orange-500"></i>
        <span>Sort By</span>
      </div>

      {/* Sort Options */}
      <div className="bg-white rounded-lg shadow flex divide-x divide-gray-200 text-sm font-medium overflow-hidden">
        <button className="flex-1 px-4 py-2 hover:bg-orange-100 text-gray-700 flex items-center justify-center gap-2">
          <i className="fa-solid fa-wand-magic-sparkles text-orange-500"></i> Smart Sort
        </button>
        <button className="flex-1 px-4 py-2 hover:bg-orange-100 text-gray-700 flex items-center justify-center gap-2">
          <i className="fa-solid fa-indian-rupee-sign text-orange-500"></i> Price
        </button>
        <button className="flex-1 px-4 py-2 hover:bg-orange-100 text-gray-700 flex items-center justify-center gap-2">
          <i className="fa-solid fa-gauge-high text-orange-500"></i> Fastest
        </button>
        <button className="flex-1 px-4 py-2 hover:bg-orange-100 text-gray-700 flex items-center justify-center gap-2">
          <i className="fa-solid fa-clock text-orange-500"></i> Earliest
        </button>
      </div>
    </div>
  );
};
