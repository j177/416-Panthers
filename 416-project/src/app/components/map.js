"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import L, { MapContainer, TileLayer, Marker, Popup } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { States } from '../constants/stateConstants'
import statesGEO from '../stateGeoJSON/states.geo.json';
import conGEO from '../stateGeoJSON/USA_118th_Congressional_Districts.geo.json'

export default function Map({ state, zoom }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const map = L.map('map').setView(state.coordinates, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const geoJSONLayer = L.geoJSON(statesGEO, {
        style: {
          fillColor: 'green',
          fillOpacity: 0.5,
          weight: 1,
        },
        onEachFeature: function (feature, layer) {
          layer.on('click', function (e) {
            const stateName = feature.properties.name;

            router.push('/' + stateName.replace(/ /g, ''));
          });
        },
      }).addTo(map);

      if (state != States.NOT_SELECTED) {
        const conDis = L.geoJSON(conGEO, {
          style: function (feature) {
            const party = feature.properties.PARTY;
            return {
              color: party === 'Democrat' ? 'blue' : party === 'Republican' ? 'red' : 'gray',
              weight: 2,
            };
          },
        }).addTo(map)
      }

      return () => {
        map.remove();
      };
    }
  }, [state, zoom, router]);

  return (<div id="map"></div>);
}