const form = document.getElementById('weatherForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (document.getElementById('city').value) {
        window.location.replace(`${window.location.href.split('?')[0]}?city=${document.getElementById('city').value}`)
    }
})


var coordinateElement = document.getElementById('longitude-latitude');
var coordinates = coordinateElement.innerHTML.split(', ');

var longitude = parseFloat(coordinates[0].replace('°', ''));
var latitude = parseFloat(coordinates[1].replace('°', ''));

var map = L.map('map').setView([latitude, longitude], 10);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);