import { BookingFooter, BookingHeader } from "../../components"
import { ConfirmPaySection } from "./sections/ConfirmPaySection"
import { DosAndDontsAlert } from "./sections/DosAndDontsAlert"
import { PaymentMethods } from "./sections/PaymentMethods"

export const Payment = () => {
  return (
    <>
        <BookingHeader/>
        <section className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 py-5 px-4">
            <DosAndDontsAlert/>
            <ConfirmPaySection/>
            <PaymentMethods/>
        </section>
        <BookingFooter/>
    </>
  )
}
