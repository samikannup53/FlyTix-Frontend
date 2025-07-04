// components/FlightDetailsModal.jsx
import React from "react";

export const FlightDetailsModal = ({ isOpen, onClose, flight }) => {
  if (!isOpen || !flight) return null;

  const { outbound, returnTrip, fare } = flight;

  const renderSegmentDetails = (label, segmentData) => {
    const seg = segmentData?.segments?.[0];
    return (
      seg && (
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">{label} Segment</h3>
          <p>{seg.flightNumber}</p>
          <p>
            {seg.departure.city} ({seg.departure.cityCode}) → {seg.arrival.city}{" "}
            ({seg.arrival.cityCode})
          </p>
          <p>
            {seg.departure.time} → {seg.arrival.time}
          </p>
          <p>Duration: {segmentData.duration}</p>
          <p>Stops: {segmentData.stops}</p>
        </div>
      )
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-lg"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Flight Details</h2>
        {renderSegmentDetails("Onward", outbound)}
        {returnTrip && renderSegmentDetails("Return", returnTrip)}
        <p className="text-pink-700 font-semibold mt-2">
          Total Fare: ₹{fare.totalFare}
        </p>
      </div>
    </div>
  );
};
