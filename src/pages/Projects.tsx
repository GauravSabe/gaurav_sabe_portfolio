import { Navigation } from "@/components/Navigation";
import { Projects as ProjectsSection } from "@/components/Projects";
import { Footer } from "@/components/Footer";

const Projects = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <ProjectsSection />
      </div>
      <Footer />
    </div>
  );
};

export default Projects;
