import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";

export const UserHeader = () => {
  return (
    <header className="bg-gradient-to-br from-orange-200 to-yellow-100 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <img src={logo} alt="brand icon" className="w-8 h-8" />
          <span>
            <span className="text-gray-800">Fly</span>
            <span className="text-orange-500">Now</span>
          </span>
        </h1>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-5 text-[15px] font-semibold text-gray-800">
          <a
            href="#home"
            className="flex items-center gap-2 hover:text-gray-900 transition px-2 py-1"
          >
            <i className="fa-solid fa-house"></i> Home
          </a>
          <Link
            to="/flights"
            className="flex items-center gap-2 hover:text-gray-900 transition px-2 py-1"
          >
            <i className="fa-solid fa-plane-up"></i> Flights
          </Link>
          <a
            href="#how-it-works"
            className="flex items-center gap-2 hover:text-gray-900 transition px-2 py-1"
          >
            <i className="fa-solid fa-compass"></i> Explore
          </a>
          <a
            href="#why-flynow"
            className="flex items-center gap-2 hover:text-gray-900 transition px-2 py-1"
          >
            <i className="fa-solid fa-gem"></i> Benefits
          </a>
          <a
            href="#cheapest-fares"
            className="flex items-center gap-2 hover:text-gray-900 transition px-2 py-1"
          >
            <i className="fa-solid fa-map-location-dot"></i> Destinations
          </a>
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-md shadow-md text-gray-800 hover:bg-white/50 transition-all border border-white/60"
          >
            <i className="fa-solid fa-right-to-bracket"></i> Login
          </Link>

          <Link
            to="/register"
            className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-full shadow hover:bg-orange-600 transition-all"
          >
            <i className="fa-solid fa-user-plus"></i> Register
          </Link>
        </div>
      </div>
    </header>
  );
};
