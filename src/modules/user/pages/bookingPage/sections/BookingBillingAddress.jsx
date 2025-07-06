export const BookingBillingAddress = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-semibold text-pink-700">Billing Address</h3>
        <button className="text-sm text-pink-700 hover:underline">Clear Details</button>
      </div>

      {/* Info Alert */}
      <div className="flex items-start gap-3 bg-orange-50 border border-pink-200 text-pink-800 text-sm rounded-md p-4 mt-4">
        <i className="fas fa-id-card mt-0.5 text-pink-700"></i>
        <p>
          As per <strong>government regulations</strong>, it is mandatory to provide a valid address that matches your official ID (like Aadhaar, Passport, or Driver's License) to ensure a smooth travel experience.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4 text-sm mt-4">
        {/* Row 1: Pincode + Address Line 1 */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Pincode */}
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Pincode</label>
            <div className="flex border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
              <input
                type="text"
                placeholder="Enter Pincode"
                className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* Address Line 1 */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Address (Door No. & Street Name)</label>
            <div className="flex border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
              <input
                type="text"
                placeholder="e.g. 12B, MG Road"
                className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Row 2: City, State, Country */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* City */}
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">City</label>
            <div className="flex border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
              <input
                type="text"
                placeholder="Enter City"
                className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* State */}
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">State</label>
            <div className="flex border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
              <input
                type="text"
                placeholder="Enter State"
                className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* Country */}
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Country</label>
            <div className="flex border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
              <input
                type="text"
                placeholder="Enter Country"
                className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

