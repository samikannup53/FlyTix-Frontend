export const TicketDetails = ({ booking }) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Placeholder: You can implement PDF download later if needed
    window.print(); // Temporary fallback
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
      {/* Left: Confirmation Icon & Message */}
      <div className="flex items-center gap-3">
        <div className="text-green-500 text-5xl animate-pulse">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-2xl font-bold text-gray-800">
            Booking Confirmed!
          </h2>
          <p className="text-sm text-gray-500">
            Your flight has been successfully booked. Check your email for the
            e-ticket.
          </p>
        </div>
      </div>

      {/* Right: Booking & PNR Info */}
      <div className="text-right space-y-2">
        <p className="text-sm text-gray-600">
          Booking ID:{" "}
          <span className="text-pink-700 font-semibold">
            {booking.bookingId}
          </span>
        </p>
        <p className="text-sm text-gray-600">
          PNR Number:{" "}
          <span className="text-pink-700 font-semibold">{booking.pnr}</span>
        </p>
        <div className="text-sm text-pink-700 font-medium flex justify-end gap-2">
          <button
            onClick={handleDownload}
            className="hover:underline flex items-center gap-1"
          >
            <i className="fas fa-download text-sm"></i> Download Ticket
          </button>
          <span>|</span>
          <button
            onClick={handlePrint}
            className="hover:underline flex items-center gap-1"
          >
            <i className="fas fa-print text-sm"></i> Print Ticket
          </button>
        </div>
      </div>
    </div>
  );
};
