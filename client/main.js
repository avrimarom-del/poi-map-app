// Initialize the map centered on Tel Aviv
const map = L.map('map').setView([32.0853, 34.7818], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load POIs from server
fetch('http://localhost:5000/api/pois')
  .then(res => res.json())
  .then(pois => {
    pois.forEach(poi => {
      L.marker([poi.lat, poi.lng]).addTo(map)
        .bindPopup(poi.name || 'POI');
    });
  });

// Add marker and save POI to server on map click
map.on('click', function(e) {
  const name = prompt('Enter POI name:');
  if (!name) return;

  const poi = {
    lat: e.latlng.lat,
    lng: e.latlng.lng,
    name: name
  };

  // Save to backend
  fetch('http://localhost:5000/api/pois', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(poi)
  })
  .then(res => res.json())
  .then(savedPoi => {
    L.marker([savedPoi.lat, savedPoi.lng]).addTo(map)
      .bindPopup(savedPoi.name);
  });
});