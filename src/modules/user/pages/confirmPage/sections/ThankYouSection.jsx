export const ThankYouSection = () => {
  return (
    <div className="flex justify-center mt-8">
      <div className="flex items-center gap-4">
        {/* Icon Box */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-orange-300 text-orange-600 text-xl">
          <i className="fas fa-thumbs-up"></i>
        </div>

        {/* Message */}
        <div className="text-gray-700 text-sm md:text-base leading-snug">
          <p className="font-semibold text-base text-gray-800 text-center md:text-left">
            Thank you for choosing <span className="text-orange-500">FlyNow</span>!
          </p>
          <p className="text-center md:text-left text-sm text-gray-600">
            We appreciate your booking. Have a smooth and joyful trip!
          </p>
        </div>
      </div>
    </div>
  );
};

