import React from "react";
import { TicketInfo } from "./TicketInfo";
import { FlightInfo } from "./FlightInfo";
import { PassengerInfo } from "./PassengerInfo";
import { FareInfo } from "./FareInfo";

export const BookingCard = () => {
  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-5 space-y-4">
        <TicketInfo/>
        <div className="flex flex-col md:flex-row justify-between gap-6">
            <FlightInfo/>
            <PassengerInfo/>
        </div>
        <FareInfo/>
      </div>
    </>
  );
};
