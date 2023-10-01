"use client"
import { useEffect } from 'react';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

export default function Map() {
  useEffect(() => {
    const map = L.map('map').setView([37.8, -96], 4); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: '600px', width: '100%' }}></div>;
}