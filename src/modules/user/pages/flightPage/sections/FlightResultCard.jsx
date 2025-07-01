import FlightTailLogo from "../../../../../assets/images/flight_tail.png";

export const FlightResultCard = ({ validatingAirline, outbound, fare }) => {
  const segment = outbound.segments[0]; // first leg

  return (
    <div className="bg-white/80 p-6 rounded-xl shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-4">
        <img
          src={FlightTailLogo}
          alt={validatingAirline}
          className="w-12 object-contain"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{validatingAirline}</h3>
          <p className="text-xs text-gray-500">{segment.flightNumber}</p>
        </div>
      </div>

      <div className="text-left">
        <p className="text-lg font-semibold text-gray-700">
          {segment.departure.time}
        </p>
        <p className="text-sm text-gray-500">
          {segment.departure.city} ({segment.departure.cityCode})
        </p>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">{outbound.duration}</p>
        <div className="w-24 h-px bg-gray-400 mx-auto my-1"></div>
        <p className="text-xs text-gray-500">
          {outbound.stops === 0 ? "Non-stop" : `${outbound.stops} stop(s)`}
        </p>
      </div>

      <div className="text-right">
        <p className="text-lg font-semibold text-gray-700">
          {segment.arrival.time}
        </p>
        <p className="text-sm text-gray-500">
          {segment.arrival.city} ({segment.arrival.cityCode})
        </p>
      </div>

      <div className="text-center">
        <p className="text-xl font-bold text-orange-600">₹{fare.totalFare}</p>
        <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-medium">
          Book Now
        </button>
      </div>
    </div>
  );
};
