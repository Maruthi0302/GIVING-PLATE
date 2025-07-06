import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Brain } from "lucide-react";

export const HeroActions = () => {
  return (
    <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
      <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90 shadow-velvet" asChild>
        <Link to="/donate">
          <Heart className="h-6 w-6 mr-2" />
          Join Our Mission
        </Link>
      </Button>
      <Button variant="outline" size="xl" className="hover:bg-white/10 backdrop-blur-sm" asChild>
        <Link to="/ai-engine">
          <Brain className="h-6 w-6 mr-2" />
          See AI in Action
        </Link>
      </Button>
    </div>
  );
};