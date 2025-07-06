
import { ValueCard } from "./ValueCard";
import { Heart, Zap, Sprout } from "lucide-react";

export const AboutValues = () => {
  const values = [
    { 
      icon: Heart, 
      title: "Compassion First", 
      desc: "Every decision we make is guided by empathy for those we serve" 
    },
    { 
      icon: Zap, 
      title: "Speed & Efficiency", 
      desc: "Time matters when fighting hunger - we optimize for immediate impact" 
    },
    { 
      icon: Sprout, 
      title: "Sustainability", 
      desc: "Building systems that create lasting change for people and planet" 
    }
  ];

  return (
    <section className="py-16 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"></div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Our Values
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <ValueCard
              key={value.title}
              icon={value.icon}
              title={value.title}
              description={value.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
