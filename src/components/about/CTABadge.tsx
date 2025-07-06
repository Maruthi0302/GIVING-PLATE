import { Users } from "lucide-react";

export const CTABadge = () => {
  return (
    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-8">
      <Users className="h-5 w-5 text-white" />
      <span className="text-sm font-medium text-white">Join 10,000+ Change Makers</span>
    </div>
  );
};