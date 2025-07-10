export const MyBookingsHeader = ({
  total = 0,
  cancelled = 0,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-orange-200 pb-4 mb-10">
      {/* Left Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-pink-900 flex items-center gap-2 sm:gap-3">
        <span className="border-l-4 border-pink-600 pl-3">My Bookings</span>
        <span className="flex gap-1 text-pink-600 text-xl sm:text-2xl">
          <i className="fas fa-clock-rotate-left" />
        </span>
      </h2>

      {/* Right: Search + Badges */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
        {/* Booking Counts */}
        <div className="flex gap-2 flex-wrap">
          <span className="bg-pink-100 text-pink-700 text-sm font-medium px-3 py-1 rounded-full border border-pink-600 shadow-sm">
            Total: {total}
          </span>
          <span className="bg-pink-100 text-pink-700 text-sm font-medium px-3 py-1 rounded-full border border-pink-600 shadow-sm">
            Cancelled: {cancelled}
          </span>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-56">
          <input
            type="text"
            placeholder="Search by Booking ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border bg-white/50 border-pink-600 rounded-full px-4 py-1 pr-8 text-sm w-full placeholder-pink-500 text-pink-800 focus:outline-none focus:bg-white transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-700 hover:text-pink-900"
            >
              <i className="fas fa-times text-xs" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
