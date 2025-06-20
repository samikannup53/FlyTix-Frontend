import razorpayLogo from '../../../../../assets/images/razorpay.png'; // adjust path if needed

export const FareSummary = () => {
  return (
    <div className="w-full md:w-[320px] space-y-5 sticky top-[64px]">

      {/* Fare Summary Card */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100 space-y-3 text-sm text-gray-700">
        <h3 className="text-base font-semibold text-gray-700 mb-2">Fare Summary</h3>
        <div className="flex justify-between">
          <span>Base Fare</span>
          <span>₹3,000</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes & Surcharges</span>
          <span>₹249</span>
        </div>
        <div className="flex justify-between">
          <span>Convenience Fee</span>
          <span>₹150</span>
        </div>
        <div className="border-t pt-3 border-dashed flex justify-between font-semibold text-base">
          <span>Total Amount</span>
          <span className="text-orange-600">₹3,399</span>
        </div>
      </div>

      {/* Payment Button Section */}
      <div className="text-center">
        <button
          onClick={() => console.log("Start Razorpay")} // replace later with real Razorpay logic
          className="w-full flex justify-center items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white font-semibold text-sm shadow-md hover:brightness-110 transition-all duration-300"
        >
          Pay <span><i className="fa-solid fa-indian-rupee-sign"></i></span>3,399
        </button>

        <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-2">
          <i className="fas fa-lock text-green-600 text-sm"></i>
          Secured via
          <img src={razorpayLogo} alt="Razorpay" className="h-4" />
        </p>
      </div>
    </div>
  );
};

