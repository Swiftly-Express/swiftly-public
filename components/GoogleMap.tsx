'use client';

import React, { useState, useCallback } from 'react';
import { GoogleMap as GoogleMapReact, LoadScript, Marker } from '@react-google-maps/api';

interface MapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  showMarker?: boolean;
  markerPosition?: { lat: number; lng: number };
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

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
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Use Google Maps API key from environment variable
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  if (!apiKey) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 ${className}`}>
        <p className="text-gray-500 text-sm">Map API key not configured</p>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMapReact
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {showMarker && (
          <Marker 
            position={markerPosition || center}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#00B75A',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 3,
            }}
          />
        )}
      </GoogleMapReact>
    </LoadScript>
  );
}
