import React, { useContext, useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import { PageData } from '../contexts/context.js'

import ClusterAnalysisTable from './clusterAnalysisTable.js'
import StatePageScatterPlot from './statePageScatterPlot.js'
import DistanceMeasureTable from './distanceMeasureTable.js'

import { TabNames } from '../constants/tabConstants.js'

import BarGraph from './BarGraph';


export default function ClustersVisualizations() {
    const { ensemble, setEnsemble, distanceMeasure, setDistanceMeasure } = useContext(PageData)

    const [activeTab, setActiveTab] = useState(TabNames.CLUSTER_ANALYSIS)

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
    
    const dummyRDSplits = [
        { rSeats: 6, dSeats: 5, quantity: 6 },
        { rSeats: 4, dSeats: 7, quantity: 8 },
        { rSeats: 8, dSeats: 3, quantity: 5 },
        { rSeats: 5, dSeats: 6, quantity: 7 },
        { rSeats: 7, dSeats: 4, quantity: 9 },
        { rSeats: 5, dSeats: 5, quantity: 7 },
      ];

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
                    <ClusterAnalysisTable />
                </Tab>
                <Tab eventKey = { TabNames.SCATTER_PLOT } title = "Scatter Plot">
                    <StatePageScatterPlot />
                </Tab>
                <Tab eventKey = { TabNames.DISTANCE_MEASURES } title = "Distance Measures">
                    <DistanceMeasureTable />
                </Tab>
                <Tab eventKey = { TabNames.BAR_GRAPH } title="Bar Graph">
                    <BarGraph rdSplits={dummyRDSplits} />
                </Tab>

            </Tabs>
        </>
    )
}
