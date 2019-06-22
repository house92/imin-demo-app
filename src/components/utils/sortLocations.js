export default function sortLocations(locations) {
  return locations.sort((a, b) => a.geo['imin:distanceFromGeoQueryCenter'].value - b.geo['imin:distanceFromGeoQueryCenter'].value);
}