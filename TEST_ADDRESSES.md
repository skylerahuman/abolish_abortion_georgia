# Test Addresses for "Who Do I Call" Feature

Use these fictional addresses to test the district lookup and mapping functionality:

## 1. Abraham Carpenter

- **Address**: 1123 Peachtree Walk NE, Atlanta, GA 30309
- **ZIP Code**: 30309
- **Profile**: Midtown high-rise resident, tech worker
- **Expected District**: GA-5 (U.S. House)

## 2. Deborah Stone

- **Address**: 455 Olive Branch Road, Savannah, GA 31419
- **ZIP Code**: 31419
- **Profile**: Suburban homeowner, focused on coastal environmental issues
- **Expected District**: GA-1 (U.S. House)

## 3. Josiah Miller

- **Address**: 289 Shepherd's Way, Macon, GA 31210
- **ZIP Code**: 31210
- **Profile**: North Macon subdivision resident
- **Expected District**: GA-8 (U.S. House)

## 4. Priscilla Wright

- **Address**: 67 Antioch Trail, Augusta, GA 30909
- **ZIP Code**: 30909
- **Profile**: Townhome resident, looking for nearest outreach/advocacy contact
- **Expected District**: GA-12 (U.S. House)

## 5. Barnabas Fields

- **Address**: 903 Cedar Grove Lane, Columbus, GA 31907
- **ZIP Code**: 31907
- **Profile**: Single-family home, tests ZIP-only input
- **Expected District**: GA-3 (U.S. House)

## Testing Steps

1. Open the application at http://localhost:5173/who-do-i-call
2. Enter each ZIP code in the input field
3. Click "Find" or press Enter
4. Verify that:
   - The correct U.S. House district is identified
   - Representative information is displayed
   - State senate and house districts are shown (if available)
   - The map zooms to the location
   - The district polygon is highlighted on the map
   - User location marker (red) appears
   - Point of contact marker (crimson) appears
   - Both markers have popups with information

## Notes

- The GeoJSON district files contain simplified polygons for testing
- For production, replace with actual Georgia district boundary data from:
  - Georgia GIS Clearinghouse
  - U.S. Census TIGER/Line files
  - Georgia Secretary of State data
- The representative data should be updated regularly to reflect current officeholders
- Points of contact are placeholder locations and should be replaced with actual advocacy centers/organizations
