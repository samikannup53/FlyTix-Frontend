import { useState } from "react";
import FlightTailLogo from "../../../../../assets/images/flight_tail.png";

export const FlightDetailsModal = ({ isOpen, flight, onClose }) => {
  if (!isOpen || !flight) return null;

  const {
    outbound,
    returnTrip,
    fare,
    baggage,
    passengers,
    class: travelClass,
  } = flight;

  const [activeTab, setActiveTab] = useState("flight");

  const renderTimelineCard = (label, segmentData) => {
    const segment = segmentData.segments[0];

    return (
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6 w-full max-w-4xl mx-auto">
        {/* Header Info: Route + Meta */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2 mb-4">
            {/* Route */}
            <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
              {segment.departure.city}
              <i className="fas fa-arrow-right text-pink-700 text-xs" />
              {segment.arrival.city}
            </h3>

            {/* Meta Info */}
            <p className="text-xs text-gray-500">
              {segment.departure.date} &nbsp;|&nbsp;
              {segmentData.stops === 0
                ? "Non-stop"
                : `${segmentData.stops} stop(s)`}{" "}
              &nbsp;|&nbsp; {segmentData.duration} &nbsp;|&nbsp; {travelClass}
            </p>

            {/* Airline Info */}
            <div className="flex items-center gap-2 mt-1">
              <img
                src={FlightTailLogo}
                alt="Airline"
                className="w-6 h-6 object-contain"
              />
              <p className="text-sm text-gray-700 font-medium">
                IndiGo <span className="text-gray-400 font-normal">|</span>{" "}
                <span className="text-gray-500 font-normal">
                  Flight {segment.flightNumber}
                </span>
              </p>
            </div>
          </div>
          {/* Insert Badge Here */}
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border mb-2 ${
              label === "Onward"
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-green-50 text-green-700 border-green-200"
            }`}
          >
            <i
              className={`fa-solid ${
                label === "Onward" ? "fa-plane-departure" : "fa-plane-arrival"
              }`}
            />
            {label}
          </span>
        </div>

        {/* Timeline + Baggage Layout */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 w-full">
          {/* Flight Timeline */}
          <div className="w-full lg:w-4/6">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              {/* From */}
              <div className="flex-1 text-center sm:text-left">
                <p className="text-[11px] text-gray-400 mb-1">
                  {segment.departure.date}
                </p>
                <p className="text-xl font-bold text-gray-800 leading-none">
                  {segment.departure.time}
                </p>
                <p className="text-sm font-medium text-gray-700">
                  {segment.departure.city} – {segment.departure.cityCode}
                </p>
              </div>

              {/* Timeline Divider */}
              <div className="flex flex-col items-center">
                <div className="text-[11px] text-gray-600">
                  {segmentData.duration}
                </div>
                <div className="border-t border-t-gray-300 w-40"></div>
                <div className="text-[10px] text-gray-500">
                  {segmentData.stops === 0
                    ? "Non-stop"
                    : `${segmentData.stops} stop(s)`}
                </div>
              </div>

              {/* To */}
              <div className="flex-1 text-center sm:text-right">
                <p className="text-[11px] text-gray-400 mb-1">
                  {segment.arrival.date}
                </p>
                <p className="text-xl font-bold text-gray-800 leading-none">
                  {segment.arrival.time}
                </p>
                <p className="text-sm font-medium text-gray-700">
                  {segment.arrival.city} – {segment.arrival.cityCode}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between">
              {/* From Airport Info */}
              <div className="text-center sm:text-left">
                <p className="text-xs text-gray-500 mt-1">
                  {segment.departure.airport}
                </p>
                <p className="text-xs text-gray-500">
                  Terminal {segment.departure.terminal}
                </p>
              </div>
              {/* To Airport Info*/}
              <div className="text-center sm:text-right">
                <p className="text-xs text-gray-500 mt-1">
                  {segment.arrival.airport}
                </p>
                <p className="text-xs text-gray-500">
                  Terminal {segment.arrival.terminal}
                </p>
              </div>
            </div>
          </div>

          {/* Baggage Section */}
          <div className="w-full lg:w-2/6 pl-8">
            <h4 className="text-sm font-semibold text-pink-700 mb-3">
              Baggage
            </h4>
            <div className="space-y-3 text-xs text-gray-500">
              {/* Cabin */}
              <div className="flex items-center gap-2">
                <i className="fas fa-briefcase text-pink-700 text-sm"></i>
                <span className="text-sm text-gray-700 font-medium">
                  Cabin:{" "}
                  <span className="font-normal">
                    {baggage?.cabin || "7 Kg"}
                  </span>
                </span>
              </div>
              {/* Check-in */}
              <div className="flex items-center gap-2">
                <i className="fas fa-suitcase-rolling text-pink-700 text-sm"></i>
                <span className="text-sm text-gray-700 font-medium">
                  Check-in:{" "}
                  <span className="font-normal">
                    {baggage?.checkIn || "15 Kg"}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPassengerInfo = () => {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 w-full max-w-4xl mx-auto">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <i className="fa-solid fa-user-group text-pink-700 text-sm"></i>
          Passenger Information
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-2 text-sm text-gray-600">
          <div>
            <span className="font-medium text-gray-700">Adults:</span>{" "}
            {passengers.adults}
          </div>
          <div>
            <span className="font-medium text-gray-700">Children:</span>{" "}
            {passengers.children}
          </div>
          <div>
            <span className="font-medium text-gray-700">Infants:</span>{" "}
            {passengers.infants}
          </div>
          <div>
            <span className="font-medium text-gray-700">Class:</span>{" "}
            {travelClass}
          </div>
        </div>
      </div>
    );
  };

  const renderFareDetails = () => (
    <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-5 w-full max-w-3xl mx-auto">
      <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <i className="fa-solid fa-receipt text-pink-700"></i>
        Fare Breakdown
      </h4>

      <div className="space-y-4 text-sm text-gray-700">
        {/* Base Fare */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-circle-dot text-pink-600 text-xs" />
            <span>Base Fare</span>
          </div>
          <span className="font-medium">₹{fare.baseFare}</span>
        </div>

        {/* Taxes */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-coins text-yellow-600 text-xs" />
            <span>Taxes</span>
          </div>
          <span className="font-medium">₹{fare.taxes}</span>
        </div>

        {/* Instant Discount */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-tags text-green-600 text-xs" />
            <span>Instant Discount</span>
          </div>
          <span className="font-medium">₹{fare.instantDiscount}</span>
        </div>

        {/* Currency Info */}
        <div className="flex justify-between items-center pt-1 text-gray-500 text-xs">
          <span>
            <i className="fa-solid fa-money-bill-wave mr-1" />
            Currency
          </span>
          <span>{fare.currency}</span>
        </div>

        {/* Total Fare Summary */}
        <div className="border-t pt-4 mt-4 flex justify-between items-center">
          <span className="text-base font-semibold text-gray-800">
            Total Fare
          </span>
          <span className="text-lg font-bold text-pink-700">
            ₹{fare.totalFare}
          </span>
        </div>

        {/* Bottom Note */}
        <div className="mt-6 text-xs text-gray-500 bg-white border-l-4 border-yellow-400 pl-3 py-2 rounded-md">
          <i className="fa-solid fa-circle-info mr-1 text-yellow-500" />
          Fare includes all applicable taxes and charges. Prices are subject to
          availability and may change at the time of booking.
        </div>
      </div>
    </div>
  );

  const renderCancellationPolicy = () => (
    <div className="text-sm text-gray-600 italic">
      <i className="fa-solid fa-circle-info mr-1 text-orange-600"></i>
      Cancellation policy information will be available soon or at the time of
      booking.
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl 2xl:max-w-7xl w-full max-h-[85vh] flex flex-col relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        {/* ---------- Part 1: Nav Header ---------- */}
        <div className="flex items-center gap-6 px-6 pt-6 border-b border-gray-200">
          {["flight", "fare", "cancellation"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-medium py-3 transition ${
                activeTab === tab
                  ? "text-pink-700 border-b-2 border-pink-700"
                  : "text-gray-600 hover:text-pink-700"
              }`}
            >
              {tab === "flight" && "Flight Details"}
              {tab === "fare" && "Fare Details"}
              {tab === "cancellation" && "Cancellation"}
            </button>
          ))}
        </div>

        {/* ---------- Part 2: Content Body ---------- */}
        <div className="overflow-y-auto px-6 py-4 flex-1 min-h-[400px]">
          {activeTab === "flight" && (
            <>
              {renderTimelineCard("Onward", outbound)}
              {returnTrip && renderTimelineCard("Return", returnTrip)}
              {renderPassengerInfo()}
            </>
          )}
          {activeTab === "fare" && renderFareDetails()}
          {activeTab === "cancellation" && renderCancellationPolicy()}
        </div>

        {/* ---------- Part 3: Footer ---------- */}
        <div className="border-t px-6 py-4 flex justify-between items-center bg-white rounded-b-xl">
          <p className="text-lg font-semibold text-pink-700">
            Total Fare: ₹{fare.totalFare}
            <span className="text-sm text-gray-500 ml-1">
              ({fare.currency})
            </span>
          </p>
          <button className="px-6 py-2 bg-gradient-to-br from-orange-700 via-pink-700 to-pink-800 hover:from-orange-700 hover:to-pink-700 text-white rounded-full text-sm font-medium transition cursor-pointer">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};
