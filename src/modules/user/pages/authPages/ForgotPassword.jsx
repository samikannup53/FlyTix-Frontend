import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../../assets/images/logo.png";
import mapImage from "../../../../assets/images/map.png";

export const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateOtp = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      return alert("Passwords do not match.");
    }
    setStep(3);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-orange-50 via-pink-50 to-orange-50">
      <header className="p-4 sm:p-6">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="FlyTix Logo"
            className="w-20 sm:w-30 object-contain"
          />
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-4">
        <div className="w-full max-w-7xl bg-white/30 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Panel with Avatars & Quote */}
          <div className="hidden md:flex md:w-1/2 relative items-center justify-center p-6 bg-gradient-to-br from-orange-800 to-pink-900">
            <img
              src={mapImage}
              className="absolute inset-0 w-full h-full object-contain mix-blend-multiply opacity-30 z-10"
              alt="Travel Background"
            />

            {/* Avatars */}
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              className="absolute top-6 left-8 w-16 sm:w-20 h-16 sm:h-20 rounded-full border-2 border-yellow-300 z-20 shadow-lg"
            />
            <img
              src="https://randomuser.me/api/portraits/men/45.jpg"
              className="absolute top-24 left-[150px] sm:left-[220px] w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-blue-200 z-20 shadow"
            />
            <img
              src="https://randomuser.me/api/portraits/men/12.jpg"
              className="absolute top-[180px] right-4 w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-orange-200 z-20 shadow-md"
            />
            <img
              src="https://randomuser.me/api/portraits/women/55.jpg"
              className="absolute bottom-10 right-16 sm:right-20 w-12 sm:w-14 h-12 sm:h-14 rounded-full border-2 border-white z-20 shadow-md"
            />
            <img
              src="https://randomuser.me/api/portraits/women/22.jpg"
              className="absolute bottom-[120px] left-[100px] sm:left-[200px] w-10 sm:w-11 h-10 sm:h-11 rounded-full border-2 border-pink-200 z-20 shadow"
            />
            <img
              src="https://randomuser.me/api/portraits/women/10.jpg"
              className="absolute top-10 right-1/4 w-14 sm:w-16 h-14 sm:h-16 rounded-full border-2 border-yellow-200 z-20 shadow-lg"
            />
            <img
              src="https://randomuser.me/api/portraits/men/66.jpg"
              className="absolute bottom-6 left-8 sm:left-10 w-12 sm:w-14 h-12 sm:h-14 rounded-full border-2 border-white z-20 shadow-md"
            />

            <div className="relative z-30 px-4 sm:px-6 text-center max-w-sm space-y-4">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg leading-tight">
                Reset with <span className="text-yellow-300">FlyTix</span>
              </h1>
              <p className="text-white text-sm sm:text-base font-light leading-relaxed drop-shadow-sm">
                Reclaim your journey – we’ll help you get back on track.
              </p>
              <p className="text-yellow-300 text-xs sm:text-sm font-extralight italic drop-shadow-sm">
                <i className="fas fa-quote-left text-yellow-300 text-xl sm:text-2xl"></i>{" "}
                "Secure travels begin with secure accounts"
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full md:w-1/2 px-8 py-14 sm:px-6 sm:py-18 lg:px-14 lg:py-20 flex items-center justify-center bg-white backdrop-blur-lg shadow-lg relative">
            <span className="absolute top-4 left-4 sm:top-6 sm:left-6 text-pink-700 flex items-center gap-2 hover:text-pink-800 transition-all">
              <i className="fas fa-house text-sm sm:text-base mb-[3px]"></i>
              <Link to="/" className="text-sm sm:text-base font-medium">
                Home
              </Link>
            </span>

            <div className="w-full max-w-sm sm:max-w-md space-y-5 min-h-[404px]">
              <h2 className="text-center text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-orange-700 via-pink-700 to-pink-800 bg-clip-text text-transparent drop-shadow-sm">
                Forgot Password?
              </h2>
              <p className="text-center text-sm text-gray-700">
                Reset Password and Resume Your &nbsp;
                <span className="text-pink-700 font-semibold">
                  Booking
                </span>{" "}
              </p>
              {/* Step 1 - Email */}
              {step === 1 && (
                <form onSubmit={handleGenerateOtp} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
                      Email Address
                    </label>
                    <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white/70 px-3 py-2 focus-within:border-pink-500 focus-within:bg-white">
                      <i className="fas fa-envelope text-pink-700"></i>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-orange-700 via-pink-700 to-pink-800 text-white font-semibold py-2 px-5 rounded-xl shadow hover:from-orange-700 hover:to-pink-700"
                  >
                    <i className="fas fa-gears"></i> Generate OTP
                  </button>
                </form>
              )}

              {/* Step 2 - OTP & New Password */}
              {step === 2 && (
                <form
                  onSubmit={handleUpdatePassword}
                  className="space-y-[10px]"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
                      Enter OTP
                    </label>
                    <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white/70 px-3 py-2 focus-within:border-pink-500 focus-within:bg-white">
                      <i className="fas fa-key text-pink-700"></i>
                      <input
                        type="text"
                        name="otp"
                        placeholder="Enter OTP"
                        value={formData.otp}
                        onChange={handleChange}
                        required
                        className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
                      New Password
                    </label>
                    <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white/70 px-3 py-2 focus-within:border-pink-500 focus-within:bg-white">
                      <i className="fas fa-lock text-pink-700"></i>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        placeholder="New Password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                        className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="text-pink-700 hover:text-pink-800"
                      >
                        <i
                          className={`fas ${
                            showNewPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
                      Confirm Password
                    </label>
                    <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white/70 px-3 py-2 focus-within:border-pink-500 focus-within:bg-white">
                      <i className="fas fa-lock text-pink-700"></i>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmNewPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmNewPassword}
                        onChange={handleChange}
                        required
                        className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="text-pink-700 hover:text-pink-800"
                      >
                        <i
                          className={`fas ${
                            showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-orange-700 via-pink-700 to-pink-800 text-white font-semibold py-2 px-5 rounded-xl shadow hover:from-orange-700 hover:to-pink-700"
                  >
                    <i className="fas fa-key"></i> Update Password
                  </button>
                </form>
              )}

              {/* Step 3 - Success */}
              {step === 3 && (
                <div className="text-center space-y-4">
                  <i className="fas fa-circle-check text-4xl text-green-500"></i>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Password Reset Successful!
                  </h3>
                  <p className="text-sm text-gray-600">
                    You can now log in with your new password and continue your
                    booking journey.
                  </p>
                  <Link
                    to="/login"
                    className="inline-block bg-gradient-to-br from-orange-700 via-pink-700 to-pink-800 text-white font-semibold py-2 px-6 rounded-xl shadow hover:from-orange-700 hover:to-pink-700"
                  >
                    Go to Login
                  </Link>
                </div>
              )}

              {/* Bottom link */}
              <p className="text-center text-sm text-gray-700">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-pink-700 hover:underline font-semibold"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs sm:text-sm text-gray-700 py-6">
        © 2025 <span className="font-semibold text-pink-700">FlyTix</span>. All
        rights reserved.
      </footer>
    </div>
  );
};
