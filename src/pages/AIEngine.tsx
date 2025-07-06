import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { MapPin, Clock, Users, Send, CheckCircle, Phone, Mail, Brain, Loader, AlertCircle, Search, Building2, Utensils } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Google Maps types
declare global {
  interface Window {
    google: any;
  }
}

interface Place {
  id: string;
  name: string;
  type: 'ngo' | 'restaurant' | 'orphanage' | 'food_establishment' | 'old_age_home';
  lat: number;
  lng: number;
  distance: string;
  address: string;
  contact?: string;
  email?: string;
  capacity?: string;
  urgent?: boolean;
  rating?: number;
  category?: string;
}

const AIEngine = () => {
  const [searchParams] = useSearchParams();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedNGO, setSelectedNGO] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDonation, setCurrentDonation] = useState<any>(null);
  const [activeFoodRequests, setActiveFoodRequests] = useState<any[]>([]);
  const [requestStatus, setRequestStatus] = useState<string | null>(null);
  const [mapRadius, setMapRadius] = useState(5); // km
  const [nearbyPlaces, setNearbyPlaces] = useState<Place[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const { toast } = useToast();

  // Map refs
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const userCircleRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const placeMarkersRef = useRef<any[]>([]);

  // Mock NGO data (keeping existing for compatibility)
  const nearbyNGOs = [
    {
      id: 1,
      name: "Hope Foundation",
      type: "Orphanage",
      distance: "0.8 km",
      capacity: "150 meals",
      urgent: true,
      contact: "+91 9876543210",
      email: "hope@foundation.org",
      lat: 28.6139,
      lng: 77.2090,
      address: "Sector 15, Dwarka, New Delhi"
    },
    {
      id: 2,
      name: "Care for Elderly",
      type: "Old Age Home",
      distance: "1.2 km",
      capacity: "80 meals",
      urgent: false,
      contact: "+91 9876543211",
      email: "care@elderly.org",
      lat: 28.6129,
      lng: 77.2080,
      address: "Block A, Dwarka, New Delhi"
    },
    {
      id: 3,
      name: "Children's Shelter",
      type: "NGO",
      distance: "2.1 km",
      capacity: "200 meals",
      urgent: true,
      contact: "+91 9876543212",
      email: "shelter@children.org",
      lat: 28.6149,
      lng: 77.2100,
      address: "Phase 2, Dwarka, New Delhi"
    },
    {
      id: 4,
      name: "Seva Foundation",
      type: "Community Kitchen",
      distance: "2.8 km",
      capacity: "300 meals",
      urgent: false,
      contact: "+91 9876543213",
      email: "seva@foundation.org",
      lat: 28.6159,
      lng: 77.2110,
      address: "Sector 8, Dwarka, New Delhi"
    }
  ];

  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        setMapLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBkPlSfnsg8qEbErwVRdnp8mjblY6E0zpU&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  // Initialize map when API is loaded
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || !userLocation) return;

    const initMap = () => {
      const mapOptions = {
        center: userLocation,
        zoom: 13,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      };

      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, mapOptions);

      // Add user marker
      userMarkerRef.current = new window.google.maps.Marker({
        position: userLocation,
        map: mapInstanceRef.current,
        title: "You are here",
        icon: {
          url: "https://maps.gstatic.com/mapfiles/ms2/micons/man.png",
          scaledSize: new window.google.maps.Size(32, 32)
        }
      });

      // Add radius circle
      userCircleRef.current = new window.google.maps.Circle({
        map: mapInstanceRef.current,
        center: userLocation,
        radius: mapRadius * 1000, // Convert km to meters
        fillColor: '#AAD1E6',
        strokeColor: '#0077CC',
        strokeWeight: 2,
        fillOpacity: 0.3
      });

      // Load nearby places
      fetchNearbyPlaces();
    };

    initMap();
  }, [mapLoaded, userLocation, mapRadius]);

    // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          // Fallback to Delhi coordinates
          setUserLocation({ lat: 28.6139, lng: 77.2090 });
        }
      );
    } else {
      setUserLocation({ lat: 28.6139, lng: 77.2090 });
    }

    // Load donation data if coming from donate page
    const donationId = searchParams.get('donation');
    if (donationId) {
      const donations = JSON.parse(localStorage.getItem('foodDonations') || '[]');
      const donation = donations.find((d: any) => d.id.toString() === donationId);
      if (donation) {
        setCurrentDonation(donation);
      }
    }

    // Load active food requests
    const requests = JSON.parse(localStorage.getItem('activeFoodRequests') || '[]');
    setActiveFoodRequests(requests);
  }, [searchParams]);

  // Fetch nearby places using Geoapify API
  const fetchNearbyPlaces = async () => {
    if (!userLocation) return;

    try {
      // Clear existing markers
      placeMarkersRef.current.forEach(marker => marker.setMap(null));
      placeMarkersRef.current = [];

      const apiKey = "5e096efcdac5443fb33e0d56fb288612";
      const url = `https://api.geoapify.com/v2/places?categories=commercial.food_and_drink&filter=circle:${userLocation.lng},${userLocation.lat},${mapRadius * 1000}&limit=15&apiKey=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      const places: Place[] = [];

      if (data.features && data.features.length > 0) {
        data.features.forEach((place: any, index: number) => {
          const placeLocation = {
            lat: place.geometry.coordinates[1],
            lng: place.geometry.coordinates[0]
          };

          // Calculate distance
          const distance = calculateDistance(
            userLocation.lat, userLocation.lng,
            placeLocation.lat, placeLocation.lng
          );

          const placeData: Place = {
            id: `place-${index}`,
            name: place.properties.name || "Food Establishment",
            type: 'food_establishment',
            lat: placeLocation.lat,
            lng: placeLocation.lng,
            distance: `${distance.toFixed(1)} km`,
            address: place.properties.address_line1 || place.properties.address_line2 || "Address not available",
            category: Array.isArray(place.properties.categories)
              ? place.properties.categories[0]
              : typeof place.properties.categories === "string"
                ? place.properties.categories.split(',')[0]
                : "Restaurant",
            rating: place.properties.rating || 4.0
          };

          places.push(placeData);

          // Add marker to map
          const marker = new window.google.maps.Marker({
            position: placeLocation,
            map: mapInstanceRef.current,
            title: placeData.name,
            icon: {
              url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#FF6B35" stroke="#fff" stroke-width="2"/>
                  <path d="M8 10h8M8 14h6" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(24, 24)
            }
          });

          // Add click listener
          marker.addListener('click', () => {
            setSelectedPlace(placeData);
            mapInstanceRef.current.setCenter(placeLocation);
            mapInstanceRef.current.setZoom(16);
          });

          placeMarkersRef.current.push(marker);
        });
      }

      // Add mock NGOs to the map
      nearbyNGOs.forEach((ngo, index) => {
        const ngoLocation = { lat: ngo.lat, lng: ngo.lng };
        
        const ngoPlace: Place = {
          id: `ngo-${ngo.id}`,
          name: ngo.name,
          type: 'ngo',
          lat: ngo.lat,
          lng: ngo.lng,
          distance: ngo.distance,
          address: ngo.address,
          contact: ngo.contact,
          email: ngo.email,
          capacity: ngo.capacity,
          urgent: ngo.urgent
        };

        places.push(ngoPlace);

        // Add NGO marker
        const marker = new window.google.maps.Marker({
          position: ngoLocation,
          map: mapInstanceRef.current,
          title: ngo.name,
          icon: {
            url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#4F46E5" stroke="#fff" stroke-width="2"/>
                <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(24, 24)
          }
        });

        marker.addListener('click', () => {
          setSelectedPlace(ngoPlace);
          mapInstanceRef.current.setCenter(ngoLocation);
          mapInstanceRef.current.setZoom(16);
        });

        placeMarkersRef.current.push(marker);
      });

      setNearbyPlaces(places);
    } catch (error) {
      console.error("Error fetching places:", error);
      toast({
        title: "Error loading nearby places",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  // Calculate distance between two points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
  };

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI/180);
  };

  // Handle radius change
  const handleRadiusChange = (value: number[]) => {
    const newRadius = value[0];
    setMapRadius(newRadius);
    
    if (userCircleRef.current) {
      userCircleRef.current.setRadius(newRadius * 1000);
    }
    
    // Refetch places with new radius
    setTimeout(() => {
      fetchNearbyPlaces();
    }, 100);
  };

  const handleSendRequest = async (ngo: any) => {
    if (!currentDonation) {
      toast({
        title: "No Donation Data",
        description: "Please submit a donation first",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setSelectedNGO(ngo);
    
    // Simulate AI matching and request processing
    setTimeout(() => {
      const accepted = Math.random() > 0.3; // 70% acceptance rate
      
      if (accepted) {
        setRequestStatus("accepted");
        // Update the donation status
        const donations = JSON.parse(localStorage.getItem('foodDonations') || '[]');
        const updatedDonations = donations.map((d: any) => 
          d.id === currentDonation.id ? { ...d, status: 'dispatched', assignedNGO: ngo.name } : d
        );
        localStorage.setItem('foodDonations', JSON.stringify(updatedDonations));
        
        toast({
          title: "Food Successfully Dispatched! 🎉",
          description: `${ngo.name} has accepted your ${currentDonation.quantity} ${currentDonation.foodType}. Thank you for making a difference!`,
        });
      } else {
        setRequestStatus("rejected");
        toast({
          title: "Request Declined",
          description: `${ngo.name} cannot accept this donation right now. Try another NGO.`,
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 2000);
  };

  const resetRequest = () => {
    setSelectedNGO(null);
    setRequestStatus(null);
    setCurrentDonation(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-2 mb-6 animate-fade-in">
            <Brain className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">AI Food Matching</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
            Live Food
            <span className="text-gradient block">Matching Engine</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Connect with nearby NGOs and orphanages in real-time. Share your surplus food and make an immediate impact.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {/* Main Layout - Map on left, content on right */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Interactive Map */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-gentle animate-fade-in overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <MapPin className="h-5 w-5 text-primary" />
                      Interactive Map
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {userLocation ? "Discover nearby food establishments and NGOs" : "Getting your location..."}
                    </CardDescription>
                  </div>
                  
                  {/* Radius Control */}
                  <div className="flex items-center gap-3 bg-white/90 backdrop-blur rounded-full px-4 py-2 shadow-sm">
                    <Search className="h-4 w-4 text-primary" />
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">Radius:</span>
                      <span className="text-sm text-muted-foreground">{mapRadius} km</span>
                    </div>
                    <Slider
                      value={[mapRadius]}
                      onValueChange={handleRadiusChange}
                      max={20}
                      min={1}
                      step={1}
                      className="w-20"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Interactive Google Map */}
                <div className="relative h-[500px] bg-gradient-to-br from-primary/5 to-secondary/5">
                  {!mapLoaded ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8 bg-white/90 backdrop-blur rounded-2xl shadow-lg">
                        <Loader className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" />
                        <div className="font-semibold text-lg text-foreground mb-2">Loading Map...</div>
                        <div className="text-sm text-muted-foreground">
                          Initializing Google Maps
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div ref={mapRef} className="w-full h-full" />
                  )}
                </div>

                {/* Selected Place Info - Overlay at bottom */}
                {selectedPlace && (
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <Card className="bg-white/95 backdrop-blur-xl border border-primary/20 shadow-lg">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {selectedPlace.type === 'ngo' ? (
                                <Building2 className="h-4 w-4 text-primary" />
                              ) : (
                                <Utensils className="h-4 w-4 text-orange-500" />
                              )}
                              <h3 className="font-semibold text-foreground text-sm">{selectedPlace.name}</h3>
                              <Badge variant={selectedPlace.type === 'ngo' ? 'default' : 'secondary'} className="text-xs">
                                {selectedPlace.type === 'ngo' ? 'NGO' : 'Food Establishment'}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2 truncate">{selectedPlace.address}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>📍 {selectedPlace.distance}</span>
                              {selectedPlace.category && (
                                <span>🏷️ {selectedPlace.category}</span>
                              )}
                              {selectedPlace.rating && (
                                <span>⭐ {selectedPlace.rating}</span>
                              )}
                            </div>
                          </div>
                          
                          {selectedPlace.type === 'ngo' && (
                            <div className="flex gap-1">
                              {selectedPlace.contact && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 w-7 p-0"
                                  onClick={() => window.open(`tel:${selectedPlace.contact}`)}
                                >
                                  <Phone className="h-3 w-3" />
                                </Button>
                              )}
                              {selectedPlace.email && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 w-7 p-0"
                                  onClick={() => window.open(`mailto:${selectedPlace.email}`)}
                                >
                                  <Mail className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                onClick={() => handleSendRequest(selectedPlace)}
                                disabled={isLoading || requestStatus === "accepted"}
                                className="h-7 px-3 text-xs"
                              >
                                {isLoading && selectedNGO?.id === selectedPlace.id ? (
                                  <Loader className="h-3 w-3 animate-spin" />
                                ) : (
                                  <Send className="h-3 w-3" />
                                )}
                                Send
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Content Panels */}
          <div className="space-y-6">
            {/* Current Donation Info */}
            {currentDonation && (
              <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-gentle animate-fade-in">
                <CardHeader className="bg-gradient-to-r from-success/10 to-success/5 border-b border-success/20">
                  <CardTitle className="text-lg text-success flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Your Donation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="p-3 bg-gradient-card rounded-lg border border-success/20">
                  <div className="font-medium text-sm mb-1">{currentDonation.foodType}</div>
                  <div className="text-xs text-muted-foreground mb-2">{currentDonation.quantity}</div>
                  <div className="text-xs">
                    <Badge variant="secondary" className="text-xs">
                      {currentDonation.dietaryTags || 'Mixed'}
                    </Badge>
                  </div>
                  {currentDonation.urgencyScore > 0 && (
                    <div className="mt-2 text-xs text-warning">
                      Urgency: {currentDonation.urgencyScore}/10
                    </div>
                  )}
                </div>
                
                {requestStatus === "accepted" && (
                  <div className="p-3 bg-success/10 border border-success/20 rounded-lg animate-fade-in">
                    <div className="flex items-center gap-2 text-success font-medium mb-1 text-sm">
                      <CheckCircle className="h-3 w-3" />
                      Dispatched Successfully!
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Delivered to {selectedNGO?.name}
                    </p>
                    <Button onClick={resetRequest} size="sm" className="w-full text-xs">
                      New Donation
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Active Food Requests Panel */}
          {activeFoodRequests.length > 0 && (
              <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-gentle animate-fade-in">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-primary/20">
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Active Requests
                </CardTitle>
                  <CardDescription className="text-muted-foreground">Organizations needing food</CardDescription>
              </CardHeader>
                <CardContent className="p-4 space-y-3 max-h-48 overflow-y-auto">
                {activeFoodRequests.map((request, index) => (
                  <div key={request.id} className="p-3 bg-gradient-card rounded-lg border border-primary/20">
                    <div className="font-medium text-sm text-foreground mb-1">{request.organizationName}</div>
                    <div className="text-xs text-muted-foreground mb-2">{request.organizationType}</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Meals needed:</span>
                        <span className="font-medium">{request.mealsNeeded}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Urgency:</span>
                        <Badge 
                          variant={request.urgencyLevel === 'critical' ? 'destructive' : 
                                  request.urgencyLevel === 'high' ? 'secondary' : 'outline'} 
                          className="text-xs"
                        >
                          {request.urgencyLevel}
                        </Badge>
                      </div>
                      {request.specialRequirements !== 'None' && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Special: {request.specialRequirements}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

            {/* Nearby Places List */}
            <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-gentle animate-fade-in">
              <CardHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5 border-b border-secondary/20">
                <CardTitle className="text-lg text-secondary-foreground flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Nearby Places
              </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {nearbyPlaces.length} places found within {mapRadius}km
              </CardDescription>
            </CardHeader>
              <CardContent className="p-4 space-y-3 max-h-80 overflow-y-auto">
                {nearbyPlaces.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No places found nearby</p>
                    <p className="text-xs">Try increasing the radius</p>
                  </div>
                ) : (
                  nearbyPlaces.map((place, index) => (
                  <Card
                      key={place.id}
                      className={`bg-gradient-card backdrop-blur-xl border-0 shadow-gentle hover:shadow-warm transition-all duration-300 cursor-pointer ${
                        selectedPlace?.id === place.id ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                      onClick={() => setSelectedPlace(place)}
                  >
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                              {place.type === 'ngo' ? (
                                <Building2 className="h-3 w-3 text-primary flex-shrink-0" />
                              ) : (
                                <Utensils className="h-3 w-3 text-orange-500 flex-shrink-0" />
                              )}
                              <h4 className="font-medium text-sm truncate">{place.name}</h4>
                              {place.urgent && (
                                <Badge variant="destructive" className="text-xs flex-shrink-0">Urgent</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                              <span>📍 {place.distance}</span>
                              {place.category && (
                                <span>🏷️ {place.category}</span>
                              )}
                              {place.rating && (
                                <span>⭐ {place.rating}</span>
                            )}
                          </div>
                            <p className="text-xs text-muted-foreground truncate">{place.address}</p>
                        </div>

                          {place.type === 'ngo' && (
                            <div className="flex gap-1 flex-shrink-0">
                              {place.contact && (
                          <Button
                            size="sm"
                            variant="outline"
                                  className="h-6 w-6 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(`tel:${place.contact}`);
                                  }}
                          >
                            <Phone className="h-3 w-3" />
                          </Button>
                              )}
                        </div>
                      )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                      )}
                    </CardContent>
                  </Card>
              </div>
        </div>

        {/* AI Matching Info - Full Width */}
        <Card className="mt-8 bg-gradient-primary text-white border-0 shadow-warm animate-fade-in">
          <CardContent className="p-8 text-center">
            <Brain className="h-16 w-16 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-4">AI-Powered Smart Matching</h3>
            <p className="text-white/90 max-w-2xl mx-auto mb-6">
              Our intelligent algorithm considers distance, urgency, dietary preferences, and capacity to find the perfect match for your food donation in real-time.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold">0.8s</div>
                <div className="text-sm opacity-80">Average Match Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold">94%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold">2.1km</div>
                <div className="text-sm opacity-80">Average Distance</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIEngine;
