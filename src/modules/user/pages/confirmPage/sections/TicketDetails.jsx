export const TicketDetails = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
      {/* Left: Confirmation Icon & Message */}
      <div className="flex items-center gap-3">
        <div className="text-green-500 text-5xl">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-2xl font-bold text-gray-800">Booking Confirmed!</h2>
          <p className="text-sm text-gray-500">
            Your flight has been successfully booked. Check your email for the e-ticket.
          </p>
        </div>
      </div>

      {/* Right: Booking & PNR Info */}
      <div className="text-right space-y-2">
        <p className="text-sm text-gray-600">
          Booking ID: <span className="text-orange-600 font-semibold">FNX24367189</span>
        </p>
        <p className="text-sm text-gray-600">
          PNR Number: <span className="text-orange-600 font-semibold">6ER897</span>
        </p>
        <div className="text-sm text-orange-600 font-medium flex justify-end gap-2">
          <a href="#" className="hover:underline flex items-center gap-1">
            <i className="fas fa-download text-sm"></i> Download Ticket
          </a>
          <span>|</span>
          <a href="#" className="hover:underline flex items-center gap-1">
            <i className="fas fa-print text-sm"></i> Print Ticket
          </a>
        </div>
      </div>
    </div>
  );
};

