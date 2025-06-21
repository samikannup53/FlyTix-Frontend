import { BookingFooter, UserHeader } from "../../components"
import { DashboardHeading } from "./sections/DashboardHeading"

export const Dashboard = () => {
  return (
    <>
        <UserHeader/>
        <section className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 py-6 px-4">
            <main className="max-w-7xl mx-auto px-4 sm:px-6">
                <DashboardHeading/>
            </main>
        </section>
        <BookingFooter/>
    </>
  )
}
