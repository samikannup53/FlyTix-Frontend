import { BookingFooter, UserHeader } from "../../components";
import { Assurance } from "./sections/Assurance";
import { ProfileLayout } from "./sections/ProfileLayout";

export const Profile = () => {
  return (
    <>
      <UserHeader />
      <section className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 py-6 px-4">
        <ProfileLayout />
        <Assurance/>
      </section>      
      <BookingFooter />
    </>
  );
};
