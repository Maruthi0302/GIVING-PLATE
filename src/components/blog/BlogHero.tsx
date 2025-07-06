
import { BookOpen, Eye, Edit3 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BlogHeroProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const BlogHero = ({ activeTab, onTabChange }: BlogHeroProps) => {
  return (
    <div className="relative overflow-hidden py-20 bg-gradient-hero">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20"></div>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"></div>
      </div>
      
      <div className="relative container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-md rounded-full px-6 py-2 mb-6 animate-fade-in border border-border shadow-gentle">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Stories & Insights</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up text-foreground">
          Impact
          <span className="text-gradient block">Chronicles</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in mb-8">
          Share your stories, read inspiring journeys, and be part of the movement 
          that's transforming hunger into hope across communities.
        </p>

        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full max-w-md mx-auto">
          <TabsList className="bg-card/80 backdrop-blur border border-border shadow-gentle">
            <TabsTrigger value="read" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-white">
              <Eye className="h-4 w-4 mr-2" />
              Read Stories
            </TabsTrigger>
            <TabsTrigger value="write" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-white">
              <Edit3 className="h-4 w-4 mr-2" />
              Write Story
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default BlogHero;
