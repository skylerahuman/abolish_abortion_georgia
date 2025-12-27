# Abolish Abortion Georgia

This project is dedicated to the complete abolition of abortion in the state of Georgia. Our mission is to establish equal protection for all human beings, from the moment of fertilization to natural death, without exception or compromise. We seek to mobilize Georgians to demand the immediate criminalization of abortion as murder, ensuring that pre-born children receive the same legal standing and protection as born persons.

## Mission & Goals

Our core objective is **Equal Protection**:
1.  **Total Abolition:** We advocate for the complete removal of all laws allowing for the destruction of pre-born human life. We reject incremental regulations that regulate rather than abolish the evil of abortion.
2.  **Equal Justice:** We demand that the laws of Georgia treat the intentional killing of a pre-born child with the same severity as the killing of a born person.
3.  **No Exceptions:** We stand against any exceptions based on age, method of conception, or developmental stage. Human rights are inherent to our humanity, not our circumstances.
4.  **Immediacy:** We call for immediate action from our legislators, judges, and executives to interpose on behalf of the pre-born and ignore any unjust rulings that permit their slaughter.

This platform serves as a tool for abolitionists to:
-   Identify and contact their elected representatives to demand equal protection.
-   Educate themselves and others on the principles of abolitionism.
-   Organize and mobilize for legislative change in Georgia.

## Features

### Who Do I Call
Interactive map-based tool that helps Georgia residents:
- Find their U.S. House, State Senate, and State House representatives by ZIP code.
- View contact information for their elected officials to demand the abolition of abortion.
- Locate nearby abolitionist societies and advocacy centers.
- Visualize their location on an interactive map with Leaflet.

### Timeline
A chronological overview of the fight for equal protection and the history of abortion legislation in Georgia.

### FAQs
Answers to common questions about abolitionism, equal protection, and why we must move beyond pro-life regulation to total abolition.

## Tech Stack

- **Framework**: SvelteKit 2
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Mapping**: Leaflet.js with OpenStreetMap tiles
- **Geospatial**: Turf.js
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

## Testing

See `TEST_ADDRESSES.md` for test ZIP codes and addresses to verify the "Who Do I Call" functionality.

## Project Structure

```
abolition_georgia/
├── src/
│   ├── routes/
│   │   ├── who-do-i-call/     # Interactive representative finder
│   │   ├── timeline/           # Abolitionist timeline
│   │   ├── faqs/              # FAQs on Abolitionism
│   │   └── +layout.svelte     # Main layout with navigation
│   └── app.html               # HTML template
├── static/
│   └── data/                  # JSON data files for districts and representatives
└── README.md
```
