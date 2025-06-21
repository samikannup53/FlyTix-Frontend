export const ChangePassword = () => {
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
        <form className="space-y-5 text-sm text-gray-800 max-w-xl">
          {/* Current Password */}
          <div className="flex flex-col">
            <label className="text-pink-700 font-semibold mb-1">Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              className="px-4 py-2 rounded-md border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white shadow-sm"
            />
          </div>

          {/* New Password */}
          <div className="flex flex-col">
            <label className="text-pink-700 font-semibold mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="px-4 py-2 rounded-md border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white shadow-sm"
            />
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col">
            <label className="text-pink-700 font-semibold mb-1">Confirm New Password</label>
            <input
              type="password"
              placeholder="Re-enter new password"
              className="px-4 py-2 rounded-md border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-1">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-orange-700 to-pink-700"
            >
              <i className="fas fa-lock-open"></i> Update Password
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

