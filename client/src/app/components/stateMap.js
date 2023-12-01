"use client"

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react'

import { GlobalData } from '../contexts/context'
import { StateMapData } from '../constants/stateMapData'

export default function StateMap() {
    const { state } = useContext(GlobalData)

    const [defaultPlan, setDefaultPlan] = useState()

    useEffect(() => {
        const getDefaultPlan = async () => {
            try {
                const plan = await axios.get("http://localhost:8080/default-plan", {
                    params: {
                        id: state.planId
                    }
                })

                setDefaultPlan(plan.data)
            } catch (error) {
                console.log("Error fetching plan: ", error)
            }
        }

        getDefaultPlan()
    }, [state])

    useEffect(() => {
        if (!defaultPlan) {
            return
        }

        const minZoom = StateMapData.MIN_ZOOM
        const maxZoom = StateMapData.MAX_ZOOM
        const center = state.center
        const southWest = L.latLng(center.x-5, center.y-5)
        const northEast = L.latLng(center.x+5, center.y+5)
        const bounds = L.latLngBounds(southWest, northEast)
        const zoom = StateMapData.ZOOM

        const map = L.map("state-map", {
            minZoom: minZoom,
            maxZoom: maxZoom,
            maxBounds: bounds
        }).setView([center.x, center.y], zoom)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

        const conDis = L.geoJSON(defaultPlan).addTo(map)

        conDis.eachLayer((layer) => {
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
                    weight: 3
                })
            })
        })

        return () => {
            map.remove()
        }
  }, [state, defaultPlan])

    return (
        <div id = "state-map"></div>
    )
}