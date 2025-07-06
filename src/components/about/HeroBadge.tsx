import { Heart } from "lucide-react";

export const HeroBadge = () => {
  return (
    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8">
      <Heart className="h-5 w-5 text-secondary animate-pulse" />
      <span className="text-sm font-medium text-white">Transforming Lives Through Technology</span>
    </div>
  );
};