
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Users, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ngoDistributionImage from "@/assets/ngo-food-distribution.jpg";

const RequestFoodForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    organizationType: "",
    registrationNumber: "",
    mealsNeeded: "",
    urgencyLevel: "",
    specialRequirements: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.organizationName || !formData.contactPerson || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Store verification data
    const verificationData = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now(),
      status: 'verified'
    };
    
    localStorage.setItem('userVerification', JSON.stringify(verificationData));
    
    // Create active food request
    const foodRequest = {
      id: Date.now(),
      organizationName: formData.organizationName,
      organizationType: formData.organizationType,
      mealsNeeded: formData.mealsNeeded || "Not specified",
      urgencyLevel: formData.urgencyLevel || "Medium",
      specialRequirements: formData.specialRequirements || "None",
      address: formData.address,
      contactPerson: formData.contactPerson,
      phone: formData.phone,
      email: formData.email,
      status: 'active',
      timestamp: new Date().toISOString(),
      requestType: 'food_request'
    };

    // Store the food request
    const existingRequests = JSON.parse(localStorage.getItem('activeFoodRequests') || '[]');
    existingRequests.push(foodRequest);
    localStorage.setItem('activeFoodRequests', JSON.stringify(existingRequests));
    
    toast({
      title: "Verification Complete!",
      description: "Redirecting to food request portal...",
    });

    // Redirect to actual request food page after verification
    setTimeout(() => {
      navigate('/request-food-portal');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Hero Section - Improved contrast */}
      <div className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <img 
            src={ngoDistributionImage} 
            alt="NGO Food Distribution"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-secondary/80"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-6 py-2 mb-6 animate-fade-in">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Verified Organizations Only</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up text-white drop-shadow-lg">
            Request Food 
            <span className="text-white block drop-shadow-lg">Verification</span>
          </h1>
          
          <p className="text-xl text-white/95 max-w-2xl mx-auto animate-fade-in drop-shadow-md">
            Please verify your organization details to access our food request portal and connect with generous donors.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-xl border border-primary/20 shadow-lg animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardTitle className="text-2xl flex items-center gap-2 text-foreground">
                <Users className="h-6 w-6 text-primary" />
                Organization Verification
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Help us verify your organization to prevent spam and ensure food reaches genuine beneficiaries
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organizationName" className="text-foreground font-medium">Organization Name *</Label>
                    <Input
                      id="organizationName"
                      placeholder="Hope Foundation"
                      value={formData.organizationName}
                      onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                      className="bg-white border-input focus:border-primary"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson" className="text-foreground font-medium">Contact Person *</Label>
                    <Input
                      id="contactPerson"
                      placeholder="John Doe"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                      className="bg-white border-input focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">Official Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@hopefoundation.org"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-white border-input focus:border-primary"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground font-medium">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-white border-input focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-foreground font-medium">Organization Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Complete address with landmarks"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="bg-white border-input focus:border-primary"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organizationType" className="text-foreground font-medium">Organization Type</Label>
                    <Select onValueChange={(value) => setFormData({...formData, organizationType: value})}>
                      <SelectTrigger className="bg-white border-input focus:border-primary">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ngo">NGO</SelectItem>
                        <SelectItem value="orphanage">Orphanage</SelectItem>
                        <SelectItem value="old-age-home">Old Age Home</SelectItem>
                        <SelectItem value="community-center">Community Center</SelectItem>
                        <SelectItem value="school">School</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber" className="text-foreground font-medium">Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      placeholder="Govt. registration number"
                      value={formData.registrationNumber}
                      onChange={(e) => setFormData({...formData, registrationNumber: e.target.value})}
                      className="bg-white border-input focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mealsNeeded" className="text-foreground font-medium">Daily Meals Required</Label>
                    <Input
                      id="mealsNeeded"
                      type="number"
                      placeholder="50"
                      value={formData.mealsNeeded}
                      onChange={(e) => setFormData({...formData, mealsNeeded: e.target.value})}
                      className="bg-white border-input focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="urgencyLevel" className="text-foreground font-medium">Current Need Level</Label>
                    <Select onValueChange={(value) => setFormData({...formData, urgencyLevel: value})}>
                      <SelectTrigger className="bg-white border-input focus:border-primary">
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequirements" className="text-foreground font-medium">Special Requirements</Label>
                  <Textarea
                    id="specialRequirements"
                    placeholder="Any special dietary needs, serving times, or requirements..."
                    value={formData.specialRequirements}
                    onChange={(e) => setFormData({...formData, specialRequirements: e.target.value})}
                    className="bg-white border-input focus:border-primary"
                    rows={3}
                  />
                </div>

                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-1" />
                    <div className="text-sm">
                      <div className="font-semibold text-foreground mb-1">Why do we verify?</div>
                      <div className="text-muted-foreground">
                        We verify organizations to ensure food reaches genuine beneficiaries and prevent misuse of our platform.
                        Your information is kept secure and used only for verification purposes.
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
                  <MapPin className="h-5 w-5 mr-2" />
                  Verify & Access Food Request Portal
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RequestFoodForm;
