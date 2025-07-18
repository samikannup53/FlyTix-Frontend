import { useAuth } from "../../../../shared/contexts/AuthContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthHeader } from "./authComponents/AuthHeader";
import { AuthFooter } from "./authComponents/AuthFooter";
import { AuthLeftPanel } from "./authComponents/AuthLeftPanel";
import { toast } from "react-toastify";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || "Login failed");

      await refreshUser();
      toast.success("Login successful!");
      navigate("/flights");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-orange-50 via-pink-50 to-orange-50">
      <AuthHeader />
      <main className="flex-grow flex items-center justify-center px-4 py-4">
        <div className="w-full max-w-7xl bg-white/30 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          <AuthLeftPanel
            title={
              <>
                Welcome to <span className="text-yellow-300">FlyTix</span>
              </>
            }
            subtitle={
              <>
                Your next adventure begins now. <br />
                <span className="font-medium">
                  <span className="text-yellow-300">Sign up</span> today and let
                  <span className="text-yellow-300"> FlyTix </span>take you to
                  the skies.
                </span>
              </>
            }
            quote={`"Every journey begins with a single click"`}
          />
          <div className="w-full md:w-1/2 px-8 py-14 sm:px-6 sm:py-18 lg:px-14 lg:py-20 flex items-center justify-center bg-white backdrop-blur-lg shadow-lg relative">
            <span className="absolute top-4 left-4 sm:top-6 sm:left-6 text-pink-700 flex items-center gap-2 hover:text-pink-800 transition-all">
              <i className="fas fa-house text-sm sm:text-base mb-[3px]"></i>
              <Link to="/" className="text-sm sm:text-base font-medium">
                Home
              </Link>
            </span>
            <div className="w-full max-w-sm sm:max-w-md space-y-5 sm:space-y-6">
              <h2 className="text-center text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-orange-700 via-pink-700 to-pink-800 bg-clip-text text-transparent drop-shadow-sm">
                Welcome Back
              </h2>
              <p className="text-center text-sm text-gray-700">
                Login to{" "}
                <span className="text-pink-700 font-semibold">FlyTix</span> and
                explore your journeys.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
                    Email
                  </label>
                  <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white/70 px-3 py-2 focus-within:border-pink-500 focus-within:bg-white">
                    <i className="fas fa-envelope text-pink-700 text-sm"></i>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Your Email"
                      className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
                    Password
                  </label>
                  <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white/70 px-3 py-2 focus-within:border-pink-500 focus-within:bg-white">
                    <i className="fas fa-lock text-pink-700"></i>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter Your Password"
                      className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-pink-700 hover:text-pink-800 focus:outline-none"
                    >
                      <i
                        className={`fas ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-pink-700 hover:underline font-medium"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`cursor-pointer w-full ${
                    isLoading
                      ? "bg-gradient-to-br from-orange-700 via-pink-700 to-pink-800 cursor-wait"
                      : "bg-gradient-to-br from-orange-700 via-pink-700 to-pink-800 hover:from-orange-700 hover:to-pink-700"
                  } text-white font-semibold py-2 rounded-xl shadow-lg transition flex items-center justify-center gap-2`}
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin text-white text-lg"></i>
                      <span className="font-medium ml-2">Logging In...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt text-white text-lg"></i>{" "}
                      Login
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-gray-700">
                Don’t have an account?
                <Link
                  to="/register"
                  className="text-pink-700 hover:underline font-semibold"
                >
                  {" "}
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <AuthFooter />
    </div>
  );
};
