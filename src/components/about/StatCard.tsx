
interface StatCardProps {
  number: string;
  title: string;
  description: string;
  color: string;
}

export const StatCard = ({ number, title, description, color }: StatCardProps) => {
  return (
    <div className="text-center group">
      <div className="relative">
        <div className={`text-5xl font-bold ${color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
          {number}
        </div>
        <div className={`absolute -top-2 -right-2 w-6 h-6 ${color.replace('text-', 'bg-')}/20 rounded-full animate-pulse`}></div>
      </div>
      <div className="text-xl font-bold text-foreground mb-3">{title}</div>
      <div className="text-base text-muted-foreground leading-relaxed">{description}</div>
    </div>
  );
};
