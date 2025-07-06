
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import blogStoriesImage from "@/assets/blog-stories.jpg";
import BlogHero from "@/components/blog/BlogHero";
import BlogStats from "@/components/blog/BlogStats";
import BlogFeaturedPost from "@/components/blog/BlogFeaturedPost";
import BlogSearchFilter from "@/components/blog/BlogSearchFilter";
import BlogPostGrid from "@/components/blog/BlogPostGrid";
import BlogWriteForm from "@/components/blog/BlogWriteForm";
import BlogNewsletter from "@/components/blog/BlogNewsletter";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("read");
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Impact Stories"
  });
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "From Waste to Wonder: How 10,000 Meals Changed Mumbai's Hunger Landscape",
      excerpt: "The incredible story of how a single restaurant's surplus food initiative sparked a city-wide movement, connecting 200+ donors with 50+ NGOs in just 6 months.",
      author: "Priya Sharma",
      date: "December 28, 2024",
      readTime: "8 min read",
      category: "Impact Stories",
      image: blogStoriesImage,
      featured: true,
      views: "2.1k",
      likes: 89
    },
    {
      id: 2,
      title: "The Science Behind Food Waste: Why Every Grain Matters",
      excerpt: "Understanding the environmental impact of food waste and how technology can help reduce it by 70% in urban areas.",
      author: "Dr. Rajesh Kumar",
      date: "December 25, 2024",
      readTime: "6 min read",
      category: "Research",
      views: "1.8k",
      likes: 67
    },
    {
      id: 3,
      title: "Meet Anita: The NGO Leader Feeding 500 Children Daily",
      excerpt: "A heartwarming profile of an NGO founder who transformed her small organization into a major food distribution center.",
      author: "Meera Patel",
      date: "December 22, 2024",
      readTime: "5 min read",
      category: "Profiles",
      views: "1.5k",
      likes: 94
    },
    {
      id: 4,
      title: "AI in Action: How Machine Learning Predicts Food Surplus",
      excerpt: "Exploring the algorithms that help us predict restaurant surplus patterns and optimize food distribution timing.",
      author: "Tech Team",
      date: "December 20, 2024",
      readTime: "7 min read",
      category: "Technology",
      views: "1.2k",
      likes: 45
    },
    {
      id: 5,
      title: "Community Kitchens: Building Hope One Meal at a Time",
      excerpt: "How neighborhood cooking initiatives are creating sustainable food security networks across Indian cities.",
      author: "Ravi Singh",
      date: "December 18, 2024",
      readTime: "4 min read",
      category: "Community",
      views: "2.3k",
      likes: 112
    },
    {
      id: 6,
      title: "Corporate Social Responsibility: Companies Leading the Change",
      excerpt: "Success stories of how major corporations are partnering with us to tackle hunger through systematic food donation programs.",
      author: "Business Team",
      date: "December 15, 2024",
      readTime: "6 min read",
      category: "Partnerships",
      views: "987",
      likes: 76
    }
  ]);

  const categories = [
    { id: "all", name: "All Posts", count: blogPosts.length },
    { id: "impact", name: "Impact Stories", count: 3 },
    { id: "research", name: "Research", count: 2 },
    { id: "profiles", name: "Profiles", count: 2 },
    { id: "technology", name: "Technology", count: 1 },
    { id: "community", name: "Community", count: 1 }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           post.category.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);

  const handlePublishPost = () => {
    if (newPost.title && newPost.excerpt && newPost.content) {
      const newBlogPost = {
        id: blogPosts.length + 1,
        ...newPost,
        author: "Community Writer",
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        readTime: `${Math.ceil(newPost.content.length / 200)} min read`,
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        views: "0",
        likes: 0,
        featured: false
      };
      
      setBlogPosts([newBlogPost, ...blogPosts]);
      setNewPost({ title: "", excerpt: "", content: "", category: "Impact Stories" });
      setActiveTab("read");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <BlogHero activeTab={activeTab} onTabChange={setActiveTab} />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="container mx-auto px-4 pb-20 mt-16">
          <TabsContent value="read" className="space-y-16">
            <BlogStats postsCount={blogPosts.length} />
            <BlogFeaturedPost featuredPost={featuredPost} />
            <BlogSearchFilter 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
            />
            <BlogPostGrid posts={filteredPosts} />
          </TabsContent>

          <TabsContent value="write" className="space-y-8">
            <BlogWriteForm 
              newPost={newPost}
              onUpdatePost={setNewPost}
              onPublish={handlePublishPost}
              onCancel={() => setActiveTab("read")}
            />
          </TabsContent>
        </div>
      </Tabs>

      <div className="container mx-auto px-4 pb-20">
        <BlogNewsletter />
      </div>
    </div>
  );
};

export default Blog;
