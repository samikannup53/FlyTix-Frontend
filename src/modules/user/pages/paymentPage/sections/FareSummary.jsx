import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loadRazorpayScript } from "../../../../../shared/services/loadRazorPay";
import razorpayLogo from "../../../../../assets/images/razorpay.png";

export const FareSummary = ({ booking }) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!booking) return null;

  const {
    baseFare,
    taxes,
    instantDiscount = 0,
    totalFare,
  } = booking.fareDetails;

  const handlePayment = async () => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("Failed to load Razorpay. Please try again.");
      return;
    }

    try {
      // Step 1: Initiate payment
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/payment/initiate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ bookingId: booking.bookingId }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.msg || "Could not initiate payment");
        return;
      }

      const { razorPayOrderId, amount, currency } = data;

      // Step 2: Open Razorpay modal
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "Flytix",
        description: "Flight Booking Payment",
        image: "/icon.png",
        order_id: razorPayOrderId,
        handler: async (response) => {
          setIsProcessing(true); // Show spinner after payment success
          try {
            const verifyRes = await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/api/payment/verify`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  bookingId: booking.bookingId,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              }
            );

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) {
              setIsProcessing(false);
              toast.error(verifyData.msg || "Payment verification failed");
              return;
            }

            toast.success("Payment Successful!");
            navigate(`/booking/confirm/${booking.bookingId}`);

            localStorage.removeItem("cachedFlightResults");
            localStorage.removeItem("cachedSearchMeta");
          } catch (err) {
            setIsProcessing(false);
            toast.error("Verification failed. Please contact support.");
          }
        },
        prefill: {
          name: booking.contactDetails?.name || "",
          email: booking.contactDetails?.email || "",
          contact: booking.contactDetails?.mobileNumber?.number || "",
        },
        theme: {
          color: "#ab2745",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        toast.error("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (err) {
      toast.error("Something went wrong during payment.");
    }
  };

  return (
    <>
      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center h-screen">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center space-y-3 w-[90%] max-w-sm">
            <i className="fas fa-spinner fa-spin text-3xl text-pink-700"></i>
            <p className="text-base font-medium text-gray-800">
              Processing your booking...
            </p>
            <p className="text-sm text-gray-500">
              Please wait while we confirm your payment and generate your
              ticket.
            </p>
          </div>
        </div>
      )}

      <div className="w-full md:w-[320px] space-y-5 sticky top-24">
        {/* Fare Summary Card */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-pink-100 space-y-3 text-sm text-gray-700">
          <h3 className="text-lg font-semibold text-pink-700 mb-2">
            Fare Summary
          </h3>
          <div className="flex justify-between">
            <span>Base Fare</span>
            <span>
              <i className="fa-solid fa-indian-rupee-sign"></i> {baseFare}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Taxes & Surcharges</span>
            <span>
              <i className="fa-solid fa-indian-rupee-sign"></i> {taxes}
            </span>
          </div>
          {instantDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Instant Discount</span>
              <span>
                -<i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                {instantDiscount}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Convenience Fee</span>
            <span>
              <i className="fa-solid fa-indian-rupee-sign"></i> 0
            </span>
          </div>
          <div className="border-t pt-3 border-dashed flex justify-between font-semibold text-base">
            <span>Total Amount</span>
            <span className="text-pink-700">
              <i className="fa-solid fa-indian-rupee-sign"></i> {totalFare}
            </span>
          </div>
        </div>

        {/* Payment Button */}
        <div className="text-center">
          <button
            onClick={handlePayment}
            className="w-full flex justify-center items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-br from-orange-700 via-pink-700 to-pink-800 hover:from-orange-800 hover:to-pink-900 text-white font-semibold text-base shadow-md transition-all duration-300"
          >
            Pay <i className="fa-solid fa-indian-rupee-sign"></i> {totalFare}
          </button>

          <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-2">
            <i className="fas fa-lock text-green-600 text-sm"></i>
            Secured via
            <img src={razorpayLogo} alt="Razorpay" className="h-4" />
          </p>
        </div>
      </div>
    </>
  );
};
