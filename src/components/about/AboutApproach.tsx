
import { SectionHeader } from "./SectionHeader";
import { ApproachCard } from "./ApproachCard";
import { Brain, Smartphone, Globe, BarChart3 } from "lucide-react";

export const AboutApproach = () => {
  const approaches = [
    { 
      icon: Brain, 
      title: "AI-Powered Matching", 
      desc: "Intelligent algorithms match food with recipients based on location, dietary needs, and urgency" 
    },
    { 
      icon: Smartphone, 
      title: "Mobile-First Design", 
      desc: "Easy-to-use platform accessible on any device, designed for India's mobile-first users" 
    },
    { 
      icon: Globe, 
      title: "Real-Time Coordination", 
      desc: "Live tracking, instant notifications, and seamless communication between all stakeholders" 
    },
    { 
      icon: BarChart3, 
      title: "Impact Transparency", 
      desc: "Complete visibility into donations, deliveries, and impact metrics for all participants" 
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Our Approach"
          subtitle="Technology with heart, powered by community intelligence"
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {approaches.map((approach, index) => (
            <ApproachCard
              key={approach.title}
              icon={approach.icon}
              title={approach.title}
              description={approach.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
