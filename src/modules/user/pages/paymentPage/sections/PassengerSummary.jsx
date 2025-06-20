export const PassengerSummary = () => {
  // Static sample passenger list (can be replaced later with dynamic data)
  const passengers = [
    { title: "Mr.", name: "Arjun R", age: 28, gender: "Male" },
    { title: "Ms.", name: "Priya S", age: 26, gender: "Female" },
    { title: "Mrs.", name: "Kavitha R", age: 54, gender: "Female" },
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-800">Passenger Details</h3>
        <div className="text-right text-sm flex items-center gap-2">
          <p className="text-gray-500">Not Correct ?</p>
          <button className="text-orange-600 hover:underline font-medium flex items-center gap-1 text-sm">
            <i className="fas fa-edit text-orange-500"></i> Edit Here
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
              <span>{p.title} {p.name}</span>
              <span>|</span>
              <span>{p.age}</span>
              <span>|</span>
              <span>{p.gender}</span>
            </div>
          ))}
        </div>

        {/* Right: Static Contact Details */}
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

