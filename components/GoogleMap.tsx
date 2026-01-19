'use client';

import React, { useState, useEffect, useRef } from 'react';

interface MapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  showMarker?: boolean;
  markerPosition?: { lat: number; lng: number };
  // Enhanced: Support for pickup and delivery markers
  pickupLocation?: { lat: number; lng: number };
  deliveryLocation?: { lat: number; lng: number };
  riderLocation?: { lat: number; lng: number };
  showRoute?: boolean;
}

// Default center (Lagos, Nigeria)
const defaultCenter = {
  lat: 6.5244,
  lng: 3.3792
};

export default function GoogleMap({
  center = defaultCenter,
  zoom = 14,
  className = '',
  showMarker = true,
  markerPosition,
  pickupLocation,
  deliveryLocation,
  riderLocation,
  showRoute = false
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [pickupMarker, setPickupMarker] = useState<google.maps.Marker | null>(null);
  const [deliveryMarker, setDeliveryMarker] = useState<google.maps.Marker | null>(null);
  const [riderMarker, setRiderMarker] = useState<google.maps.Marker | null>(null);
  const [routeLine, setRouteLine] = useState<google.maps.Polyline | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Check if Google Maps is loaded
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 200;

    const googleMapsApiKey = (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY) as string | undefined;

    const ensureScript = () => {
      if (typeof window === 'undefined') return;
      const hasScript = !!document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
      if (!hasScript && googleMapsApiKey) {
        const src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places,geometry&region=NG`;
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.defer = true;
        s.onload = () => console.info('Google Maps script loaded');
        s.onerror = (e) => console.error('Failed to load Google Maps script', e);
        document.head.appendChild(s);
      }
    };

    const checkGoogleMaps = () => {
      attempts += 1;
      if (typeof window !== 'undefined' && (window as any).google && (window as any).google.maps) {
        setIsLoaded(true);
        return;
      }

      if (attempts === 1) ensureScript();

      if (attempts < maxAttempts) {
        setTimeout(checkGoogleMaps, 100);
      } else {
        console.warn('Google Maps did not load within expected time.');
      }
    };

    checkGoogleMaps();
  }, []);

  // Initialize map once Google Maps is loaded
  useEffect(() => {
    if (!isLoaded || !mapRef.current || map) return;

    try {
      const newMap = new google.maps.Map(mapRef.current, {
        center,
        zoom,
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      });

      setMap(newMap);

      // Single marker mode
      if (showMarker && !pickupLocation && !deliveryLocation) {
        const newMarker = new google.maps.Marker({
          position: markerPosition || center,
          map: newMap,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#00B75A',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 3,
          },
        });
        setMarker(newMarker);
      }
    } catch (error) {
      console.error('Error initializing Google Map:', error);
    }
  }, [isLoaded, center, zoom, showMarker, markerPosition, map, pickupLocation, deliveryLocation]);

  // Handle pickup marker
  useEffect(() => {
    if (!map || !isLoaded || !pickupLocation) return;

    if (pickupMarker) {
      pickupMarker.setPosition(pickupLocation);
    } else {
      const newPickupMarker = new google.maps.Marker({
        position: pickupLocation,
        map: map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: '#00B75A',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 4,
        },
        title: 'Pickup Location'
      });
      setPickupMarker(newPickupMarker);
    }
  }, [map, isLoaded, pickupLocation, pickupMarker]);

  // Handle delivery marker
  useEffect(() => {
    if (!map || !isLoaded || !deliveryLocation) return;

    if (deliveryMarker) {
      deliveryMarker.setPosition(deliveryLocation);
    } else {
      const newDeliveryMarker = new google.maps.Marker({
        position: deliveryLocation,
        map: map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: '#EF4444',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 4,
        },
        title: 'Delivery Location'
      });
      setDeliveryMarker(newDeliveryMarker);
    }
  }, [map, isLoaded, deliveryLocation, deliveryMarker]);

  // Handle rider marker
  useEffect(() => {
    if (!map || !isLoaded || !riderLocation) return;

    if (riderMarker) {
      riderMarker.setPosition(riderLocation);
    } else {
      const newRiderMarker = new google.maps.Marker({
        position: riderLocation,
        map: map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 14,
          fillColor: '#00B75A',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 4,
        },
        title: 'Rider Location',
        zIndex: 1000
      });
      setRiderMarker(newRiderMarker);
    }
  }, [map, isLoaded, riderLocation, riderMarker]);

  // Draw route line between pickup and delivery
  useEffect(() => {
    if (!map || !isLoaded || !showRoute || !pickupLocation || !deliveryLocation) {
      if (routeLine) {
        routeLine.setMap(null);
        setRouteLine(null);
      }
      return;
    }

    if (routeLine) {
      routeLine.setPath([pickupLocation, deliveryLocation]);
    } else {
      const newRouteLine = new google.maps.Polyline({
        path: [pickupLocation, deliveryLocation],
        geodesic: true,
        strokeColor: '#00B75A',
        strokeOpacity: 0.8,
        strokeWeight: 4,
        map: map
      });
      setRouteLine(newRouteLine);
    }
  }, [map, isLoaded, showRoute, pickupLocation, deliveryLocation, routeLine]);

  // Auto-fit bounds when multiple markers exist
  useEffect(() => {
    if (!map || !isLoaded) return;

    const locations = [pickupLocation, deliveryLocation, riderLocation].filter(Boolean);
    
    if (locations.length > 1) {
      const bounds = new google.maps.LatLngBounds();
      locations.forEach(loc => {
        if (loc) bounds.extend(loc);
      });
      map.fitBounds(bounds);
      
      // Add padding to bounds
      const padding = { top: 50, right: 50, bottom: 50, left: 50 };
      map.fitBounds(bounds, padding);
    }
  }, [map, isLoaded, pickupLocation, deliveryLocation, riderLocation]);

  // Update single marker position when it changes
  useEffect(() => {
    if (marker && markerPosition) {
      marker.setPosition(markerPosition);
    }
  }, [marker, markerPosition]);

  // Update map center when it changes
  useEffect(() => {
    if (map && center && !pickupLocation && !deliveryLocation) {
      map.setCenter(center);
    }
  }, [map, center, pickupLocation, deliveryLocation]);

  if (!isLoaded) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-t-transparent border-green-500 rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-500 text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className={className}
      style={{ width: '100%', height: '100%', minHeight: '300px' }}
    />
  );
}