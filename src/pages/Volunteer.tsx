import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Heart, Clock, MapPin, Star, Truck, CheckCircle, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import volunteersImage from "@/assets/volunteers-delivering.jpg";

const Volunteer = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    volunteerType: "",
    availability: "",
    experience: "",
    motivation: "",
    skills: [] as string[]
  });

  const volunteerTypes = [
    {
      type: "Food Delivery",
      icon: Truck,
      description: "Help transport food from donors to NGOs",
      commitment: "2-4 hours/week",
      requirements: "Own vehicle preferred",
      impact: "Direct food delivery to communities"
    },
    {
      type: "Community Outreach",
      icon: Users,
      description: "Connect with local NGOs and build partnerships",
      commitment: "3-5 hours/week",
      requirements: "Good communication skills",
      impact: "Expand our network and reach"
    },
    {
      type: "Tech Support",
      icon: Star,
      description: "Help with app testing and user support",
      commitment: "1-3 hours/week",
      requirements: "Basic tech knowledge",
      impact: "Improve platform experience"
    },
    {
      type: "Content Creation",
      icon: Heart,
      description: "Create stories and content about our impact",
      commitment: "2-3 hours/week",
      requirements: "Writing or design skills",
      impact: "Spread awareness and inspire others"
    }
  ];

  const volunteerStats = [
    { label: "Active Volunteers", value: "2,847", icon: Users },
    { label: "Hours Contributed", value: "15,420", icon: Clock },
    { label: "Food Deliveries", value: "8,932", icon: Truck },
    { label: "Communities Served", value: "156", icon: MapPin }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Food Delivery Volunteer",
      city: "Mumbai",
      quote: "Being able to directly connect surplus food with hungry families gives me immense satisfaction. It's amazing to see the smiles on children's faces.",
      months: 8
    },
    {
      name: "Rahul Kumar",
      role: "Community Outreach",
      city: "Delhi",
      quote: "Through Giving Plate, I've helped onboard 15 new NGOs in my area. The impact we can make together is incredible.",
      months: 12
    },
    {
      name: "Anita Patel",
      role: "Content Creator",
      city: "Bangalore",
      quote: "Sharing stories of impact and hope helps inspire more people to join our cause. Every story matters.",
      months: 6
    }
  ];

  const skills = [
    "Vehicle for delivery", "Photography", "Writing", "Social media", 
    "Event planning", "Public speaking", "Translation", "Fundraising",
    "Web development", "Graphic design", "Community organizing", "Teaching"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Volunteer Application Submitted!",
      description: "Thank you for your interest. We'll contact you within 48 hours with next steps.",
    });
  };

  const handleSkillChange = (skill: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    } else {
      setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-warning/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <img 
            src={volunteersImage} 
            alt="Volunteers Delivering Food"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-2 mb-6 animate-fade-in">
            <Heart className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Join Our Mission</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            Become a 
            <span className="text-gradient block">Food Hero</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            Join thousands of volunteers making a difference in their communities. 
            Every hour you contribute helps feed someone in need.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {volunteerStats.map((stat, index) => (
            <Card key={stat.label} className="bg-white/70 backdrop-blur-xl border-0 shadow-gentle hover:shadow-warm transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6 text-center">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2 count-up">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Volunteer Types */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Choose Your Impact</h2>
              <p className="text-lg text-muted-foreground">
                Find the perfect way to contribute based on your skills and availability
              </p>
            </div>

            <div className="space-y-6">
              {volunteerTypes.map((volunteer, index) => (
                <Card key={volunteer.type} className="bg-gradient-card backdrop-blur-xl border-0 shadow-gentle hover:shadow-warm transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <volunteer.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{volunteer.type}</CardTitle>
                        <CardDescription className="mt-2">{volunteer.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="p-3 bg-white/30 rounded-lg">
                        <div className="font-medium text-primary">{volunteer.commitment}</div>
                        <div className="text-muted-foreground">Time Commitment</div>
                      </div>
                      <div className="p-3 bg-white/30 rounded-lg">
                        <div className="font-medium text-secondary">{volunteer.requirements}</div>
                        <div className="text-muted-foreground">Requirements</div>
                      </div>
                      <div className="p-3 bg-white/30 rounded-lg">
                        <div className="font-medium text-warning">{volunteer.impact}</div>
                        <div className="text-muted-foreground">Your Impact</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-warm animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Volunteer Application
              </CardTitle>
              <CardDescription>
                Join our community of changemakers and start making a difference today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-white/50 backdrop-blur"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-white/50 backdrop-blur"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-white/50 backdrop-blur"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Select onValueChange={(value) => setFormData({...formData, city: value})}>
                      <SelectTrigger className="bg-white/50 backdrop-blur">
                        <SelectValue placeholder="Select your city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                        <SelectItem value="chennai">Chennai</SelectItem>
                        <SelectItem value="hyderabad">Hyderabad</SelectItem>
                        <SelectItem value="pune">Pune</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="volunteerType">Preferred Role</Label>
                    <Select onValueChange={(value) => setFormData({...formData, volunteerType: value})}>
                      <SelectTrigger className="bg-white/50 backdrop-blur">
                        <SelectValue placeholder="Choose your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delivery">Food Delivery</SelectItem>
                        <SelectItem value="outreach">Community Outreach</SelectItem>
                        <SelectItem value="tech">Tech Support</SelectItem>
                        <SelectItem value="content">Content Creation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Select onValueChange={(value) => setFormData({...formData, availability: value})}>
                      <SelectTrigger className="bg-white/50 backdrop-blur">
                        <SelectValue placeholder="Time commitment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 hours/week</SelectItem>
                        <SelectItem value="3-5">3-5 hours/week</SelectItem>
                        <SelectItem value="6-10">6-10 hours/week</SelectItem>
                        <SelectItem value="10+">10+ hours/week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Skills & Resources (Select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {skills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={formData.skills.includes(skill)}
                          onCheckedChange={(checked) => handleSkillChange(skill, checked as boolean)}
                        />
                        <Label htmlFor={skill} className="text-sm">{skill}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motivation">Why do you want to volunteer?</Label>
                  <Textarea
                    id="motivation"
                    placeholder="Tell us what motivates you to join our mission..."
                    value={formData.motivation}
                    onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                    className="bg-white/50 backdrop-blur"
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-gradient-primary hover:shadow-warm">
                  <Heart className="h-5 w-5 mr-2" />
                  Join as Volunteer
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Hear from Our Heroes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stories from volunteers who are making a real difference in their communities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.name} className="bg-gradient-card backdrop-blur-xl border-0 shadow-gentle hover:shadow-warm transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.city}</div>
                    </div>
                  </div>
                  
                  <blockquote className="text-sm italic text-muted-foreground mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">
                      <Calendar className="h-3 w-3 mr-1" />
                      {testimonial.months} months
                    </Badge>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;