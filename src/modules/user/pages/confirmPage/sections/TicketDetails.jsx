export const TicketDetails = ({ booking }) => {
  if (!booking) return null;

  const getBanner = () => {
    if (booking.cancellation?.isCancelled) {
      return {
        icon: "fas fa-times-circle",
        text: "Booking Cancelled",
        color: "text-red-600",
        subtext: `This booking was cancelled.`,
        dateLabel: "Cancelled On",
        dateValue: booking.updatedAt,
      };
    } else if (booking.status) {
      const lastReschedule =
        booking.rescheduleHistory?.[booking.rescheduleHistory.length - 1];
      return {
        icon: "fas fa-sync-alt",
        text: "Booking Rescheduled",
        color: "text-amber-600",
        subtext: `Your booking was successfully rescheduled.`,
        dateLabel: "Rescheduled On",
        dateValue: lastReschedule?.rescheduledAt || booking.updatedAt,
      };
    } else {
      return {
        icon: "fas fa-check-circle",
        text: "Booking Confirmed!",
        color: "text-green-600",
        subtext:
          "Your flight has been successfully booked. Check your email for the e-ticket.",
        dateLabel: "Confirmed On",
        dateValue: booking.bookingConfirmedAt,
      };
    }
  };

  const formatDate = (isoDate) => {
    const d = new Date(isoDate);
    return !isNaN(d)
      ? d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";
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
    const popup = window.open("", "_blank", features);

    // Show Tailwind loading spinner
    popup.document.write(`
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
    popup.document.close();

    try {
      const res = await fetch(ticketUrl, {
        method: "HEAD",
        credentials: "include",
      });
      if (res.ok) {
        popup.location.href = ticketUrl;
      } else {
        popup.document.body.innerHTML = `
          <div class="flex flex-col items-center justify-center h-screen text-center px-6">
            <div class="text-3xl text-red-600 mb-2">⚠️</div>
            <p class="text-lg font-semibold text-red-700">Ticket Generation Failed</p>
            <p class="text-sm text-gray-600 mt-1">Status ${res.status} - Something went wrong.</p>
          </div>
        `;
      }
    } catch (err) {
      popup.document.body.innerHTML = `
        <div class="flex flex-col items-center justify-center h-screen text-center px-6">
          <div class="text-3xl text-red-600 mb-2">🚫</div>
          <p class="text-lg font-semibold text-red-700">Connection Error</p>
          <p class="text-sm text-gray-600 mt-1">${err.message}</p>
        </div>
      `;
    }
  };

  const banner = getBanner();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
      {/* Left: Status Icon & Message */}
      <div className="flex items-start gap-3">
        <div className={`${banner.color} text-6xl mt-1`}>
          <i className={banner.icon}></i>
        </div>
        <div className="text-left space-y-1">
          <h2 className="text-2xl font-bold text-gray-800">{banner.text}</h2>
          <p className="text-sm text-gray-500">{banner.subtext}</p>
          <p className="text-xs text-gray-400 mt-1">
            {banner.dateLabel}:{" "}
            <span className="text-gray-700 font-medium">
              {formatDate(banner.dateValue)}
            </span>
          </p>
        </div>
      </div>

      {/* Right: Booking ID, PNR, Actions */}
      <div className="text-right space-y-2">
        <p className="text-sm text-gray-600">
          Booking ID:{" "}
          <span className="text-pink-700 font-semibold">
            {booking.bookingId}
          </span>
        </p>
        <p className="text-sm text-gray-600">
          PNR Number:{" "}
          <span className="text-pink-700 font-semibold">{booking.pnr}</span>
        </p>
        <div className="text-sm text-pink-700 font-medium flex justify-end gap-2 flex-wrap">
          <button
            onClick={() => handleOpenPDF(booking.bookingId)}
            className="hover:underline flex items-center gap-1"
            title="Download Ticket"
          >
            <i className="fas fa-download text-sm"></i> Download Ticket
          </button>
          <span>|</span>
          <button
            onClick={() => handleOpenPDF(booking.bookingId)}
            className="hover:underline flex items-center gap-1"
            title="Print Ticket"
          >
            <i className="fas fa-print text-sm"></i> Print Ticket
          </button>
        </div>
      </div>
    </div>
  );
};
