export const BookingTravellerDetails = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h3 className="text-lg font-semibold text-orange-700">Traveller Details</h3>
        <span className="text-sm text-gray-500 mt-2 sm:mt-0">3 Travellers</span>
      </div>
      <p className="text-sm text-gray-600">Choose from the saved list or add a new passenger</p>

      {/* Alert Info */}
      <div className="flex items-start gap-3 bg-orange-50 border border-orange-200 text-orange-800 text-sm rounded-md p-4 mt-4">
        <i className="fas fa-id-card mt-0.5 text-orange-500"></i>
        <p>
          Please ensure that your name matches your government-issued ID such as <strong>Aadhaar</strong>, <strong>Passport</strong>, or <strong>Driver's License</strong> to avoid travel issues.
        </p>
      </div>

      {/* Saved Travellers */}
      <div className="border border-gray-200 bg-white/60 backdrop-blur-sm p-4 rounded-2xl mt-6">
        <label className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
          <i className="fas fa-user-check text-orange-500"></i>
          Saved Passengers
        </label>

        <div className="flex flex-wrap justify-between gap-2">
          {[
            { name: 'Mr. John Doe', info: '| 35 | M', value: 'john1' },
            { name: 'Ms. Jane Smith', info: '| 29 | F', value: 'jane1' },
            { name: 'Mr. Alex Ray', info: '| 42 | M', value: 'alex1' },
          ].map((traveller, index) => (
            <label
              key={index}
              className="flex items-center gap-3 p-2 bg-orange-50/40 border border-gray-100 rounded-lg cursor-pointer hover:border-orange-400 transition w-full sm:w-[32%]"
            >
              <input
                type="checkbox"
                name="savedTraveller"
                value={traveller.value}
                className="w-4 h-4 text-orange-500 border-gray-300 rounded-sm focus:ring-orange-500"
              />
              <p className="text-sm font-semibold text-gray-800">
                {traveller.name} <span className="text-gray-500 font-normal">{traveller.info}</span>
              </p>
            </label>
          ))}
        </div>
      </div>

      {/* New Traveller Form */}
      <div className="bg-orange-50/40 p-4 rounded-2xl mt-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-700">Adult 1</span>
          <button className="text-sm text-orange-600 hover:underline">Clear Details</button>
        </div>

        {/* Form Inputs */}
        <form className="space-y-4 text-sm">
          {/* Row 1: Title, First Name, Last Name */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Title */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Title</label>
              <div className="flex border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-orange-500 focus-within:bg-white">
                <select className="flex-1 bg-transparent text-gray-700 focus:outline-none text-sm">
                  <option>Mr</option>
                  <option>Ms</option>
                  <option>Mrs</option>
                  <option>Dr</option>
                </select>
              </div>
            </div>

            {/* First Name */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">First Name</label>
              <div className="flex border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-orange-500 focus-within:bg-white">
                <input
                  type="text"
                  placeholder="Enter First Name"
                  className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Last Name</label>
              <div className="flex border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-orange-500 focus-within:bg-white">
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Age, Gender, Category, Seat Preference */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Age */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Age</label>
              <div className="flex border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-orange-500 focus-within:bg-white">
                <input
                  type="number"
                  placeholder="Enter Age"
                  className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Gender</label>
              <div className="flex gap-4 border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-orange-500 focus-within:bg-white">
                <label className="flex items-center gap-2 text-gray-700">
                  <input type="radio" name="gender" value="male" className="text-orange-500" />
                  Male
                </label>
                <label className="flex items-center gap-2 text-gray-700">
                  <input type="radio" name="gender" value="female" className="text-orange-500" />
                  Female
                </label>
              </div>
            </div>

            {/* Category */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Category</label>
              <div className="flex border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-orange-500 focus-within:bg-white">
                <select className="flex-1 bg-transparent text-gray-700 focus:outline-none text-sm">
                  <option>Adult</option>
                  <option>Child</option>
                  <option>Infant</option>
                </select>
              </div>
            </div>

            {/* Seat Preference */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">Seat Preference</label>
              <div className="flex border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-orange-500 focus-within:bg-white">
                <select className="flex-1 bg-transparent text-gray-700 focus:outline-none text-sm">
                  <option value="">No Preference</option>
                  <option value="window">Window</option>
                  <option value="aisle">Aisle</option>
                  <option value="middle">Middle</option>
                  <option value="extra_legroom">Extra Legroom</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

