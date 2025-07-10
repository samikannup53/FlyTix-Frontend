import { useEffect, useState } from "react";
import { BookingFooter, UserHeader } from "../../components";
import { MyBookingsHeader } from "./sections/MyBookingsHeader";
import { MyBookingsSection } from "./sections/MyBookingsSection";

export const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/booking/mybookings",
          {
            credentials: "include",
          }
        );
        const data = await res.json();

        if (!res.ok) {
          setErrorMsg(data.msg || "Failed to load bookings");
        } else {
          setBookings(data.bookings || []);
        }
      } catch (err) {
        setErrorMsg("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((b) =>
    b.bookingId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <UserHeader />
      <section className="bg-gradient-to-tr from-orange-50 via-pink-50 to-orange-50 min-h-[85vh] py-10 px-4">
        <main className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <MyBookingsHeader
            total={bookings.length}
            cancelled={
              bookings.filter((b) => b.bookingStatus === "Cancelled").length
            }
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {loading && (
            <div className="flex justify-center items-center min-h-[40vh]">
              <i className="fas fa-spinner fa-spin text-pink-700 text-3xl"></i>
            </div>
          )}

          {!loading && errorMsg && (
            <div className="text-center text-pink-700 font-medium bg-pink-100 border border-pink-300 rounded-lg py-4 px-6">
              {errorMsg}
            </div>
          )}

          {!loading && !errorMsg && (
            <MyBookingsSection
              setBookings={setBookings}
              bookings={filteredBookings}
            />
          )}
        </main>
      </section>
      <BookingFooter />
    </>
  );
};
