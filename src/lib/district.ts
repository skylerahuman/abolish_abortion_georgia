import * as turf from '@turf/turf';

export interface ElectedOfficial {
    name: string;
    party: string;
    phone: string;
    email: string;
    office_address: string;
}

export interface AdvocacyContact {
    name: string;
    lat: number;
    lng: number;
    type: string;
    address: string;
}

export interface DistrictLookupResult {
    zipCode: string;
    city: string;
    lat: number;
    lng: number;
    usHouseDistrictId: string;
    stateSenateDistrictId: string;
    stateHouseDistrictId: string;
    usHouseRep: ElectedOfficial | null;
    stateSenator: ElectedOfficial | null;
    stateHouseRep: ElectedOfficial | null;
    advocacyContact: AdvocacyContact | null;
}

// Fallback ZIP code coordinates for common Georgia ZIPs
const zipCodeFallback: Record<string, { lat: number; lng: number; city: string }> = {
    '30309': { lat: 33.7847, lng: -84.3747, city: 'Atlanta' },
    '31419': { lat: 32.0298, lng: -81.1165, city: 'Savannah' },
    '31210': { lat: 32.8819, lng: -83.7102, city: 'Macon' },
    '30909': { lat: 33.4404, lng: -82.0702, city: 'Augusta' },
    '31907': { lat: 32.4754, lng: -84.9324, city: 'Columbus' },
    '30303': { lat: 33.7545, lng: -84.3903, city: 'Atlanta' },
    '30318': { lat: 33.7985, lng: -84.4255, city: 'Atlanta' },
    '30312': { lat: 33.7384, lng: -84.3716, city: 'Atlanta' },
    '31401': { lat: 32.0809, lng: -81.0912, city: 'Savannah' },
    '31405': { lat: 32.0176, lng: -81.1287, city: 'Savannah' }
};

let electedOfficialsData: any = null;
let advocacyContactsData: any = null;
let usHouseGeoJSON: any = null;
let stateSenateGeoJSON: any = null;
let stateHouseGeoJSON: any = null;
let stateBoundaryGeoJSON: any = null;

export async function loadDistrictData(fetchFn: typeof fetch = fetch) {
    if (electedOfficialsData) return; // Already loaded

    try {
        const [repsRes, pocRes, congressRes, senateRes, houseRes, boundaryRes] = await Promise.all([
            fetchFn('/data/representatives.json'),
            fetchFn('/data/points-of-contact.json'),
            fetchFn('/data/ga-congress.json'),
            fetchFn('/data/ga-state-senate.json'),
            fetchFn('/data/ga-state-house.json'),
            fetchFn('/data/ga-boundary.json')
        ]);

        electedOfficialsData = await repsRes.json();
        advocacyContactsData = await pocRes.json();
        usHouseGeoJSON = await congressRes.json();
        stateSenateGeoJSON = await senateRes.json();
        stateHouseGeoJSON = await houseRes.json();
        stateBoundaryGeoJSON = await boundaryRes.json();
    } catch (error) {
        console.error('Error loading data:', error);
        throw error;
    }
}

export async function lookupDistrict(searchZipCode: string): Promise<DistrictLookupResult> {
    if (!electedOfficialsData) {
        await loadDistrictData();
    }

    if (!searchZipCode || searchZipCode.length !== 5) {
        throw new Error('Please enter a valid 5-digit ZIP code.');
    }

    let geocodeData: any[] = [];
    let lat: number;
    let lng: number;
    let city: string = '';

    // Try primary geocoding approach
    try {
        const geocodeUrl = `https://nominatim.openstreetmap.org/search?postalcode=${searchZipCode}&country=US&state=Georgia&format=json&limit=1`;
        const geocodeRes = await fetch(geocodeUrl, {
            headers: {
                'User-Agent': 'AbolitionGeorgia/1.0'
            }
        });
        geocodeData = await geocodeRes.json();
    } catch (e) {
        console.warn('Primary geocoding failed:', e);
    }

    // Fallback: Try broader search with just ZIP code
    if (!geocodeData || geocodeData.length === 0) {
        try {
            const fallbackUrl = `https://nominatim.openstreetmap.org/search?q=${searchZipCode}+Georgia+USA&format=json&limit=1`;
            const fallbackRes = await fetch(fallbackUrl, {
                headers: {
                    'User-Agent': 'AbolitionGeorgia/1.0'
                }
            });
            geocodeData = await fallbackRes.json();
        } catch (e) {
            console.warn('Fallback geocoding failed:', e);
        }
    }

    // Final fallback: Use hardcoded ZIP coordinates
    if (!geocodeData || geocodeData.length === 0) {
        if (zipCodeFallback[searchZipCode]) {
            const fallback = zipCodeFallback[searchZipCode];
            lat = fallback.lat;
            lng = fallback.lng;
            city = fallback.city;
        } else {
            throw new Error('Could not find this ZIP code in Georgia. Please try again.');
        }
    } else {
        lat = parseFloat(geocodeData[0].lat);
        lng = parseFloat(geocodeData[0].lon);
        city = geocodeData[0].display_name.split(',')[0];
    }

    // Find districts using point-in-polygon
    const point = turf.point([lng, lat]);

    const usHouseDistrictId = getDistrictIdFromCoordinate(point, usHouseGeoJSON);
    const stateSenateDistrictId = getDistrictIdFromCoordinate(point, stateSenateGeoJSON);
    const stateHouseDistrictId = getDistrictIdFromCoordinate(point, stateHouseGeoJSON);

    if (!usHouseDistrictId) {
        throw new Error('Could not determine congressional district for this ZIP code.');
    }

    // Look up representatives
    const usHouseRep = electedOfficialsData.us_congress[usHouseDistrictId];
    const stateSenator = stateSenateDistrictId ? electedOfficialsData.state_senate[stateSenateDistrictId] : null;
    const stateHouseRep = stateHouseDistrictId ? electedOfficialsData.state_house[stateHouseDistrictId] : null;

    // Find nearest point of contact
    const advocacyContact = advocacyContactsData[usHouseDistrictId]?.[0];

    return {
        zipCode: searchZipCode,
        city,
        lat,
        lng,
        usHouseDistrictId,
        stateSenateDistrictId: stateSenateDistrictId || 'N/A',
        stateHouseDistrictId: stateHouseDistrictId || 'N/A',
        usHouseRep,
        stateSenator,
        stateHouseRep,
        advocacyContact
    };
}

function getDistrictIdFromCoordinate(point: any, geoJSON: any): string | null {
    if (!geoJSON || !geoJSON.features) return null;

    for (const feature of geoJSON.features) {
        const polygon = turf.polygon(feature.geometry.coordinates);
        if (turf.booleanPointInPolygon(point, polygon)) {
            return feature.properties.district;
        }
    }
    return null;
}
