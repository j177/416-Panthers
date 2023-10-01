import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import statesGEO from './stateGeoJSON/states.geo.json';

export default function Map() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const map = L.map('map').setView([37.8, -96], 4);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const geoJSONLayer = L.geoJSON(statesGEO, {
        style: {
          fillColor: 'green',
          fillOpacity: 0.5,
          color: 'black',
          weight: 1,
        },
        onEachFeature: function (feature, layer) {
          layer.on('click', function (e) {
            const stateName = feature.properties.name;
            alert(`Clicked on ${stateName}`);
          });
        },
      }).addTo(map);

      return () => {
        map.remove();
      };
    }
  }, []);

  return <div id="map" style={{ height: '600px', width: '100%' }}></div>;
}