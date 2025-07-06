
import { Card, CardContent } from "@/components/ui/card";
import { Star, CheckCircle } from "lucide-react";

export const VisionCard = () => {
  return (
    <Card className="group card-hover border-none shadow-velvet bg-gradient-card">
      <CardContent className="p-8">
        <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Star className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h3>
        <p className="text-muted-foreground leading-relaxed text-base">
          A future where food insecurity is a memory of the past. Where every restaurant, 
          event, and household knows their surplus can instantly transform into hope, 
          nutrition, and smiles for someone in need.
        </p>
        <div className="mt-6 flex items-center gap-3 text-secondary font-semibold">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm">Sustainable Future</span>
        </div>
      </CardContent>
    </Card>
  );
};
