import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../../assets/images/logo.png";
import mapImage from "../../../../assets/images/map.png";

export const Register = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    dob: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep(); // On successful register
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-orange-50 via-pink-50 to-orange-50">
      <header className="p-4 sm:p-6">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="FlyTix Logo" className="w-20 sm:w-30 object-contain" />
        </Link>
      </header>

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
                Join <span className="text-yellow-300">FlyTix</span>
              </h1>
              <p className="text-white text-sm sm:text-base font-light leading-relaxed drop-shadow-sm">
                Book, relax, and let <span className="text-yellow-300">FlyTix</span> handle the rest.
              </p>
              <p className="text-yellow-300 text-xs sm:text-sm font-extralight italic drop-shadow-sm">
                <i className="fas fa-quote-left text-yellow-300 text-xl sm:text-2xl"></i> "Adventure awaits with every booking"
              </p>
            </div>
          </div>

          {/* Right Panel - Multi Step Form */}
          <div className="w-full md:w-1/2 px-8 py-14 sm:px-6 sm:py-18 lg:px-14 lg:py-20 flex items-center justify-center bg-white backdrop-blur-lg shadow-lg relative">
            <div className="w-full max-w-sm sm:max-w-md space-y-5 sm:space-y-6 min-h-[404px]">
              <h2 className="text-center text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-orange-700 via-pink-700 to-pink-800 bg-clip-text text-transparent drop-shadow-sm">
                Create an Account
              </h2>
              <p className="text-center text-sm text-gray-700">
                Sign up to <span className="text-pink-700 font-semibold">FlyTix</span> and start booking today.
              </p>

              {step <= 3 && (
                <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                  {step === 1 && (
                    <>
                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Full Name</label>
                        <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white/70 px-3 py-2 focus-within:border-pink-500 focus-within:bg-white">
                          <i className="fas fa-user text-pink-700 text-sm"></i>
                          <input
                            type="text"
                            name="name"
                            placeholder="Enter Your Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Email</label>
                        <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white/70 px-3 py-2 focus-within:border-pink-500 focus-within:bg-white">
                          <i className="fas fa-envelope text-pink-700 text-sm"></i>
                          <input
                            type="email"
                            name="email"
                            placeholder="Enter Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      {/* Gender */}
                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Gender</label>
                        <div className="flex gap-4 px-2 text-sm text-gray-700">
                          {["Male", "Female", "Other"].map((g) => (
                            <label key={g} className="flex items-center gap-1">
                              <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} required />
                              {g}
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* DOB */}
                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Date of Birth</label>
                        <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white/70 px-3 py-2 focus-within:border-pink-500 focus-within:bg-white">
                          <i className="fas fa-calendar-alt text-pink-700 text-sm"></i>
                          <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                            className="flex-1 bg-transparent text-gray-700 focus:outline-none text-sm"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      {/* Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Password</label>
                        <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white/70 px-3 py-2 focus-within:border-pink-500 focus-within:bg-white">
                          <i className="fas fa-lock text-pink-700"></i>
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter Your Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-pink-700 hover:text-pink-800 focus:outline-none"
                          >
                            <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Confirm Password</label>
                        <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white/70 px-3 py-2 focus-within:border-pink-500 focus-within:bg-white">
                          <i className="fas fa-lock text-pink-700"></i>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
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

                      {/* Terms */}
                      <div className="flex items-start gap-2 text-sm">
                        <input type="checkbox" name="acceptedTerms" checked={formData.acceptedTerms} onChange={handleChange} required />
                        <label>I accept the <span className="text-pink-700 underline">terms & conditions</span>.</label>
                      </div>
                    </>
                  )}

                  {/* Buttons */}
                  <div className="flex justify-between items-center">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex items-center gap-2 text-sm text-pink-700 hover:underline"
                      >
                        <i className="fas fa-arrow-left"></i> Back
                      </button>
                    )}
                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="ml-auto flex items-center gap-2 bg-gradient-to-br from-orange-700 via-pink-700 to-pink-800 text-white font-semibold py-2 px-5 rounded-xl shadow-lg hover:from-orange-700 hover:to-pink-700"
                      >
                        Next <i className="fas fa-arrow-right"></i>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="ml-auto flex items-center gap-2 bg-gradient-to-br from-orange-700 via-pink-700 to-pink-800 text-white font-semibold py-2 px-5 rounded-xl shadow-lg hover:from-orange-700 hover:to-pink-700"
                      >
                        <i className="fas fa-user-plus"></i> Sign Up
                      </button>
                    )}
                  </div>
                </form>
              )}

              {/* Success Screen */}
              {step === 4 && (
                <div className="text-center space-y-4">
                  <i className="fas fa-check-circle text-4xl text-green-500"></i>
                  <h3 className="text-2xl font-bold text-gray-800">Registration Successful!</h3>
                  <p className="text-sm text-gray-600">Your account has been created. Start your journey with FlyTix.</p>
                  <Link to="/flights" className="inline-block bg-gradient-to-br from-orange-700 via-pink-700 to-pink-800 text-white font-semibold py-2 px-6 rounded-xl shadow hover:from-orange-700 hover:to-pink-700">
                    Start Booking
                  </Link>
                </div>
              )}

              {/* Bottom Prompt */}
              <p className="text-center text-sm text-gray-700">
                Already have an account?{" "}
                <Link to="/login" className="text-pink-700 hover:underline font-semibold">
                  Login now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs sm:text-sm text-gray-700 py-6">
        Copyright @ 2025 <span className="font-semibold text-pink-700">FlyTix</span>. All rights reserved.
      </footer>
    </div>
  );
};
