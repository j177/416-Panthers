import React, { useContext, useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import { PageData } from '../contexts/context.js'

import ClusterAnalysisTable from './clusterAnalysisTable.js'
import StatePageScatterPlot from './statePageScatterPlot.js'
import DistanceMeasureTable from './distanceMeasureTable.js'

import { TabNames } from '../constants/tabConstants.js'

export default function EnsembleVisualizations() {
    const { setEnsemble } = useContext(PageData)

    const [activeTab, setActiveTab] = useState(TabNames.CLUSTER_ANALYSIS)

    const handleTabClick = (tab) => {
        if (tab === TabNames.BACK_TAB) {
            setEnsemble()
        } else {
            setActiveTab(tab)
        }
    };

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
                    <ClusterAnalysisTable />
                </Tab>
                <Tab eventKey = { TabNames.SCATTER_PLOT } title = "Scatter Plot">
                    <StatePageScatterPlot />
                </Tab>
                <Tab eventKey = { TabNames.DISTANCE_MEASURES } title = "Distance Measures">
                    <DistanceMeasureTable />
                </Tab>
            </Tabs>
        </>
    )
}