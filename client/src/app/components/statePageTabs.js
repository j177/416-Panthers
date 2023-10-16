import React, { useState } from 'react';
import StatePageTables from './statePageTables.js';
import DistanceMeasureTable from './distanceMeasureTable.js';

import StatePageScatterPlot from './statePageScatterPlot.js';
import { TabNames } from '../constants/tabConstants.js';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function StatePageTabs({ state }) {
    // Set the default active tab to 'Cluster Analysis'
    const [activeTab, setActiveTab] = useState(TabNames.CLUSTER_ANALYSIS);

    const openTab = (tab) => {
        setActiveTab(tab);
    };

    const tabContent = () => {
        if (activeTab === TabNames.CLUSTER_ANALYSIS) {
            return (
                <div className={'tabcontent'}>
                    <StatePageTables />
                </div>
            );
        }

        if (activeTab === TabNames.SCATTER_PLOT) {
            return (
                <div className={'tabcontent'}>
                    <p>needs to be changed</p>
                    <StatePageScatterPlot />
                </div>
            );
        }

        if (activeTab === TabNames.DISTANCE_MEASURES) {
            return (
                <div className={'tabcontent'}>
                    <p>Comparision of Various Distance Measures Per Cluster</p>
                    <DistanceMeasureTable />
                </div>
            );
        }
    };

    return (
        <>
            <Tabs
                defaultActiveKey={TabNames.CLUSTER_ANALYSIS} // Set the default active tab here
                transition={false}
                className="mb-3"
                activeKey={activeTab} // Add this line to reflect the active tab
                onSelect={openTab} // Add this line to handle tab selection
            >
                <Tab eventKey={TabNames.CLUSTER_ANALYSIS} title="Cluster Analysis">
                    {tabContent()}
                </Tab>
                <Tab eventKey={TabNames.SCATTER_PLOT} title="Scatter Plot">
                    {tabContent()}
                </Tab>
                <Tab eventKey={TabNames.DISTANCE_MEASURES} title="Distance Measures">
                    {tabContent()}
                </Tab>
            </Tabs>
        </>
    );
}