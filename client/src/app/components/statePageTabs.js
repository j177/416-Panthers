import React, { useState } from 'react';
import StatePageTables from './statePageTables.js';
import StatePageScatterPlot from './statePageScatterPlot.js';

export default function StatePageTabs({ state }) {
    const [activeTab, setActiveTab] = useState('State Description');

    const openTab = (tab) => {
        setActiveTab(tab);
    };

    const tabContent = () => {
        if (activeTab === 'State Description') {
            var stateName = state.name;

            return (
                <div className={'tabcontent'}>
                    <p>State: {stateName}</p>
                    <p>This is the State Description.</p>

                </div>
            );
        }

        if (activeTab === 'Graph Clusters') {
            return (
                <div className={'tabcontent'}>
                    <StatePageScatterPlot />
                </div>
            );
        }

        if (activeTab === 'Table Details') {
            return (
                <div className={'tabcontent'}>
                    <StatePageTables />
                </div>
            );
        }
    };

    return (
        <>
            <div className="tab">
                <button className={`tablinks ${activeTab === 'State Description' ? 'active' : ''}`} onClick={() => openTab('State Description')}>
                    State Description
                </button>
                <button className={`tablinks ${activeTab === 'Graph Clusters' ? 'active' : ''}`} onClick={() => openTab('Graph Clusters')}>
                    Graph Clusters
                </button>
                <button className={`tablinks ${activeTab === 'Table Details' ? 'active' : ''}`} onClick={() => openTab('Table Details')}>
                    Table Details
                </button>
            </div>
            
            {tabContent()}
        </>
    );
}
