import { AboutHero } from "@/components/about/AboutHero";
import { AboutFoundation } from "@/components/about/AboutFoundation";
import { AboutProblem } from "@/components/about/AboutProblem";
import { AboutApproach } from "@/components/about/AboutApproach";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutCTA } from "@/components/about/AboutCTA";

const About = () => {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <AboutFoundation />
      <AboutProblem />
      <AboutApproach />
      <AboutValues />
      <AboutCTA />
    </div>
  );
};

export default About;