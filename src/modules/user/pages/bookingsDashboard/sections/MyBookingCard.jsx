import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { CancelBookingModal } from "./CancelBookingModal";

export const MyBookingCard = ({ booking, setBookings }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  if (!booking) return null;

  const journey = booking.journey?.[0];
  const outbound = journey?.outbound;
  const returnTrip = journey?.returnTrip;
  const tripType = booking.tripType || "One Way";

  const bookingId = booking.bookingId || "N/A";
  const pnr = booking.pnr || "N/A";
  const status = booking.bookingStatus || "Unknown";
  const bookingDate = new Date(booking.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formatSegment = (segment) => {
    const first = segment?.segments?.[0];
    const last = segment?.segments?.[segment.segments.length - 1];

    const airlineLogo = first?.airlineCode
      ? `https://images.ixigo.com/img/common-resources/airline-new/${first.airlineCode}.png`
      : "/default-logo.png";

    const fromCity = first?.from?.city || "N/A";
    const toCity = last?.to?.city || "N/A";
    const date = first?.from?.date
      ? new Date(first.from.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "N/A";

    const airline = first?.airlineName || "Unknown Airline";
    const flightNumber = first?.flightNumber || "N/A";

    return (
      <div className="flex items-center gap-4 flex-1">
        <img
          src={airlineLogo}
          alt={airline}
          className="w-12 h-12 object-contain"
        />
        <div>
          <p className="font-semibold text-gray-800">
            {fromCity} <i className="fas fa-arrow-right mx-2"></i> {toCity}
          </p>
          <p className="text-sm text-gray-600">
            {date} | {airline} | Flight {flightNumber}
          </p>
        </div>
      </div>
    );
  };

  const handleCancel = async (reason = "User Request") => {
    setIsCancelling(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/booking/cancel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ bookingId, reason }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Failed to cancel booking");
      }

      setBookings((prev) =>
        prev.map((b) =>
          b.bookingId === bookingId
            ? {
                ...b,
                bookingStatus: "Cancelled",
                cancellation: data.cancellationDetails,
              }
            : b
        )
      );

      toast.success(data.msg || "Booking cancelled successfully");
      setShowCancelModal(false);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsCancelling(false);
    }
  };

  const handleOpenPDF = async (bookingId) => {
    const width = 900;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const features = `width=${width},height=${height},left=${left},top=${top},toolbar=0,scrollbars=1,resizable=1`;

    const ticketUrl = `${
      import.meta.env.VITE_API_BASE_URL
    }/api/booking/${bookingId}/ticket`;
    const previewWindow = window.open("", "_blank", features);

    previewWindow.document.write(`
    <!DOCTYPE html>
      <html>
        <head>
          <title>Generating Ticket...</title>
          <style>
            html, body {
              margin: 0;
              height: 100%;
              background-color: #ffffff;   
              color: #374151;                
              font-family: sans-serif;
              display: flex;
              flex-direction: column;          
              justify-content: center;          
              align-items: center;              
              text-align: center;
            }

            .spinner {
              width: 40px;                     
              height: 40px;                    
              border: 4px solid #f9a8d4;        
              border-top-color: #be185d;        
              border-radius: 50%;               
              animation: spin 1s linear infinite; 
              margin-bottom: 1rem;             
            }

            @keyframes spin {
              to {
                transform: rotate(360deg);
              }
            }

            .loading-text {
              font-size: 0.875rem;             
              font-weight: 500;                 
            }
          </style>
        </head>
        <body>
          <div class="spinner"></div>
          <p class="loading-text">Preparing your ticket PDF...</p>
        </body>
      </html>

  `);
    previewWindow.document.close();

    try {
      const res = await fetch(ticketUrl, {
        method: "HEAD",
        credentials: "include",
      });

      if (res.ok) {
        previewWindow.location.href = ticketUrl;
      } else {
        const errorText = `Unable to generate ticket (Status ${res.status})`;
        previewWindow.document.body.innerHTML = `
        <div class="flex items-center justify-center h-screen text-center flex-col px-6">
          <div class="text-3xl text-red-600 mb-2">⚠️</div>
          <p class="text-lg font-semibold text-red-700">Ticket Generation Failed</p>
          <p class="text-sm text-gray-600 mt-1">${errorText}</p>
        </div>
      `;
      }
    } catch (error) {
      previewWindow.document.body.innerHTML = `
      <div class="flex items-center justify-center h-screen text-center flex-col px-6">
        <div class="text-3xl text-red-600 mb-2">🚫</div>
        <p class="text-lg font-semibold text-red-700">Something went wrong</p>
        <p class="text-sm text-gray-600 mt-1">${error.message}</p>
      </div>
    `;
    }
  };

  return (
    <div className="bg-white border border-pink-100 rounded-xl p-5 shadow-sm space-y-4 relative">
      {/* Spinner Overlay */}
      {isCancelling && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[9999] flex items-center justify-center h-screen">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-700 rounded-full animate-spin"></div>
            <p className="text-white text-base font-medium">
              Booking Cancellation Under Process
            </p>
            <p className="text-white text-base font-medium">Please Wait ...</p>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
        <div className="flex flex-col lg:flex-row gap-2 xl:gap-4 flex-1">
          {formatSegment(outbound)}
          {tripType === "Roundtrip" && (
            <div className="hidden md:block w-px bg-gray-200"></div>
          )}
          {tripType === "Roundtrip" && formatSegment(returnTrip)}
        </div>

        <div className="text-center md:text-right space-y-1 min-w-[160px]">
          <p className="text-sm text-gray-600">
            Booking ID:{" "}
            <span className="text-pink-700 font-semibold">{bookingId}</span>
          </p>
          <p className="text-sm text-gray-600">
            PNR: <span className="text-pink-700 font-semibold">{pnr}</span>
          </p>
          <p className="text-sm text-gray-600">
            Status:{" "}
            <span
              className={`font-semibold ${
                status === "Cancelled" ? "text-red-600" : "text-green-600"
              }`}
            >
              {status}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-between mt-4">
        <div className="flex gap-2 flex-wrap justify-center md:justify-start">
          <button
            onClick={() => handleOpenPDF(bookingId)}
            className="px-3 py-1 text-sm border border-pink-600 text-pink-700 rounded-full hover:bg-pink-100"
          >
            <i className="fas fa-download text-xs mr-1"></i> Download
          </button>

          <button
            onClick={() => handleOpenPDF(bookingId)}
            className="px-3 py-1 text-sm border border-pink-600 text-pink-700 rounded-full hover:bg-pink-100"
          >
            <i className="fas fa-print text-xs mr-1"></i> Print
          </button>

          {status !== "Cancelled" && (
            <button
              onClick={() => setShowCancelModal(true)}
              className="px-3 py-1 text-sm border border-red-500 text-red-600 rounded-full hover:bg-red-100"
            >
              <i className="fas fa-times-circle text-xs mr-1"></i> Cancel
            </button>
          )}

          <Link
            to={`/booking/confirm/${bookingId}`}
            className="px-3 py-1 text-sm bg-gradient-to-br from-orange-700 via-pink-700 to-pink-800 text-white rounded-full shadow hover:from-orange-800 hover:to-pink-900"
          >
            <i className="fas fa-eye text-xs mr-1"></i> View
          </Link>
        </div>

        <div className="flex gap-2 items-center">
          <p className="text-sm font-medium text-pink-700">{tripType}</p>
          <span className="text-sm text-gray-500">|</span>
          <p className="text-sm text-gray-500">
            Booked on: <span className="font-medium">{bookingDate}</span>
          </p>
        </div>
      </div>

      {showCancelModal && (
        <CancelBookingModal
          bookingId={bookingId}
          totalFare={booking.fareDetails?.totalFare}
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleCancel}
        />
      )}
    </div>
  );
};
