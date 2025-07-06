
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Edit3, Send } from "lucide-react";

interface NewPost {
  title: string;
  excerpt: string;
  content: string;
  category: string;
}

interface BlogWriteFormProps {
  newPost: NewPost;
  onUpdatePost: (post: NewPost) => void;
  onPublish: () => void;
  onCancel: () => void;
}

const BlogWriteForm = ({ newPost, onUpdatePost, onPublish, onCancel }: BlogWriteFormProps) => {
  const handleFieldChange = (field: keyof NewPost, value: string) => {
    onUpdatePost({ ...newPost, [field]: value });
  };

  return (
    <Card className="bg-gradient-card border border-border shadow-velvet">
      <CardHeader>
        <CardTitle className="text-2xl text-foreground flex items-center gap-2">
          <Edit3 className="h-6 w-6 text-primary" />
          Share Your Impact Story
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Write about your experiences, insights, or stories related to fighting hunger and food waste.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Title</label>
          <Input
            placeholder="Enter an engaging title for your story..."
            value={newPost.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            className="bg-card/50 border border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
          <select
            value={newPost.category}
            onChange={(e) => handleFieldChange('category', e.target.value)}
            className="w-full p-2 rounded-lg bg-card/50 border border-border text-foreground"
          >
            <option value="Impact Stories">Impact Stories</option>
            <option value="Research">Research</option>
            <option value="Profiles">Profiles</option>
            <option value="Technology">Technology</option>
            <option value="Community">Community</option>
            <option value="Partnerships">Partnerships</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Short Description</label>
          <Textarea
            placeholder="Write a brief description that will appear in the blog listing..."
            value={newPost.excerpt}
            onChange={(e) => handleFieldChange('excerpt', e.target.value)}
            className="bg-card/50 border border-border text-foreground placeholder:text-muted-foreground resize-none h-24"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Full Content</label>
          <Textarea
            placeholder="Share your complete story here. Be detailed and authentic..."
            value={newPost.content}
            onChange={(e) => handleFieldChange('content', e.target.value)}
            className="bg-card/50 border border-border text-foreground placeholder:text-muted-foreground resize-none h-64"
          />
        </div>

        <div className="flex gap-4">
          <Button
            onClick={onPublish}
            disabled={!newPost.title || !newPost.excerpt || !newPost.content}
            variant="hero"
            className="disabled:from-gray-500 disabled:to-gray-600"
          >
            <Send className="h-4 w-4 mr-2" />
            Publish Story
          </Button>
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-primary text-primary hover:bg-primary/10"
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogWriteForm;
