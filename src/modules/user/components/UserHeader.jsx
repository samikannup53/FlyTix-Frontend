import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { useState } from "react";
import { useAuth } from "../../../shared/contexts/AuthContext";

export const UserHeader = ({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, logout, loading, refreshUser } = useAuth();

  if (loading) return null;

  const guestLinks = [
    { to: "/", icon: "fa-house", label: "Home" },
    { to: "/flights", icon: "fa-plane-up", label: "Flights" },
    { section: "features", icon: "fa-compass", label: "Explore" },
    { section: "benefits", icon: "fa-gem", label: "Benefits" },
    {
      section: "routes",
      icon: "fa-map-location-dot",
      label: "Destinations",
    },
  ];

  const userLinks = [
    { to: "/", icon: "fa-house", label: "Home" },
    { to: "/flights", icon: "fa-plane-up", label: "Flights" },
    { to: "/dashboard", icon: "fa-clock-rotate-left", label: "Bookings" },
    { to: "/travellers", icon: "fa-user-group", label: "Travellers" },
    { to: "/profile", icon: "fa-user", label: "Profile" },
    { to: "/change-password", icon: "fa-gear", label: "Settings" },
  ];

  const links = isLoggedIn ? userLinks : guestLinks;

  return (
    <header className="bg-gradient-to-tr from-orange-300 to-pink-300 sticky top-0 z-30 shadow-md">
      <div className="max-w-[1600px] mx-auto p-5 py-3 2xl:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="xl:flex-1 flex items-center">
          <img
            src={logo}
            alt="FlyTix Logo"
            className="w-24 sm:w-28 object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="xl::flex-2 hidden lg:flex items-center md:justify-center gap-8 text-[15px] font-semibold text-pink-900">
          {links.map((item, idx) =>
            item.to ? (
              <Link
                key={idx}
                to={item.to}
                onClick={() => {
                  if (item.to === "/") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="flex items-center gap-2 hover:text-gray-900 transition"
              >
                <i className={`fa-solid ${item.icon}`}></i> {item.label}
              </Link>
            ) : (
              <button
                key={idx}
                type="button"
                onClick={() => onNavigate?.(item.section)}
                className="flex items-center gap-2 hover:text-gray-900 transition bg-transparent border-none focus:outline-none"
              >
                <i className={`fa-solid ${item.icon}`}></i> {item.label}
              </button>
            )
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="xl:flex-1 hidden lg:flex items-center gap-3 justify-end">
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
            <button
              onClick={() => {
                logout();
                refreshUser();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-md text-pink-700 font-semibold cursor-pointer hover:bg-white/50 transition-all border border-white/60 shadow"
            >
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-pink-900 text-2xl w-8 h-8 flex items-center justify-center"
          aria-label="Toggle Menu"
        >
          <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>
      </div>

      {/* Mobile Sliding Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-xs z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } bg-gradient-to-br from-orange-200 via-pink-200 to-pink-100 shadow-lg`}
      >
        <div className="flex flex-col gap-4 p-6 text-[15px] font-semibold text-pink-900 h-full">
          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="self-end text-lg text-gray-500 hover:text-gray-700"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          {/* Nav Links */}
          <div className="flex flex-col gap-4 mt-2">
            {links.map((item, idx) =>
              item.to ? (
                <Link
                  key={idx}
                  to={item.to}
                  onClick={() => {
                    setMenuOpen(false);
                    if (item.to === "/") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <i className={`fa-solid ${item.icon}`}></i> {item.label}
                </Link>
              ) : (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onNavigate?.(item.section);
                  }}
                  className="flex items-center gap-2 bg-transparent border-none text-left"
                >
                  <i className={`fa-solid ${item.icon}`}></i> {item.label}
                </button>
              )
            )}
          </div>

          {/* CTA Section */}
          <div className=" pt-6 border-t border-pink-200 flex flex-col gap-3">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-md text-gray-800 hover:bg-white/50 transition-all border border-white/60"
                >
                  <i className="fa-solid fa-right-to-bracket"></i> Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-tr from-orange-700 via-pink-700 to-pink-800 text-white px-5 py-2 rounded-full shadow hover:brightness-110 transition-all"
                >
                  <i className="fa-solid fa-user-plus"></i> Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  logout();
                  refreshUser();
                  setMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-md text-red-600 hover:bg-white/50 transition-all border border-white/60 shadow"
              >
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
};
