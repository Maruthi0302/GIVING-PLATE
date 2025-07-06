
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Clock, Heart, ArrowRight } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  views: string;
  likes: number;
}

interface BlogPostGridProps {
  posts: BlogPost[];
}

const BlogPostGrid = ({ posts }: BlogPostGridProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <Card key={post.id} className="bg-gradient-card border border-border shadow-card hover:shadow-gentle transition-all duration-300 group animate-fade-in card-hover" style={{ animationDelay: `${index * 0.1}s` }}>
          <CardHeader>
            <div className="flex items-center justify-between mb-3">
              <Badge variant="outline" className="border-primary text-primary">{post.category}</Badge>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{post.views} views</span>
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  <span>{post.likes}</span>
                </div>
              </div>
            </div>
            <CardTitle className="text-xl group-hover:text-primary transition-colors leading-tight text-foreground">
              {post.title}
            </CardTitle>
            <CardDescription className="text-muted-foreground">{post.excerpt}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
            <Button variant="ghost" className="p-0 h-auto group-hover:text-primary transition-colors text-muted-foreground">
              Read Article
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BlogPostGrid;
