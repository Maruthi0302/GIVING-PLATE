
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ApproachCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const ApproachCard = ({ icon: Icon, title, description }: ApproachCardProps) => {
  return (
    <Card className="group card-hover border-none shadow-warm text-center bg-gradient-card">
      <CardContent className="p-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-lg font-bold mb-3 text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};
