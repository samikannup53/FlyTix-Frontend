export const FareInfo = () => {
  return (
    <div className="mt-6 bg-white rounded-xl shadow-sm border border-orange-100 p-4 text-sm text-gray-700">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        
        {/* Heading */}
        <h4 className="text-base font-semibold text-gray-800 border-l-4 border-orange-500 pl-3 pr-4">
          Paid Summary:
        </h4>

        {/* Base Fare */}
        <div className="flex items-center gap-1">
          <span className="text-gray-600">Base Fare:</span>
          <span className="font-medium">₹3,000</span>
        </div>

        {/* Taxes */}
        <div className="flex items-center gap-1">
          <span className="text-gray-600">Taxes & Surcharges:</span>
          <span className="font-medium">₹249</span>
        </div>

        {/* Fee */}
        <div className="flex items-center gap-1">
          <span className="text-gray-600">Convenience Fee:</span>
          <span className="font-medium">₹150</span>
        </div>

        {/* Total Paid */}
        <div className="flex items-center gap-1 border-l border-gray-300 pl-4 ml-auto">
          <span className="text-gray-800 font-semibold">Total Paid:</span>
          <span className="text-orange-600 font-bold text-base">₹3,399</span>
        </div>
      </div>
    </div>
  );
};

