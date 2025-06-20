// BookingPaymentInfo.jsx
import React from 'react';

// Importing images from assets
import rupayImg from '../../../../../assets/images/rupay.png';
import mastercardImg from '../../../../../assets/images/mastercard.png';
import visacardImg from '../../../../../assets/images/visacard.png';
import upiImg from '../../../../../assets/images/upi.png';
import netbankingImg from '../../../../../assets/images/netbanking.png';
import razorpayImg from '../../../../../assets/images/razorpay.png';

export const BookingPaymentInfo = () => {
  return (
    <div className="space-y-4 px-2">
      {/* Terms Message */}
      <p className="text-xs text-gray-600 leading-relaxed">
        By clicking on continue, I confirm that I have read, understood, and agree with the{' '}
        <a href="#" className="text-orange-600 underline">Fare Rules</a>,{' '}
        <a href="#" className="text-orange-600 underline">Privacy Policy</a>, and{' '}
        <a href="#" className="text-orange-600 underline">Terms of Use</a>.
      </p>

      {/* Secure Payment Text */}
      <div className="flex items-center gap-2 text-sm text-green-700 font-medium">
        {/* Font Awesome Shield Check Icon */}
        <i className="fa fa-shield"></i>
        <span>Payments Secured By</span>
        {/* Razorpay Logo */}
        <img src={razorpayImg} alt="Razorpay" className="h-5 object-contain" />
      </div>

      {/* Payment Security and Methods */}
      <div className="flex flex-col items-start gap-3 mt-6 text-xs text-gray-700">
        <div className="flex flex-wrap items-center gap-4 pl-1 mt-1">
          <img src={rupayImg} alt="RuPay" className="h-6 object-contain grayscale hover:grayscale-0 transition" title="RuPay" />
          <img src={mastercardImg} alt="Mastercard" className="h-6 object-contain grayscale hover:grayscale-0 transition" title="Mastercard" />
          <img src={visacardImg} alt="VISA" className="h-6 object-contain grayscale hover:grayscale-0 transition" title="VISA" />
          <img src={upiImg} alt="UPI" className="h-6 object-contain grayscale hover:grayscale-0 transition" title="UPI" />
          <img src={netbankingImg} alt="Net Banking" className="h-6 object-contain grayscale hover:grayscale-0 transition" title="Net Banking" />
        </div>
      </div>
    </div>
  );
};

