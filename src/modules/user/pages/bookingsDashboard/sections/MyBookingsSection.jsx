import { MyBookingCard } from "./MyBookingCard";

export const MyBookingsSection = ({bookings = [], loading, error, searchQuery, setBookings  }) => {
  // Filter bookings by Booking ID
  const filteredBookings = bookings.filter((b) =>
    b.bookingId.toLowerCase().includes((searchQuery || "").trim().toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <i className="fas fa-spinner fa-spin text-4xl text-pink-700"></i>
        <p className="text-lg text-gray-600">Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center bg-white border border-red-200 text-red-600 rounded-xl p-6 shadow-sm max-w-md mx-auto">
        <i className="fas fa-exclamation-triangle text-3xl mb-3"></i>
        <p className="text-lg font-semibold">Something went wrong</p>
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (filteredBookings.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-16">
        <i className="fas fa-folder-open text-5xl text-pink-300 mb-4"></i>
        <p className="text-lg font-semibold">No bookings found</p>
        <p className="text-sm">Try adjusting your search or check later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {filteredBookings.map((booking) => (
        <MyBookingCard key={booking._id} booking={booking} setBookings={setBookings} />
      ))}
    </div>
  );
};
