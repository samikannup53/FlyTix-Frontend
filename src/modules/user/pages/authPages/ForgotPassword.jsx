import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthHeader } from "./authComponents/AuthHeader";
import { AuthFooter } from "./authComponents/AuthFooter";
import { AuthLeftPanel } from "./authComponents/AuthLeftPanel";

export const ForgotPassword = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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

  const handleGenerateOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch(
        "http://localhost:8000/api/auth/forgot-password/initiate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email: formData.email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Something Went Wrong");
        return;
      }

      setSuccess("OTP Sent to your Email");
      setStep(2);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (formData.newPassword !== formData.confirmNewPassword) {
      setError("Passwords do not Match");
      return;
    }
    try {
      const res = await fetch(
        "http://localhost:8000/api/auth/forgot-password/reset",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            otp: formData.otp,
            newPassword: formData.newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Something Went Wrong");
        return;
      }

      setSuccess("Password Reset Successful");
      setStep(3);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        "http://localhost:8000/api/auth/forgot-password/resend-otp",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Failed to resend OTP");
        return;
      }

      setSuccess("OTP resent successfully!");
    } catch (err) {
      setError("Server Error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-orange-50 via-pink-50 to-orange-50">
      {/* Header */}
      <AuthHeader />

      <main className="flex-grow flex items-center justify-center px-4 py-4">
        <div className="w-full max-w-7xl bg-white/30 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Panel*/}
          <AuthLeftPanel
            title={
              <>
                Reset with <span className="text-yellow-300">FlyTix</span>
              </>
            }
            subtitle={
              <>Reclaim your journey – we’ll help you get back on track.</>
            }
            quote={`"Secure travels begin with secure accounts"`}
          />

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
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md text-sm">
                  {success}
                </div>
              )}
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
                        className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                      />
                    </div>
                    <div className="flex justify-end  text-sm mt-1">
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-pink-700 font-semibold cursor-pointer"
                      >
                        Resend OTP
                      </button>
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

      {/* Footer */}
      <AuthFooter />
    </div>
  );
};
