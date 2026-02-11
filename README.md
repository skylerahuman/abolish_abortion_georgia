# Abolish Abortion Georgia

<<<<<<< HEAD
<<<<<<< HEAD
This project is dedicated to the complete abolition of abortion in the state of Georgia. Our mission is to establish equal protection for all human beings, from the moment of fertilization to natural death, without exception or compromise.
=======
This project is dedicated to the complete abolition of abortion in the state of Georgia. Our mission is to establish equal protection for all human beings, from the moment of fertilization to natural death, without exception or compromise. We seek to mobilize Georgians to demand the immediate criminalization of abortion as murder, ensuring that pre-born children receive the same legal standing and protection as born persons.
>>>>>>> Home-Page-Revisions
=======
This project is dedicated to the complete abolition of abortion in the state of Georgia. Our mission is to establish equal protection for all human beings, from the moment of fertilization to natural death, without exception or compromise. We seek to mobilize Georgians to demand the immediate criminalization of abortion as murder, ensuring that pre-born children receive the same legal standing and protection as born persons.
>>>>>>> Home-Page-Tweaks

## Mission & Goals

Our core objective is **Equal Protection**:
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> Content-Changes-By-Skyler
1.  **Total Abolition:** We advocate for the complete removal of all laws allowing for the destruction of pre-born human life.
2.  **Equal Justice:** We demand that the laws of Georgia treat the intentional killing of a pre-born child with the same severity as the killing of a born person.
3.  **No Exceptions:** We stand against any exceptions based on age, method of conception, or developmental stage.
4.  **Immediacy:** We call for immediate action from our legislators to interpose on behalf of the pre-born.

## Features

### Local Church Network (Near Me)
<<<<<<< HEAD

Interactive map-based tool that helps Georgia residents:

=======
Interactive map-based tool that helps Georgia residents:
>>>>>>> Content-Changes-By-Skyler
- Find their GA House District by ZIP code.
- Connect with abolitionist churches.
- View random markers indicating network presence (simulated).
- Powered by Leaflet.js and a ZIP-to-District mapping.

<<<<<<< HEAD
### Abolition Basics & FAQs

Educational resources explaining the difference between Pro-Life regulation and Abolitionist immediatism.

### Respond

Action center for:

=======
### The Battleground (Georgia Battle)
A timeline and status tracker for the Georgia Equal Protection Act (HB 441).
- Visual timeline of events.
- Comparison between regulation and abolition.
- Current bill status.

### Abolition Basics & FAQs
Educational resources explaining the difference between Pro-Life regulation and Abolitionist immediatism.

### Respond
Action center for:
>>>>>>> Content-Changes-By-Skyler
- Prayer requests.
- Learning about HB 441.
- Donating to the cause.
=======
=======
>>>>>>> Home-Page-Tweaks
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
<<<<<<< HEAD
>>>>>>> Home-Page-Revisions
=======
>>>>>>> Home-Page-Tweaks

## Tech Stack

- **Framework**: SvelteKit 2
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Mapping**: Leaflet.js with OpenStreetMap tiles
<<<<<<< HEAD
<<<<<<< HEAD

## Developing

Start a development server:

```sh
npm install
npm run dev
```

<<<<<<< HEAD
## Testing

We use a dual-layer testing strategy to ensure code quality and stability.

### 1. Unit & Component Testing (Vitest)

Used for testing individual components, utility functions, and business logic in isolation.

- **Run Tests:** `npm run test:unit`
- **Watch Mode (TDD):** `npm run test:unit -- --watch`

### 2. End-to-End Testing (Playwright)

Used for testing full user flows, navigation, forms, and browser interactions.

- **Run Tests:** `npm test`
- **UI Mode (TDD):** `npx playwright test --ui`

### Continuous Integration

Tests are automatically run on every Pull Request via GitHub Actions.

- **Unit Tests:** Verified via Vitest.
- **E2E Tests:** Verified via Playwright (reports uploaded as artifacts).

=======
>>>>>>> Content-Changes-By-Skyler
## Building

To create a production version:
=======
=======
>>>>>>> Home-Page-Tweaks
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
<<<<<<< HEAD
>>>>>>> Home-Page-Revisions
=======
>>>>>>> Home-Page-Tweaks

```sh
npm run build
```

<<<<<<< HEAD
<<<<<<< HEAD
## Data Files

The application uses data files in `static/data/`:

- `zip_to_district.csv` - Mapping of GA ZIP codes to State House Districts.
<<<<<<< HEAD
=======
- `timeline.json` - Events for the Georgia Battle timeline.
>>>>>>> Content-Changes-By-Skyler
=======
=======
>>>>>>> Home-Page-Tweaks
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
<<<<<<< HEAD
>>>>>>> Home-Page-Revisions
=======
>>>>>>> Home-Page-Tweaks

## Project Structure

```
abolition_georgia/
├── src/
<<<<<<< HEAD
<<<<<<< HEAD
│   ├── lib/
│   │   └── utils.ts           # Utility functions
│   ├── routes/
│   │   ├── near-me/           # Local Church Network & District Finder
<<<<<<< HEAD
=======
│   │   ├── georgia-battle/    # HB 441 Timeline & Status
>>>>>>> Content-Changes-By-Skyler
│   │   ├── respond/           # Action center
│   │   ├── abolition-basics/  # Educational content
│   │   └── ...
│   └── app.html               # HTML template
├── static/
│   └── data/                  # CSV and JSON data files
=======
│   ├── routes/
│   │   ├── form/              # Interactive representative finder
=======
│   ├── routes/
│   │   ├── who-do-i-call/     # Interactive representative finder
>>>>>>> Home-Page-Tweaks
│   │   ├── timeline/           # Abolitionist timeline
│   │   ├── faqs/              # FAQs on Abolitionism
│   │   └── +layout.svelte     # Main layout with navigation
│   └── app.html               # HTML template
├── static/
│   └── data/                  # JSON data files for districts and representatives
<<<<<<< HEAD
>>>>>>> Home-Page-Revisions
=======
>>>>>>> Home-Page-Tweaks
└── README.md
```
