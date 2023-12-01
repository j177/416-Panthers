import '../stylesheets/state.css'

import { useContext } from 'react'

import StateMap from './stateMap.js'
import EnsembleVisuals from './ensembleComponents/ensembleVisuals'
import ClusterVisuals from './clusterComponents/clusterVisuals'
import DistrictPlanVisuals from './districtPlanVisuals'
import { GlobalData } from '../contexts/context'

export default function StatePage() {
    const { ensemble, distanceMeasure, cluster } = useContext(GlobalData)

    let visualsToDisplay
    if (cluster) {
        visualsToDisplay = 
            <div className = "dp-data-container">
                <DistrictPlanVisuals />
            </div>
    }
    else if (ensemble && distanceMeasure) {
        visualsToDisplay =
            <div className = "cluster-data-container">
                <ClusterVisuals />
            </div>
    }
    else {
        visualsToDisplay = 
            <div className = "ensemble-data-container">
                <EnsembleVisuals />
            </div>
    }

    return (
        <>
            <div className = "state-page-container">
                <div className = "left-container">
                    <StateMap />
                </div>
                <div className = "right-container">
                    {visualsToDisplay}
                </div>
            </div>
        </>
    )
}