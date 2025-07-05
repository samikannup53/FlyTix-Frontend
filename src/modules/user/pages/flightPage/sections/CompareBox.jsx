import { useState } from "react";
import FlightTailLogo from "../../../../../assets/images/flight_tail.png";

export const CompareBox = ({
  compareFlights,
  setShowCompareModal,
  handleRemoveFromCompare,
  compareError,
}) => {
  const [minimized, setMinimized] = useState(false);
  const toggleMinimize = () => setMinimized((prev) => !prev);
  const canCompare = compareFlights.length >= 2;

  return (
    <>
      {compareFlights.length > 0 && (
        <div className="fixed bottom-10 2xl:bottom-24 right-10 2xl:right-24 z-40 flex flex-col items-end gap-2">
          {/* Error message shown above the compare container */}
          {compareError && (
            <div className="mb-[1rem] animate-fade-in bg-yellow-100 border border-orange-300 text-orange-800 text-sm px-4 py-2 rounded-xl shadow-md max-w-xs">
              <i className="fa fa-info-circle mr-2" />
              {compareError}
            </div>
          )}

          {/* Minimized or Maximized UI */}
          {minimized ? (
            <div
              onClick={toggleMinimize}
              className="relative z-10 w-14 h-14 bg-gradient-to-br from-pink-700 to-orange-700 text-white rounded-full shadow-lg flex flex-col items-center justify-center cursor-pointer"
              title="Open Compare Box"
            >
              <i className="fa fa-sliders-h text-xl mb-1" />
              <span className="text-xs font-bold absolute -top-2 -right-2 bg-gradient-to-br from-yellow-400 to-orange-600 text-white px-2 py-1 w-6 h-6 rounded-full border border-pink-700 z-20">
                {compareFlights.length}
              </span>
            </div>
          ) : (
            <div className="w-80 rounded-xl shadow-2xl border border-gray-200 overflow-hidden bg-white z-40">
              {/* Header */}
              <div className="flex justify-between items-center bg-gradient-to-br from-pink-700 to-pink-800 text-white px-4 py-3">
                <h4 className="font-semibold text-sm">Selected Flights</h4>
                <button
                  onClick={toggleMinimize}
                  className="hover:text-pink-200 transition"
                  title="Minimize"
                >
                  <i className="fa fa-minus text-xs" />
                </button>
              </div>

              {/* Body */}
              <div className="bg-white max-h-64 overflow-y-auto px-4 py-3 space-y-3">
                {compareFlights.map((flight) => {
                  const segment = flight.outbound.segments[0];
                  const airlineName = flight.validatingAirline;
                  const flightNumber = segment?.flightNumber || "NA";
                  const fromTime = segment?.departure?.time?.slice(0, 5);
                  const toTime = segment?.arrival?.time?.slice(0, 5);

                  return (
                    <div
                      key={flight.flightId}
                      className="flex items-center justify-between text-xs text-gray-700"
                    >
                      {/* Left: Logo + Airline Info */}
                      <div className="flex items-center gap-2 w-4/5">
                        <img
                          src={FlightTailLogo}
                          alt="logo"
                          className="w-6 h-6 object-contain"
                        />
                        <div className="flex gap-4 text-[14px]">
                          <span className="font-medium">
                            {airlineName} | {flightNumber}
                          </span>
                          <span className="text-gray-500">
                            {fromTime} → {toTime}
                          </span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveFromCompare(flight.flightId)}
                        className="text-pink-700 hover:text-pink-800 cursor-pointer font-bold text-sm"
                        title="Remove flight"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="bg-gradient-to-r from-pink-700 to-pink-800 px-4 py-2.5 flex justify-center">
                <button
                  onClick={() => canCompare && setShowCompareModal(true)}
                  disabled={!canCompare}
                  className={`text-white font-semibold text-sm px-4 py-1.5 rounded-full shadow-sm border transition-all duration-200 ${
                    canCompare
                      ? "bg-pink-700 hover:bg-pink-800 cursor-pointer"
                      : "bg-pink-700 cursor-not-allowed opacity-60"
                  }`}
                >
                  Compare Flights
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
