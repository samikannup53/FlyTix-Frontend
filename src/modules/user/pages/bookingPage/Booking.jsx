import { BookingFooter, BookingHeader } from "../../components";
import { BookingBillingAddress } from "./sections/BookingBillingAddress";
import { BookingCancellation } from "./sections/BookingCancellation";
import { BookingContactDetails } from "./sections/BookingContactDetails";
import { BookingContinue } from "./sections/BookingContinue";
import { BookingFareSummary } from "./sections/BookingFareSummary";
import { BookingFlightDetails } from "./sections/BookingFlightDetails";
import { BookingTravellerDetails } from "./sections/BookingTravellerDetails";

export const Booking = () => {
  return (
    <>
      <BookingHeader />
      <main className="bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-200 min-h-screen pt-6">
        <section className="max-w-[1600px] mx-auto px-5 flex flex-col lg:flex-row gap-6">
          {/* Left Side Fare Summary Section */}
          <BookingFareSummary/>
          {/* Right Side Main Content Section */}
          <section className="lg:w-2/3 w-full space-y-6">
            <BookingFlightDetails/>
            <BookingCancellation/>
            <BookingTravellerDetails/>
            <BookingContactDetails/>
            <BookingBillingAddress/>
            <BookingContinue/>
          </section>        
        </section>        
      </main>
      <BookingFooter />
    </>
  );
};
