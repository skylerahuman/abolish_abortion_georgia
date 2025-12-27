# Data Sources and Enhancement Guide

This document outlines how to obtain real Georgia district boundary data and representative information to replace the placeholder data in the "Who Do I Call" feature.

## Geographic Data (GeoJSON)

### U.S. Congressional Districts
**Source**: U.S. Census Bureau TIGER/Line Shapefiles
- **URL**: https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html
- **File**: Congressional Districts (Current)
- **Process**:
  1. Download the shapefile for Georgia congressional districts
  2. Convert to GeoJSON using GDAL/ogr2ogr or online converter (e.g., mapshaper.org)
  3. Simplify geometry if needed to reduce file size
  4. Save as `static/data/ga-congress.json`

### Georgia State Senate Districts
**Source**: Georgia GIS Clearinghouse
- **URL**: https://data.georgiaspatial.org/
- **Search**: "State Senate Districts"
- **Alternative**: https://www.legis.ga.gov/
- **Process**: Same as congressional districts

### Georgia State House Districts
**Source**: Georgia GIS Clearinghouse
- **URL**: https://data.georgiaspatial.org/
- **Search**: "State House Districts"
- **Process**: Same as congressional districts

### ZIP Code Boundaries
**Source**: U.S. Census Bureau or OpenDataSoft
- **Census URL**: https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-geodatabases-file.html
- **OpenDataSoft**: https://public.opendatasoft.com/explore/dataset/us-zip-code-latitude-and-longitude/
- **Note**: ZIP codes are postal delivery routes, not true geographic areas. Using centroids is often sufficient.

### Georgia State Boundary
**Source**: U.S. Census Bureau
- **URL**: https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html
- **File**: States (Current)
- **Filter**: Georgia only

## Representative Data

### U.S. House Representatives
**Primary Source**: Official House of Representatives
- **URL**: https://www.house.gov/representatives
- **API**: https://api.congress.gov/ (requires API key)
- **Manual**: https://www.house.gov/representatives/find-your-representative

**Data to Update**:
```json
{
  "GA-1": {
    "name": "Rep. [Full Name]",
    "party": "R/D/I",
    "phone": "(202) 225-XXXX",
    "email": "[firstname.lastname]@mail.house.gov",
    "office_address": "[Full DC Office Address]"
  }
}
```

### Georgia State Senate
**Source**: Georgia General Assembly
- **URL**: https://www.legis.ga.gov/members/senate
- **Directory**: Lists all state senators with contact info
- **Update Frequency**: After each election (every 2 years)

### Georgia State House
**Source**: Georgia General Assembly
- **URL**: https://www.legis.ga.gov/members/house
- **Directory**: Lists all state representatives with contact info
- **Update Frequency**: After each election (every 2 years)

## Points of Contact Data

The `points-of-contact.json` file should be populated with actual advocacy organizations, community centers, or outreach offices. Consider:

### Potential Data Sources
1. **Advocacy Organizations**: Contact local advocacy groups for their office locations
2. **Community Centers**: Use Google Places API or similar to find community centers by district
3. **Church/Faith Organizations**: If relevant to your mission
4. **Government Offices**: County offices, district offices of representatives

### Data Structure
```json
{
  "GA-1": [
    {
      "name": "Organization Name",
      "lat": 32.0809,
      "lng": -81.0912,
      "type": "Organization Type",
      "address": "Full Street Address",
      "phone": "(XXX) XXX-XXXX",
      "website": "https://example.org"
    }
  ]
}
```

## Automation and Updates

### Recommended Update Schedule
- **Congressional Districts**: After redistricting (every 10 years) or when representatives change
- **State Districts**: After redistricting (every 10 years) or when representatives change
- **Representative Info**: After each election (November)
- **Points of Contact**: Quarterly review

### Automation Options
1. **GitHub Actions**: Schedule workflow to check for representative updates
2. **API Integration**: Use Congress.gov API or similar for automatic updates
3. **Web Scraping**: Cautiously scrape official government websites (respect robots.txt)

## GeoJSON Optimization

For better performance, optimize your GeoJSON files:

### Using mapshaper
```bash
# Install mapshaper
npm install -g mapshaper

# Simplify geometry (adjust 5% as needed)
mapshaper input.json -simplify 5% -o output.json

# Or use the web interface
# Visit https://mapshaper.org/
```

### File Size Guidelines
- State boundary: < 100 KB
- Congressional districts (14 districts): < 500 KB
- State senate (56 districts): < 2 MB
- State house (180 districts): < 5 MB

## Testing Data Accuracy

After updating data:
1. Test with known addresses in each district
2. Verify representative information is current
3. Check that district boundaries align correctly
4. Validate GeoJSON structure using geojson.io

## Legal and Attribution

- **Census Data**: Public domain, no attribution required
- **State GIS Data**: Check Georgia's open data license
- **Representative Photos/Bios**: Respect copyright and fair use
- **OpenStreetMap**: Requires attribution (already included in map tiles)

## Contact for Data Issues

If you find discrepancies:
- **Federal Representatives**: https://clerk.house.gov/
- **Georgia State Legislature**: https://www.legis.ga.gov/
- **GIS Data**: Georgia GIS Clearinghouse support
