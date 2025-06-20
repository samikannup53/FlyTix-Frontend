export const DosAndDontsAlert = () => {
  return (
    <section className="max-w-[1600px] mx-auto px-6">
      <div className="bg-white rounded-xl shadow-lg px-4 py-3  border-l-4 border-orange-500">
        <div className="text-orange-800 text-xs md:text-sm font-medium flex flex-wrap gap-x-12 gap-y-4">
          {/* Alert 1 */}
          <span className="flex items-center gap-2">
            <span className="font-bold">1.</span>
            <i className="fas fa-exclamation-triangle text-orange-500"></i>
            Do not refresh during payment.
          </span>

          {/* Alert 2 */}
          <span className="flex items-center gap-2">
            <span className="font-bold">2.</span>
            <i className="fas fa-exclamation-circle text-orange-500"></i>
            Avoid clicking the back button.
          </span>

          {/* Alert 3 */}
          <span className="flex items-center gap-2">
            <span className="font-bold">3.</span>
            <i className="fas fa-credit-card text-orange-500"></i>
            Wait until payment is confirmed.
          </span>

          {/* Alert 4 */}
          <span className="flex items-center gap-2">
            <span className="font-bold">4.</span>
            <i className="fas fa-shield-alt text-orange-500"></i>
            Ensure stable internet connection.
          </span>
        </div>
      </div>
    </section>
  );
};

