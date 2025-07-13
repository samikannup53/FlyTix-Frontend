import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { BookingFooter, UserHeader } from "../../components";
import { ConfirmationSection } from "./sections/ConfirmationSection";
import { ThankYouSection } from "./sections/ThankYouSection";

export const BookingConfirm = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!bookingId) {
      toast.error("Missing Booking ID");
      return;
    }

    const fetchBooking = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/booking/${bookingId}`,

          {
            credentials: "include",
          }
        );
        const data = await res.json();

        if (!res.ok) {
          setErrorMsg(data.msg || "Booking not found.");
          return;
        }

        setBooking(data.booking);
      } catch (error) {
        if (error instanceof TypeError && error.message === "Failed to fetch") {
          setErrorMsg("Please check your internet connection and try again.");
        } else {
          setErrorMsg("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <>
        <UserHeader />
        <section className="bg-gradient-to-br from-orange-50 via-pink-50 to-orange-50 min-h-[77vh] flex flex-col items-center justify-center space-y-4">
          <i className="fas fa-spinner fa-spin text-4xl text-pink-700" />
          <p className="text-lg text-gray-600">
            Loading Your Booking Confirmation...
          </p>
        </section>
        <BookingFooter />
      </>
    );
  }

  if (!booking || errorMsg) {
    return (
      <>
        <UserHeader />
        <section className="bg-gradient-to-br from-orange-50 via-pink-50 to-orange-50 min-h-[77vh] flex items-center justify-center px-4">
          <div className="border border-pink-200 rounded-xl shadow-sm p-6 max-w-md w-full text-center space-y-4">
            <i className="fas fa-exclamation-triangle text-pink-800 text-6xl" />
            <p className="text-xl font-semibold text-pink-700">
              Oops! Something Went Wrong
            </p>
            <p className="text-gray-600 text-sm">{errorMsg}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gradient-to-br from-orange-700 via-pink-700 to-pink-800 hover:from-orange-700 hover:to-pink-700 text-white rounded-full text-sm font-medium transition cursor-pointer"
            >
              Retry
            </button>
          </div>
        </section>
        <BookingFooter />
      </>
    );
  }

  return (
    <>
      <UserHeader />
      <section className="min-h-[85vh] bg-gradient-to-br from-orange-50 to-yellow-100 py-6 px-4">
        <ConfirmationSection booking={booking} />
        <ThankYouSection booking={booking} />
      </section>
      <BookingFooter />
    </>
  );
};
