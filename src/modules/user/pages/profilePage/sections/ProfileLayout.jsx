import { ChangePassword } from "./ChangePassword";
import { ProfileSection } from "./ProfileSection";
import { SavedTravellers } from "./SavedTravellers";
import { Sidebar } from "./Sidebar";

export const ProfileLayout = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex justify-start rounded-2xl overflow-hidden shadow-lg border border-orange-100 min-h-[80vh]">
        <Sidebar/>
        <div className="w-full md:w-3/4 bg-white p-6 overflow-y-auto space-y-12">
          <ProfileSection/>
          <SavedTravellers/>
          <ChangePassword/>
        </div>
      </div>
    </main>
  );
};

