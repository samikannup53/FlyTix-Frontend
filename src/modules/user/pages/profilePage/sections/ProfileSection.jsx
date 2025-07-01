import { useEffect, useState } from "react";

export const ProfileSection = () => {
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

  const toggleForm = () => setShowForm(!showForm);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8000/api/user/profile", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.msg || "Failed to fetch Profile");
        }
        setUserData(data);
        setFormData({ ...data, dob: data.dob ? data.dob.split("T")[0] : "" });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
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
          dob: formData.dob.trim(),
          fullName: formData.fullName.trim(),
          gender: formData.gender.trim(),
          mobile: formData.mobile.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg || "User Profile Update Failed");
      }
      setSuccess("Profile Updated Successfully");
      setUserData(data.user);
      setShowForm(false);
      setFormData({
        fullName: data.user.fullName,
        mobile: data.user.mobile,
        dob: data.user.dob,
        gender: data.user.gender,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-pink-700 font-medium">
        <i className="fas fa-spinner fa-spin mr-2"></i> Loading profile...
      </div>
    );
  }

  return (
    <section>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-orange-200 pb-4 mb-8">
        <h2 className="text-2xl font-bold text-pink-800 flex items-center gap-3">
          <span className="border-l-4 border-pink-700 pl-3">Your Profile</span>
          <i className="fas fa-user-shield text-pink-700 text-xl"></i>
        </h2>
        <div className="flex items-center gap-2 text-sm mt-4 sm:mt-0">
          <i className="fas fa-clock text-pink-700"></i>
          <span className="text-pink-700">Last Updated:</span>
          <span className="bg-pink-100 text-pink-700 font-semibold px-2 py-0.5 rounded-full shadow-sm">
            June 28, 2025
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm mb-4 border border-red-300">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm mb-4 border border-green-300">
          {success}
        </div>
      )}

      {/* Display Card */}
      {!showForm && (
        <div className="flex gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center text-center space-y-4 w-1/4 ">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/150?img=13"
                alt="User Avatar"
                className="w-32 h-32 rounded-full border-4 border-orange-300 shadow-md object-cover"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-pink-800">
                {userData?.fullName}
              </h2>
              <p className="text-sm text-gray-600">Frequent Flyer</p>
            </div>
            <button
              onClick={toggleForm}
              className="mt-2 px-4 py-2 rounded-full text-white font-medium bg-gradient-to-r from-orange-600 to-pink-600 hover:opacity-90 transition text-sm"
            >
              <i className="fas fa-user-edit mr-1"></i> Edit Profile
            </button>
          </div>
          <div className=" w-full max-w-6xl mx-auto flex justify-around p-6 rounded-3xl shadow-xl border border-pink-200 bg-white/70 backdrop-blur-md transition-all duration-300">
            {/* Personal Info */}
            <div className="space-y-4 mt-2">
              <h3 className="text-lg font-semibold text-pink-700 flex items-center gap-2">
                <i className="fas fa-user-circle text-pink-600"></i> Personal
                Info
              </h3>
              <ul className="text-gray-700 space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <i className="fas fa-id-badge text-pink-500 w-5"></i>
                  <span>
                    <strong>Name:</strong> {userData?.fullName}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <i className="fas fa-birthday-cake text-pink-500 w-5"></i>
                  <span>
                    <strong>DOB:</strong> {userData?.dob?.split("T")[0]}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <i className="fas fa-venus-mars text-pink-500 w-5"></i>
                  <span>
                    <strong>Gender:</strong> {userData?.gender}
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 mt-2">
              <h3 className="text-lg font-semibold text-pink-700 flex items-center gap-2">
                <i className="fas fa-address-book text-pink-600"></i> Contact
                Info
              </h3>
              <ul className="text-gray-700 space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <i className="fas fa-phone-alt text-pink-500 w-5"></i>
                  <span>
                    <strong>Phone:</strong> +91 {userData?.mobile}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <i className="fas fa-envelope text-pink-500 w-5"></i>
                  <span>
                    <strong>Email:</strong> {userData?.email}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Update Form */}
      {showForm && (
        <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-md border border-pink-200 rounded-3xl shadow-lg p-6 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-pink-800 flex items-center gap-3">
              <i className="fas fa-user-edit text-pink-600 text-xl"></i> Update
              Profile
            </h3>
            <p className="text-sm text-gray-500">
              Keep your details accurate for a smoother experience.
            </p>
          </div>

          <form className="flex flex-col md:flex-row gap-8 text-sm text-gray-800">
            {/* Left */}
            <div className="flex-1 space-y-5">
              <div className="flex flex-col">
                <label className="mb-1 text-pink-700 font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={userData?.fullName || "Enter Full Name"}
                  className="px-4 py-2 rounded-xl border border-pink-300 bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-pink-700 font-semibold">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-xl border border-pink-300 bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Right */}
            <div className="flex-1 space-y-5">
              <div className="flex flex-col">
                <label className="mb-1 text-pink-700 font-semibold">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  placeholder={userData?.dob}
                  className="px-4 py-2 rounded-xl border border-pink-300 bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-pink-700 font-semibold">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder={`+91 ${userData?.mobile || ""}`}
                  className="px-4 py-2 rounded-xl border border-pink-300 bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                />
              </div>
            </div>
          </form>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-8 text-sm">
            <button
              type="button"
              onClick={toggleForm}
              className="px-4 py-1.5 rounded-full border border-pink-300 text-pink-700 hover:bg-pink-100 transition-all duration-200 flex items-center gap-2"
            >
              <i className="fas fa-times text-sm"></i>
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-600 to-pink-600 text-white hover:opacity-90 transition-all duration-200 flex items-center gap-2"
            >
              <i className="fas fa-save text-sm"></i>
              <span>Save Profile</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
