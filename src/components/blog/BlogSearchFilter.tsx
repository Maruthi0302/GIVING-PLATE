
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

interface Category {
  id: string;
  name: string;
  count: number;
}

interface BlogSearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: Category[];
}

const BlogSearchFilter = ({ 
  searchTerm, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange, 
  categories 
}: BlogSearchFilterProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search stories, articles, and insights..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-card/50 backdrop-blur border border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <Tabs value={selectedCategory} onValueChange={onCategoryChange} className="w-full md:w-auto">
        <TabsList className="bg-card/50 backdrop-blur border border-border">
          {categories.slice(0, 5).map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-xs text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-white">
              {category.name} ({category.count})
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default BlogSearchFilter;
