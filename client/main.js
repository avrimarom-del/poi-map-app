// Initialize the map centered on Tel Aviv
const map = L.map('map').setView([32.0853, 34.7818], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add a marker for fun (remove later)
L.marker([32.0853, 34.7818]).addTo(map)
  .bindPopup('Hello from Tel Aviv!');