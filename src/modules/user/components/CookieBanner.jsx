import { useEffect, useState } from "react";

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("dismissedCookieNotice");
    if (!dismissed) setShowBanner(true);
  }, []);

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem("dismissedCookieNotice", "true");
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-gray-100 border-t border-orange-300 shadow-md p-5 md:p-6">
      <div className="max-w-7xl mx-auto flex flex-col  items-start gap-6">
        {/* Info Section */}
        <div className="flex items-start gap-4 text-sm text-orange-900 flex-1">
          <div className="text-pink-700 text-2xl mt-1">
            <i className="fa-solid fa-cookie-bite"></i>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-orange-800 text-base">
              Enable third-party cookies for the best experience
            </p>
            <p>
              To log in and access bookings, please allow third-party cookies.
              If using private browsing or strict privacy settings, add our
              domain to your browser’s allowed list:
            </p>
            <div className="bg-pink-50 px-3 py-1.5 rounded border border-pink-200 text-xs font-mono w-fit">
              https://flytix.netlify.app/
            </div>
            <p className="text-orange-700 text-sm">
              Your login, secure booking, and personalized features depend on
              this.
            </p>
            <p className="text-green-700 text-sm flex items-center gap-2">
              <i className="fa-solid fa-shield-halved text-green-600"></i>
              Your data is safe and encrypted. We never share your personal
              info.
            </p>
          </div>
        </div>

        {/* Dismiss Button */}
        <div className="ml-9 mt-3">
          <button
            onClick={handleDismiss}
            className="cursor-pointer bg-gradient-to-br from-orange-700 via-pink-700 to-pink-800 hover:from-orange-800 hover:to-pink-900 text-white text-sm font-semibold px-6 py-2 rounded-full shadow-md transition-all"
          >
            <i className="fa-solid fa-check mr-2"></i> I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
