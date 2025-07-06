
import { Card, CardContent } from "@/components/ui/card";
import { Target, CheckCircle } from "lucide-react";

export const MissionCard = () => {
  return (
    <Card className="group card-hover border-none shadow-velvet bg-gradient-card">
      <CardContent className="p-8">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Target className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h3>
        <p className="text-muted-foreground leading-relaxed text-base">
          To eliminate hunger and food waste in India by creating an intelligent ecosystem 
          that connects food surplus with communities in need. We leverage AI, compassion, 
          and technology to ensure every meal finds its purpose.
        </p>
        <div className="mt-6 flex items-center gap-3 text-primary font-semibold">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm">Zero Hunger Initiative</span>
        </div>
      </CardContent>
    </Card>
  );
};
