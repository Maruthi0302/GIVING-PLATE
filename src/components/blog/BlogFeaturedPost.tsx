
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Calendar, ArrowRight } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image?: string;
  featured?: boolean;
}

interface BlogFeaturedPostProps {
  featuredPost: BlogPost | undefined;
}

const BlogFeaturedPost = ({ featuredPost }: BlogFeaturedPostProps) => {
  if (!featuredPost) return null;

  return (
    <Card className="bg-gradient-card border border-border shadow-velvet overflow-hidden animate-fade-in card-hover">
      <div className="grid lg:grid-cols-2">
        <div className="relative h-64 lg:h-auto">
          <img 
            src={featuredPost.image} 
            alt={featuredPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-white border-0 shadow-warm">Featured Story</Badge>
          </div>
        </div>
        <div className="p-8 flex flex-col justify-center">
          <Badge variant="outline" className="w-fit mb-4 border-primary text-primary">
            {featuredPost.category}
          </Badge>
          <h2 className="text-3xl font-bold mb-4 leading-tight text-foreground">
            {featuredPost.title}
          </h2>
          <p className="text-muted-foreground mb-6">
            {featuredPost.excerpt}
          </p>
          
          <div className="flex items-center gap-4 mb-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="text-sm">{featuredPost.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">{featuredPost.date}</span>
            </div>
          </div>

          <Button variant="hero" className="w-fit">
            Read Full Story
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BlogFeaturedPost;
