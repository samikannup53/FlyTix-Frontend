import { BookingFooter, BookingHeader } from "../../components"
import { DosAndDontsAlert } from "./sections/DosAndDontsAlert"

export const Payment = () => {
  return (
    <>
        <BookingHeader/>
        <main className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 py-5 px-4">
            <DosAndDontsAlert/>
        </main>
        <BookingFooter/>
    </>
  )
}
