import { Link } from "react-router-dom";

export const FlightResultCard = ({
  airlineLogo = "https://images.ixigo.com/img/common-resources/airline-new/6E.png",
  airlineName = "IndiGo",
  flightCode = "6E-324",
  classType = "Economy",
  departureTime = "08:25",
  departureAirport = "Chennai (MAA)",
  duration = "2h 10m",
  stops = "Non-stop",
  arrivalTime = "10:35",
  arrivalAirport = "Trivandrum (TRV)",
  price = "₹3,499",
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-md flex flex-col sm:flex-row justify-between items-center gap-4 transition-all duration-300 hover:shadow-xl hover:bg-white/90 relative">
      {/* Airline Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={airlineLogo}
          alt={airlineName}
          className="w-12 h-12 object-contain"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{airlineName}</h3>
          <p className="text-xs text-gray-500">
            {flightCode} | {classType}
          </p>
        </div>
      </div>

      {/* Departure */}
      <div className="text-center sm:text-left">
        <p className="text-lg font-semibold text-gray-700">{departureTime}</p>
        <p className="text-sm text-gray-500">{departureAirport}</p>
      </div>

      {/* Duration */}
      <div className="text-center">
        <p className="text-sm text-gray-600">{duration}</p>
        <div className="w-24 h-px bg-gray-400 mx-auto my-1"></div>
        <p className="text-xs text-gray-500">{stops}</p>
      </div>

      {/* Arrival */}
      <div className="text-center sm:text-right">
        <p className="text-lg font-semibold text-gray-700">{arrivalTime}</p>
        <p className="text-sm text-gray-500">{arrivalAirport}</p>
      </div>

      {/* Price and Book Button */}
      <div className="flex flex-col items-end justify-between h-full">
        <p className="text-xl font-bold text-orange-600">{price}</p>
        <Link
          to={"/booking/details"}
          className="mt-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-medium transition-all duration-200"
        >
          Book Now
        </Link>

        {/* View Details Link */}
        <div className="mt-2 flex justify-end w-full">
          <a
            href="#"
            className="text-sm text-orange-500 hover:underline flex items-center gap-1"
          >
            View Details <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
};
