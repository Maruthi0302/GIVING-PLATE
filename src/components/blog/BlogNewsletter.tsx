
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const BlogNewsletter = () => {
  return (
    <Card className="bg-gradient-secondary border border-border shadow-velvet animate-fade-in">
      <CardContent className="p-12 text-center">
        <BookOpen className="h-16 w-16 mx-auto mb-6 text-primary" />
        <h3 className="text-3xl font-bold mb-4 text-foreground">Join Our Community</h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Get the latest stories, research insights, and impact updates delivered to your inbox weekly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input 
            placeholder="Enter your email address"
            className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground"
          />
          <Button variant="hero" className="px-8">
            Subscribe
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogNewsletter;
