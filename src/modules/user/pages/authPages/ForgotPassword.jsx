import { useState } from "react";
import { Link } from "react-router-dom";
import mapImage from "../../../../assets/images/map.png";
import logo from "../../../../assets/images/logo.png";

export const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-orange-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="p-4 sm:p-6">
        <Link to="/" className="flex items-center">
                  <img
                    src={logo}
                    alt="FlyTix Logo"
                    className="w-20 sm:w-30 object-contain"
                  />
                </Link>
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-7xl bg-white/30 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[70vh]">
          {/* Left Panel */}
          <div className="hidden md:flex w-1/2 relative items-center justify-center p-6 bg-gradient-to-br from-orange-800 to-pink-900 rounded-l-3xl">
            <img
              src={mapImage}
              className="absolute inset-0 w-full h-full object-contain mix-blend-multiply opacity-30 z-10"
              alt="Background"
            />
            {/* Avatars */}
            <img src="https://randomuser.me/api/portraits/men/32.jpg" className="absolute top-6 left-8 w-20 h-20 rounded-full border-2 border-yellow-300 z-20 shadow-lg" />
            <img src="https://randomuser.me/api/portraits/men/45.jpg" className="absolute top-24 left-[220px] w-12 h-12 rounded-full border-2 border-blue-200 z-20 shadow" />
            <img src="https://randomuser.me/api/portraits/men/12.jpg" className="absolute top-[180px] right-4 w-12 h-12 rounded-full border-2 border-orange-200 z-20 shadow-md" />
            <img src="https://randomuser.me/api/portraits/women/55.jpg" className="absolute bottom-10 right-20 w-14 h-14 rounded-full border-2 border-white z-20 shadow-md" />
            <img src="https://randomuser.me/api/portraits/women/22.jpg" className="absolute bottom-[150px] left-[200px] w-11 h-11 rounded-full border-2 border-pink-200 z-20 shadow" />
            <img src="https://randomuser.me/api/portraits/women/10.jpg" className="absolute top-10 right-1/4 w-16 h-16 rounded-full border-2 border-yellow-200 z-20 shadow-lg" />
            <img src="https://randomuser.me/api/portraits/men/66.jpg" className="absolute bottom-6 left-10 w-14 h-14 rounded-full border-2 border-white z-20 shadow-md" />
            <div className="relative z-30 px-6 text-center max-w-md space-y-5">
              <h1 className="text-4xl font-extrabold text-white drop-shadow-lg leading-tight">
                Trouble Signing In?
              </h1>
              <p className="text-white text-base md:text-lg font-light leading-relaxed drop-shadow-sm">
                Don’t worry, we’ve got you covered. <br />
                <span className="font-medium text-yellow-300">
                  Reset your password securely and quickly.
                </span>
              </p>
              <p className="text-yellow-300 text-sm md:text-lg font-extralight italic drop-shadow-sm">
                <i className="fas fa-quote-left text-yellow-300 text-2xl"></i>{" "}
                "Reset today, fly tomorrow!"
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full md:w-1/2 px-8 py-14 sm:px-6 sm:py-18 lg:px-14 lg:py-20 flex items-center justify-center bg-white backdrop-blur-lg shadow-lg relative">
            {/* Back to Home */}
            <span className="absolute top-4 left-4 sm:top-6 sm:left-6 text-pink-700 flex items-center gap-2 hover:text-pink-800 transition-all">
              <i className="fas fa-house text-sm sm:text-base mb-[3px]"></i>
              <Link to="/" className="text-sm sm:text-base font-medium">
                Home
              </Link>
            </span>

            <div className="w-full max-w-sm sm:max-w-md space-y-5 sm:space-y-6 min-h-[404px]">
              {/* Step 1 */}
              {step === 1 && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep(2);
                  }}
                  className="space-y-5"
                >
                  <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-pink-700 drop-shadow-sm">
                    Forgot Password
                  </h2>
                  <p className="text-center text-sm text-gray-700">
                    Enter your email and we’ll send you instructions & OTP to
                    reset your password
                  </p>

                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
                      Email
                    </label>
                    <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
                      <i className="fas fa-envelope text-pink-700 text-sm"></i>
                      <input
                        type="email"
                        required
                        placeholder="Enter Your Registered Email"
                        className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-br from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white font-semibold py-2 rounded-xl shadow-lg flex items-center justify-center gap-2 transition"
                  >
                    <i className="fas fa-cogs text-white text-lg"></i> Generate OTP
                  </button>

                  <p className="text-center text-sm text-gray-700">
                    Remembered your password?{" "}
                    <Link to="/login" className="text-pink-700 hover:underline font-semibold">
                      Login here
                    </Link>
                  </p>
                </form>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <form className="space-y-5">
                  <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-pink-700 drop-shadow-sm">
                    Set New Password
                  </h2>
                  <p className="text-center text-sm text-gray-700">
                    Enter OTP received on your email and reset your password
                  </p>

                  {/* OTP */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
                      OTP
                    </label>
                    <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
                      <i className="fas fa-key text-pink-700 text-sm"></i>
                      <input
                        type="text"
                        required
                        placeholder="Enter OTP"
                        className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
                      New Password
                    </label>
                    <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
                      <i className="fas fa-lock text-pink-700"></i>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="New password"
                        className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="text-pink-700 hover:text-pink-800 focus:outline-none"
                      >
                        <i className={`fas ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
                      Confirm Password
                    </label>
                    <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
                      <i className="fas fa-lock text-pink-700"></i>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter password"
                        className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-pink-700 hover:text-pink-800 focus:outline-none"
                      >
                        <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-br from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white font-semibold py-2 rounded-xl shadow-lg flex items-center justify-center gap-2 transition"
                  >
                    <i className="fas fa-unlock text-white text-lg"></i> Update Password
                  </button>

                  <p className="text-center text-sm text-gray-700">
                    Remembered your password?{" "}
                    <Link to="/login" className="text-pink-700 hover:underline font-semibold">
                      Login here
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-700 py-6 mb-auto">
        © 2025 <span className="font-semibold text-pink-700">FlyTix</span>. All rights reserved.
      </footer>
    </div>
  );
};
