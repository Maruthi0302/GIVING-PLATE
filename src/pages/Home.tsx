import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-community.jpg";
import childrenMeals from "@/assets/children-receiving-meals.jpg";
import foodTransformation from "@/assets/food-transformation.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Transform Surplus into{" "}
            <span className="text-gradient bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Smiles
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-slide-up max-w-2xl mx-auto">
            AI-powered food redistribution platform connecting surplus food with communities in need across India
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in">
            <Button variant="hero" size="xl" asChild>
              <Link to="/donate">Donate Food Now</Link>
            </Button>
            <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/request">Request Food</Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-yellow-300 count-up">15,847</div>
              <div className="text-white/80">Meals Shared</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-green-300 count-up">234</div>
              <div className="text-white/80">NGOs Connected</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-4xl font-bold text-orange-300 count-up">89</div>
              <div className="text-white/80">Active Donors</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform makes food redistribution seamless, efficient, and impactful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <Card className="card-hover border-none bg-white shadow-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Donate</h3>
                <p className="text-muted-foreground">
                  Restaurants, events, and individuals submit surplus food details through our easy-to-use platform
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="card-hover border-none bg-white shadow-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Match</h3>
                <p className="text-muted-foreground">
                  Our AI engine instantly matches donations with nearby NGOs based on location, dietary needs, and urgency
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="card-hover border-none bg-white shadow-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Feed</h3>
                <p className="text-muted-foreground">
                  Food reaches those in need quickly and safely, creating smiles and reducing waste
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Every Meal Matters
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                In India, 70 million tonnes of food is wasted annually while 194 million people go to bed hungry. 
                Giving Plate bridges this gap using technology and compassion.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-primary rounded-full mr-3"></div>
                  <span className="text-foreground">Zero food waste through intelligent matching</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-secondary rounded-full mr-3"></div>
                  <span className="text-foreground">Real-time delivery coordination</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-success rounded-full mr-3"></div>
                  <span className="text-foreground">Transparent impact tracking</span>
                </div>
              </div>
              <Button variant="donate" size="lg" asChild>
                <Link to="/about">Learn Our Story</Link>
              </Button>
            </div>
            <div className="relative">
              <img 
                src={childrenMeals} 
                alt="Children receiving meals" 
                className="rounded-2xl shadow-gentle w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-card">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Happiness Guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Technology Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src={foodTransformation} 
                alt="AI-powered food matching" 
                className="rounded-2xl shadow-gentle w-full"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                AI That Cares
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our intelligent matching engine considers distance, dietary requirements, expiry time, 
                and capacity to ensure every donation reaches the right place at the right time.
              </p>
              <div className="space-y-6 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-card">
                  <div className="font-semibold text-foreground mb-2">Smart Distance Matching</div>
                  <div className="text-sm text-muted-foreground">Connects donors with the nearest NGOs to minimize transport time</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-card">
                  <div className="font-semibold text-foreground mb-2">Urgency Prioritization</div>
                  <div className="text-sm text-muted-foreground">Prioritizes food based on expiry time to prevent waste</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-card">
                  <div className="font-semibold text-foreground mb-2">Dietary Compatibility</div>
                  <div className="text-sm text-muted-foreground">Matches vegetarian/non-vegetarian preferences automatically</div>
                </div>
              </div>
              <Button variant="hero" size="lg" asChild>
                <Link to="/ai-engine">Explore Our AI</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Voices of Impact
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stories from our community of donors, NGOs, and volunteers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="card-hover border-none shadow-card">
              <CardContent className="p-8">
                <div className="text-lg text-muted-foreground mb-6 italic">
                  "Giving Plate helped us redirect 200 kg of surplus food from our event to local orphanages. 
                  The platform made it so simple and the impact was immediate."
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">RP</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Raj Patel</div>
                    <div className="text-sm text-muted-foreground">Event Manager, Mumbai</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover border-none shadow-card">
              <CardContent className="p-8">
                <div className="text-lg text-muted-foreground mb-6 italic">
                  "The children at our home are so happy when fresh meals arrive through Giving Plate. 
                  Technology truly serving humanity at its best."
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">SR</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Sister Rosa</div>
                    <div className="text-sm text-muted-foreground">Hope Children's Home</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover border-none shadow-card">
              <CardContent className="p-8">
                <div className="text-lg text-muted-foreground mb-6 italic">
                  "As a volunteer, I've seen firsthand how this platform transforms waste into hope. 
                  Every delivery is a reminder of our shared humanity."
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">AS</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Arjun Singh</div>
                    <div className="text-sm text-muted-foreground">Volunteer Coordinator</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Join the Movement
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Together, we can end hunger and food waste in our communities. 
            Every meal shared is a step towards a more compassionate world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="xl" className="bg-white text-primary hover:bg-white/90 font-semibold" asChild>
              <Link to="/donate">Start Donating</Link>
            </Button>
            <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white hover:text-primary font-semibold" asChild>
              <Link to="/volunteer">Become a Volunteer</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
