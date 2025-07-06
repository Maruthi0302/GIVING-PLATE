import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Donate = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    foodType: "",
    quantity: "",
    expiryTime: "",
    pickupAddress: "",
    dietaryTags: "",
    description: "",
    contactPhone: "",
    contactName: ""
  });

  const [urgencyScore, setUrgencyScore] = useState(0);

  const calculateUrgency = (expiryTime: string) => {
    if (!expiryTime) return 0;
    const now = new Date();
    const expiry = new Date(expiryTime);
    const hoursToExpiry = Math.max(0, (expiry.getTime() - now.getTime()) / (1000 * 60 * 60));
    return Math.min(10, Math.round(10 / Math.max(1, hoursToExpiry)));
  };

  const handleExpiryChange = (value: string) => {
    setFormData(prev => ({ ...prev, expiryTime: value }));
    setUrgencyScore(calculateUrgency(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.foodType || !formData.quantity || !formData.pickupAddress) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Store donation data in localStorage for AI engine
    const donationData = {
      ...formData,
      urgencyScore,
      timestamp: new Date().toISOString(),
      id: Date.now()
    };
    
    const existingDonations = JSON.parse(localStorage.getItem('foodDonations') || '[]');
    existingDonations.push(donationData);
    localStorage.setItem('foodDonations', JSON.stringify(existingDonations));

    toast({
      title: "🎉 Donation Submitted Successfully!",
      description: "Redirecting to AI matching engine...",
    });

    // Redirect to AI engine with donation data
    setTimeout(() => {
      navigate('/ai-engine?donation=' + donationData.id);
    }, 1500);
  };

  const getUrgencyColor = (score: number) => {
    if (score >= 7) return "text-destructive";
    if (score >= 4) return "text-warning";
    return "text-success";
  };

  const getUrgencyMessage = (score: number) => {
    if (score >= 7) return "🔥 High Priority - Expires very soon!";
    if (score >= 4) return "⚡ Medium Priority - Act quickly";
    return "✅ Low Priority - Good shelf life";
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Donate Food
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your surplus food into smiles. Our AI will instantly match you with nearby NGOs who need exactly what you're offering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-gentle">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Donation Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Food Type */}
                  <div className="space-y-2">
                    <Label htmlFor="foodType">Food Type *</Label>
                    <Select value={formData.foodType} onValueChange={(value) => setFormData(prev => ({ ...prev, foodType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select food type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cooked-meals">Cooked Meals</SelectItem>
                        <SelectItem value="raw-vegetables">Raw Vegetables</SelectItem>
                        <SelectItem value="fruits">Fruits</SelectItem>
                        <SelectItem value="grains-pulses">Grains & Pulses</SelectItem>
                        <SelectItem value="dairy">Dairy Products</SelectItem>
                        <SelectItem value="bakery">Bakery Items</SelectItem>
                        <SelectItem value="packaged-food">Packaged Food</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity/Portions *</Label>
                    <Input
                      id="quantity"
                      placeholder="e.g., 50 meals, 10 kg rice, 20 bread loaves"
                      value={formData.quantity}
                      onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                    />
                  </div>

                  {/* Expiry Time */}
                  <div className="space-y-2">
                    <Label htmlFor="expiryTime">Best Before / Expiry Time</Label>
                    <Input
                      id="expiryTime"
                      type="datetime-local"
                      value={formData.expiryTime}
                      onChange={(e) => handleExpiryChange(e.target.value)}
                    />
                    {urgencyScore > 0 && (
                      <div className={`text-sm font-medium ${getUrgencyColor(urgencyScore)}`}>
                        Urgency Score: {urgencyScore}/10 - {getUrgencyMessage(urgencyScore)}
                      </div>
                    )}
                  </div>

                  {/* Dietary Tags */}
                  <div className="space-y-2">
                    <Label htmlFor="dietaryTags">Dietary Tags</Label>
                    <Select value={formData.dietaryTags} onValueChange={(value) => setFormData(prev => ({ ...prev, dietaryTags: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select dietary preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                        <SelectItem value="mixed">Mixed (Veg & Non-Veg)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Pickup Address */}
                  <div className="space-y-2">
                    <Label htmlFor="pickupAddress">Pickup Address *</Label>
                    <Textarea
                      id="pickupAddress"
                      placeholder="Complete address with landmarks for easy pickup"
                      value={formData.pickupAddress}
                      onChange={(e) => setFormData(prev => ({ ...prev, pickupAddress: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  {/* Contact Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Name</Label>
                      <Input
                        id="contactName"
                        placeholder="Your name"
                        value={formData.contactName}
                        onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Contact Phone</Label>
                      <Input
                        id="contactPhone"
                        placeholder="+91-XXXXX-XXXXX"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Additional Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Additional Details</Label>
                    <Textarea
                      id="description"
                      placeholder="Any special instructions, cooking method, allergens, etc."
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" variant="donate" size="lg" className="w-full">
                    🚀 Find Perfect Match & Donate
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* AI Matching Info */}
            <Card className="border-none shadow-gentle">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">🤖 AI Smart Matching</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Our AI considers:
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    Distance to NGOs
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                    Dietary compatibility
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                    Capacity requirements
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-warning rounded-full mr-2"></div>
                    Urgency based on expiry
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-none shadow-gentle">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">📊 Today's Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">147</div>
                  <div className="text-sm text-muted-foreground">Meals donated today</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">23</div>
                  <div className="text-sm text-muted-foreground">NGOs served</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">8.2</div>
                  <div className="text-sm text-muted-foreground">Avg matching time (min)</div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-none shadow-gentle bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-lg text-destructive">🚨 Emergency Donation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Large quantity? Expiring very soon? Call our emergency hotline:
                </p>
                <Button variant="destructive" size="sm" className="w-full">
                  📞 1800-FOOD-NOW
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;