export const TicketDetails = ({ booking }) => {
  if (!booking) return null;

  const handlePrint = () => window.print();
  const handleDownload = () => window.print(); // temporary fallback

  const getBanner = () => {
    if (booking.cancellation?.isCancelled) {
      return {
        icon: "fas fa-times-circle",
        text: "Booking Cancelled",
        color: "text-red-600",
        subtext: `This booking was cancelled.`,
        dateLabel: "Cancelled On",
        dateValue: booking.updatedAt,
      };
    } else if (booking.isRescheduled) {
      const lastReschedule =
        booking.rescheduleHistory?.[booking.rescheduleHistory.length - 1];
      return {
        icon: "fas fa-sync-alt",
        text: "Booking Rescheduled",
        color: "text-amber-600",
        subtext: `Your booking was successfully rescheduled.`,
        dateLabel: "Rescheduled On",
        dateValue: lastReschedule?.rescheduledAt || booking.updatedAt,
      };
    } else {
      return {
        icon: "fas fa-check-circle",
        text: "Booking Confirmed!",
        color: "text-green-600",
        subtext:
          "Your flight has been successfully booked. Check your email for the e-ticket.",
        dateLabel: "Confirmed On",
        dateValue: booking.bookingConfirmedAt,
      };
    }
  };

  const formatDate = (isoDate) => {
    const d = new Date(isoDate);
    return !isNaN(d)
      ? d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";
  };

  const banner = getBanner();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
      {/* Left: Status Icon & Message */}
      <div className="flex items-start gap-3">
        <div className={`${banner.color} text-6xl mt-1`}>
          <i className={banner.icon}></i>
        </div>
        <div className="text-left space-y-1">
          <h2 className="text-2xl font-bold text-gray-800">{banner.text}</h2>
          <p className="text-sm text-gray-500">{banner.subtext}</p>
          <p className="text-xs text-gray-400 mt-1">
            {banner.dateLabel}:{" "}
            <span className="text-gray-700 font-medium">
              {formatDate(banner.dateValue)}
            </span>
          </p>
        </div>
      </div>

      {/* Right: Booking ID, PNR, Actions */}
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
        <div className="text-sm text-pink-700 font-medium flex justify-end gap-2 flex-wrap">
          <button
            onClick={handleDownload}
            className="hover:underline flex items-center gap-1"
            title="Download Ticket"
          >
            <i className="fas fa-download text-sm"></i> Download Ticket
          </button>
          <span>|</span>
          <button
            onClick={handlePrint}
            className="hover:underline flex items-center gap-1"
            title="Print Ticket"
          >
            <i className="fas fa-print text-sm"></i> Print Ticket
          </button>
        </div>
      </div>
    </div>
  );
};
