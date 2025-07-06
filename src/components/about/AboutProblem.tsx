
import { SectionHeader } from "./SectionHeader";
import { StatCard } from "./StatCard";
import { SDGCard } from "./SDGCard";

export const AboutProblem = () => {
  const stats = [
    {
      number: "70M",
      title: "Tonnes of Food Wasted",
      description: "Every year in India - enough to feed entire states while millions go hungry",
      color: "text-destructive"
    },
    {
      number: "194M",
      title: "People Undernourished",
      description: "Going to bed hungry while perfectly good food gets discarded daily",
      color: "text-warning"
    },
    {
      number: "40%",
      title: "Food Loss in Supply Chain",
      description: "Due to poor logistics and lack of real-time coordination systems",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-destructive/5 via-warning/5 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            The Reality We're
            <span className="block text-gradient">Changing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            India faces a paradox that technology can solve
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              title={stat.title}
              description={stat.description}
              color={stat.color}
            />
          ))}
        </div>

        <SDGCard />
      </div>
    </section>
  );
};
