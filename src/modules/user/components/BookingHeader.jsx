import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";

export const BookingHeader = ({ currentStep = 2 }) => {
  const steps = [
    { label: "Flight Selection" },
    { label: "Review & Traveller Details" },
    { label: "Seat Selection" },
    { label: "Payment" },
    { label: "Confirmation" },
  ];

  return (
    <header className="bg-gradient-to-tr from-orange-300 to-pink-300 sticky top-0 z-50 shadow-md">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="FlyTix Logo"
            className="w-24 sm:w-28 object-contain"
          />
        </Link>

        {/* Progress Navigation */}
        <nav className="hidden md:flex items-center gap-3 text-[13px] font-normal text-gray-700">
          {steps.map((step, index) => {
            const stepIndex = index + 1;
            const isCompleted = currentStep > stepIndex;
            const isActive = currentStep === stepIndex;

            return (
              <div key={index} className="flex items-center gap-3">
                <span
                  className={`flex items-center gap-1 ${
                    isActive
                      ? "text-orange-600 font-medium"
                      : isCompleted
                      ? "text-gray-700"
                      : "text-gray-500"
                  }`}
                >
                  <span
                    className={`w-5 h-5 flex items-center justify-center border-2 text-[11px] font-bold rounded-full
                    ${
                      isCompleted
                        ? "bg-orange-500 border-orange-500 text-white"
                        : isActive
                        ? "border-orange-600 text-orange-600 font-semibold"
                        : "border-gray-500 text-gray-600"
                    }`}
                  >
                    {isCompleted ? "✓" : stepIndex}
                  </span>
                  {step.label}
                </span>

                {/* Divider (except after last step) */}
                {index < steps.length - 1 && (
                  <span className="text-gray-400">—</span>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Avatar Only (No dropdown) */}
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500 shadow">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};
