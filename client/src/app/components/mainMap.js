import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react'

import { GlobalData } from '../contexts/context'
import { MainMapData } from '../constants/mainMapData'

export default function MainMap() {
    const { setState } = useContext(GlobalData)

    const [stateBoundaries, setStateBoundaries] = useState()

    const handleSetState = (name) => {
        const getState = async () => {
            try {
                const stateData = await axios.get("http://localhost:8080/state", {
                    params: {
                        state: name
                    }
                })
    
                setState(stateData.data)
            } catch (error) {
                console.log("Error fetching state: ", error)
            }
        }
    
        getState()
    }

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
        if (!stateBoundaries) {
            return
        }

        const minZoom = MainMapData.MIN_ZOOM
        const maxZoom = MainMapData.MAX_ZOOM
        const southWest = L.latLng(MainMapData.SOUTH_WEST.x, MainMapData.SOUTH_WEST.y)
        const northEast = L.latLng(MainMapData.NORTH_EAST.x, MainMapData.NORTH_EAST.y)
        const bounds = L.latLngBounds(southWest, northEast)
        const startCoords = [MainMapData.START_COORDS.x, MainMapData.START_COORDS.y]
        const zoom = MainMapData.ZOOM

        const map = L.map("main-map", {
            minZoom: minZoom,
            maxZoom: maxZoom,
            maxBounds: bounds
        }).setView(startCoords, zoom)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

        const geoJSONLayer = L.geoJSON(stateBoundaries, {
            onEachFeature: function (feature, layer) {
                layer.on('click', function (e) {
                    const stateName = feature.properties.name

                    handleSetState(stateName)
                })
            },
        }).addTo(map)

        geoJSONLayer.eachLayer((layer) => {
            layer.setStyle({
                color: '#6054a1',
                fillColor: 'transparent',
                weight: 3
            })
        
            layer.on("mouseover", () => {
                layer.setStyle({
                    fillColor: '#9999FF',
                    fillOpacity: 0.5,
                    weight: 5
                })
            })
        
            layer.on("mouseout", () => {
                layer.setStyle({
                    fillColor: 'transparent',
                    weight: 3,
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
