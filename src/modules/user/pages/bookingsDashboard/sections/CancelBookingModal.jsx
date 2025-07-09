export const CancelBookingModal = ({
  bookingId,
  totalFare,
  onClose,
  onConfirm,
}) => {
  // Format refund amounts in INR
  const refundAmount24hr = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(totalFare * 0.8);

  const refundAmount3to24hr = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(totalFare * 0.5);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-xl w-full space-y-5 border border-pink-200">
        {/* Heading */}
        <h3 className="text-xl font-bold text-pink-700 flex items-center gap-2">
          <i className="fas fa-exclamation-triangle"></i>
          Cancel Booking
        </h3>

        {/* Message */}
        <div className="space-y-2 text-gray-700 text-sm leading-relaxed text-justify px-4">
          <p>
            Are you sure you want to cancel booking{" "}
            <span className="font-semibold text-gray-900">{bookingId}</span>?
          </p>

          <p className="justify">
            Based on our cancellation policy, your refund will depend on how
            much time is left before departure:
          </p>

          <ul className="list-disc list-inside text-gray-600 pl-1 space-y-1">
            <li>
              <span className="font-medium">More than 24 hrs:</span>{" "}
              <span className="text-pink-700 font-semibold">
                {refundAmount24hr}
              </span>
            </li>
            <li>
              <span className="font-medium">3 – 24 hrs:</span>{" "}
              <span className="text-pink-700 font-semibold">
                {refundAmount3to24hr}
              </span>
            </li>
            <li>
              <span className="font-medium">Less than 3 hrs:</span>{" "}
              <span className="text-pink-700 font-semibold">No refund</span>
            </li>
          </ul>

          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 text-xs rounded-md px-3 py-2 mt-2 flex items-start gap-2">
            <i className="fas fa-info-circle pt-[2px]"></i>
            <span className="text-justify">
              Once cancelled, this booking will be marked as void and
              <strong>
                {" "}
                cannot be used for boarding under any circumstances
              </strong>
              . Please confirm only if you're sure.
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-3">
          <button
            className="cursor-pointer px-4 py-1.5 border border-pink-300 text-pink-700 rounded-full hover:bg-pink-100/60 transition duration-200"
            onClick={onClose}
          >
            <i className="fas fa-times-circle mr-1"></i> No, Keep Booking
          </button>
          <button
            onClick={() => {
              onConfirm("User Requested");
              onClose(); // <-- Close modal immediately after confirming
            }}
            className="cursor-pointer px-4 py-1.5 bg-gradient-to-br from-orange-700 via-pink-700 to-pink-800 text-white rounded-full shadow hover:from-orange-800 hover:to-pink-900 transition duration-200"
          >
            <i className="fas fa-check-circle mr-1"></i> Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
