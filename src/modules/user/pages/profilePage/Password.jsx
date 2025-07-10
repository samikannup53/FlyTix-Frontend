import { useState } from "react";
import { BookingFooter, UserHeader } from "../../components";
import { Assurance } from "./sections/Assurance";

export const Password = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    const { currentPassword, newPassword, confirmNewPassword } = formData;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/api/auth/change-password",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ currentPassword, newPassword }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Password change failed");

      setSuccess("Password updated successfully.");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <UserHeader />
      <section className="bg-gradient-to-tr from-orange-50 via-pink-50 to-orange-50 min-h-screen py-10 px-4 flex flex-col items-center">
        <main className="w-full max-w-5xl mx-auto px-2 sm:px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-orange-200 pb-4 mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-pink-900 flex items-center gap-2 sm:gap-3">
              <span className="border-l-4 border-pink-600 pl-3">
                Change Password
              </span>
              <span className="flex gap-1 text-pink-600 text-xl sm:text-2xl">
                <i className="fas fa-key" />
              </span>
            </h2>
            <div className="flex items-center flex-wrap gap-2 text-sm text-pink-600">
              <i className="fas fa-clock" />
              <span>Last Updated:</span>
              <span className="bg-pink-100 text-pink-700 font-medium px-3 py-1 rounded-full shadow">
                July 10, 2025
              </span>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm mb-6 border border-red-300">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg text-sm mb-6 border border-green-300">
              {success}
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Avatar Column */}
            <div className="w-full lg:w-1/4 flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/150?img=13"
                  className="w-32 h-32 rounded-full border-4 border-orange-300 shadow-lg object-cover"
                  alt="avatar"
                />
                <span className="absolute bottom-0 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-pink-800">Secure Zone</h3>
                <p className="text-sm text-gray-600">Change Your Password</p>
              </div>
            </div>

            {/* Form Column */}
            <div className="flex-1 bg-white/70 backdrop-blur-md border border-pink-200 rounded-3xl p-6 shadow-xl">
              <form className="space-y-6 text-sm text-gray-800 max-w-xl mx-auto">
                {/* Current Password */}
                <div className="flex flex-col relative">
                  <label className="text-sm font-semibold text-pink-700 mb-1 flex items-center gap-2">
                    <i className="fas fa-unlock text-pink-500" /> Current
                    Password
                  </label>
                  <input
                    type={showPassword.current ? "text" : "password"}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="Enter current password"
                    className="w-full px-4 py-2 pr-10 rounded-xl border border-pink-300 bg-white shadow-sm focus:ring-2 focus:ring-pink-400 outline-none transition"
                  />
                  <span
                    onClick={() => togglePassword("current")}
                    className="absolute right-3 top-9 cursor-pointer text-pink-500"
                  >
                    <i
                      className={`fas ${
                        showPassword.current ? "fa-eye-slash" : "fa-eye"
                      }`}
                    />
                  </span>
                </div>

                {/* New Password */}
                <div className="flex flex-col relative">
                  <label className="text-sm font-semibold text-pink-700 mb-1 flex items-center gap-2">
                    <i className="fas fa-lock text-pink-500" /> New Password
                  </label>
                  <input
                    type={showPassword.new ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className="w-full px-4 py-2 pr-10 rounded-xl border border-pink-300 bg-white shadow-sm focus:ring-2 focus:ring-pink-400 outline-none transition"
                  />
                  <span
                    onClick={() => togglePassword("new")}
                    className="absolute right-3 top-9 cursor-pointer text-pink-500"
                  >
                    <i
                      className={`fas ${
                        showPassword.new ? "fa-eye-slash" : "fa-eye"
                      }`}
                    />
                  </span>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col relative">
                  <label className="text-sm font-semibold text-pink-700 mb-1 flex items-center gap-2">
                    <i className="fas fa-key text-pink-500" /> Confirm Password
                  </label>
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    placeholder="Re-enter new password"
                    className="w-full px-4 py-2 pr-10 rounded-xl border border-pink-300 bg-white shadow-sm focus:ring-2 focus:ring-pink-400 outline-none transition"
                  />
                  <span
                    onClick={() => togglePassword("confirm")}
                    className="absolute right-3 top-9 cursor-pointer text-pink-500"
                  >
                    <i
                      className={`fas ${
                        showPassword.confirm ? "fa-eye-slash" : "fa-eye"
                      }`}
                    />
                  </span>
                </div>

                {/* Button */}
                <div className="pt-2 text-right">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-600 to-pink-600 text-white font-semibold hover:opacity-90 transition"
                  >
                    <i className="fas fa-save mr-2" />
                    {loading ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
        <Assurance />
      </section>
      <BookingFooter />
    </>
  );
};
