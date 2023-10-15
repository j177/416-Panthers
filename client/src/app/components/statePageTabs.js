import React, { useState } from 'react';
import StatePageTables from './statePageTables.js';
import DistanceMeasureTable from './distanceMeasureTable.js';

import StatePageScatterPlot from './statePageScatterPlot.js';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function StatePageTabs({ state }) {
    // Set the default active tab to 'Cluster Analysis'
    const [activeTab, setActiveTab] = useState('Cluster Analysis');

    const openTab = (tab) => {
        setActiveTab(tab);
    };

    const tabContent = () => {
        if (activeTab === 'Cluster Analysis') {
            return (
                <div className={'tabcontent'}>
                    <StatePageTables />
                </div>
            );
        }

        if (activeTab === 'Scatter Plot') {
            return (
                <div className={'tabcontent'}>
                    <p>needs to be changed</p>
                    <StatePageScatterPlot />
                </div>
            );
        }

        if (activeTab === 'Distance Measures') {
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
                defaultActiveKey="Cluster Analysis" // Set the default active tab here
                transition={false}
                className="mb-3"
                activeKey={activeTab} // Add this line to reflect the active tab
                onSelect={openTab} // Add this line to handle tab selection
            >
                <Tab eventKey="Cluster Analysis" title="Cluster Analysis">
                    {tabContent()}
                </Tab>
                <Tab eventKey="Scatter Plot" title="Scatter Plot">
                    {tabContent()}
                </Tab>
                <Tab eventKey="Distance Measures" title="Distance Measures">
                    {tabContent()}
                </Tab>
            </Tabs>
        </>
    );
}