import { BookingFooter, UserHeader } from "../../components";
import { Assurance } from "./sections/Assurance";
import { ProfileSection } from "./sections/ProfileSection";
import { Sidebar } from "./sections/Sidebar";

export const Profile = () => {
  return (
    <>
      <UserHeader />
      <section className=" bg-gradient-to-tr from-orange-50 via-pink-50 to-orange-50 py-6 px-4 flex flex-col items-center justify-center">
        <main className="w-full max-w-7xl  mx-auto px-4 sm:px-6 ">
          <div className="flex justify-start rounded-2xl overflow-hidden shadow-lg border border-orange-100 min-h-[75vh]">
            <Sidebar />
            <div className="w-full md:w-3/4 bg-white p-6 overflow-y-auto space-y-12">
              <ProfileSection />
            </div>
          </div>
        </main>
        <Assurance />
      </section>
      <BookingFooter />
    </>
  );
};
