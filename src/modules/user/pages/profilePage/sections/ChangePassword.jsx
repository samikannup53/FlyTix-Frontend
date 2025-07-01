import { useState } from "react";

export const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      const res = await fetch("http://localhost:8000/api/auth/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg || "Password change failed");
      }

      setSuccess("Password updated successfully.");
      setFormData({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      {/* Header Section */}
      <div className="flex items-center justify-between border-b border-orange-200 pb-3 mb-6">
        <h2 className="text-xl font-semibold text-pink-800 flex items-center border-l-4 border-orange-600 pl-3">
          Change Password
          <i className="fas fa-angle-right text-orange-600 text-2xl ml-2"></i>
        </h2>
        <span className="flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
          <i className="fas fa-shield-alt"></i> Stay secure
        </span>
      </div>

      {/* Password Update Card */}
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border border-pink-100 rounded-2xl shadow p-6 space-y-6">
        {error && (
          <div className="text-sm bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="text-sm bg-green-100 text-green-700 border border-green-300 px-4 py-2 rounded-md">
            {success}
          </div>
        )}
        <form className="space-y-5 text-sm text-gray-800 max-w-xl">
          {/* Current Password */}
          <div className="flex flex-col">
            <label className="text-pink-700 font-semibold mb-1">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              className="px-4 py-2 rounded-md border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white shadow-sm"
            />
          </div>

          {/* New Password */}
          <div className="flex flex-col">
            <label className="text-pink-700 font-semibold mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="px-4 py-2 rounded-md border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white shadow-sm"
            />
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col">
            <label className="text-pink-700 font-semibold mb-1">Confirm New Password</label>
            <input
              type="password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              placeholder="Re-enter new password"
              className="px-4 py-2 rounded-md border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-orange-700 to-pink-700 disabled:opacity-70"
            >
              <i className="fas fa-lock-open"></i> {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
