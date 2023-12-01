import React, { useContext, useState, useEffect } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import axios from 'axios'
import qs from 'qs'

import { GlobalData } from '../contexts/context.js'

import ClusterAnalysisTable from './clusterAnalysisTable.js'
import MDSPlot from './mdsPlot.js'
import MeasureScatterPlot from './measureScatterPlot.js'
import RDSplitsBarGraph from './rdSplitsBarGraph.js'

import { TabNames } from '../constants/tabConstants.js'

export default function ClusterVisuals() {
    const { ensemble, setEnsemble, distanceMeasure, setDistanceMeasure } = useContext(GlobalData)

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

    if (!clusters) {
        return
    }

    return (
        <>
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
                <Tab eventKey = { TabNames.MDS } title = "MDS Plot">
                    <MDSPlot clusters = {clusters} />
                </Tab>
                <Tab eventKey = { TabNames.MEASURE } title = "Measure Plot">
                </Tab>
                <Tab eventKey = { TabNames.RD_SPLITS } title = "RD Splits">
                    <RDSplitsBarGraph clusters = {clusters} />
                </Tab>
            </Tabs>
        </>
    )
}
