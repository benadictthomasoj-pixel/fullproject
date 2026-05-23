// Location Service to extract EXIF data, reverse geocode, and map municipal authorities
import exifr from 'exifr';

/**
 * Maps a location (city, district, state) to the responsible municipal authority.
 */
export function getAuthorityForLocation({ city, state, district }) {
  const normCity = (city || '').toLowerCase();
  const normDistrict = (district || '').toLowerCase();
  const normState = (state || '').toLowerCase();

  if (normCity.includes('chennai') || normDistrict.includes('chennai')) {
    return 'Greater Chennai Corporation (GCC)';
  }
  if (normCity.includes('coimbatore') || normDistrict.includes('coimbatore')) {
    return 'Coimbatore City Municipal Corporation (CMC)';
  }
  if (normCity.includes('bengaluru') || normCity.includes('bangalore') || normDistrict.includes('bengaluru')) {
    return 'Bruhat Bengaluru Mahanagara Palike (BBMP)';
  }
  if (normCity.includes('madurai') || normDistrict.includes('madurai')) {
    return 'Madurai Corporation';
  }
  if (normCity.includes('trichy') || normCity.includes('tiruchirappalli') || normDistrict.includes('tiruchirappalli')) {
    return 'Tiruchirappalli City Municipal Corporation';
  }
  if (normCity.includes('salem') || normDistrict.includes('salem')) {
    return 'Salem Corporation';
  }

  // Fallbacks by State
  if (normState.includes('tamil nadu')) {
    return 'Tamil Nadu Highways Department';
  }
  if (normState.includes('karnataka')) {
    return 'Karnataka State Highway Authority';
  }

  return 'National Highways Authority of India (NHAI)';
}

/**
 * Parses GPS coordinates from an uploaded file using exifr.
 * @param {File|Blob} file 
 * @returns {Promise<{latitude: number, longitude: number}|null>}
 */
export async function extractGPSFromImage(file) {
  try {
    const gpsData = await exifr.gps(file);
    if (gpsData && typeof gpsData.latitude === 'number' && typeof gpsData.longitude === 'number') {
      return {
        latitude: gpsData.latitude,
        longitude: gpsData.longitude
      };
    }
    return null;
  } catch (error) {
    console.error("Error extracting EXIF GPS data:", error);
    return null;
  }
}

/**
 * Performs reverse geocoding via OpenStreetMap Nominatim.
 * @param {number} latitude 
 * @param {number} longitude 
 * @returns {Promise<{city: string, state: string, district: string, road: string}|null>}
 */
export async function reverseGeocode(latitude, longitude) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RoadLensAI/1.0 (infrastructure-analysis)'
      }
    });

    if (!response.ok) {
      throw new Error(`Nominatim reverse geocoding failed with status: ${response.status}`);
    }

    const data = await response.json();
    if (!data || !data.address) {
      return null;
    }

    const addr = data.address;
    const city = addr.city || addr.town || addr.village || addr.suburb || addr.municipality || addr.city_district || '';
    const state = addr.state || '';
    const district = addr.county || addr.district || '';
    const road = addr.road || addr.suburb || addr.neighbourhood || '';

    return { city, state, district, road };
  } catch (error) {
    console.error("Error in reverse geocoding:", error);
    return null;
  }
}
