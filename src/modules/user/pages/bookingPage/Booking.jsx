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
  return (
    <>
      <BookingHeader />
      <section className="bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-200 min-h-screen pt-6">
        <main className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-6">
          {/* Left Side Fare Summary Section */}
          <aside className="lg:w-1/3 w-full h-fit sticky top-5 text-sm text-gray-800 space-y-6">
            <BookingFareSummary/>
            <BookingPaymentInfo/>
          </aside>          
          {/* Right Side Main Content Section */}
          <section className="lg:w-2/3 w-full space-y-6">
            <BookingFlightDetails/>
            <BookingCancellation/>
            <BookingTravellerDetails/>
            <BookingContactDetails/>
            <BookingBillingAddress/>
            <BookingContinue/>
          </section>        
        </main>        
      </section>
      <BookingFooter />
    </>
  );
};
