import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../../assets/images/logo.png";
import mapImage from "../../../../assets/images/map.png";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-100/50 to-yellow-200/50">
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

      {/* Main Container */}
      <main className="flex-grow flex items-center justify-center px-4 py-4">
        <div className="w-full max-w-7xl bg-white/30 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Panel */}
          <div className="hidden md:flex md:w-1/2 relative items-center justify-center p-6 bg-gradient-to-br from-orange-800 to-pink-900">
            <img
              src={mapImage}
              className="absolute inset-0 w-full h-full object-contain mix-blend-multiply opacity-30 z-10"
              alt="Travel Background"
            />
            {/* Avatars */}
            <img src="https://randomuser.me/api/portraits/men/32.jpg" className="absolute top-6 left-8 w-16 sm:w-20 h-16 sm:h-20 rounded-full border-2 border-yellow-300 z-20 shadow-lg" />
            <img src="https://randomuser.me/api/portraits/men/45.jpg" className="absolute top-24 left-[150px] sm:left-[220px] w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-blue-200 z-20 shadow" />
            <img src="https://randomuser.me/api/portraits/men/12.jpg" className="absolute top-[180px] right-4 w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-orange-200 z-20 shadow-md" />
            <img src="https://randomuser.me/api/portraits/women/55.jpg" className="absolute bottom-10 right-16 sm:right-20 w-12 sm:w-14 h-12 sm:h-14 rounded-full border-2 border-white z-20 shadow-md" />
            <img src="https://randomuser.me/api/portraits/women/22.jpg" className="absolute bottom-[120px] left-[100px] sm:left-[200px] w-10 sm:w-11 h-10 sm:h-11 rounded-full border-2 border-pink-200 z-20 shadow" />
            <img src="https://randomuser.me/api/portraits/women/10.jpg" className="absolute top-10 right-1/4 w-14 sm:w-16 h-14 sm:h-16 rounded-full border-2 border-yellow-200 z-20 shadow-lg" />
            <img src="https://randomuser.me/api/portraits/men/66.jpg" className="absolute bottom-6 left-8 sm:left-10 w-12 sm:w-14 h-12 sm:h-14 rounded-full border-2 border-white z-20 shadow-md" />

            <div className="relative z-30 px-4 sm:px-6 text-center max-w-sm sm:max-w-md space-y-4 sm:space-y-5">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg leading-tight">
                Welcome to <span className="text-yellow-300">FlyTix</span>
              </h1>
              <p className="text-white text-sm sm:text-base font-light leading-relaxed drop-shadow-sm">
                Your next adventure begins now. <br />
                <span className="font-medium">
                  <span className="text-yellow-300">Sign up</span> today and let
                  <span className="text-yellow-300"> FlyTix </span>take you to the skies.
                </span>
              </p>
              <p className="text-yellow-300 text-xs sm:text-sm md:text-lg font-extralight italic drop-shadow-sm">
                <i className="fas fa-quote-left text-yellow-300 text-xl sm:text-2xl"></i> "Every journey begins with a single click"
              </p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full md:w-1/2 px-8 py-14 sm:px-6 sm:py-18 lg:px-14 lg:py-20 flex items-center justify-center bg-white/70 backdrop-blur-lg shadow-lg relative">
            {/* Back */}
            <span className="absolute top-4 left-4 sm:top-6 sm:left-6 text-pink-700 flex items-center gap-2 hover:text-pink-800 transition-all">
              <i className="fas fa-chevron-left text-sm sm:text-base mb-[3px]"></i>
              <Link to="/" className="text-sm sm:text-base font-semibold">Back</Link>
            </span>
            <div className="w-full max-w-sm sm:max-w-md space-y-5 sm:space-y-6">
              <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-pink-700 drop-shadow-sm">
                Welcome Back
              </h2>
              <p className="text-center text-sm text-gray-700">
                Login to <span className="text-pink-600 font-semibold">FlyTix</span> and explore your journeys.
              </p>

              <form className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Email</label>
                  <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white/70 px-3 py-2 focus-within:border-pink-500 focus-within:bg-white">
                    <i className="fas fa-envelope text-pink-700 text-sm"></i>
                    <input type="email" placeholder="Enter Your Email" className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Password</label>
                  <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white/70 px-3 py-2 focus-within:border-pink-500 focus-within:bg-white">
                    <i className="fas fa-lock text-pink-700"></i>
                    <input type={showPassword ? "text" : "password"} placeholder="Enter Your Password" className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-pink-700 hover:text-pink-800 focus:outline-none"
                    >
                      <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <Link to="/forgot-password" className="text-sm text-pink-700 hover:underline font-medium">
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-br from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white font-semibold py-2 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  <i className="fas fa-sign-in-alt text-white text-lg"></i> Login
                </button>
              </form>

              <p className="text-center text-sm text-gray-700">
                Don’t have an account?
                <Link to="/register" className="text-pink-700 hover:underline font-semibold">
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs sm:text-sm text-gray-700 py-6">
        Copyright @ 2025 <span className="font-semibold text-pink-700">FlyTix</span>. All rights reserved.
      </footer>
    </div>
  );
};