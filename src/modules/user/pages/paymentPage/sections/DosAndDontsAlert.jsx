export const DosAndDontsAlert = () => {
  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className="bg-white rounded-xl shadow-lg px-4 py-3  border-l-4 border-pink-700">
        <div className="text-pink-700 text-xs md:text-sm font-medium flex justify-around flex-wrap gap-4">
          {/* Alert 1 */}
          <span className="flex items-center gap-2">
            <i className="fas fa-exclamation-triangle text-pink-700"></i>
            Do not refresh during payment.
          </span>

          {/* Alert 2 */}
          <span className="flex items-center gap-2">
            <i className="fas fa-exclamation-circle text-pink-700"></i>
            Avoid clicking the back button.
          </span>

          {/* Alert 3 */}
          <span className="flex items-center gap-2">
            <i className="fas fa-credit-card text-pink-700"></i>
            Wait until payment is confirmed.
          </span>

          {/* Alert 4 */}
          <span className="flex items-center gap-2">
            <i className="fas fa-shield-alt text-pink-700"></i>
            Ensure stable internet connection.
          </span>
        </div>
      </div>
    </section>
  );
};
