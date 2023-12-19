import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import qs from 'qs'

import { GlobalData } from '../contexts/context'
import { StateMapData } from '../constants/stateMapData'

export default function StateMap() {
    const { state, districtPlan, districtPlanIds } = useContext(GlobalData)

    const [plan, setPlan] = useState()
    const [plans, setPlans] = useState([])

    useEffect(() => {
        const getPlans = async () => {
            try {
                let plans = await axios.get("http://localhost:8080/plans", {
                    params: {
                        ids: districtPlanIds
                    },
                    paramsSerializer: params => {
                        return qs.stringify(params, { arrayFormat: 'repeat' })
                    }
                })

                setPlans(plans.data)
            } catch (error) {
                console.log("Error fetching plans: ", error)
            }
        }

        const getPlan = async () => {
            try {
                let plan
                if (districtPlan) {
                    plan = await axios.get("http://localhost:8080/plan", {
                        params: {
                            id: districtPlan.planId
                        }
                    })
                }
                else {
                    plan = await axios.get("http://localhost:8080/default-plan", {
                        params: {
                            id: state.planId
                        }
                    })
                }

                setPlan(plan.data)
            } catch (error) {
                console.log("Error fetching plan: ", error)
            }
        }

        if (districtPlanIds.length !== 0) {
            getPlans()
        }
        else {
            getPlan()
            setPlans([])
        }
    }, [state, districtPlan, districtPlanIds])

    useEffect(() => {
        if (!plan && plans.length === 0) {
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

        if (plans.length > 0) {
            const color = ["purple", "orange"]
            for (let i = 0; i < plans.length; i++) {
                const conDis = L.geoJSON(plans[i]).addTo(map)

                conDis.eachLayer((layer) => {
                    layer.setStyle({
                        color: color[i],
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
            }
        }
        else {
            const conDis = L.geoJSON(plan).addTo(map)

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
        }

        return () => {
            map.remove()
        }
  }, [state, plan, plans])

    return (
        <div id = "state-map"></div>
    )
}