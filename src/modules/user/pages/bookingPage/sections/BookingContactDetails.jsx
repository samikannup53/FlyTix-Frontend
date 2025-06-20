export const BookingContactDetails = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      {/* Title Row */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-semibold text-orange-700">Contact Details</h3>
        <button className="text-sm text-orange-600 hover:underline">Clear Details</button>
      </div>

      {/* Subtext */}
      <p className="text-sm text-gray-600 mb-4">
        Flight and Ticket details will be sent to the following:
      </p>

      {/* Form */}
      <form className="text-sm">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Left Side: Country Code + Mobile Number */}
          <div className="w-full sm:w-1/2 flex gap-4">
            {/* Country Code */}
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Country Code</label>
              <div className="flex border border-gray-300 rounded-lg bg-white/70 px-3 py-2 focus-within:border-orange-500 focus-within:bg-white">
                <select className="flex-1 bg-transparent text-gray-700 focus:outline-none text-sm">
                  <option value="+91">+91 (IN)</option>
                  <option value="+1">+1 (US)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+61">+61 (AU)</option>
                  {/* Add more if needed */}
                </select>
              </div>
            </div>

            {/* Mobile Number */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Mobile Number</label>
              <div className="flex border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-orange-500 focus-within:bg-white">
                <input
                  type="text"
                  placeholder="Enter Mobile Number"
                  className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Email Address */}
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Email Address</label>
            <div className="flex border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-orange-500 focus-within:bg-white">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

