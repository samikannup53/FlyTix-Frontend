import { TicketDetails } from "./TicketDetails";
import { FlightDetails } from "./FlightDetails";
import { PassengerDetails } from "./PassengerDetails";
import {FareDetails} from "./FareDetails";

export const ConfirmationSection = () => {
  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-8 border border-orange-100">
          <TicketDetails />
          {/* Main Details */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Side */}
            <div className="flex-1 space-y-5">
              <FlightDetails />
              <PassengerDetails />
            </div>
            {/* Right Side */}
            <div className="w-full md:w-[320px] space-y-5 md:sticky md:top-[64px]">
              <FareDetails/>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
