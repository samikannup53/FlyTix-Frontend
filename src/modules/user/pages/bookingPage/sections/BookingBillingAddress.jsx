import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

export const BookingBillingAddress = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    pincode: "",
    addressLine1: "",
    city: "",
    state: "",
    country: "",
  });

  const [loadingLocation, setLoadingLocation] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict pincode to digits only
    if (name === "pincode") {
      const numeric = value.replace(/\D/g, "");
      if (numeric.length > 6) return;
      setFormData((prev) => ({ ...prev, [name]: numeric }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Fetch city/state/country from pincode
  useEffect(() => {
    const fetchLocationDetails = async () => {
      if (formData.pincode.length !== 6) return;

      setLoadingLocation(true);
      try {
        const res = await fetch(
          `https://api.postalpincode.in/pincode/${formData.pincode}`
        );
        const data = await res.json();

        const postOffice = data[0]?.PostOffice?.[0];

        if (data[0]?.Status === "Success" && postOffice) {
          setFormData((prev) => ({
            ...prev,
            city: postOffice.District || "",
            state: postOffice.State || "",
            country: postOffice.Country || "India",
          }));
        }
      } catch (error) {
        console.error("Error fetching pincode info:", error);
      } finally {
        setLoadingLocation(false);
      }
    };

    fetchLocationDetails();
  }, [formData.pincode]);

  // Expose to parent
  useImperativeHandle(ref, () => ({
    validateAndSubmit: () => {
      const { pincode, addressLine1, city, state, country } = formData;
      if (!pincode || !addressLine1 || !city || !state || !country) {
        alert("Please fill all billing address fields.");
        return false;
      }
      return true;
    },
    getData: () => formData,
  }));

  const handleClear = () => {
    setFormData({
      pincode: "",
      addressLine1: "",
      city: "",
      state: "",
      country: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-semibold text-pink-700">Billing Address</h3>
        <button
          type="button"
          onClick={handleClear}
          className="text-sm text-pink-700 hover:underline"
        >
          Clear Details
        </button>
      </div>

      {/* Info Alert */}
      <div className="flex items-start gap-3 bg-orange-50 border border-pink-200 text-pink-800 text-sm rounded-md p-4 mt-4">
        <i className="fas fa-id-card mt-0.5 text-pink-700"></i>
        <p>
          As per <strong>government regulations</strong>, it is mandatory to
          provide a valid address that matches your official ID (like Aadhaar,
          Passport, or Driver's License) to ensure a smooth travel experience.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4 text-sm mt-4">
        {/* Row 1: Pincode + Address Line 1 */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Pincode */}
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
              Pincode
            </label>
            <div className="relative flex border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter Pincode"
                className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
              />
              {loadingLocation && (
                <div className="absolute top-2 right-2">
                  <i className="fas fa-spinner fa-spin text-pink-600 text-sm"></i>
                </div>
              )}
            </div>
          </div>

          {/* Address Line 1 */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
              Address (Door No. & Street Name)
            </label>
            <div className="flex border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                placeholder="e.g. 12B, MG Road"
                className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Row 2: City, State, Country */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* City */}
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
              City
            </label>
            <div className="flex border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
              <input
                type="text"
                name="city"
                readOnly
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter City"
                className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* State */}
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
              State
            </label>
            <div className="flex border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
              <input
                type="text"
                name="state"
                readOnly
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter State"
                className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* Country */}
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
              Country
            </label>
            <div className="flex border border-gray-300 rounded-lg bg-white/70 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
              <input
                type="text"
                name="country"
                readOnly
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter Country"
                className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
});
