import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, ArrowRight, Users, Globe } from "lucide-react";

export const CTAButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center">
      <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90 shadow-velvet group" asChild>
        <Link to="/donate">
          <Heart className="h-6 w-6 mr-2 group-hover:animate-pulse" />
          Start Donating
          <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
      <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm group" asChild>
        <Link to="/volunteer">
          <Users className="h-6 w-6 mr-2" />
          Join as Volunteer
          <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
      <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm group" asChild>
        <Link to="/contact">
          <Globe className="h-6 w-6 mr-2" />
          Partner with Us
          <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </div>
  );
};