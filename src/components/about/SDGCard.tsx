
import { Card, CardContent } from "@/components/ui/card";
import { Globe } from "lucide-react";

export const SDGCard = () => {
  return (
    <Card className="max-w-4xl mx-auto border-none shadow-velvet bg-gradient-card">
      <CardContent className="p-8 text-center">
        <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <Globe className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-foreground">UN SDG Goal 2: Zero Hunger</h3>
        <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Giving Plate directly contributes to the United Nations Sustainable Development Goal 2 
          by ensuring food security, improving nutrition, and promoting sustainable agriculture 
          through innovative technology-driven food redistribution systems.
        </p>
      </CardContent>
    </Card>
  );
};
