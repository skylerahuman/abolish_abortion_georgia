# Troubleshooting Guide

## Common Issues and Solutions

### Issue: "Could not find this ZIP code in Georgia"

**Symptoms**: Error message appears after entering a valid Georgia ZIP code

**Solutions**:

1. **Check Browser Console**: Open browser DevTools (F12) and look for error messages
2. **Verify Network**: Ensure internet connection is working (Nominatim API requires internet)
3. **Add to Fallback**: Edit `src/routes/who-do-i-call/+page.svelte` and add the ZIP to the `zipCodeFallback` object:
   ```javascript
   const zipCodeFallback = {
     'XXXXX': { lat: XX.XXXX, lng: -XX.XXXX, city: 'City Name' },
     // ... existing entries
   };
   ```
4. **Check Rate Limiting**: Nominatim limits requests to 1 per second. Wait a moment and try again.

### Issue: "Could not determine congressional district"

**Symptoms**: Geocoding succeeds but no district is found

**Solutions**:

1. **Check Coordinates**: Look at browser console to see lat/lng coordinates
2. **Verify Boundaries**: Check if the point falls within any polygon in `static/data/ga-congress.json`
3. **Expand District**: Edit the GeoJSON file to expand the district polygon
4. **Use Real Data**: Replace simplified polygons with actual district boundaries

### Issue: Map Not Displaying

**Symptoms**: Map area is blank or shows only gray tiles

**Solutions**:

1. **Check Leaflet CSS**: Verify `src/app.html` includes Leaflet CSS link
2. **Check Console**: Look for JavaScript errors in browser console
3. **Network Issues**: Verify OpenStreetMap tiles can be loaded (check Network tab)
4. **Container Size**: Ensure map container has explicit height (currently set to `h-[600px]`)

### Issue: Representative Information Not Showing

**Symptoms**: District is found but no representative details appear

**Solutions**:

1. **Check District Code**: Verify the district code matches what's in `representatives.json`
2. **Check JSON Structure**: Ensure `static/data/representatives.json` has entry for that district
3. **Add Representative**: Edit `representatives.json` to add missing representative:
   ```json
   "GA-X": {
     "name": "Rep. Name",
     "party": "R",
     "phone": "(202) 225-XXXX",
     "email": "name@mail.house.gov",
     "office_address": "Address"
   }
   ```

### Issue: Point of Contact Not Appearing

**Symptoms**: Representatives show but no point of contact marker/info

**Solutions**:

1. **Check Data File**: Verify `static/data/points-of-contact.json` has entry for the district
2. **Add POC**: Edit the file to add a point of contact:
   ```json
   "GA-X": [{
     "name": "Organization Name",
     "lat": XX.XXXX,
     "lng": -XX.XXXX,
     "type": "Type",
     "address": "Full Address"
   }]
   ```

### Issue: State House/Senate District Not Found

**Symptoms**: Congressional district works but state districts show "N/A"

**Solutions**:

1. **Limited Coverage**: Sample data only includes a few state districts
2. **Add Districts**: Download and add real state district boundaries to:
   - `static/data/ga-state-senate.json` (56 districts total)
   - `static/data/ga-state-house.json` (180 districts total)
3. **See DATA_SOURCES.md**: Follow guide to obtain official district boundaries

## Performance Issues

### Slow Geocoding

**Symptoms**: Long delay after clicking "Find"

**Solutions**:

1. **Network Speed**: Geocoding requires API call - check internet speed
2. **API Issues**: Nominatim may be slow - consider alternative services
3. **Add Caching**: Implement localStorage caching for previously searched ZIPs

### Map Loading Slowly

**Symptoms**: Tiles load slowly or incompletely

**Solutions**:

1. **Network Speed**: OpenStreetMap tiles require internet bandwidth
2. **Try Different Tile Server**: Can switch to other OSM tile providers
3. **Zoom Level**: Lower zoom levels load faster

## Development Issues

### Build Errors

**Symptoms**: `npm run build` fails with TypeScript errors

**Solutions**:

1. **Check Imports**: Verify all imports are correct
2. **Type Errors**: Check TypeScript types match interface definitions
3. **Clean Install**: Delete `node_modules` and run `npm install` again

### Dev Server Won't Start

**Symptoms**: `npm run dev` fails or crashes

**Solutions**:

1. **Port Already in Use**: Kill process on port 5173 or let Vite use different port
2. **Dependencies**: Run `npm install` to ensure all packages are installed
3. **Node Version**: Verify Node.js version is compatible (v18+ recommended)

## Browser Compatibility

### Supported Browsers
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

### Known Issues
- Internet Explorer: Not supported (uses modern JavaScript)
- Old Mobile Browsers: May have limited functionality

## Getting Help

1. **Check Console**: Always check browser DevTools console first
2. **Review Documentation**: See README.md, DATA_SOURCES.md, and ENHANCEMENTS.md
3. **Test with Known ZIPs**: Use the test addresses in TEST_ADDRESSES.md
4. **Simplify**: Try the simplest test case (e.g., ZIP 30309) first

## Debug Mode

To enable detailed logging:

1. Open `src/routes/who-do-i-call/+page.svelte`
2. Console.log statements are already included
3. Look for:
   - "Looking up districts for point:"
   - "Found districts:"
   - "Error loading data:"
   - "Search error:"

## Quick Checklist

Before reporting an issue, verify:
- [ ] Internet connection is working
- [ ] Browser console has no JavaScript errors
- [ ] Leaflet CSS is loaded (check Network tab)
- [ ] Data files exist in `static/data/`
- [ ] Data files have valid JSON syntax
- [ ] ZIP code is actually in Georgia
- [ ] Tested with a known working ZIP (e.g., 30309)
