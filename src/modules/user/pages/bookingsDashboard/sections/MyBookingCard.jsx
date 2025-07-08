import { Link } from "react-router-dom";

export const MyBookingCard = ({ booking }) => {
  if (!booking) return null;

  const journey = booking.journey?.[0];
  const outbound = journey?.outbound;
  const returnTrip = journey?.returnTrip;
  const tripType = booking.tripType || "One Way";

  const formatSegment = (segment, label) => {
    const first = segment?.segments?.[0];
    const last = segment?.segments?.[segment.segments.length - 1];

    const airlineLogo = first?.airlineCode
      ? `https://images.ixigo.com/img/common-resources/airline-new/${first.airlineCode}.png`
      : "/default-logo.png";

    const fromCity = first?.from?.city || "N/A";
    const toCity = last?.to?.city || "N/A";
    const date = first?.from?.date
      ? new Date(first.from.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "N/A";

    const airline = first?.airlineName || "Unknown Airline";
    const flightNumber = first?.flightNumber || "N/A";

    return (
      <div className="flex items-center gap-4 flex-1">
        <img
          src={airlineLogo}
          alt={airline}
          className="w-12 h-12 object-contain"
        />
        <div>
          <p className="font-semibold text-gray-800">
            {fromCity} <i className="fas fa-arrow-right mx-2"></i> {toCity}
          </p>
          <p className="text-sm text-gray-600">
            {date} | {airline} | Flight {flightNumber}
          </p>
        </div>
      </div>
    );
  };

  const bookingId = booking.bookingId || "N/A";
  const pnr = booking.pnr || "N/A";
  const status = booking.bookingStatus || "Unknown";
  const bookingDate = new Date(booking.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white border border-pink-100 rounded-xl p-5 shadow-sm space-y-4">
      {/* Top Info Container */}
      <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
        {/* Left Section: Segments */}
        <div className="flex flex-col lg:flex-row gap-2 xl:gap-4 flex-1">
          {formatSegment(outbound, "Onward")}
          {tripType === "Roundtrip" && (
            <div className="hidden md:block w-px bg-gray-200"></div>
          )}
          {tripType === "Roundtrip" && formatSegment(returnTrip, "Return")}
        </div>

        {/* Right Section: Booking Info */}
        <div className="text-center md:text-right space-y-1 min-w-[160px]">
          <p className="text-sm text-gray-600">
            Booking ID:{" "}
            <span className="text-pink-700 font-semibold">{bookingId}</span>
          </p>
          <p className="text-sm text-gray-600">
            PNR: <span className="text-pink-700 font-semibold">{pnr}</span>
          </p>
          <p className="text-sm text-gray-600">
            Status:{" "}
            <span className="font-semibold text-green-600">{status}</span>
          </p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-2  justify-between mt-4">
        <div className="flex gap-2 flex-wrap justify-center md:justify-start">
          <button
            className="flex items-center gap-2 px-3 py-1 text-sm text-pink-700 border border-pink-600 rounded-full hover:bg-pink-100 transition duration-200"
            title="Download Ticket"
          >
            <i className="fas fa-download text-xs"></i>
            <span>Download</span>
          </button>
          <button
            className="flex items-center gap-2 px-3 py-1 text-sm text-pink-700 border border-pink-600 rounded-full hover:bg-pink-100 transition duration-200"
            title="Print Ticket"
          >
            <i className="fas fa-print text-xs"></i>
            <span>Print</span>
          </button>
          <button
            className="flex items-center gap-2 px-3 py-1 text-sm text-red-600 border border-red-500 rounded-full hover:bg-red-100 transition duration-200"
            title="Cancel Booking"
          >
            <i className="fas fa-times-circle text-xs"></i>
            <span>Cancel</span>
          </button>
          <button
            className="flex items-center gap-2 px-3 py-1 text-sm text-amber-600 border border-amber-500 rounded-full hover:bg-amber-100 transition duration-200"
            title="Reschedule Booking"
          >
            <i className="fas fa-sync-alt text-xs"></i>
            <span>Reschedule</span>
          </button>
          <Link
            to={`/booking/confirm?bookingId=${bookingId}`}
            className="flex items-center gap-2 px-3 py-1 text-sm text-white bg-pink-700 rounded-full hover:bg-pink-800 transition duration-200"
            title="View Booking Details"
          >
            <i className="fas fa-eye text-xs"></i>
            <span>View</span>
          </Link>
        </div>

        <div className="flex gap-2 items-center">
          <p className="text-sm text-gray-600">
            <span className="text-sm font-medium text-pink-700">
              {tripType}
            </span>
            &nbsp; <span>|</span>
          </p>
          <p className="text-sm text-gray-500">
            Booked on : <span className="font-medium">{bookingDate}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
