export const PassengerDetails = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100 space-y-3">
      {/* Title Row */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-800">Passenger</h3>
        <span className="text-sm text-gray-500">1 Adult</span>
      </div>

      {/* Passenger Info */}
      <div className="flex flex-col sm:flex-row justify-between flex-wrap text-sm text-gray-800 font-medium gap-2">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          <span>Mr. Arjun R</span>
          <span>|</span>
          <span>28</span>
          <span>|</span>
          <span>Male</span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1">
            <i className="fas fa-phone-alt text-orange-500 w-4"></i>
            <span>+91 98765 43210</span>
          </div>
          <span>|</span>
          <div className="flex items-center gap-1">
            <i className="fas fa-envelope text-orange-500 w-4"></i>
            <span>arjunr@email.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

