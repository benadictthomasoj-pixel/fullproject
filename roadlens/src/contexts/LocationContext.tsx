import React, { createContext, useContext, useState, useCallback } from 'react';

export const LOCATION_MAP: Record<string, { lat: number; lng: number; city: string }> = {
  'Velachery':       { lat: 12.9815, lng: 80.2223, city: 'Chennai' },
  'Anna Nagar':      { lat: 13.0850, lng: 80.2101, city: 'Chennai' },
  'OMR':             { lat: 12.9200, lng: 80.2300, city: 'Chennai' },
  'Tambaram':        { lat: 12.9249, lng: 80.1000, city: 'Chennai' },
  'T Nagar':         { lat: 13.0418, lng: 80.2330, city: 'Chennai' },
  'Adyar':           { lat: 13.0033, lng: 80.2550, city: 'Chennai' },
  'Perungudi':       { lat: 12.9654, lng: 80.2461, city: 'Chennai' },
  'Porur':           { lat: 13.0336, lng: 80.1557, city: 'Chennai' },
  'Guindy':          { lat: 13.0102, lng: 80.2158, city: 'Chennai' },
  'Nungambakkam':    { lat: 13.0569, lng: 80.2425, city: 'Chennai' },
  'Mylapore':        { lat: 13.0368, lng: 80.2676, city: 'Chennai' },
  'Chromepet':       { lat: 12.9516, lng: 80.1462, city: 'Chennai' },
  'Sholinganallur':  { lat: 12.9010, lng: 80.2279, city: 'Chennai' },
  'Thoraipakkam':    { lat: 12.9254, lng: 80.2360, city: 'Chennai' },
  'Kodambakkam':     { lat: 13.0525, lng: 80.2188, city: 'Chennai' },
  'Pallavaram':      { lat: 12.9675, lng: 80.1491, city: 'Chennai' },
  'Ambattur':        { lat: 13.1143, lng: 80.1548, city: 'Chennai' },
  'Chennai':         { lat: 13.0827, lng: 80.2707, city: 'Chennai' },
};

export const RECENT_LOCATIONS_DEFAULT = ['Velachery', 'Anna Nagar', 'Tambaram', 'Adyar'];
export const POPULAR_LOCATIONS = ['OMR', 'T Nagar', 'Perungudi', 'Guindy', 'Mylapore'];

interface LocationCtx {
  locationName: string;
  locationCoords: [number, number];
  recentLocations: string[];
  lastUpdated: Date;
  setLocation: (name: string, coords?: [number, number]) => void;
  setGPSLocation: () => void;
}

const LocationContext = createContext<LocationCtx>({
  locationName: 'Velachery, Chennai',
  locationCoords: [12.9815, 80.2223],
  recentLocations: RECENT_LOCATIONS_DEFAULT,
  lastUpdated: new Date(),
  setLocation: () => {},
  setGPSLocation: () => {},
});

export const useLocation = () => useContext(LocationContext);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locationName, setLocationName] = useState('Velachery, Chennai');
  const [locationCoords, setLocationCoords] = useState<[number, number]>([12.9815, 80.2223]);
  const [recentLocations, setRecentLocations] = useState<string[]>(RECENT_LOCATIONS_DEFAULT);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const setLocation = useCallback((name: string, coords?: [number, number]) => {
    const area = name.trim();
    const entry = LOCATION_MAP[area];
    const resolved = coords || (entry ? [entry.lat, entry.lng] as [number, number] : null);
    const displayName = entry ? `${area}, ${entry.city}` : area;

    setLocationName(displayName);
    if (resolved) setLocationCoords(resolved);
    setLastUpdated(new Date());

    // Bubble this area to the top of recent locations
    setRecentLocations(prev => {
      const filtered = prev.filter(l => l !== area);
      return [area, ...filtered].slice(0, 5);
    });
  }, []);

  const setGPSLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setLocationCoords(coords);
        setLocationName('Current GPS Location');
        setLastUpdated(new Date());
      },
      () => alert('Location permission denied. Please allow location access and try again.')
    );
  }, []);

  return (
    <LocationContext.Provider value={{ locationName, locationCoords, recentLocations, lastUpdated, setLocation, setGPSLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
