export const PassengerInfo = () => {
  return (
    <div className="md:w-1/2 border border-orange-100 rounded-xl p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-semibold text-gray-700">Traveller Details</h4>
        <span className="text-sm font-medium text-gray-500">2 Travellers</span>
      </div>

      {/* Body */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Left: Passenger List */}
        <div className="flex flex-col text-sm text-gray-800 space-y-2">
          {/* Passenger 1 */}
          <div className="flex flex-wrap items-center gap-2">
            <span>1.</span>
            <span>Mr. Arjun R</span>
            <span>|</span>
            <span>28</span>
            <span>|</span>
            <span>M</span>
            <span>|</span>
            <span
              className="material-symbols-outlined text-orange-500"
              title="Seat Preference"
            >
              airline_seat_recline_extra
            </span>
            <span>Window</span>
          </div>

          {/* Passenger 2 */}
          <div className="flex flex-wrap items-center gap-2">
            <span>2.</span>
            <span>Ms. Sneha M</span>
            <span>|</span>
            <span>26</span>
            <span>|</span>
            <span>F</span>
            <span>|</span>
            <span
              className="material-symbols-outlined text-orange-500"
              title="Seat Preference"
            >
              airline_seat_recline_extra
            </span>
            <span>Aisle</span>
          </div>
        </div>

        {/* Right: Contact Info */}
        <div className="flex flex-col items-end text-sm text-gray-800 ml-auto">
          <div className="flex items-center gap-1">
            <i className="fas fa-phone-alt text-orange-500"></i>
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-1">
            <i className="fas fa-envelope text-orange-500"></i>
            <span>arjunr@email.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

