"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { States } from '../constants/stateConstants'
//import statesGEO from '../geoJSON/state/states.geo.json';
//import conGEO from '../stateGeoJSON/USA_118th_Congressional_Districts.geo.json'

import miStateGEO from '../geoJSON/state/Michigan.geo.json';
import nyStateGEO from '../geoJSON/state/New_York.geo.json';
import paStateGEO from '../geoJSON/state/Pennsylvania.geo.json';

import miDistGEO from '../geoJSON/district/Michigan_Congressional_Districts.geo.json'
import nyDistGEO from '../geoJSON/district/New_York_Congressional_Districts.geo.json'
import paDistGEO from '../geoJSON/district/Pennsylvania_Congressional_Districts.geo.json'


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

      let stateGEO;
      let districtGEO;
      switch (state.name) {
        case States.MICHIGAN.name:
          stateGEO = miStateGEO;
          districtGEO = miDistGEO;
          break;
        case States.NEW_YORK.name:
          stateGEO = nyStateGEO;
          districtGEO = nyDistGEO;
          break;
        case States.PENNSYLVANIA.name:
          stateGEO = paStateGEO;
          districtGEO = paDistGEO;
          break;
      }

      const geoJSONLayer = L.geoJSON(stateGEO).addTo(map);

      const conDis = L.geoJSON(districtGEO, {
        style: function (feature) {
          const party = feature.properties.PARTY;
          return {
            color: party === 'Democrat' ? 'blue' : party === 'Republican' ? 'red' : 'gray',
            weight: 2,
            fillColor: party === 'Democrat' ? 'blue' : party === 'Republican' ? 'red' : 'gray',
            fillOpacity: 0.5
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