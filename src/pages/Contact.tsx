import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MessageSquare, Headphones, Users, Heart, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import contactSupportImage from "@/assets/contact-support.jpg";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
    urgency: ""
  });

  const contactMethods = [
    {
      icon: Phone,
      title: "Emergency Hotline",
      description: "Urgent food requests & immediate support",
      details: "+91 1800-GIVING (1800-448464)",
      availability: "24/7 Available",
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    },
    {
      icon: Mail,
      title: "General Support",
      description: "Questions, partnerships & feedback",
      details: "hello@givingplate.org",
      availability: "Response within 2 hours",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Real-time support & quick assistance",
      details: "Available on website",
      availability: "9 AM - 9 PM daily",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: Users,
      title: "Partnership Inquiries",
      description: "NGO partnerships & corporate collaboration",
      details: "partnerships@givingplate.org",
      availability: "Business hours",
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  const faqs = [
    {
      question: "How quickly can food be matched with NGOs?",
      answer: "Our AI typically matches food donations within 3-15 minutes during peak hours. Urgent requests are prioritized and can be matched in under 60 seconds."
    },
    {
      question: "What types of food can be donated?",
      answer: "We accept fresh cooked meals, packaged foods, fruits, vegetables, and dry goods. All donations must be within safety guidelines and clearly labeled with preparation time."
    },
    {
      question: "How do you ensure food safety?",
      answer: "We have strict food safety protocols, including temperature checks, time limits, and verified donor-NGO partnerships. All participants receive food safety training."
    },
    {
      question: "Is there a cost to use the platform?",
      answer: "Giving Plate is completely free for NGOs and individual donors. We're supported by corporate partnerships and grants to keep our mission accessible to all."
    },
    {
      question: "How can I volunteer with Giving Plate?",
      answer: "You can sign up as a volunteer through our platform. We need help with food pickup, delivery, community outreach, and tech support across different cities."
    },
    {
      question: "What impact metrics do you track?",
      answer: "We track meals saved from waste, people fed, CO2 emissions reduced, and partner satisfaction. All metrics are transparently shared on our impact dashboard."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent Successfully!",
      description: "Thank you for reaching out. We'll respond within 2 hours during business hours.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      category: "",
      message: "",
      urgency: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <img 
            src={contactSupportImage} 
            alt="Contact Support"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-2 mb-6">
            <Headphones className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">We're Here to Help</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Get in
            <span className="text-gradient block">Touch</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions? Need support? Want to partner with us? 
            Our team is ready to help you make a difference.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <Card key={method.title} className="bg-white/70 backdrop-blur-xl border-0 shadow-gentle hover:shadow-warm transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${method.bgColor} flex items-center justify-center`}>
                  <method.icon className={`h-8 w-8 ${method.color}`} />
                </div>
                <h3 className="font-bold mb-2">{method.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                <div className="text-sm font-medium mb-2">{method.details}</div>
                <Badge variant="outline" className="text-xs">{method.availability}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-warm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                Send us a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible
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
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-white/50 backdrop-blur"
                      required
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
                    <Label htmlFor="category">Message Category</Label>
                    <Select onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger className="bg-white/50 backdrop-blur">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="support">General Support</SelectItem>
                        <SelectItem value="technical">Technical Issues</SelectItem>
                        <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="media">Media Inquiry</SelectItem>
                        <SelectItem value="urgent">Urgent Food Request</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief subject line"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="bg-white/50 backdrop-blur"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="urgency">Priority Level</Label>
                    <Select onValueChange={(value) => setFormData({...formData, urgency: value})}>
                      <SelectTrigger className="bg-white/50 backdrop-blur">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - General inquiry</SelectItem>
                        <SelectItem value="medium">Medium - Need response soon</SelectItem>
                        <SelectItem value="high">High - Urgent matter</SelectItem>
                        <SelectItem value="critical">Critical - Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please provide as much detail as possible..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-white/50 backdrop-blur min-h-32"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-gradient-primary hover:shadow-warm">
                  <Mail className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQ Section - Enhanced */}
          <div className="space-y-8">
            <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-gentle">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <HelpCircle className="h-6 w-6 text-primary" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Quick answers to common questions about our platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-4 bg-gradient-card rounded-lg hover:shadow-gentle transition-shadow duration-200">
                    <h4 className="font-medium mb-2 text-foreground">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gradient-primary text-white border-0 shadow-warm">
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 mx-auto mb-4 opacity-80" />
                <h3 className="text-2xl font-bold mb-2">Need Immediate Help?</h3>
                <p className="text-white/90 mb-6">
                  Our support team responds to urgent requests within minutes
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm text-white/80">Support</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">&lt;2min</div>
                    <div className="text-sm text-white/80">Response</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm text-white/80">Resolved</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Contact - Enhanced */}
        <Card className="bg-gradient-hero text-white border-0 shadow-velvet mt-16 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          
          <CardContent className="p-12 text-center relative">
            <Phone className="h-20 w-20 mx-auto mb-6 opacity-80 animate-pulse" />
            <h3 className="text-4xl font-bold mb-4">Emergency Food Support</h3>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              For urgent food requests or emergency situations, call our 24/7 helpline immediately. 
              Our AI system will instantly connect you with nearby resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="px-8 shadow-warm group">
                <Phone className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                Call Emergency Hotline
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
                <MessageSquare className="h-5 w-5 mr-2" />
                Start Live Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;