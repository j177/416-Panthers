"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import statesGEO from '../stateGeoJSON/states.geo.json';

export default function MainMap({ state, zoom }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const minZoom = 5;
      const maxZoom = 8;
      const southWest = L.latLng(35, -100);
      const northEast = L.latLng(50, -60);
      const bounds = L.latLngBounds(southWest, northEast);

      const map = L.map("main-map", {minZoom: minZoom, maxZoom: maxZoom, maxBounds: bounds}).setView(state.coordinates, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const geoJSONLayer = L.geoJSON(statesGEO, {
        onEachFeature: function (feature, layer) {
          layer.on('click', function (e) {
            const stateName = feature.properties.name;

            router.push('/' + stateName.replace(/ /g, ''));
          });
        },
      }).addTo(map);

      geoJSONLayer.eachLayer((layer) => {
        layer.setStyle({
          fillColor: "green",
          fillOpacity: 0.5,
          color: "white",
          weight: 2
        });
      
        layer.on("mouseover", () => {
          layer.setStyle({
            fillColor: "red",
            fillOpacity: 0.5,
            color: "white",
            weight: 2
          });
        });
      
        layer.on("mouseout", () => {
          layer.setStyle({
            fillColor: "green",
            color: "white",
            fillOpacity: 0.5,
            weight: 2
          });
        });
      });

      return () => {
        map.remove();
      };
    }
  }, [state, zoom, router]);

  return (<div id = "main-map"></div>);
}