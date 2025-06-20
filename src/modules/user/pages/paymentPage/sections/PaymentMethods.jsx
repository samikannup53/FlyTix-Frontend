// Import images from src/assets/images
import rupay from '../../../../../assets/images/rupay.png';
import mastercard from '../../../../../assets/images/mastercard.png';
import visacard from '../../../../../assets/images/visacard.png';
import upi from '../../../../../assets/images/upi.png';
import netbanking from '../../../../../assets/images/netbanking.png';
import gpay from '../../../../../assets/images/gpay.png';
import phonepe from '../../../../../assets/images/phonepe.png';
import paytm from '../../../../../assets/images/paytm.png';

export const PaymentMethods = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 my-6 text-center">
      {/* Message */}
      <h3 className="text-sm md:text-base text-gray-700 font-medium mb-3">
        Payments can easily be made using{' '}
        <span className="text-orange-500 font-semibold">secure methods</span>
      </h3>

      {/* Payment Icons */}
      <div className="flex justify-center items-center gap-4 flex-wrap">
        <img src={rupay} alt="RuPay" className="h-5 object-contain" />
        <img src={mastercard} alt="MasterCard" className="h-5 object-contain" />
        <img src={visacard} alt="VISA" className="h-5 object-contain" />
        <img src={upi} alt="UPI" className="h-5 object-contain" />
        <img src={netbanking} alt="Netbanking" className="h-5 object-contain" />
        <img src={gpay} alt="Google Pay" className="h-5 object-contain" />
        <img src={phonepe} alt="PhonePe" className="h-5 object-contain" />
        <img src={paytm} alt="Paytm" className="h-5 object-contain" />
      </div>
    </section>
  );
};

