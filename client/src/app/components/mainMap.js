"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import axios from 'axios';
import statesGEO from '../geoJSON/state/states.geo.json';

export default function MainMap() {
  const router = useRouter();

  const [data, setData] = useState();
  // useEffect(() => {
  //   loadStatesData();
  // }, [])

  const loadStatesData = async () => {
    const result = await axios.get("http://localhost:8080/states", {
      params: {
        param1: 'test1',
        param2: 'test2'
      }
    });

    console.log(result);
    if (!result) {
      setCenter({x: 0, y: 0});
    }
    else {
      setCenter(result.data.center);
    }
  }

  const test = async () => {
    const result = await axios.get("http://localhost:8080/state-boundaries", {
      params: {
      }
    })
    
    console.log(result.data);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const minZoom = 5;
      const maxZoom = 8;
      const southWest = L.latLng(35, -100);
      const northEast = L.latLng(50, -60);
      const bounds = L.latLngBounds(southWest, northEast);
      const startCoords = [43, -79];
      const zoom = 6;

      const map = L.map("main-map", {minZoom: minZoom, maxZoom: maxZoom, maxBounds: bounds}).setView(startCoords, zoom);

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
          color: '#9999FF',
          fillColor: 'transparent',
          weight: 5
        });
      
        layer.on("mouseover", () => {
          layer.setStyle({
            color: '#9999FF',
            fillColor: '#9999FF',
            fillOpacity: 0.5,
            weight: 5
          });
        });
      
        layer.on("mouseout", () => {
          layer.setStyle({
            color: '#9999FF',
            fillColor: 'transparent',
            weight: 5,
          });
        });
      });

      return () => {
        map.remove();
      };
    }
  }, [router]);

  return (<div id = "main-map"></div>);
}