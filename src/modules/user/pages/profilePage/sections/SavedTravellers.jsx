import { useState } from "react";

export const SavedTravellers = () => {
  const [showForm, setShowForm] = useState(false);

  // Sample static traveller list — replace with state if dynamic later
  const travellers = [
    { name: "Priya Sharma", age: 26, gender: "Female" }
  ];

  const toggleForm = () => setShowForm(prev => !prev);

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-orange-200 pb-3 mb-6">
        <h2 className="text-xl font-semibold text-pink-800 flex items-center border-l-4 border-orange-600 pl-3">
          Saved Travellers
          <i className="fas fa-angle-right text-orange-600 text-2xl ml-2"></i>
        </h2>

        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <i className="fas fa-users text-orange-700"></i>
            <span className="text-pink-700">Total:</span>
            <span className="bg-orange-100 text-orange-700 font-semibold px-2 py-0.5 rounded-full shadow-sm">
              {travellers.length}
            </span>
          </span>

          <button
            onClick={toggleForm}
            className="flex items-center gap-2 px-4 py-1.5 text-white text-sm font-medium rounded-full bg-gradient-to-r from-orange-800 to-pink-800 hover:opacity-90 transition"
          >
            <i className="fas fa-user-plus"></i> Add Traveller
          </button>
        </div>
      </div>

      {/* Travellers List */}
      {!showForm && (
        <div className="max-w-5xl mx-auto mt-6 flex flex-col gap-4 p-6 rounded-2xl shadow-md backdrop-blur-sm border border-pink-100 bg-white/70">
          {travellers.map((traveller, index) => (
            <div key={index} className="flex justify-between items-center text-gray-700">
              <div className="flex items-center gap-4">
                <i className="fas fa-user-circle text-pink-600 text-2xl"></i>
                <div>
                  <p className="font-semibold text-pink-700">Name: {traveller.name}</p>
                  <p>Age: {traveller.age} &nbsp; | &nbsp; Gender: {traveller.gender}</p>
                </div>
              </div>
              <button className="text-red-600 hover:text-red-800 transition">
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Traveller Form */}
      {showForm && (
        <div className="max-w-5xl mx-auto mt-6 bg-white/70 backdrop-blur-sm border border-pink-100 rounded-2xl shadow-md p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-pink-700 flex items-center gap-2">
              <i className="fas fa-user-plus"></i> Add New Traveller
            </h3>
            <span className="text-sm text-gray-500">Fill traveller info carefully</span>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-gray-800">
            <div className="flex flex-col">
              <label className="font-semibold text-pink-700 mb-1">Full Name</label>
              <input type="text" placeholder="Enter Full Name" className="px-4 py-2 rounded-md border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 shadow-sm" />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-pink-700 mb-1">Age</label>
              <input type="number" placeholder="Enter Age" className="px-4 py-2 rounded-md border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 shadow-sm" />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="font-semibold text-pink-700 mb-1">Gender</label>
              <select className="px-4 py-2 rounded-md border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 shadow-sm">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </form>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={toggleForm}
              className="inline-flex items-center gap-2 px-5 py-2 text-pink-800 font-medium rounded-full border border-pink-300 hover:bg-pink-100 transition"
            >
              <i className="fas fa-times"></i> Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 text-white font-medium rounded-full bg-gradient-to-r from-orange-800 to-pink-800 hover:opacity-90 transition"
            >
              <i className="fas fa-save"></i> Save Traveller
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

