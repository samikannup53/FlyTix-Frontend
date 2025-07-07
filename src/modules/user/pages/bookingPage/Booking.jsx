import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { BookingFooter, BookingHeader } from "../../components";
import { BookingBillingAddress } from "./sections/BookingBillingAddress";
import { BookingCancellation } from "./sections/BookingCancellation";
import { BookingContactDetails } from "./sections/BookingContactDetails";
import { BookingContinue } from "./sections/BookingContinue";
import { BookingFareSummary } from "./sections/BookingFareSummary";
import { BookingFlightDetails } from "./sections/BookingFlightDetails";
import { BookingPaymentInfo } from "./sections/BookingPaymentInfo";
import { BookingTravellerDetails } from "./sections/BookingTravellerDetails";

export const Booking = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);

  const travellerRef = useRef();
  const contactRef = useRef();
  const billingRef = useRef();

  const tripType = searchParams.get("tripType") || "oneway";
  const adults = parseInt(searchParams.get("adults") || "1", 10);
  const children = parseInt(searchParams.get("children") || "0", 10);
  const infants = parseInt(searchParams.get("infants") || "0", 10);
  const flightId = searchParams.get("flightId");

  const bookingMeta = { flightId, tripType, adults, children, infants };

  useEffect(() => {
    if (!flightId) {
      toast.error("Missing Flight ID");
      navigate("/flights");
      return;
    }

    const fetchFlight = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/flights/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ flightId }),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.msg || "Flight Fetch Failed ");
          return;
        }

        setFlight(data.flight);
      } catch (error) {
        console.error("Flight fetch error:", error.message);
        toast.error("Server error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlight();
  }, [flightId]);

  const handleFinalSubmit = async () => {
    const isTravellerValid = travellerRef.current?.validateAndSubmit?.();
    const isContactValid = contactRef.current?.validateAndSubmit?.();
    const isBillingValid = billingRef.current?.validateAndSubmit?.();

    if (!isTravellerValid || !isContactValid || !isBillingValid) {
      toast.error("Please fill all required fields to continue booking.");
      return;
    }

    const payload = {
      flightId: bookingMeta.flightId,
      travellers: travellerRef.current.getData(),
      contactDetails: contactRef.current.getData(),
      billingAddress: billingRef.current.getData(),
    };
    try {
      const res = await fetch("http://localhost:8000/api/booking/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Failed to initiate booking.");
        return;
      }

      toast.success("Booking initiated successfully!");
      navigate(`/booking/payment/${data.newBooking.bookingId}`);
    } catch (err) {
      console.error("Booking Init Error:", err.message);
      toast.error("Server error. Please try again.");
    }
  };

  if (loading) {
    return (
      <>
        <BookingHeader />
        <section className="bg-gradient-to-tr from-orange-50 via-pink-50 to-orange-50">
          <div className="flex flex-col items-center justify-center min-h-[77vh] 2xl:min-h-[85vh] space-y-4">
            <i className="fas fa-spinner fa-spin text-4xl text-pink-700"></i>
            <p className="text-lg text-gray-600">
              Loading your booking details...
            </p>
          </div>
        </section>
        <BookingFooter />
      </>
    );
  }

  if (!flight) {
    return (
      <>
        <BookingHeader />
        <section className="bg-gradient-to-tr from-orange-50 via-pink-50 to-orange-50">
          <div className="flex flex-col items-center justify-center min-h-[77vh] 2xl:min-h-[85vh] px-4">
            <div className="border border-pink-200 rounded-xl shadow-sm p-6 max-w-md w-full text-center space-y-4">
              <i className="fas fa-exclamation-triangle text-pink-800 text-6xl"></i>
              <p className="text-xl font-semibold text-pink-700">
                Could not load flight details.
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
      <section className="bg-gradient-to-tr from-orange-50 via-pink-50 to-orange-50 min-h-screen pt-6">
        <main className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-6 flex flex-col lg:flex-row gap-6">
          {/* Left Side Fare Summary Section */}
          <aside className="lg:w-1/3 w-full h-fit sticky top-24.5 text-sm text-gray-800 space-y-6">
            <BookingFareSummary flight={flight} />
            <BookingPaymentInfo flight={flight} />
          </aside>
          {/* Right Side Main Content Section */}
          <section className="lg:w-2/3 w-full space-y-6">
            <BookingFlightDetails flight={flight} bookingMeta={bookingMeta} />
            <BookingCancellation flight={flight} />
            <BookingTravellerDetails
              ref={travellerRef}
              bookingMeta={bookingMeta}
              flight={flight}
            />
            <BookingContactDetails ref={contactRef} />
            <BookingBillingAddress ref={billingRef} />
            <BookingContinue onSubmit={handleFinalSubmit} flight={flight} />
          </section>
        </main>
      </section>
      <BookingFooter />
    </>
  );
};
