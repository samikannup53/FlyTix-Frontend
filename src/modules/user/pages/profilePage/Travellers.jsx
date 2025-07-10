import { useEffect, useState } from "react";
import { BookingFooter, UserHeader } from "../../components";
import { Assurance } from "./sections/Assurance";

export const Travellers = () => {
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
    let updatedForm = { ...formData, [name]: value };

    // Auto-update gender based on title
    if (name === "title") {
      if (value === "Mr") updatedForm.gender = "Male";
      else if (value === "Mrs" || value === "Miss")
        updatedForm.gender = "Female";
    }

    // Auto-update category based on age
    if (name === "age") {
      const ageNum = parseInt(value);
      if (!isNaN(ageNum)) {
        if (ageNum < 2) updatedForm.category = "Infant";
        else if (ageNum >= 2 && ageNum <= 12) updatedForm.category = "Child";
        else updatedForm.category = "Adult";
      }
    }

    setFormData(updatedForm);
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
    <>
      <UserHeader />
      <section className="bg-gradient-to-tr from-orange-50 via-pink-50 to-orange-50 min-h-screen py-10 px-4 flex flex-col items-center">
        <main className="w-full max-w-5xl mx-auto px-2 sm:px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-orange-200 pb-4 mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-pink-900 flex items-center gap-3">
              <span className="border-l-4 border-pink-600 pl-3">
                Saved Travellers
              </span>
              <i className="fas fa-users text-pink-600 text-2xl"></i>
            </h2>
            <div className="flex items-center gap-2 text-sm text-pink-600">
              <i className="fas fa-clock" />
              <span>Last Updated:</span>
              <span className="bg-pink-100 text-pink-700 font-medium px-3 py-1 rounded-full shadow">
                July 10, 2025
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Avatar Panel */}
            <div className="w-full lg:w-1/4 flex flex-col items-center space-y-4">
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-orange-600 via-pink-600 to-pink-700 border-4 border-orange-300 shadow-xl flex items-center justify-center">
                <i className="fas fa-users text-white text-5xl drop-shadow-sm" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-pink-800">
                  Your Travellers
                </h3>
                <p className="text-sm text-gray-600">Manage saved passengers</p>
              </div>
              <button
                onClick={toggleForm}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-600 to-pink-600 text-white font-semibold hover:scale-105 transition"
              >
                <i className="fas fa-user-plus mr-2" />
                {showForm ? "Cancel" : "Add Traveller"}
              </button>
            </div>

            {/* Right Content */}
            <div className="flex-1 flex flex-col bg-white/70 backdrop-blur-md border border-pink-200 rounded-3xl p-6 shadow-xl">
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

              {/* Info Note */}
              <div className="text-sm text-pink-800 bg-pink-50 border-l-4 border-pink-400 px-4 py-3 rounded mb-5">
                <i className="fas fa-info-circle mr-2" />
                Traveller details should match their government ID. Category is
                automatically selected based on age: Infant (0–2), Child (2–12),
                Adult (13+).
              </div>

              {!showForm ? (
                travellers.length === 0 ? (
                  <div className="text-center text-pink-700 text-lg py-12">
                    <i className="fas fa-user-slash text-4xl mb-3"></i>
                    <p>No travellers added yet.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {travellers.map((traveller) => (
                      <div
                        key={traveller._id}
                        className="flex justify-between items-center text-gray-700 py-3 px-4 rounded-2xl shadow-sm backdrop-blur-sm border border-pink-100 bg-white/80"
                      >
                        <div className="flex items-center gap-4">
                          <i className="fas fa-user-circle text-pink-700 text-2xl"></i>
                          <div>
                            <p className="font-semibold text-pink-700">
                              {traveller.title} {traveller.firstName}{" "}
                              {traveller.lastName}
                            </p>
                            <p className="text-sm">
                              Age: {traveller.age} | Gender: {traveller.gender}{" "}
                              | Category: {traveller.category}
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
                    ))}
                  </div>
                )
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm text-gray-800"
                >
                  {[
                    {
                      label: "Title",
                      name: "title",
                      type: "select",
                      options: ["Mr", "Mrs", "Miss"],
                    },
                    { label: "First Name", name: "firstName", type: "text" },
                    { label: "Last Name", name: "lastName", type: "text" },
                    { label: "Age", name: "age", type: "number" },
                    {
                      label: "Gender",
                      name: "gender",
                      type: "select",
                      options: ["Male", "Female", "Other"],
                    },
                    {
                      label: "Category",
                      name: "category",
                      type: "select",
                      options: ["Adult", "Child", "Infant"],
                    },
                  ].map((field) => (
                    <div key={field.name} className="flex flex-col">
                      <label className="font-semibold text-pink-700 mb-1">
                        {field.label}
                      </label>
                      {field.type === "select" ? (
                        <select
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className="px-4 py-2 rounded-md border border-pink-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                        >
                          <option value="">Select</option>
                          {field.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          placeholder={`Enter ${field.label}`}
                          className="px-4 py-2 rounded-md border border-pink-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                      )}
                    </div>
                  ))}

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
                      className="flex items-center gap-2 px-4 py-1.5 text-white text-sm font-medium rounded-full bg-gradient-to-r from-orange-700 to-pink-700 hover:opacity-90 transition"
                    >
                      <i className="fas fa-save"></i> Save Traveller
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </main>
        <Assurance />
      </section>
      <BookingFooter />
    </>
  );
};
