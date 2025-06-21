export const TicketInfo = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      {/* Left: Booking Info */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-800">
          Booking ID: <span className="text-orange-600">FNX24367189</span>
        </h3>
        <p className="text-sm text-gray-500">
          PNR: <span className="text-orange-500 font-medium">6ER897</span>
        </p>
        <p className="text-sm text-green-600 font-medium">Status: Confirmed</p>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex flex-col items-end gap-3 mt-6 text-sm text-orange-600">
        {/* Row 1: Download / Print */}
        <div className="flex items-center gap-2">
          <a href="#" className="hover:underline flex items-center gap-1">
            <i className="fas fa-download"></i>
            Download Ticket
          </a>
          <span className="hidden md:inline">|</span>
          <a href="#" className="hover:underline flex items-center gap-1">
            <i className="fas fa-print"></i>
            Print Ticket
          </a>
        </div>

        {/* Row 2: Cancel / Reschedule */}
        <div className="flex items-center gap-2">
          <a href="#" className="hover:underline flex items-center gap-1">
            <i className="fas fa-times-circle"></i>
            Cancel Booking
          </a>
          <span className="hidden md:inline">|</span>
          <a href="#" className="hover:underline flex items-center gap-1">
            <i className="fas fa-calendar-alt"></i>
            Reschedule
          </a>
        </div>
      </div>
    </div>
  );
};

