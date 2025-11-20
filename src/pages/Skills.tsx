import { Navigation } from "@/components/Navigation";
import { Skills as SkillsSection } from "@/components/Skills";
import { Footer } from "@/components/Footer";

const Skills = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <SkillsSection />
      </div>
      <Footer />
    </div>
  );
};

export default Skills;
