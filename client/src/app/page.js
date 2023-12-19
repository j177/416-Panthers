"use client"

import './stylesheets/page.css'

import { useState } from 'react'

import { GlobalData } from './contexts/context'
import Navigation from './components/navbar'
import MainMap from './components/mainMap.js'
import StatePage from './components/statePage'

export default function Home() {
    const [state, setState] = useState()
    const [ensemble, setEnsemble] = useState()
    const [distanceMeasure, setDistanceMeasure] = useState()
    const [cluster, setCluster] = useState()
    const [districtPlan, setDistrictPlan] = useState()
    const [districtPlanIds, setDistrictPlanIds] = useState([])

    let pageToDisplay
    if (state) {
        pageToDisplay = <StatePage />
    }
    else {
        pageToDisplay = <MainMap />
    }

    return (
        <GlobalData.Provider value = {{ state, setState,
                                        ensemble, setEnsemble,
                                        distanceMeasure, setDistanceMeasure,
                                        cluster, setCluster,
                                        districtPlan, setDistrictPlan,
                                        districtPlanIds, setDistrictPlanIds }}>
            <div className = "main">
                <Navigation />
                {pageToDisplay}
            </div>
        </GlobalData.Provider>
    )
}