export const PassengerSummary = ({ booking }) => {
  if (!booking) return null;

  const passengers = booking.travellers || [];
  const contact = booking.contactDetails || {};
  const mobile = contact.mobileNumber || {};
  const email = contact.email || "N/A";

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-pink-100 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-pink-700">
          Passenger Details
        </h3>
        <div className="text-right text-sm flex items-center gap-2">
          <p className="text-gray-500">Not Correct ?</p>
          <button className="text-pink-700 hover:underline font-medium flex items-center gap-1 text-sm">
            <i className="fas fa-edit text-pink-700"></i> Edit Here
          </button>
        </div>
      </div>

      {/* Passenger Info Rows */}
      <div className="flex flex-col sm:flex-row justify-between items-start flex-wrap text-sm text-gray-800 font-medium gap-2">
        {/* Left: Mapped Passenger List */}
        <div className="flex flex-col gap-1">
          {passengers.map((p, index) => (
            <div key={index} className="flex items-center gap-2">
              <span>{index + 1}.</span>
              <span>
                {p.title} {p.firstName} {p.lastName}
              </span>
              <span>|</span>
              <span>{p.age}</span>
              <span>|</span>
              <span>{p.gender}</span>
            </div>
          ))}
        </div>

        {/* Right: Contact Details */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1">
            <i className="fas fa-phone-alt text-pink-700 w-4"></i>
            <span>
              +{mobile.countryCode || "91"} {mobile.number || "N/A"}
            </span>
          </div>
          <span>|</span>
          <div className="flex items-center gap-1">
            <i className="fas fa-envelope text-pink-700 w-4"></i>
            <span>{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
