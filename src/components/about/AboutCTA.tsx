
import { CTABadge } from "./CTABadge";
import { CTATitle } from "./CTATitle";
import { CTADescription } from "./CTADescription";
import { CTAButtons } from "./CTAButtons";

export const AboutCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-transparent to-secondary/50"></div>
      <div className="absolute top-10 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="relative container mx-auto px-4 text-center">
        <CTABadge />
        <CTATitle />
        <CTADescription />
        <CTAButtons />
      </div>
    </section>
  );
};
