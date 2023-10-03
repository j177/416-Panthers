"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { States } from '../constants/stateConstants'
import statesGEO from '../stateGeoJSON/states.geo.json';
import conGEO from '../stateGeoJSON/USA_118th_Congressional_Districts.geo.json'

export default function StateMap({ state, zoom }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const minZoom = 7;
      const maxZoom = 10;
      const southWest = L.latLng(state.coordinates[0]-5, state.coordinates[1]-5);
      const northEast = L.latLng(state.coordinates[0]+5, state.coordinates[1]+5);
      const bounds = L.latLngBounds(southWest, northEast);

      const map = L.map("state-map", {minZoom: minZoom, maxZoom: maxZoom, maxBounds: bounds}).setView(state.coordinates, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const geoJSONLayer = L.geoJSON(statesGEO, {
        style: function (feature) {
          const stateName = feature.properties.name;
          if (stateName === state.name) {
            return {
              fillColor: 'green',
              fillOpacity: 0.5,
              color: 'white',
              weight: 2
            };
          }
        }
      }).addTo(map);

      const conDis = L.geoJSON(conGEO, {
        style: function (feature) {
          const party = feature.properties.PARTY;
          return {
            color: party === 'Democrat' ? 'blue' : party === 'Republican' ? 'red' : 'gray',
            weight: 2,
          };
        },
      }).addTo(map)

      return () => {
        map.remove();
      };
    }
  }, [state, zoom, router]);

  return (<div id = "state-map"></div>);
}