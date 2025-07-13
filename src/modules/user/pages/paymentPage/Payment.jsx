import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { BookingHeader, BookingFooter } from "../../components";
import { ConfirmPaySection } from "./sections/ConfirmPaySection";
import { DosAndDontsAlert } from "./sections/DosAndDontsAlert";
import { PaymentMethods } from "./sections/PaymentMethods";

export const Payment = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

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
          toast.error(data.msg || "Failed to fetch booking");
          return;
        }

        setBooking(data.booking);
      } catch (error) {
        console.error("Booking fetch error:", error.message);
        toast.error("Server error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <>
        <BookingHeader />
        <section className="bg-gradient-to-tr from-orange-50 via-pink-50 to-orange-50">
          <div className="flex flex-col items-center justify-center min-h-[77vh] 2xl:min-h-[85vh] space-y-4">
            <i className="fas fa-spinner fa-spin text-4xl text-pink-700"></i>
            <p className="text-lg text-gray-600">
              Loading Your Payment Details...
            </p>
          </div>
        </section>
        <BookingFooter />
      </>
    );
  }

  if (!booking) {
    return (
      <>
        <BookingHeader />
        <section className="bg-gradient-to-tr from-orange-50 via-pink-50 to-orange-50">
          <div className="flex flex-col items-center justify-center min-h-[77vh] 2xl:min-h-[85vh] px-4">
            <div className="border border-pink-200 rounded-xl shadow-sm p-6 max-w-md w-full text-center space-y-4">
              <i className="fas fa-exclamation-triangle text-pink-800 text-6xl"></i>
              <p className="text-xl font-semibold text-pink-700">
                Could not load Payment Details.
              </p>
              <p className="text-gray-600 text-sm">
                Please check your internet connection or try refreshing the
                page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-gradient-to-br from-orange-700 via-pink-700 to-pink-800 hover:from-orange-700 hover:to-pink-700 text-white rounded-full text-sm font-medium transition cursor-pointer"
              >
                Retry
              </button>
            </div>
          </div>
        </section>
        <BookingFooter />
      </>
    );
  }

  return (
    <>
      <BookingHeader />
      <section className="min-h-[85vh] bg-gradient-to-br from-orange-50 via-pink-50 to-orange-50 py-5 px-4">
        <DosAndDontsAlert />
        <ConfirmPaySection booking={booking} />
        <PaymentMethods booking={booking} />
      </section>
      <BookingFooter />
    </>
  );
};
