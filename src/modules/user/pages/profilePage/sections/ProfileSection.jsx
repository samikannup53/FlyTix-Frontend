import { useState } from "react";

export const ProfileSection = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-orange-200 pb-4 mb-8">
        <h2 className="text-2xl font-bold text-pink-800 flex items-center gap-3">
          <span className="border-l-4 border-orange-600 pl-3">Your Profile</span>
          <i className="fas fa-user-shield text-orange-600 text-xl"></i>
        </h2>
        <div className="flex items-center gap-6 text-sm mt-4 sm:mt-0">
          <span className="flex items-center gap-2">
            <i className="fas fa-ticket-alt text-orange-700"></i>
            <span className="text-pink-700">Bookings:</span>
            <span className="bg-orange-100 text-orange-700 font-semibold px-2 py-0.5 rounded-full shadow-sm">5</span>
          </span>
          <span className="flex items-center gap-2">
            <i className="fas fa-times-circle text-pink-700"></i>
            <span className="text-pink-700">Cancelled:</span>
            <span className="bg-pink-100 text-pink-700 font-semibold px-2 py-0.5 rounded-full shadow-sm">1</span>
          </span>
        </div>
      </div>

      {/* Display Card */}
      {!showForm && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-3xl shadow-xl border border-pink-200 bg-white/70 backdrop-blur-md transition-all duration-300">
          {/* Avatar */}
          <div className="flex flex-col items-center text-center space-y-4 md:col-span-1">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/150?img=13"
                alt="User Avatar"
                className="w-32 h-32 rounded-full border-4 border-orange-300 shadow-md object-cover"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-pink-800">Arjun R</h2>
              <p className="text-sm text-gray-600">Frequent Flyer</p>
            </div>
            <button
              onClick={toggleForm}
              className="mt-2 px-4 py-2 rounded-full text-white font-medium bg-gradient-to-r from-orange-600 to-pink-600 hover:opacity-90 transition text-sm"
            >
              <i className="fas fa-user-edit mr-1"></i> Edit Profile
            </button>
          </div>

          {/* Personal Info */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-lg font-semibold text-pink-700 flex items-center gap-2">
              <i className="fas fa-user-circle text-pink-600"></i> Personal Info
            </h3>
            <ul className="text-gray-700 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <i className="fas fa-id-badge text-pink-500 w-5"></i>
                <span><strong>Name:</strong> Arjun R</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-birthday-cake text-pink-500 w-5"></i>
                <span><strong>Age:</strong> 28</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-venus-mars text-pink-500 w-5"></i>
                <span><strong>Gender:</strong> Male</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-lg font-semibold text-pink-700 flex items-center gap-2">
              <i className="fas fa-address-book text-pink-600"></i> Contact Info
            </h3>
            <ul className="text-gray-700 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <i className="fas fa-phone-alt text-pink-500 w-5"></i>
                <span><strong>Phone:</strong> +91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-envelope text-pink-500 w-5"></i>
                <span><strong>Email:</strong> arjunr@email.com</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Update Form */}
      {showForm && (
        <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-md border border-pink-200 rounded-3xl shadow-lg p-6 md:p-10 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-pink-800 flex items-center gap-3">
              <i className="fas fa-user-edit text-pink-600 text-xl"></i> Update Profile
            </h3>
            <p className="text-sm text-gray-500">Keep your details accurate for a smoother experience.</p>
          </div>

          <form className="flex flex-col md:flex-row gap-8 text-sm text-gray-800">
            {/* Left */}
            <div className="flex-1 space-y-5">
              <div className="flex flex-col">
                <label className="mb-1 text-pink-700 font-semibold">Full Name</label>
                <input
                  type="text"
                  placeholder="Arjun R"
                  className="px-4 py-2 rounded-xl border border-pink-300 bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-pink-700 font-semibold">Gender</label>
                <select className="px-4 py-2 rounded-xl border border-pink-300 bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Right */}
            <div className="flex-1 space-y-5">
              <div className="flex flex-col">
                <label className="mb-1 text-pink-700 font-semibold">Age</label>
                <input
                  type="number"
                  placeholder="28"
                  className="px-4 py-2 rounded-xl border border-pink-300 bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-pink-700 font-semibold">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
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
              type="submit"
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

