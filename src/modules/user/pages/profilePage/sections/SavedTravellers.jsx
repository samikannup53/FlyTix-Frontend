import { useEffect, useState } from "react";

export const SavedTravellers = () => {
  const [travellers, setTravellers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    category: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleForm = () => setShowForm((prev) => !prev);

  const fetchTravellers = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/user/travellers", {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Failed to fetch travellers");
      setTravellers(Array.isArray(data.travellers) ? data.travellers : []);
    } catch (err) {
      setError(err.message);
      setTravellers([]);
    }
  };

  useEffect(() => {
    fetchTravellers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:8000/api/user/travellers", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Traveller creation failed");
      setSuccess("Traveller added successfully!");
      setFormData({
        title: "",
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        category: "",
      });
      setShowForm(false);
      fetchTravellers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/user/travellers/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Delete failed");
      fetchTravellers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-orange-200 pb-3 mb-6">
        <h2 className="text-xl font-semibold text-pink-800 flex items-center border-l-4 border-pink-700 pl-3">
          Saved Travellers
          <i className="fas fa-angle-right text-pink-700 text-2xl ml-2"></i>
        </h2>

        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <i className="fas fa-users text-pink-700"></i>
            <span className="text-pink-700">Total:</span>
            <span className="bg-pink-100 text-pink-700 font-semibold px-2 py-0.5 rounded-full shadow-sm">
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

      {/* Error / Success */}
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm mb-4 border border-red-300">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm mb-4 border border-green-300">
          {success}
        </div>
      )}

      {/* Travellers List */}
      {!showForm && (
        <div className="max-w-5xl mx-auto mt-6 flex flex-col gap-4 p-6 rounded-2xl shadow-md backdrop-blur-sm border border-pink-100 bg-white/70">
          {travellers.length === 0 ? (
            <div className="text-center text-pink-700 text-lg py-12">
              <i className="fas fa-user-slash text-4xl mb-3"></i>
              <p>No travellers added yet.</p>
            </div>
          ) : (
            travellers.map((traveller) => (
              <div
                key={traveller._id}
                className="flex justify-between items-center text-gray-700"
              >
                <div className="flex items-center gap-4">
                  <i className="fas fa-user-circle text-pink-700 text-2xl"></i>
                  <div>
                    <p className="font-semibold text-pink-700">
                      {traveller.title} {traveller.firstName}{" "}
                      {traveller.lastName}
                    </p>
                    <p>
                      Age: {traveller.age} &nbsp; | &nbsp; Gender:{" "}
                      {traveller.gender} &nbsp; | &nbsp; Category:{" "}
                      {traveller.category}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(traveller._id)}
                  className="text-red-700 hover:text-red-800 transition"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add Traveller Form */}
      {showForm && (
        <div className="max-w-5xl mx-auto mt-6 bg-white/70 backdrop-blur-sm border border-pink-100 rounded-2xl shadow-md p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-pink-700 flex items-center gap-2">
              <i className="fas fa-user-plus"></i> Add New Traveller
            </h3>
            <span className="text-sm text-gray-500">
              Fill traveller info carefully
            </span>
          </div>

          <form
            className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm text-gray-800"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <label className="font-semibold text-pink-700 mb-1">Title</label>
              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="px-4 py-2 rounded-md border border-pink-200 bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option value="">Select</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-pink-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
                className="px-4 py-2 rounded-md border border-pink-200 bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-pink-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
                className="px-4 py-2 rounded-md border border-pink-200 bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-pink-700 mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter Age"
                className="px-4 py-2 rounded-md border border-pink-200 bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-pink-700 mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="px-4 py-2 rounded-md border border-pink-200 bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-pink-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="px-4 py-2 rounded-md border border-pink-200 bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option value="">Select</option>
                <option value="Adult">Adult</option>
                <option value="Child">Child</option>
                <option value="Infant">Infant</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="md:col-span-3 flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={toggleForm}
                className="inline-flex items-center gap-2 px-5 py-1 text-sm text-pink-800 font-medium rounded-full border border-pink-300 hover:bg-pink-100 transition"
              >
                <i className="fas fa-times"></i> Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-1.5 text-white text-sm font-medium rounded-full bg-gradient-to-r from-orange-800 to-pink-800 hover:opacity-90 transition"
              >
                <i className="fas fa-save"></i> Save Traveller
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};
