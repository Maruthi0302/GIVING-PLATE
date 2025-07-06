
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Heart, Users, User } from "lucide-react";

interface BlogStatsProps {
  postsCount: number;
}

const BlogStats = ({ postsCount }: BlogStatsProps) => {
  const stats = [
    { label: "Stories Published", value: postsCount.toString(), icon: BookOpen },
    { label: "Monthly Readers", value: "12.5k", icon: Users },
    { label: "Community Shares", value: "3.2k", icon: Heart },
    { label: "Impact Features", value: "89", icon: User }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={stat.label} className="bg-gradient-card border border-border shadow-card hover:shadow-gentle transition-all duration-300 card-hover animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <CardContent className="p-6 text-center">
            <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
            <div className="text-3xl font-bold text-foreground mb-2 count-up">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BlogStats;
