import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ngoDistributionImage from "@/assets/ngo-food-distribution.jpg";

const RequestFood = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    mealsNeeded: "",
    dietaryPreference: "",
    urgencyLevel: "",
    specialRequirements: "",
    deliveryTime: ""
  });

  const [availableDonations, setAvailableDonations] = useState<any[]>([]);

  useEffect(() => {
    // Load donations from localStorage
    const donations = JSON.parse(localStorage.getItem('foodDonations') || '[]');
    const availableDonations = donations
      .filter((d: any) => !d.status || d.status !== 'dispatched')
      .map((d: any) => ({
        id: d.id,
        donor: d.contactName || "Anonymous Donor",
        foodType: d.foodType,
        quantity: d.quantity,
        expiry: d.expiryTime ? `${Math.ceil((new Date(d.expiryTime).getTime() - new Date().getTime()) / (1000 * 60 * 60))} hours` : "Good condition",
        distance: "1-3 km", // Mock distance
        status: "available",
        urgencyScore: d.urgencyScore || 5,
        dietaryTags: d.dietaryTags,
        description: d.description,
        contactPhone: d.contactPhone
      }));
    setAvailableDonations(availableDonations);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store request data
    const requestData = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now(),
      status: 'pending'
    };
    
    const existingRequests = JSON.parse(localStorage.getItem('foodRequests') || '[]');
    existingRequests.push(requestData);
    localStorage.setItem('foodRequests', JSON.stringify(existingRequests));
    
    toast({
      title: "Food Request Submitted!",
      description: "We're matching you with nearby donors. You'll be notified within 15 minutes.",
    });
  };

  const handleAcceptDonation = (donationId: number) => {
    toast({
      title: "Donation Accepted!",
      description: "Donor has been notified. Pickup details will be shared shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <img 
            src={ngoDistributionImage} 
            alt="NGO Food Distribution"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-2 mb-6 animate-fade-in">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">For NGOs & Organizations</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            Request Food for 
            <span className="text-gradient block">Your Community</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Connect with generous donors in your area. Our AI matches your needs with available surplus food in real-time.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Request Form */}
          <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-warm animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                Submit Food Request
              </CardTitle>
              <CardDescription>
                Fill out your requirements and get matched with nearby donors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organizationName">Organization Name</Label>
                    <Input
                      id="organizationName"
                      placeholder="Hope Foundation"
                      value={formData.organizationName}
                      onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                      className="bg-white/50 backdrop-blur"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input
                      id="contactPerson"
                      placeholder="John Doe"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                      className="bg-white/50 backdrop-blur"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@hopefoundation.org"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-white/50 backdrop-blur"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-white/50 backdrop-blur"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Complete address with landmarks"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="bg-white/50 backdrop-blur"
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mealsNeeded">Meals Needed</Label>
                    <Input
                      id="mealsNeeded"
                      type="number"
                      placeholder="50"
                      value={formData.mealsNeeded}
                      onChange={(e) => setFormData({...formData, mealsNeeded: e.target.value})}
                      className="bg-white/50 backdrop-blur"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dietaryPreference">Dietary Preference</Label>
                    <Select onValueChange={(value) => setFormData({...formData, dietaryPreference: value})}>
                      <SelectTrigger className="bg-white/50 backdrop-blur">
                        <SelectValue placeholder="Select preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="any">Any</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="urgencyLevel">Urgency Level</Label>
                    <Select onValueChange={(value) => setFormData({...formData, urgencyLevel: value})}>
                      <SelectTrigger className="bg-white/50 backdrop-blur">
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
                  <Label htmlFor="deliveryTime">Preferred Delivery Time</Label>
                  <Input
                    id="deliveryTime"
                    type="datetime-local"
                    value={formData.deliveryTime}
                    onChange={(e) => setFormData({...formData, deliveryTime: e.target.value})}
                    className="bg-white/50 backdrop-blur"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequirements">Special Requirements</Label>
                  <Textarea
                    id="specialRequirements"
                    placeholder="Any special dietary needs, allergies, or requirements..."
                    value={formData.specialRequirements}
                    onChange={(e) => setFormData({...formData, specialRequirements: e.target.value})}
                    className="bg-white/50 backdrop-blur"
                    rows={3}
                  />
                </div>

                <Button type="submit" size="lg" variant="request" className="w-full">
                  <MapPin className="h-5 w-5 mr-2" />
                  Submit Food Request
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Available Donations */}
          <div className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-warm animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Clock className="h-6 w-6 text-primary" />
                  Available Donations Nearby
                </CardTitle>
                <CardDescription>
                  Real-time donations in your area sorted by urgency and distance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {availableDonations.map((donation, index) => (
                  <Card 
                    key={donation.id} 
                    className={`bg-gradient-card backdrop-blur border-0 shadow-gentle hover:shadow-warm transition-all duration-300 animate-fade-in`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{donation.donor}</h4>
                          <p className="text-sm text-muted-foreground">{donation.foodType}</p>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={donation.status === 'available' ? 'default' : 'secondary'}
                            className="mb-1"
                          >
                            {donation.status === 'available' ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <AlertCircle className="h-3 w-3 mr-1" />
                            )}
                            {donation.status}
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            Score: {donation.urgencyScore}/10
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                        <div className="text-center p-2 bg-white/30 rounded-lg">
                          <div className="font-medium text-primary">{donation.quantity}</div>
                          <div className="text-xs text-muted-foreground">Quantity</div>
                        </div>
                        <div className="text-center p-2 bg-white/30 rounded-lg">
                          <div className="font-medium text-warning">{donation.expiry}</div>
                          <div className="text-xs text-muted-foreground">Expires in</div>
                        </div>
                        <div className="text-center p-2 bg-white/30 rounded-lg">
                          <div className="font-medium text-secondary">{donation.distance}</div>
                          <div className="text-xs text-muted-foreground">Distance</div>
                        </div>
                      </div>

                      {donation.status === 'available' && (
                        <Button 
                          onClick={() => handleAcceptDonation(donation.id)}
                          variant="success" 
                          size="sm" 
                          className="w-full"
                        >
                          Accept Donation
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gradient-primary text-white border-0 shadow-warm animate-fade-in">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Today's Impact</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">143</div>
                    <div className="text-sm opacity-90">Meals Distributed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">12</div>
                    <div className="text-sm opacity-90">Active Donors</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestFood;