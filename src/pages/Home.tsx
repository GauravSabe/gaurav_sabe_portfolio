import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { SkillsPreview } from "@/components/home/SkillsPreview";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { EducationPreview } from "@/components/home/EducationPreview";
import { AchievementsPreview } from "@/components/home/AchievementsPreview";
import { ContactPreview } from "@/components/home/ContactPreview";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -100]);
  const aboutY = useTransform(scrollYProgress, [0.08, 0.23], [100, 0]);
  const skillsY = useTransform(scrollYProgress, [0.15, 0.3], [100, 0]);
  const projectsY = useTransform(scrollYProgress, [0.23, 0.38], [100, 0]);
  const experienceY = useTransform(scrollYProgress, [0.3, 0.45], [100, 0]);
  const educationY = useTransform(scrollYProgress, [0.38, 0.53], [100, 0]);
  const achievementsY = useTransform(scrollYProgress, [0.45, 0.6], [100, 0]);
  const contactY = useTransform(scrollYProgress, [0.53, 0.68], [100, 0]);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0.3]);
  const aboutOpacity = useTransform(scrollYProgress, [0.08, 0.2], [0.5, 1]);
  const skillsOpacity = useTransform(scrollYProgress, [0.15, 0.27], [0.5, 1]);
  const projectsOpacity = useTransform(scrollYProgress, [0.23, 0.35], [0.5, 1]);
  const experienceOpacity = useTransform(scrollYProgress, [0.3, 0.42], [0.5, 1]);
  const educationOpacity = useTransform(scrollYProgress, [0.38, 0.5], [0.5, 1]);
  const achievementsOpacity = useTransform(scrollYProgress, [0.45, 0.57], [0.5, 1]);
  const contactOpacity = useTransform(scrollYProgress, [0.53, 0.65], [0.5, 1]);

  return (
    <div className="min-h-screen relative" ref={containerRef}>
      <Navigation />
      <div className="pt-16 relative">
        <motion.div id="home" style={{ y: heroY, opacity: heroOpacity }}>
          <Hero />
        </motion.div>
        
        <motion.div style={{ y: aboutY, opacity: aboutOpacity }}>
          <About />
        </motion.div>
        
        <motion.div id="skills" style={{ y: skillsY, opacity: skillsOpacity }}>
          <SkillsPreview />
        </motion.div>
        
        <motion.div id="projects" style={{ y: projectsY, opacity: projectsOpacity }}>
          <ProjectsPreview />
        </motion.div>
        
        <motion.div id="experience" style={{ y: experienceY, opacity: experienceOpacity }}>
          <ExperiencePreview />
        </motion.div>
        
        <motion.div id="education" style={{ y: educationY, opacity: educationOpacity }}>
          <EducationPreview />
        </motion.div>
        
        <motion.div id="achievements" style={{ y: achievementsY, opacity: achievementsOpacity }}>
          <AchievementsPreview />
        </motion.div>
        
        <motion.div id="contact" style={{ y: contactY, opacity: contactOpacity }}>
          <ContactPreview />
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
