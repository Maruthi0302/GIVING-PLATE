
import { SectionHeader } from "./SectionHeader";
import { MissionCard } from "./MissionCard";
import { VisionCard } from "./VisionCard";

export const AboutFoundation = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Our Foundation"
          subtitle="The principles that drive our every decision"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MissionCard />
          <VisionCard />
        </div>
      </div>
    </section>
  );
};
