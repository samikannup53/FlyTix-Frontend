import { useEffect, useState } from "react";
import { BookingFooter, UserHeader } from "../../components";
import { Assurance } from "./sections/Assurance";

export const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    dob: "",
    gender: "",
  });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleForm = () => setShowForm((prev) => !prev);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8000/api/user/profile", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || "Failed to fetch profile");
        setUserData(data);
        setFormData({ ...data, dob: data.dob ? data.dob.split("T")[0] : "" });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:8000/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          fullName: formData.fullName.trim(),
          mobile: formData.mobile.trim(),
          gender: formData.gender.trim(),
          dob: formData.dob.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Update failed");
      setSuccess("Profile Updated Successfully");
      setUserData(data.user);
      setFormData({
        fullName: data.user.fullName,
        mobile: data.user.mobile,
        dob: data.user.dob,
        gender: data.user.gender,
      });
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <UserHeader />
      <section className="bg-gradient-to-tr from-orange-50 via-pink-50 to-orange-50 min-h-screen py-10 px-4 flex flex-col items-center">
        <main className="w-full max-w-5xl mx-auto px-2 sm:px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-orange-200 pb-4 mb-10">
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl font-bold text-pink-900 flex items-center gap-2 sm:gap-3">
              <span className="border-l-4 border-pink-600 pl-3">
                Your Profile
              </span>
              <i className="fas fa-user-shield text-pink-600 text-xl sm:text-2xl"></i>
            </h2>

            {/* Last Updated */}
            <div className="flex items-center flex-wrap gap-2 text-sm text-pink-600">
              <i className="fas fa-clock" />
              <span>Last Updated:</span>
              <span className="bg-pink-100 text-pink-700 font-medium px-3 py-1 rounded-full shadow">
                June 28, 2025
              </span>
            </div>
          </div>

          {loading && (
            <div className="text-center py-20 text-pink-700 font-medium">
              <i className="fas fa-spinner fa-spin mr-2"></i> Loading profile...
            </div>
          )}

          {!loading && (
            <>
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
                {/* Fixed Left Column */}
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
                    <h3 className="text-xl font-bold text-pink-800">
                      {userData?.fullName}
                    </h3>
                    <p className="text-sm text-gray-600">Frequent Flyer</p>
                  </div>
                  <button
                    onClick={toggleForm}
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-600 to-pink-600 text-white font-semibold hover:scale-105 transition"
                  >
                    <i className="fas fa-user-edit mr-2" />{" "}
                    {showForm ? "Cancel" : "Edit Profile"}
                  </button>
                </div>

                {/* Right Column */}
                <div className="flex-1 flex flex-col bg-white/70 backdrop-blur-md border border-pink-200 rounded-3xl p-6 shadow-xl">
                  {!showForm ? (
                    <div className="flex flex-col sm:flex-row flex-wrap gap-6">
                      {/* Personal Info */}
                      <div className="flex-1 min-w-[250px] space-y-4">
                        <h3 className="text-lg font-semibold text-pink-700 flex items-center gap-2">
                          <i className="fas fa-user-circle text-pink-600" />
                          Personal Info
                        </h3>
                        <ul className="text-sm text-gray-800 space-y-2">
                          <li className="flex items-center gap-3">
                            <i className="fas fa-id-card text-pink-500 w-5" />
                            <span>
                              <strong>Name:</strong> {userData?.fullName}
                            </span>
                          </li>
                          <li className="flex items-center gap-3">
                            <i className="fas fa-calendar-alt text-pink-500 w-5" />
                            <span>
                              <strong>Date of Birth:</strong>{" "}
                              {userData?.dob?.split("T")[0]}
                            </span>
                          </li>
                          <li className="flex items-center gap-3">
                            <i className="fas fa-venus-mars text-pink-500 w-5" />
                            <span>
                              <strong>Gender:</strong> {userData?.gender}
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* Contact Info */}
                      <div className="flex-1 min-w-[250px] space-y-4">
                        <h3 className="text-lg font-semibold text-pink-700 flex items-center gap-2">
                          <i className="fas fa-address-book text-pink-600" />
                          Contact Info
                        </h3>
                        <ul className="text-sm text-gray-800 space-y-2">
                          <li className="flex items-center gap-3">
                            <i className="fas fa-phone text-pink-500 w-5" />
                            <span>
                              <strong>Phone:</strong> +91 {userData?.mobile}
                            </span>
                          </li>
                          <li className="flex items-center gap-3">
                            <i className="fas fa-envelope text-pink-500 w-5" />
                            <span>
                              <strong>Email:</strong> {userData?.email}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col md:flex-row flex-wrap gap-8"
                    >
                      {/* Left Column */}
                      <div className="flex-1 min-w-[250px] space-y-5">
                        {/* Full Name */}
                        <div className="flex flex-col">
                          <label className="text-sm font-semibold text-pink-700 mb-1 flex items-center gap-2">
                            <i className="fas fa-id-card text-pink-500" /> Full
                            Name
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            className="w-full px-4 py-2 rounded-xl border border-pink-300 bg-white shadow-sm focus:ring-2 focus:ring-pink-400 outline-none transition"
                          />
                        </div>

                        {/* Gender */}
                        <div className="flex flex-col">
                          <label className="text-sm font-semibold text-pink-700 mb-1 flex items-center gap-2">
                            <i className="fas fa-venus-mars text-pink-500" />{" "}
                            Gender
                          </label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-xl border border-pink-300 bg-white shadow-sm focus:ring-2 focus:ring-pink-400 outline-none transition"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="flex-1 min-w-[250px] space-y-5">
                        {/* Date of Birth */}
                        <div className="flex flex-col">
                          <label className="text-sm font-semibold text-pink-700 mb-1 flex items-center gap-2">
                            <i className="fas fa-calendar-alt text-pink-500" />{" "}
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-xl border border-pink-300 bg-white shadow-sm focus:ring-2 focus:ring-pink-400 outline-none transition"
                          />
                        </div>

                        {/* Mobile Number */}
                        <div className="flex flex-col">
                          <label className="text-sm font-semibold text-pink-700 mb-1 flex items-center gap-2">
                            <i className="fas fa-phone-alt text-pink-500" />{" "}
                            Mobile Number
                          </label>
                          <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full px-4 py-2 rounded-xl border border-pink-300 bg-white shadow-sm focus:ring-2 focus:ring-pink-400 outline-none transition"
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="w-full flex justify-end pt-4">
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-600 to-pink-600 text-white font-semibold hover:opacity-90 transition"
                        >
                          <i className="fas fa-save mr-2" /> Save Profile
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
        <Assurance />
      </section>
      <BookingFooter />
    </>
  );
};
