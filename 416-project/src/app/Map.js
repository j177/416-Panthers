"use client"

import { useEffect } from 'react';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import statesGEO from './stateGeoJSON/states.geo.json'
import './page.css'

export default function Map( {coordinates, zoom} ) {
    useEffect(() => {
        const map = L.map('map').setView(coordinates, zoom);

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
    }, [coordinates, zoom]);

    return <div id = "map"></div>;
}