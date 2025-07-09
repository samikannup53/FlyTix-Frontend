export const MyBookingsHeader = ({
  total = 0,
  cancelled = 0,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 py-4">
      {/* Left: Heading */}
      <h2 className="text-2xl font-bold text-pink-800">My Bookings</h2>

      {/* Right: Badges and Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
        {/* Booking Counts */}
        <div className="flex gap-3">
          <span className="bg-pink-100/50 text-pink-700 text-sm font-medium px-3 py-1 rounded-full border border-pink-600">
            Total: {total}
          </span>
          <span className="bg-pink-100/50 text-pink-700 text-sm font-medium px-3 py-1 rounded-full border border-pink-600">
            Cancelled: {cancelled}
          </span>
        </div>

        {/* Search Box */}
        <div className="relative w-full sm:w-55">
          <input
            type="text"
            placeholder="Search by Booking ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border bg-white/50 border-pink-600 rounded-full px-4 py-1 pr-8 text-sm w-full focus:outline-none focus-within:bg-white "
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-pink-700 hover:text-pink-900"
            >
              <i className="fas fa-times text-xs"></i>{" "}
              {/* Or "fa-xmark" for FA6+ */}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
