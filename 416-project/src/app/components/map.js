"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import L, { MapContainer, TileLayer, Marker, Popup } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import statesGEO from '../stateGeoJSON/states.geo.json';

export default function Map( {state, zoom} ) {
    const router = useRouter();

    useEffect(() => {
        const map = L.map('map').setView(state.coordinates, zoom);

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

                    router.push('/' + stateName.replace(/ /g, ''));
                });
            },
        }).addTo(map);

        return () => {
            map.remove();
        };
    }, [state, zoom]);

    return (<div id = "map"></div>);
}