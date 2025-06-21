export const DashboardHeading = () => {
  return (
    <div className="flex items-center justify-between border-b border-orange-200 pb-3 mb-6">
      {/* Left: Title with Icon */}
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center border-l-4 border-orange-500 pl-3">
        Your Bookings
        <i className="fas fa-angle-right text-orange-500 text-2xl ml-2 mt-[0.5px]"></i>
      </h2>

      {/* Right: Stats */}
      <div className="flex items-center gap-6 text-sm">
        <span className="flex items-center gap-2">
          <i className="fas fa-ticket-alt text-orange-500"></i>
          <span className="text-gray-600">Total Bookings:</span>
          <span className="bg-orange-100 text-orange-600 font-semibold px-2 py-0.5 rounded-full text-sm shadow-sm">5</span>
        </span>

        <span className="flex items-center gap-2">
          <i className="fas fa-times-circle text-red-500"></i>
          <span className="text-gray-600">Cancelled:</span>
          <span className="bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full text-sm shadow-sm">1</span>
        </span>
      </div>
    </div>
  );
};

