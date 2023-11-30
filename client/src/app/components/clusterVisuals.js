import React, { useContext, useState, useEffect } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import axios from 'axios'
import qs from 'qs'

import { PageData } from '../contexts/context.js'

import ClusterAnalysisTable from './clusterAnalysisTable.js'
import StatePageScatterPlot from './statePageScatterPlot.js'
import DistanceMeasureTable from './distanceMeasureTable.js'
import RDSplitsBarGraph from './rdSplitsBarGraph.js'

import { TabNames } from '../constants/tabConstants.js'

export default function ClusterVisuals() {
    const { ensemble, setEnsemble, distanceMeasure, setDistanceMeasure } = useContext(PageData)

    const [clusters, setClusters] = useState()
    const [activeTab, setActiveTab] = useState(TabNames.CLUSTER_ANALYSIS)

    useEffect(() => {
        const getClusters = async () => {
            try {
                const clusters = await axios.get("http://localhost:8080/clusters", {
                    params: {
                        ids: ensemble[distanceMeasure].clusterIds
                    },
                    paramsSerializer: params => {
                        return qs.stringify(params, { arrayFormat: 'repeat' })
                    }
                })

                setClusters(clusters.data)
            } catch (error) {
                console.log("Error fetching clusters: ", error)
            }
        }
    
        getClusters()
    }, [])

    const handleTabClick = (tab) => {
        if (tab === TabNames.BACK_TAB) {
            setEnsemble()
            setDistanceMeasure()
        } else {
            setActiveTab(tab)
        }
    };

    const convertToDisplay = (name) => {
        return (name.charAt(0).toUpperCase() + name.slice(1)).replace(/([a-z])([A-Z])/g, '$1 $2')
    }

    if (!clusters) {
        return
    }

    return (
        <>
            <div className = "location-marker">
                <span>Current Ensemble: {ensemble.name}</span>
                <span>Current Distance Measure: {convertToDisplay(distanceMeasure)}</span>
            </div>
            <Tabs
                defaultActiveKey = { TabNames.CLUSTER_ANALYSIS } // Set the default active tab here
                transition = { false }
                className = "mb-3"
                activeKey = { activeTab } // Add this line to reflect the active tab
                onSelect = { handleTabClick } // Add this line to handle tab selection
            >
                <Tab eventKey = { TabNames.BACK_TAB } title = '< Back'>
                </Tab>
                <Tab eventKey = { TabNames.CLUSTER_ANALYSIS } title = "Cluster Analysis">
                    <ClusterAnalysisTable clusters = {clusters} />
                </Tab>
                <Tab eventKey = { TabNames.SCATTER_PLOT } title = "Scatter Plot">
                    <StatePageScatterPlot />
                </Tab>
                <Tab eventKey = { TabNames.RD_SPLITS } title = "RD Splits">
                    <RDSplitsBarGraph clusters = {clusters} />
                </Tab>
            </Tabs>
        </>
    )
}
