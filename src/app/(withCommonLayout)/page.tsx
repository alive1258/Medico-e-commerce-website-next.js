import EmergencyBloodMatcher from "@/src/components/HomePage/BloodMatcherHub/EmergencyBloodMatcher";
import DoctorRosterPreview from "@/src/components/HomePage/DoctorRosterPreview/DoctorRosterPreview";
import GeoCoverageTracker from "@/src/components/HomePage/GeoCoverageTracker/GeoCoverageTracker";
import HeroSection from "@/src/components/HomePage/HeroSection/HeroSection";
import HospitalBedTracker from "@/src/components/HomePage/HospitalBedTracker/HospitalBedTracker";
import PlatformGrowthCTA from "@/src/components/HomePage/PlatformGrowthCTA/PlatformGrowthCTA";
import QuickActionHub from "@/src/components/HomePage/QuickActionHub/QuickActionHub";

const page = () => {
  return (
    <>
      <HeroSection />
      <QuickActionHub />
      <HospitalBedTracker />
      <EmergencyBloodMatcher />
      <DoctorRosterPreview />
      <GeoCoverageTracker />
      <PlatformGrowthCTA />
    </>
  );
};

export default page;
