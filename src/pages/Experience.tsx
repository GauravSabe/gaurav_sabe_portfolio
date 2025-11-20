import { Navigation } from "@/components/Navigation";
import { Experience as ExperienceSection } from "@/components/Experience";
import { Achievements } from "@/components/Achievements";
import { Footer } from "@/components/Footer";

const Experience = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <ExperienceSection />
        <Achievements />
      </div>
      <Footer />
    </div>
  );
};

export default Experience;
