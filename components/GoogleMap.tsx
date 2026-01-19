'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';

interface MapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  showMarker?: boolean;
  markerPosition?: { lat: number; lng: number };
}

// Default center (Uyo, Nigeria)
const defaultCenter = {
  lat: 5.0378,
  lng: 7.9085
};

export default function GoogleMap({
  center = defaultCenter,
  zoom = 14,
  className = '',
  showMarker = true,
  markerPosition
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Check if Google Maps is loaded
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 200; // ~20 seconds

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
        console.warn('Google Maps did not load within expected time. Make sure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set and valid.');
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

      if (showMarker) {
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
  }, [isLoaded, center, zoom, showMarker, markerPosition, map]);

  // Update marker position when it changes
  useEffect(() => {
    if (marker && markerPosition) {
      marker.setPosition(markerPosition);
    }
  }, [marker, markerPosition]);

  // Update map center when it changes
  useEffect(() => {
    if (map && center) {
      map.setCenter(center);
    }
  }, [map, center]);

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
