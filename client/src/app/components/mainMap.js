"use client"

import { useEffect, useState, useContext } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'

import { PageData } from '../contexts/context'

export default function MainMap() {
    const { setState } = useContext(PageData)

    const [stateBoundaries, setStateBoundaries] = useState()

    useEffect(() => {
        const getStateBoundaries = async () => {
            try {
                const result = await axios.get("http://localhost:8080/state-boundaries")

                setStateBoundaries(result.data)
            } catch (error) {
                console.log("Error fetching state boundaries: ", error)
            }
        }

        getStateBoundaries()
    }, [])

    useEffect(() => {
        if (typeof window === 'undefined' || !stateBoundaries) {
            return
        }

        const minZoom = 5
        const maxZoom = 8
        const southWest = L.latLng(35, -100)
        const northEast = L.latLng(50, -60)
        const bounds = L.latLngBounds(southWest, northEast)
        const startCoords = [43, -79]
        const zoom = 6

        const map = L.map("main-map", {minZoom: minZoom, maxZoom: maxZoom, maxBounds: bounds}).setView(startCoords, zoom)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        const geoJSONLayer = L.geoJSON(stateBoundaries, {
            onEachFeature: function (feature, layer) {
                layer.on('click', function (e) {
                    const stateName = feature.properties.name

                    setState({name: stateName})
                })
            },
        }).addTo(map)

        geoJSONLayer.eachLayer((layer) => {
            layer.setStyle({
                color: '#9999FF',
                fillColor: 'transparent',
                weight: 5
            })
        
            layer.on("mouseover", () => {
                layer.setStyle({
                    color: '#9999FF',
                    fillColor: '#9999FF',
                    fillOpacity: 0.5,
                    weight: 5
                })
            })
        
            layer.on("mouseout", () => {
                layer.setStyle({
                    color: '#9999FF',
                    fillColor: 'transparent',
                    weight: 5,
                })
            })
        })

        return () => {
            map.remove()
        }
    }, [stateBoundaries])

    return (
        <div id = "main-map"></div>
    )
}
