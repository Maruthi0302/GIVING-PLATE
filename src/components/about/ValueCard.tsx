
import { LucideIcon } from "lucide-react";

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const ValueCard = ({ icon: Icon, title, description }: ValueCardProps) => {
  return (
    <div className="text-center group">
      <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-white/20">
        <Icon className="h-10 w-10 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-white/80 leading-relaxed text-base">{description}</p>
    </div>
  );
};
