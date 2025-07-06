import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const BookingTravellerDetails = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const adults = parseInt(searchParams.get("adults") || "1", 10);
  const children = parseInt(searchParams.get("children") || "0", 10);
  const infants = parseInt(searchParams.get("infants") || "0", 10);

  const totalTravellers = [
    ...Array(adults).fill("Adult"),
    ...Array(children).fill("Child"),
    ...Array(infants).fill("Infant"),
  ];

  const [savedTravellers, setSavedTravellers] = useState([]);
  const [formData, setFormData] = useState(
    totalTravellers.map((category) => ({
      title: "",
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      category,
      seatPreference: "",
    }))
  );

  // Fetch saved passengers from backend
  useEffect(() => {
    const fetchTravellers = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/user/travellers", {
          credentials: "include",
        });
        const data = await res.json();

        const travellersArray = Array.isArray(data)
          ? data
          : Array.isArray(data.travellers)
          ? data.travellers
          : [];

        setSavedTravellers(travellersArray);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load saved travellers");
        setSavedTravellers([]);
      }
    };

    fetchTravellers();
  }, []);

  // Handle input changes
  const handleChange = (index, field, value) => {
    const updated = [...formData];
    updated[index][field] = value;
    setFormData(updated);
  };

  // Fill form from saved passenger
  const fillFromSaved = (saved) => {
    const firstEmptyIndex = formData.findIndex(
      (f) => f.firstName === "" && f.category === saved.category
    );

    if (firstEmptyIndex !== -1) {
      const updated = [...formData];
      updated[firstEmptyIndex] = {
        ...updated[firstEmptyIndex],
        title: saved.title,
        firstName: saved.firstName,
        lastName: saved.lastName,
        age: saved.age.toString(),
        gender: saved.gender.toLowerCase(),
      };
      setFormData(updated);
    } else {
      toast.info(`No empty slot for ${saved.category}`);
    }
  };

  // Clear a single form section
  const clearDetails = (index) => {
    const updated = [...formData];
    updated[index] = {
      ...updated[index],
      title: "",
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      seatPreference: "",
    };
    setFormData(updated);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h3 className="text-lg font-semibold text-pink-700">
          Traveller Details
        </h3>
        <span className="text-sm text-gray-500 mt-2 sm:mt-0">
          {formData.length} Travellers
        </span>
      </div>
      <p className="text-sm text-gray-600">
        Choose from the saved list or add a new passenger
      </p>

      {/* Alert Info */}
      <div className="flex items-start gap-3 bg-pink-50 border border-pink-200 text-pink-800 text-sm rounded-md p-4 mt-4">
        <i className="fas fa-id-card mt-0.5 text-pink-700"></i>
        <p>
          Please ensure that your name matches your government-issued ID such as{" "}
          <strong>Aadhaar</strong>, <strong>Passport</strong>, or{" "}
          <strong>Driver's License</strong> to avoid travel issues.
        </p>
      </div>

      {/* Saved Travellers */}
      <div className="border border-pink-100 bg-white/60 backdrop-blur-sm p-4 rounded-2xl mt-6">
        <label className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
          <i className="fas fa-user-check text-pink-700"></i>
          Saved Passengers
        </label>

        <div className="flex flex-wrap justify-between gap-2">
          {savedTravellers.length === 0 ? (
            <p className="text-gray-500 text-sm">No saved passengers found.</p>
          ) : (
            savedTravellers.map((traveller, index) => (
              <label
                key={index}
                className="flex items-center gap-3 p-2 bg-orange-50/40 border border-gray-100 rounded-lg cursor-pointer hover:border-pink-600 transition w-full sm:w-[32%]"
              >
                <input
                  type="checkbox"
                  onChange={() => fillFromSaved(traveller)}
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded-sm focus:ring-orange-500"
                />
                <p className="text-sm font-semibold text-gray-800">
                  {traveller.title}. {traveller.firstName} {traveller.lastName}{" "}
                  <span className="text-gray-500 font-normal">
                    | {traveller.age} | {traveller.gender}
                  </span>
                </p>
              </label>
            ))
          )}
        </div>
      </div>

      {/* Dynamic Traveller Forms */}
      <div className="mt-6 space-y-6">
        {formData.map((traveller, index) => (
          <div
            key={index}
            className="bg-pink-50/40 p-4 rounded-2xl border border-pink-200"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-700">
                {traveller.category} {index + 1}
              </span>
              <button
                className="text-sm text-pink-700 cursor-pointer hover:underline"
                onClick={() => clearDetails(index)}
              >
                Clear Details
              </button>
            </div>

            {/* Form */}
            <form className="space-y-4 text-sm">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Title */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
                    Title
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg bg-white/70 px-4 py-2"
                    value={traveller.title}
                    onChange={(e) =>
                      handleChange(index, "title", e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    <option>Mr</option>
                    <option>Ms</option>
                    <option>Mrs</option>
                    <option>Dr</option>
                  </select>
                </div>

                {/* First Name */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
                    First Name
                  </label>
                  <div className="flex border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                      value={traveller.firstName}
                      onChange={(e) =>
                        handleChange(index, "firstName", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
                    Last Name
                  </label>
                  <div className="flex border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                      value={traveller.lastName}
                      onChange={(e) =>
                        handleChange(index, "lastName", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                {/* Age */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
                    Age
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Age"
                    className="w-full border border-gray-300 rounded-lg bg-white/70 px-4 py-2"
                    value={traveller.age}
                    onChange={(e) => handleChange(index, "age", e.target.value)}
                  />
                </div>

                {/* Gender */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
                    Gender
                  </label>
                  <div className="flex gap-4 border border-gray-300 rounded-lg bg-white/70 px-4 py-2">
                    <label className="flex items-center gap-2 text-gray-700">
                      <input
                        type="radio"
                        name={`gender-${index}`}
                        value="male"
                        checked={traveller.gender === "male"}
                        onChange={() => handleChange(index, "gender", "male")}
                      />
                      Male
                    </label>
                    <label className="flex items-center gap-2 text-gray-700">
                      <input
                        type="radio"
                        name={`gender-${index}`}
                        value="female"
                        checked={traveller.gender === "female"}
                        onChange={() => handleChange(index, "gender", "female")}
                      />
                      Female
                    </label>
                  </div>
                </div>

                {/* Category (read-only dropdown for consistency) */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
                    Category
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg bg-white/70 px-4 py-2"
                    value={traveller.category}
                    disabled
                  >
                    <option>Adult</option>
                    <option>Child</option>
                    <option>Infant</option>
                  </select>
                </div>

                {/* Seat Preference */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
                    Seat Preference
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg bg-white/70 px-4 py-2"
                    value={traveller.seatPreference}
                    onChange={(e) =>
                      handleChange(index, "seatPreference", e.target.value)
                    }
                  >
                    <option value="">No Preference</option>
                    <option value="window">Window</option>
                    <option value="aisle">Aisle</option>
                    <option value="middle">Middle</option>
                    <option value="extra_legroom">Extra Legroom</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};
