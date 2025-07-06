import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { useAuth } from "../../../../../shared/contexts/AuthContext";
import { toast } from "react-toastify";

export const BookingContactDetails = forwardRef((props, ref) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    mobileNumber: {
      code: "+91",
      number: "",
    },
    email: "",
  });

  // Pre-fill email/mobile if available from user
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || "",
        mobileNumber: {
          ...prev.mobileNumber,
          number: user.mobile || "", // adjust if it's user.number instead
        },
      }));
    }
  }, [user]);

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    validateAndSubmit: () => {
      const { number } = formData.mobileNumber;
      const { email } = formData;

      if (!number || number.length < 6 || !/^\d+$/.test(number)) {
        toast.error("Please enter a valid mobile number");
        return false;
      }

      if (!email || !email.includes("@") || !email.includes(".")) {
        toast.warning("Please enter a valid email address");
        return false;
      }

      return true;
    },

    getData: () => formData,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "code" || name === "number") {
      setFormData((prev) => ({
        ...prev,
        mobileNumber: {
          ...prev.mobileNumber,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      {/* Title Row */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-semibold text-pink-700">Contact Details</h3>
        <button
          type="button"
          onClick={() =>
            setFormData({ mobileNumber: { code: "+91", number: "" }, email: "" })
          }
          className="text-sm text-pink-700 hover:underline"
        >
          Clear Details
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Flight and Ticket details will be sent to the following:
      </p>

      {/* Form */}
      <form className="text-sm">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Country Code + Mobile Number */}
          <div className="w-full sm:w-1/2 flex gap-4">
            {/* Country Code */}
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
                Country Code
              </label>
              <div className="flex border border-gray-300 rounded-lg bg-pink-50 px-3 py-2 focus-within:border-pink-500 focus-within:bg-white">
                <select
                  name="code"
                  value={formData.mobileNumber.code}
                  onChange={handleChange}
                  className="flex-1 bg-transparent text-gray-700 focus:outline-none text-sm"
                >
                  <option value="+91">+91 (IN)</option>
                  <option value="+1">+1 (US)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+61">+61 (AU)</option>
                </select>
              </div>
            </div>

            {/* Mobile Number */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
                Mobile Number
              </label>
              <div className="flex border border-gray-300 rounded-lg bg-pink-50 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
                <input
                  type="text"
                  name="number"
                  value={formData.mobileNumber.number}
                  onChange={handleChange}
                  maxLength={10}
                  placeholder="Enter Mobile Number"
                  className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Email Address */}
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium text-gray-800 mb-1 ml-1">
              Email Address
            </label>
            <div className="flex border border-gray-300 rounded-lg bg-pink-50 px-4 py-2 focus-within:border-pink-500 focus-within:bg-white">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email Address"
                className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
});
