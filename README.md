# Abolition Georgia

A civic engagement website for Georgia residents to connect with their representatives and learn about criminal justice reform initiatives.

## Features

### Who Do I Call
Interactive map-based tool that helps Georgia residents:
- Find their U.S. House, State Senate, and State House representatives by ZIP code
- View contact information for their elected officials
- Locate nearby advocacy and outreach centers
- Visualize their districts on an interactive map with Leaflet

### Timeline
Chronological overview of criminal justice reform milestones.

### FAQs
Frequently asked questions about criminal justice reform in Georgia.

## Tech Stack

- **Framework**: SvelteKit 2
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Mapping**: Leaflet.js with OpenStreetMap tiles
- **Geospatial**: Turf.js for point-in-polygon calculations
- **Geocoding**: Nominatim (OpenStreetMap)

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Data Files

The "Who Do I Call" feature uses JSON data files in `static/data/`:

- `representatives.json` - Contact info for U.S. House, State Senate, and State House representatives
- `points-of-contact.json` - Locations of advocacy centers and outreach offices
- `ga-congress.json` - GeoJSON boundaries for U.S. Congressional districts
- `ga-state-senate.json` - GeoJSON boundaries for State Senate districts  
- `ga-state-house.json` - GeoJSON boundaries for State House districts
- `ga-boundary.json` - GeoJSON boundary for Georgia state outline

**Note**: Current data files contain sample/simplified data for development. See `DATA_SOURCES.md` for information on obtaining production-ready data from official sources.

## Testing

See `TEST_ADDRESSES.md` for test ZIP codes and addresses to verify the "Who Do I Call" functionality.

## Project Structure

```
abolition_georgia/
├── src/
│   ├── routes/
│   │   ├── who-do-i-call/     # Interactive representative finder
│   │   ├── timeline/           # Criminal justice reform timeline
│   │   ├── faqs/              # Frequently asked questions
│   │   └── +layout.svelte     # Main layout with navigation
│   └── app.html               # HTML template
├── static/
│   └── data/                  # JSON data files for districts and representatives
└── README.md
```
