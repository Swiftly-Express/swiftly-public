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
    const checkGoogleMaps = () => {
      if (typeof window !== 'undefined' && window.google && window.google.maps) {
        setIsLoaded(true);
      } else {
        setTimeout(checkGoogleMaps, 100);
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
