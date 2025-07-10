import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { useEffect, useState } from "react";

export const BookingHeader = ({ timeoutMinutes = 20 }) => {
  const location = useLocation();

  // Determine currentStep based on path
  const path = location.pathname;
  const currentStep = path.startsWith("/booking/payment")
    ? 3
    : path.startsWith("/booking/initiate")
    ? 2
    : 1;

  const steps = [
    { label: "Flight Selection" },
    { label: "Review & Traveller Details" },
    { label: "Payment" },
  ];

  const [secondsLeft, setSecondsLeft] = useState(timeoutMinutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs) => {
    const minutes = String(Math.floor(secs / 60)).padStart(2, "0");
    const seconds = String(secs % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const isExpiringSoon = secondsLeft <= 120;

  return (
    <header className="bg-gradient-to-tr from-orange-300 to-pink-300 sticky top-0 z-50 shadow-md">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 2xl:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="FlyTix Logo"
            className="w-24 sm:w-28 object-contain"
          />
        </Link>

        {/* Step Progress */}
        <nav className="hidden md:flex items-center gap-3 text-[13px] font-normal text-gray-700">
          {steps.map((step, index) => {
            const stepIndex = index + 1;
            const isCompleted = currentStep > stepIndex;
            const isActive = currentStep === stepIndex;

            return (
              <div key={index} className="flex items-center gap-3 text-sm">
                <span
                  className={`flex items-center gap-1 transition-all duration-200 ${
                    isActive
                      ? "text-pink-700"
                      : isCompleted
                      ? "text-gray-700"
                      : "text-gray-700"
                  }`}
                >
                  <span
                    className={`w-5 h-5 flex items-center justify-center border-2 text-[11px] rounded-full transition-all duration-200
                    ${
                      isCompleted
                        ? "bg-pink-600 border-pink-600 text-white font-bold"
                        : isActive
                        ? "border-pink-700 text-pink-700  "
                        : "border-gray-500 text-gray-600 "
                    }`}
                  >
                    {isCompleted ? "✓" : stepIndex}
                  </span>
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <span className="text-gray-400">—</span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Countdown Timer */}
        <div
          className={`min-w-[90px] text-sm px-3 py-1.5 rounded-full font-semibold border-2 shadow
          ${
            isExpiringSoon
              ? "text-red-700 border-red-500 bg-red-100"
              : "text-pink-800 border-pink-600 bg-white/50 backdrop-blur"
          }`}
        >
          <i className="fa-solid fa-clock mr-1"></i> {formatTime(secondsLeft)}
        </div>
      </div>
    </header>
  );
};
