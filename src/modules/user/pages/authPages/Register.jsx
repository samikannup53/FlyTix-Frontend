import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../../assets/images/logo.png";
import mapImage from "../../../../assets/images/map.png";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
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

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-4">
        <div className="w-full max-w-7xl bg-white/30 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

          {/* Left Panel - Form */}
          <div className="w-full md:w-1/2 px-6 py-12 sm:px-8 lg:px-14 lg:py-16 bg-white backdrop-blur-xl flex items-center justify-center relative">
            {/* Back Button */}
            <span className="absolute top-4 left-4 sm:top-6 sm:left-6 text-pink-700 flex items-center gap-2 hover:text-pink-800 transition-all">
              <i className="fas fa-chevron-left text-sm sm:text-base"></i>
              <Link to="/login" className="text-sm sm:text-base font-semibold">Back</Link>
            </span>

            {/* Form Content */}
            <div className="w-full max-w-xl overflow-y-auto max-h-[65vh]">
              <h2 className="text-center text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-orange-700 via-pink-700 to-pink-800 bg-clip-text text-transparent drop-shadow-sm mb-2">
                Create Account
              </h2>
              <p className="text-center text-sm text-gray-700 mb-6">
                Join <span className="text-pink-600 font-semibold">FlyNow</span> to start your next adventure.
              </p>

              {/* Form */}
              <form className="flex flex-wrap gap-4">
                <div className="w-full md:w-[48%]">
                  <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Full Name</label>
                  <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
                    <i className="fas fa-user text-pink-700 text-sm"></i>
                    <input type="text" placeholder="Enter your full name" className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm" />
                  </div>
                </div>

                <div className="w-full md:w-[48%]">
                  <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Email</label>
                  <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
                    <i className="fas fa-envelope text-pink-700 text-sm"></i>
                    <input type="email" placeholder="Enter your email" className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm" />
                  </div>
                </div>

                <div className="w-full md:w-[48%]">
                  <label className="block text-sm font-medium text-gray-800 mb-2 ml-1">Gender</label>
                  <div className="flex items-center gap-4 text-sm text-gray-700">
                    <label className="flex items-center gap-1">
                      <input type="radio" name="gender" value="Male" className="accent-pink-600" /> Male
                      <i className="fas fa-mars text-blue-700 text-lg"></i>
                    </label>
                    <label className="flex items-center gap-1">
                      <input type="radio" name="gender" value="Female" className="accent-pink-600" /> Female
                      <i className="fas fa-venus text-pink-700 text-lg"></i>
                    </label>
                    <label className="flex items-center gap-1">
                      <input type="radio" name="gender" value="Other" className="accent-pink-600" /> Other
                      <i className="fas fa-genderless text-purple-700 text-lg"></i>
                    </label>
                  </div>
                </div>

                <div className="w-full md:w-[48%]">
                  <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Date of Birth</label>
                  <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
                    <i className="fas fa-calendar-alt text-pink-700 text-sm"></i>
                    <input type="date" className="flex-1 bg-transparent text-gray-700 focus:outline-none text-sm" />
                  </div>
                </div>

                <div className="w-full md:w-[48%] relative">
                  <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Password</label>
                  <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
                    <i className="fas fa-lock text-pink-700 text-sm"></i>
                    <input type={showPassword ? "text" : "password"} placeholder="Create a password" className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-pink-700 hover:text-pink-800">
                      <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} text-sm`}></i>
                    </button>
                  </div>
                </div>

                <div className="w-full md:w-[48%] relative">
                  <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Confirm Password</label>
                  <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
                    <i className="fas fa-lock text-pink-700 text-sm"></i>
                    <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-pink-700 hover:text-pink-800">
                      <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} text-sm`}></i>
                    </button>
                  </div>
                </div>

                <div className="w-full md:w-[48%] mt-4">
                  <button type="submit" className="w-full bg-gradient-to-br from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white font-semibold py-2 rounded-xl shadow-lg flex items-center justify-center gap-2">
                    <i className="fas fa-user-plus text-white text-lg"></i> Sign Up
                  </button>
                </div>
                <div className="w-full md:w-[48%] mt-4">
                  <button type="reset" className="w-full bg-gradient-to-br from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white font-semibold py-2 rounded-xl shadow-lg flex items-center justify-center gap-2">
                    <i className="fas fa-undo-alt text-white text-lg"></i> Reset
                  </button>
                </div>
              </form>

              <p className="text-center text-sm text-gray-700 mt-10">
                Already have an account? <Link to="/login" className="text-pink-700 hover:underline font-semibold">Login here</Link>
              </p>
            </div>
          </div>

          {/* Right Panel - Welcome Visual */}
          <div className="hidden md:flex w-1/2 relative items-center justify-center p-6 bg-gradient-to-br from-orange-800 to-pink-900">
            <img src={mapImage} alt="Travel Background" className="absolute inset-0 w-full h-full object-contain mix-blend-multiply opacity-30 z-10" />
            <img src="https://randomuser.me/api/portraits/men/32.jpg" className="absolute top-6 left-8 w-16 sm:w-20 h-16 sm:h-20 rounded-full border-2 border-yellow-300 z-20 shadow-lg" />
            <img src="https://randomuser.me/api/portraits/men/45.jpg" className="absolute top-24 left-[150px] sm:left-[220px] w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-blue-200 z-20 shadow" />
            <img src="https://randomuser.me/api/portraits/men/12.jpg" className="absolute top-[180px] right-4 w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-orange-200 z-20 shadow-md" />
            <img src="https://randomuser.me/api/portraits/women/55.jpg" className="absolute bottom-10 right-16 sm:right-20 w-12 sm:w-14 h-12 sm:h-14 rounded-full border-2 border-white z-20 shadow-md" />
            <img src="https://randomuser.me/api/portraits/women/22.jpg" className="absolute bottom-[120px] left-[100px] sm:left-[200px] w-10 sm:w-11 h-10 sm:h-11 rounded-full border-2 border-pink-200 z-20 shadow" />
            <img src="https://randomuser.me/api/portraits/women/10.jpg" className="absolute top-10 right-1/4 w-14 sm:w-16 h-14 sm:h-16 rounded-full border-2 border-yellow-200 z-20 shadow-lg" />
            <img src="https://randomuser.me/api/portraits/men/66.jpg" className="absolute bottom-6 left-8 sm:left-10 w-12 sm:w-14 h-12 sm:h-14 rounded-full border-2 border-white z-20 shadow-md" />

            <div className="relative z-30 px-4 sm:px-6 text-center max-w-sm sm:max-w-md space-y-4 sm:space-y-5">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg leading-tight">
                Welcome to <span className="text-yellow-300">FlyNow</span>
              </h1>
              <p className="text-white text-sm sm:text-base font-light leading-relaxed drop-shadow-sm">
                Book your journey today and <span className="font-medium text-yellow-300">explore the skies</span> with FlyNow.
              </p>
              <p className="text-yellow-300 text-xs sm:text-sm md:text-lg font-extralight italic drop-shadow-sm">
                <i className="fas fa-quote-left text-yellow-300 text-xl sm:text-2xl"></i> "Adventure begins with a sign up"
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs sm:text-sm text-gray-700 py-6">
        Copyright @ 2025 <span className="font-semibold text-pink-700">FlyNow</span>. All rights reserved.
      </footer>
    </div>
  );
};
