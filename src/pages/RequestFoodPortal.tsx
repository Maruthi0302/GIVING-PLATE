
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Clock, CheckCircle, AlertCircle, Shield, Truck, Navigation, Phone, X, Search, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';

const RequestFoodPortal = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userVerification, setUserVerification] = useState<any>(null);
  const [availableDonations, setAvailableDonations] = useState<any[]>([]);
  const [activeRequests, setActiveRequests] = useState<any[]>([]);
  const [trackingUpdates, setTrackingUpdates] = useState<Record<string, any>>({});
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [mapRadius, setMapRadius] = useState([5]);
  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const userCircleRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const placeMarkersRef = useRef<any[]>([]);

  useEffect(() => {
    // Check if user is verified
    const verification = localStorage.getItem('userVerification');
    if (!verification) {
      toast({
        title: "Access Denied",
        description: "Please complete verification first.",
        variant: "destructive",
      });
      navigate('/request');
      return;
    }
    
    setUserVerification(JSON.parse(verification));

    // Load available donations
    const donations = JSON.parse(localStorage.getItem('foodDonations') || '[]');
    const availableDonations = donations
      .filter((d: any) => !d.status || d.status !== 'dispatched')
      .map((d: any) => ({
        id: d.id,
        donor: d.contactName || "Anonymous Donor",
        foodType: d.foodType,
        quantity: d.quantity,
        expiry: d.expiryTime ? `${Math.ceil((new Date(d.expiryTime).getTime() - new Date().getTime()) / (1000 * 60 * 60))} hours` : "Good condition",
        distance: "1-3 km",
        status: "available",
        urgencyScore: d.urgencyScore || 5,
        dietaryTags: d.dietaryTags,
        description: d.description,
        contactPhone: d.contactPhone,
        pickupAddress: d.pickupAddress
      }));
    setAvailableDonations(availableDonations);

    // Load user's active requests
    const userRequests = JSON.parse(localStorage.getItem('userActiveRequests') || '[]');
    setActiveRequests(userRequests);
  }, [navigate, toast]);

  const simulateLocationTracking = (requestId: string) => {
    const trackingStates = [
      { status: "confirmed", message: "Donation confirmed, preparing for pickup", location: "Donor location" },
      { status: "in_transit", message: "Food picked up, on the way", location: "En route to destination" },
      { status: "nearby", message: "Delivery person is nearby", location: "2 minutes away" },
      { status: "delivered", message: "Food delivered successfully", location: "Delivered" }
    ];

    let currentStep = 0;
    
    const updateTracking = () => {
      if (currentStep < trackingStates.length) {
        setTrackingUpdates(prev => ({
          ...prev,
          [requestId]: {
            ...trackingStates[currentStep],
            timestamp: new Date().toLocaleTimeString(),
            estimatedArrival: currentStep < 3 ? `${15 - (currentStep * 5)} minutes` : "Delivered"
          }
        }));
        
        if (currentStep < trackingStates.length - 1) {
          setTimeout(updateTracking, 10000); // Update every 10 seconds for demo
        }
        currentStep++;
      }
    };

    // Start tracking simulation
    setTimeout(updateTracking, 2000);
  };

  const handleAcceptDonation = (donation: any) => {
    const requestId = `REQ-${Date.now()}`;
    const trackingId = `TRK-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create new active request entry
    const newRequest = {
      id: requestId,
      trackingId: trackingId,
      donationId: donation.id,
      donorName: donation.donor,
      foodType: donation.foodType,
      quantity: donation.quantity,
      status: "confirmed",
      requestedAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 45 * 60000).toLocaleTimeString(), // 45 mins from now
      donorContact: donation.contactPhone,
      pickupAddress: donation.pickupAddress,
      deliveryAddress: userVerification.address,
      organizationName: userVerification.organizationName,
      urgencyLevel: donation.urgencyScore > 7 ? "high" : "medium"
    };

    // Update local storage for persistence
    const existingRequests = JSON.parse(localStorage.getItem('userActiveRequests') || '[]');
    const updatedRequests = [...existingRequests, newRequest];
    localStorage.setItem('userActiveRequests', JSON.stringify(updatedRequests));

    // Update donations status
    const donations = JSON.parse(localStorage.getItem('foodDonations') || '[]');
    const updatedDonations = donations.map((d: any) => 
      d.id === donation.id ? { ...d, status: 'accepted', acceptedBy: userVerification.organizationName, trackingId } : d
    );
    localStorage.setItem('foodDonations', JSON.stringify(updatedDonations));

    // Update local states
    setAvailableDonations(prev => prev.map(d => 
      d.id === donation.id ? { ...d, status: 'accepted' } : d
    ));
    
    setActiveRequests(prev => [...prev, newRequest]);

    // Start location tracking simulation
    simulateLocationTracking(requestId);

    toast({
      title: "Donation Accepted! 🎉",
      description: `${donation.donor} has been notified. Track your request with ID: ${trackingId}`,
    });
  };

  const handleDeleteRequest = (requestId: string) => {
    // Remove from active requests
    setActiveRequests(prev => prev.filter(request => request.id !== requestId));
    
    // Remove tracking updates for this request
    setTrackingUpdates(prev => {
      const updated = { ...prev };
      delete updated[requestId];
      return updated;
    });
    
    // Show success message (you can add toast notification here)
    console.log(`Request ${requestId} deleted successfully`);
  };

  const handleViewMap = async (request: any) => {
    setSelectedRequest(request);
    setIsMapModalOpen(true);
    
    // Initialize map after modal opens
    setTimeout(() => {
      initializeMap(request);
    }, 100);
  };

  const initializeMap = (request: any) => {
    if (!mapRef.current || !window.google) return;

    // Clear existing map
    if (mapInstanceRef.current) {
      placeMarkersRef.current.forEach(marker => marker.setMap(null));
      placeMarkersRef.current = [];
    }

    // Initialize map with default center (India)
    const mapOptions = {
      center: { lat: 20.5937, lng: 78.9629 },
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    };

    mapInstanceRef.current = new google.maps.Map(mapRef.current, mapOptions);

    // Try to get user location or use pickup address
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setupMapWithLocation(userLocation, request);
        },
        () => {
          // Fallback to pickup address geocoding
          geocodeAddress(request.pickupAddress, request);
        }
      );
    } else {
      // Fallback to pickup address geocoding
      geocodeAddress(request.pickupAddress, request);
    }
  };

  const geocodeAddress = (address: string, request: any) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;
        setupMapWithLocation(
          { lat: location.lat(), lng: location.lng() },
          request
        );
      } else {
        // Fallback to default location
        setupMapWithLocation({ lat: 20.5937, lng: 78.9629 }, request);
      }
    });
  };

  const setupMapWithLocation = (location: any, request: any) => {
    if (!mapInstanceRef.current) return;

    mapInstanceRef.current.setCenter(location);

    // Draw radius circle
    userCircleRef.current = new google.maps.Circle({
      map: mapInstanceRef.current,
      center: location,
      radius: mapRadius[0] * 1000, // Convert km to meters
      fillColor: '#AAD1E6',
      strokeColor: '#0077CC',
      strokeWeight: 2,
      fillOpacity: 0.3
    });

    // Place user marker
    userMarkerRef.current = new google.maps.Marker({
      position: location,
      map: mapInstanceRef.current,
      title: "Pickup Location",
      icon: {
        url: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png",
        scaledSize: new google.maps.Size(32, 32)
      }
    });

    // Fetch nearby places
    fetchNearbyPlacesForMap(location, mapRadius[0] * 1000);
  };

  const fetchNearbyPlacesForMap = async (location: any, radius: number) => {
    setIsLoadingPlaces(true);
    try {
      const apiKey = "5e096efcdac5443fb33e0d56fb288612";
      const url = `https://api.geoapify.com/v2/places?categories=commercial.food_and_drink,catering.restaurant,catering.fast_food,catering.cafe&filter=circle:${location.lng},${location.lat},${radius}&limit=15&apiKey=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      // Clear existing markers
      placeMarkersRef.current.forEach(marker => marker.setMap(null));
      placeMarkersRef.current = [];

      if (data.features && data.features.length > 0) {
        const places = data.features.map((place: any) => {
          const placeLocation = {
            lat: place.geometry.coordinates[1],
            lng: place.geometry.coordinates[0]
          };

          // Create marker
          const marker = new google.maps.Marker({
            position: placeLocation,
            map: mapInstanceRef.current,
            title: place.properties.name || "Food Establishment",
            icon: {
              url: "https://maps.gstatic.com/mapfiles/ms2/micons/restaurant.png",
              scaledSize: new google.maps.Size(24, 24)
            }
          });

          // Add info window
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="padding: 8px; max-width: 200px;">
                <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold;">${place.properties.name || 'Unknown'}</h3>
                <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${place.properties.address_line1 || ''}</p>
                <p style="margin: 0; font-size: 11px; color: #888;">${(place.properties.distance / 1000).toFixed(1)} km away</p>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(mapInstanceRef.current, marker);
          });

          placeMarkersRef.current.push(marker);

          return {
            id: place.properties.place_id,
            name: place.properties.name,
            address: place.properties.address_line1,
            category: place.properties.categories?.split(',')[0] || 'Unknown',
            distance: (place.properties.distance / 1000).toFixed(1),
            coordinates: place.geometry.coordinates
          };
        });

        setNearbyPlaces(places);
      } else {
        setNearbyPlaces([]);
      }
    } catch (error) {
      console.error('Error fetching nearby places:', error);
      setNearbyPlaces([]);
    } finally {
      setIsLoadingPlaces(false);
    }
  };

  const handleRadiusChange = async (value: number[]) => {
    setMapRadius(value);
    if (userCircleRef.current && userMarkerRef.current) {
      userCircleRef.current.setRadius(value[0] * 1000);
      const location = userMarkerRef.current.getPosition().toJSON();
      await fetchNearbyPlacesForMap(location, value[0] * 1000);
    }
  };

  if (!userVerification) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-8">
      <div className="container mx-auto px-4">
        {/* Header - Fixed visibility */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Food Request Portal</h1>
              <p className="text-muted-foreground">Welcome, {userVerification.organizationName}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-primary text-white border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">143</div>
                <div className="text-sm opacity-90">Available Donations</div>
              </CardContent>
            </Card>
            <Card className="bg-secondary text-foreground border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{activeRequests.length}</div>
                <div className="text-sm opacity-80">Your Active Requests</div>
              </CardContent>
            </Card>
            <Card className="bg-accent text-accent-foreground border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm opacity-80">Nearby Donors</div>
              </CardContent>
            </Card>
            <Card className="bg-success text-white border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">89%</div>
                <div className="text-sm opacity-90">Success Rate</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Available Donations - Fixed visibility */}
          <Card className="bg-card/90 backdrop-blur-xl border border-border shadow-card">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardTitle className="text-2xl flex items-center gap-2 text-foreground">
                <Clock className="h-6 w-6 text-primary" />
                Available Donations Nearby
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Real-time donations in your area sorted by urgency and distance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto p-6">
              {availableDonations.map((donation, index) => (
                <Card 
                  key={donation.id} 
                  className="bg-white border border-border shadow-gentle hover:shadow-card transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{donation.donor}</h4>
                        <p className="text-sm text-muted-foreground">{donation.foodType}</p>
                        <p className="text-xs text-muted-foreground mt-1">{donation.pickupAddress}</p>
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
                      <div className="text-center p-2 bg-primary/10 rounded-lg">
                        <div className="font-medium text-primary">{donation.quantity}</div>
                        <div className="text-xs text-muted-foreground">Quantity</div>
                      </div>
                      <div className="text-center p-2 bg-secondary/10 rounded-lg">
                        <div className="font-medium text-secondary-foreground">{donation.expiry}</div>
                        <div className="text-xs text-muted-foreground">Expires in</div>
                      </div>
                      <div className="text-center p-2 bg-success/10 rounded-lg">
                        <div className="font-medium text-success">{donation.distance}</div>
                        <div className="text-xs text-muted-foreground">Distance</div>
                      </div>
                    </div>

                    {donation.description && (
                      <p className="text-sm text-muted-foreground mb-3">{donation.description}</p>
                    )}

                    {donation.status === 'available' ? (
                      <Button 
                        onClick={() => handleAcceptDonation(donation)}
                        className="w-full bg-primary hover:bg-primary/90 text-white"
                        size="sm"
                      >
                        Accept Donation
                      </Button>
                    ) : (
                      <Button 
                        disabled
                        variant="outline"
                        size="sm" 
                        className="w-full"
                      >
                        {donation.status === 'accepted' ? 'Already Accepted' : 'Not Available'}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Your Active Requests with Live Tracking - Fixed visibility */}
          <Card className="bg-card/90 backdrop-blur-xl border border-border shadow-card">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardTitle className="text-2xl flex items-center gap-2 text-foreground">
                <Truck className="h-6 w-6 text-primary" />
                Your Active Requests & Live Tracking
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Track your accepted donations and live delivery status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto p-6">
              {activeRequests.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No active requests found.</p>
                  <p className="text-sm">Browse available donations above to get started.</p>
                </div>
              ) : (
                activeRequests.map((request) => {
                  const tracking = trackingUpdates[request.id];
                  return (
                    <Card key={request.id} className="bg-white border border-border shadow-gentle">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-foreground flex items-center gap-2">
                              {request.foodType}
                              <Badge variant="outline" className="text-xs">
                                {request.trackingId}
                              </Badge>
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              From: {request.donorName} • {request.quantity}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Requested: {new Date(request.requestedAt).toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge 
                              variant={tracking?.status === 'delivered' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {tracking?.status || request.status}
                            </Badge>
                            <div className="text-xs text-muted-foreground mt-1">
                              ETA: {tracking?.estimatedArrival || request.estimatedDelivery}
                            </div>
                          </div>
                        </div>

                        {/* Live Tracking Section */}
                        {tracking && (
                          <div className="mt-3 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Navigation className="h-4 w-4 text-primary animate-pulse" />
                              <span className="text-sm font-medium text-primary">Live Tracking</span>
                              <span className="text-xs text-muted-foreground">
                                Updated: {tracking.timestamp}
                              </span>
                            </div>
                            <p className="text-sm text-foreground mb-1">{tracking.message}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {tracking.location}
                            </div>
                            {tracking.status !== 'delivered' && (
                              <div className="mt-2 flex gap-2">
                                <Button size="sm" variant="outline" className="text-xs">
                                  <Phone className="h-3 w-3 mr-1" />
                                  Call Donor
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-xs"
                                  onClick={() => handleViewMap(request)}
                                >
                                  <MapPin className="h-3 w-3 mr-1" />
                                  View Map
                                </Button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Contact Information and Actions */}
                        <div className="mt-3 p-2 bg-muted/20 rounded text-xs">
                          <div className="flex justify-between text-muted-foreground mb-2">
                            <span>Pickup: {request.pickupAddress}</span>
                            <span>Contact: {request.donorContact}</span>
                          </div>
                          <div className="flex justify-end">
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              className="text-xs h-6 px-2"
                              onClick={() => handleDeleteRequest(request.id)}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete Request
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions - Fixed visibility */}
        <div className="mt-8">
          <Card className="bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-card">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-4">Need Help?</h3>
              <p className="mb-4 opacity-90">
                Our support team is available 24/7 to help you with food requests and donations.
              </p>
              <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-primary font-semibold">
                📞 Contact Support: 1800-FOOD-NOW
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Map Modal */}
        <Dialog open={isMapModalOpen} onOpenChange={setIsMapModalOpen}>
          <DialogContent className="max-w-4xl w-[90vw] h-[80vh] p-0">
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold">
                  Delivery Route & Nearby Places
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMapModalOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {selectedRequest && (
                <div className="text-sm text-muted-foreground">
                  Tracking: {selectedRequest.trackingId} • From: {selectedRequest.donorName}
                </div>
              )}
            </DialogHeader>
            
            {/* Full Map Section */}
            <div className="relative flex-1" style={{ height: 'calc(80vh - 120px)' }}>
              <div 
                ref={mapRef}
                className="w-full h-full rounded-lg"
              />
              
              {/* Radius Control */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Search Radius</span>
                </div>
                <div className="w-48">
                  <Slider
                    value={mapRadius}
                    onValueChange={handleRadiusChange}
                    max={20}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {mapRadius[0]} km radius
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RequestFoodPortal;
