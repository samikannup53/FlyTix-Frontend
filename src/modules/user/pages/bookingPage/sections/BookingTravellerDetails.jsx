import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { toast } from "react-toastify";

export const BookingTravellerDetails = forwardRef(({ flight }, ref) => {
  const [savedTravellers, setSavedTravellers] = useState([]);
  const [formData, setFormData] = useState([]);
  const [openFormIndexes, setOpenFormIndexes] = useState([0]);
  const [selectedSaved, setSelectedSaved] = useState([]);

  useEffect(() => {
    const { adults = 1, children = 0, infants = 0 } = flight?.passengers || {};
    const totalTravellers = [
      ...Array(adults).fill("Adult"),
      ...Array(children).fill("Child"),
      ...Array(infants).fill("Infant"),
    ];

    const forms = totalTravellers.map((category) => ({
      title: "",
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      seatPreference: "",
      category,
    }));

    setFormData(forms);
    setOpenFormIndexes(forms.length > 0 ? [0] : []);
  }, [flight?.passengers]);

  useEffect(() => {
    const fetchTravellers = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/user/travellers", {
          credentials: "include",
        });
        const data = await res.json();
        setSavedTravellers(
          Array.isArray(data.travellers) ? data.travellers : []
        );
      } catch (err) {
        console.error(err);
        toast.error("Failed to load saved travellers");
      }
    };
    fetchTravellers();
  }, []);

  const getCategoryFromAge = (age) => {
    if (age < 2) return "Infant";
    if (age <= 12) return "Child";
    return "Adult";
  };

  const badgeColor = (category) => {
    return category === "Adult"
      ? "bg-green-100 text-green-700"
      : category === "Child"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-blue-100 text-blue-700";
  };

  const handleChange = (index, field, value) => {
    const updated = [...formData];
    updated[index][field] = value;
    setFormData(updated);

    if (
      validateTraveller(updated[index]) &&
      !openFormIndexes.includes(index + 1)
    ) {
      setOpenFormIndexes([...openFormIndexes, index + 1]);
    }
  };

  const validateTraveller = (traveller) => {
    if (!traveller.title || !traveller.firstName || !traveller.lastName)
      return false;
    const age = parseInt(traveller.age);
    return (
      age >= 1 && age <= 120 && ["male", "female"].includes(traveller.gender)
    );
  };

  const toggleForm = (index) => {
    if (openFormIndexes.includes(index)) {
      setOpenFormIndexes(openFormIndexes.filter((i) => i !== index));
    } else {
      const prevIndex = Math.max(index - 1, 0);
      if (index === 0 || validateTraveller(formData[prevIndex])) {
        setOpenFormIndexes([...openFormIndexes, index]);
      } else {
        toast.warning("Please try by Competing the Previous Traveller Details");
      }
    }
  };

  const toggleSavedTraveller = (traveller) => {
    const alreadySelected = selectedSaved.some((t) => t._id === traveller._id);
    const category = getCategoryFromAge(traveller.age);

    if (alreadySelected) {
      const updated = [...formData];
      const indexToClear = updated.findIndex(
        (t) =>
          t.firstName === traveller.firstName &&
          t.lastName === traveller.lastName
      );
      if (indexToClear !== -1) {
        updated[indexToClear] = {
          ...updated[indexToClear],
          title: "",
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
          seatPreference: "",
        };
      }
      setFormData(updated);
      setSelectedSaved(selectedSaved.filter((t) => t._id !== traveller._id));
    } else {
      const firstEmptyIndex = formData.findIndex(
        (f) => !f.firstName && f.category === category
      );
      if (firstEmptyIndex !== -1) {
        const updated = [...formData];
        updated[firstEmptyIndex] = {
          ...updated[firstEmptyIndex],
          title: traveller.title,
          firstName: traveller.firstName,
          lastName: traveller.lastName,
          age: traveller.age.toString(),
          gender: traveller.gender.toLowerCase(),
        };
        setFormData(updated);
        setSelectedSaved([...selectedSaved, { ...traveller, category }]);

        if (!openFormIndexes.includes(firstEmptyIndex + 1)) {
          setOpenFormIndexes([...openFormIndexes, firstEmptyIndex + 1]);
        }
      } else {
        toast.info(`No empty slot for ${category}`);
      }
    }
  };

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

  useImperativeHandle(ref, () => ({
    validateAndSubmit: () => {
      const allValid = formData.every(validateTraveller);
      if (!allValid)
        toast.warning("Missing Required Fields in Traveller Details");
      return allValid;
    },
    getData: () => formData,
  }));

  const getCategoryCount = (category, index) => {
    return formData.slice(0, index + 1).filter((f) => f.category === category)
      .length;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h3 className="text-lg font-semibold text-pink-700">
          Traveller Details
        </h3>
        <span className="text-sm text-gray-500 mt-2 sm:mt-0">
          {(() => {
            const {
              adults = 0,
              children = 0,
              infants = 0,
            } = flight?.passengers || {};
            const total = adults + children + infants;
            return `${total} ${total === 1 ? "Traveller" : "Travellers"}`;
          })()}
        </span>
      </div>

      <p className="text-sm text-gray-600 mt-1">
        Choose from the saved list or add a new passenger
      </p>
      <div className="bg-pink-50 border border-pink-200 rounded-md p-4 mt-4 text-sm text-pink-800">
        <i className="fas fa-id-card mr-2 text-pink-700" />
        Please ensure that your name matches your government-issued ID.
      </div>

      {/* Saved Travellers */}
      <div className="mt-6 border border-pink-100 p-4 rounded-xl">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-3">
          <i className="fas fa-user-check text-pink-700" /> Saved Passengers
        </label>
        <div className="flex flex-wrap gap-3">
          {savedTravellers.length === 0 ? (
            <p className="text-gray-500 text-sm">No saved passengers found.</p>
          ) : (
            savedTravellers.map((t) => {
              const category = getCategoryFromAge(t.age);
              return (
                <label
                  key={t._id}
                  className="flex items-center gap-3 p-2 border border-gray-200 rounded-lg w-full sm:w-[32%] bg-orange-50/40 hover:border-pink-600 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedSaved.some((s) => s._id === t._id)}
                    onChange={() => toggleSavedTraveller(t)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">
                      {t.title}. {t.firstName} {t.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t.age} yrs • {t.gender}
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block font-medium ${badgeColor(
                        category
                      )}`}
                    >
                      {category}
                    </span>
                  </div>
                </label>
              );
            })
          )}
        </div>
      </div>

      {/* Traveller Forms */}
      <div className="mt-6 space-y-6">
        {formData.map((traveller, index) => {
          const serial = getCategoryCount(traveller.category, index);
          const isOpen = openFormIndexes.includes(index);

          return (
            <div
              key={index}
              className="border border-pink-200 rounded-2xl p-4 bg-pink-50/40"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="text-sm font-medium text-gray-700">
                  {traveller.category} {serial}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="text-sm text-pink-700 hover:underline"
                    onClick={() => clearDetails(index)}
                  >
                    Clear Details
                  </button>
                  <button onClick={() => toggleForm(index)}>
                    <i
                      className={`fas fa-chevron-${
                        isOpen ? "up" : "down"
                      } text-pink-700`}
                    />
                  </button>
                </div>
              </div>

              {isOpen && (
                <form className="space-y-4 text-sm">
                  {/* Title, First Name, Last Name */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="text-sm font-medium">Title</label>
                      <select
                        className="w-full border rounded-lg px-4 py-2 bg-white/70"
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
                    <div className="flex-1">
                      <label className="text-sm font-medium">First Name</label>
                      <input
                        type="text"
                        className="w-full border rounded-lg px-4 py-2 bg-white/70"
                        value={traveller.firstName}
                        onChange={(e) =>
                          handleChange(index, "firstName", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm font-medium">Last Name</label>
                      <input
                        type="text"
                        className="w-full border rounded-lg px-4 py-2 bg-white/70"
                        value={traveller.lastName}
                        onChange={(e) =>
                          handleChange(index, "lastName", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Age, Gender, Seat Preference */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="text-sm font-medium">Age</label>
                      <input
                        type="number"
                        className="w-full border rounded-lg px-4 py-2 bg-white/70"
                        value={traveller.age}
                        onChange={(e) =>
                          handleChange(index, "age", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm font-medium">Gender</label>
                      <div className="flex gap-4 border rounded-lg px-4 py-2 bg-white/70">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`gender-${index}`}
                            value="male"
                            checked={traveller.gender === "male"}
                            onChange={() =>
                              handleChange(index, "gender", "male")
                            }
                          />
                          Male
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`gender-${index}`}
                            value="female"
                            checked={traveller.gender === "female"}
                            onChange={() =>
                              handleChange(index, "gender", "female")
                            }
                          />
                          Female
                        </label>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="text-sm font-medium">
                        Seat Preference
                      </label>
                      <select
                        className="w-full border rounded-lg px-4 py-2 bg-white/70"
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
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});
