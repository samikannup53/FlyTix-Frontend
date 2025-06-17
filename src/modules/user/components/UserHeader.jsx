import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { useState, useEffect, useRef } from "react";

export const UserHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Separate refs for desktop and mobile/tablet dropdowns
  const desktopDropdownRef = useRef();
  const mobileDropdownRef = useRef();

  const isLoggedIn = false;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        (desktopDropdownRef.current && desktopDropdownRef.current.contains(e.target)) ||
        (mobileDropdownRef.current && mobileDropdownRef.current.contains(e.target))
      ) {
        return;
      }
      setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gradient-to-tr from-orange-300 to-pink-300 sticky top-0 z-50 shadow-md">
      <div className="max-w-[1600px] mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="FlyNow Logo"
            className="w-24 sm:w-28 object-contain"
          />
        </Link>

        {/* Auth Buttons + Menu (Tablet & Mobile) */}
        <div className="flex items-center gap-3 lg:hidden">
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/30 backdrop-blur-md text-gray-800 hover:bg-white/50 transition-all border border-white/60 shadow text-sm"
              >
                <i className="fa-solid fa-right-to-bracket"></i> Login
              </Link>
              <Link
                to="/register"
                className="hidden sm:flex items-center gap-2 bg-gradient-to-tr from-orange-700 via-pink-700 to-pink-800 text-white px-4 py-1.5 rounded-full shadow hover:brightness-110 transition-all text-sm"
              >
                <i className="fa-solid fa-user-plus"></i> Register
              </Link>
            </>
          )}

          {isLoggedIn && (
            <div className="relative" ref={mobileDropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500 shadow"
              >
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </button>

              {dropdownOpen && (
                <div
                  className={`absolute z-50 pt-2 text-sm border border-gray-200 shadow-xl
                  bg-white text-gray-800
                  rounded-none sm:rounded-2xl
                  w-screen -right-[68px] top-12
                  sm:w-64 sm:left-auto sm:right-0`}
                >
                  <Link
                    to="/profile"
                    className="block px-6 py-4 transition hover:bg-orange-50"
                  >
                    <div className="flex items-center gap-4">
                      <i className="fa-solid fa-user text-orange-500 text-lg" />
                      <div>
                        <p className="font-semibold">FlyNower</p>
                        <p className="text-xs text-gray-500">My Profile</p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/bookings"
                    className="block px-6 py-4 transition hover:bg-orange-50"
                  >
                    <div className="flex items-center gap-4">
                      <i className="fa-solid fa-clock-rotate-left text-orange-500 text-lg" />
                      <div>
                        <p className="font-semibold">My Trips</p>
                        <p className="text-xs text-gray-500">Manage Bookings</p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-6 py-4 transition hover:bg-orange-50"
                  >
                    <div className="flex items-center gap-4">
                      <i className="fa-solid fa-gear text-orange-500 text-lg" />
                      <div>
                        <p className="font-semibold">Settings</p>
                        <p className="text-xs text-gray-500">
                          Profile Preferences
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/logout"
                    className="flex items-center gap-4 px-6 py-4 mt-2 border-t border-gray-100 text-red-600 hover:bg-red-50 transition"
                  >
                    <i className="fa-solid fa-right-from-bracket text-lg" />
                    <span className="font-semibold text-[15px]">Logout</span>
                  </Link>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-pink-900 text-2xl w-8 h-8 flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-[15px] font-semibold text-pink-900">
          <a href="#home" className="flex items-center gap-2 hover:text-gray-900 transition">
            <i className="fa-solid fa-house"></i> Home
          </a>
          <Link to="/flights" className="flex items-center gap-2 hover:text-gray-900 transition">
            <i className="fa-solid fa-plane-up"></i> Flights
          </Link>
          <a href="#how-it-works" className="flex items-center gap-2 hover:text-gray-900 transition">
            <i className="fa-solid fa-compass"></i> Explore
          </a>
          <a href="#why-flynow" className="flex items-center gap-2 hover:text-gray-900 transition">
            <i className="fa-solid fa-gem"></i> Benefits
          </a>
          <a href="#cheapest-fares" className="flex items-center gap-2 hover:text-gray-900 transition">
            <i className="fa-solid fa-map-location-dot"></i> Destinations
          </a>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-md text-gray-800 hover:bg-white/50 transition-all border border-white/60 shadow"
              >
                <i className="fa-solid fa-right-to-bracket"></i> Login
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 bg-gradient-to-tr from-orange-700 via-pink-700 to-pink-800 text-white px-5 py-2 rounded-full shadow hover:brightness-110 transition-all"
              >
                <i className="fa-solid fa-user-plus"></i> Register
              </Link>
            </>
          ) : (
            <div className="relative" ref={desktopDropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500 shadow"
              >
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white text-gray-800 rounded-2xl shadow-xl z-50 pt-2 text-sm border border-gray-200">
                  <Link
                    to="/profile"
                    className="block px-6 py-4 transition hover:bg-orange-50 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <i className="fa-solid fa-user text-orange-500 text-lg" />
                      <div>
                        <p className="font-semibold">FlyNower</p>
                        <p className="text-xs text-gray-500">My Profile</p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/bookings"
                    className="block px-6 py-4 transition hover:bg-orange-50 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <i className="fa-solid fa-clock-rotate-left text-orange-500 text-lg" />
                      <div>
                        <p className="font-semibold">My Trips</p>
                        <p className="text-xs text-gray-500">Manage Bookings</p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-6 py-4 transition hover:bg-orange-50 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <i className="fa-solid fa-gear text-orange-500 text-lg" />
                      <div>
                        <p className="font-semibold">Settings</p>
                        <p className="text-xs text-gray-500">
                          Profile Preferences
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/logout"
                    className="flex items-center gap-4 px-6 py-4 mt-2 border-t border-gray-100 text-red-600 hover:bg-red-50 transition rounded-xl"
                  >
                    <i className="fa-solid fa-right-from-bracket text-lg" />
                    <span className="font-semibold text-[15px]">Logout</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-orange-100/80 backdrop-blur-md px-4 py-4 text-[15px] space-y-4 font-semibold text-pink-900">
          <a href="#home" className="flex items-center sm:justify-center gap-2">
            <i className="fa-solid fa-house"></i> Home
          </a>
          <Link to="/flights" className="flex items-center sm:justify-center gap-2">
            <i className="fa-solid fa-plane-up"></i> Flights
          </Link>
          <a href="#how-it-works" className="flex items-center sm:justify-center gap-2">
            <i className="fa-solid fa-compass"></i> Explore
          </a>
          <a href="#why-flynow" className="flex items-center sm:justify-center gap-2">
            <i className="fa-solid fa-gem"></i> Benefits
          </a>
          <a href="#cheapest-fares" className="flex items-center sm:justify-center gap-2">
            <i className="fa-solid fa-map-location-dot"></i> Destinations
          </a>

          {!isLoggedIn && (
            <div className="pt-3 border-t border-pink-300 flex flex-col gap-2 sm:hidden">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-md text-gray-800 hover:bg-white/50 transition-all border border-white/60"
              >
                <i className="fa-solid fa-right-to-bracket"></i> Login
              </Link>
              <Link
                to="/register"
                className="flex items-center justify-center gap-2 bg-gradient-to-tr from-orange-700 via-pink-700 to-pink-800 text-white px-5 py-2 rounded-full shadow hover:brightness-110 transition-all"
              >
                <i className="fa-solid fa-user-plus"></i> Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
