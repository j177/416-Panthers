"use client"

import { useEffect } from 'react';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import './page.css'

export default function Map( {coordinates, zoom} ) {
  useEffect(() => {
    const map = L.map('map').setView(coordinates, zoom); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [coordinates, zoom]);

  return <div id = "map"></div>;
}