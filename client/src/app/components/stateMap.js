"use client"

import { useEffect, useState, useContext } from 'react'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'

import { GlobalData } from '../contexts/context'

export default function StateMap() {
    const { state } = useContext(GlobalData)

    const [defaultPlan, setDefaultPlan] = useState()
    const [stateBoundary, setStateBoundary] = useState()

    useEffect(() => {
        if (state.boundaryId === undefined || state.planId === undefined) {
            return
        }

        const getStateBoundary = async () => {
            try {
                const stateBoundary = await axios.get("http://localhost:8080/state-boundary", {
                    params: {
                        id: state.boundaryId
                    }
                })

                setStateBoundary(stateBoundary.data)
            } catch (error) {
                console.log("Error fetching state boundary: ", error)
            }
        }

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

        getStateBoundary()
        getDefaultPlan()
    }, [state])

    useEffect(() => {
        if (typeof window == "undefined" || !defaultPlan || !stateBoundary) {
            return
        }

        const minZoom = 5
        const maxZoom = 10
        const center = state.center
        const southWest = L.latLng(center.x-5, center.y-5)
        const northEast = L.latLng(center.x+5, center.y+5)
        const bounds = L.latLngBounds(southWest, northEast)
        const zoom = 7

        const map = L.map("state-map", {minZoom: minZoom, maxZoom: maxZoom, maxBounds: bounds})
                    .setView([center.x, center.y], zoom)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        const geoJSONLayer = L.geoJSON(stateBoundary).addTo(map)

        const conDis = L.geoJSON(defaultPlan).addTo(map)

        conDis.eachLayer((layer) => {
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
  }, [state, defaultPlan, stateBoundary])

    return (
        <div id = "state-map"></div>
    )
}