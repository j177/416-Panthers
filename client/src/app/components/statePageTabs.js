import React, { useState } from 'react';
import StatePageTables from './statePageTables.js';
import DistanceMeasureTable from './distanceMeasureTable.js';

import StatePageScatterPlot from './statePageScatterPlot.js';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function StatePageTabs({ state }) {
    // Set the default active tab to 'Ensembles'
    const [activeTab, setActiveTab] = useState('Ensembles');

    const openTab = (tab) => {
        setActiveTab(tab);
    };

    const tabContent = () => {
        if (activeTab === 'Ensembles') {
            return (
                <div className={'tabcontent'}>
                    <p>table for ensembles</p>
                </div>
            );
        }

        if (activeTab === 'Cluster Analysis') {
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
                defaultActiveKey="Ensembles" // Set the default active tab here
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
                activeKey={activeTab} // Add this line to reflect the active tab
                onSelect={openTab} // Add this line to handle tab selection
            >
                <Tab eventKey="Ensembles" title="Ensembles">
                    {tabContent()}
                </Tab>
                <Tab eventKey="Cluster Analysis" title="Cluster Analysis">
                    {tabContent()}
                </Tab>
                <Tab eventKey="Distance Measures" title="Distance Measures">
                    {tabContent()}
                </Tab>
            </Tabs>
        </>
    );
}