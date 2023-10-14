import { useState } from 'react';
import '../stylesheets/state.css'

import Navbar from './navbar'
import StateMap from './stateMap.js'
import { Button, Modal } from 'react-bootstrap'
import EnsembleClusterLineGraph from './ensembleLineGraph'
import StatePageTabs from'./statePageTabs.js';

export default function StatePage({ state, zoom }) {
    const [ensemble, setEnsemble] = useState()
    const [displayGraph, setDisplayGraph] = useState(false)

    const handleClose = () => { displayGraph(false) }
    const handleShow = () => { displayGraph(true) }

    const ensembles = [ {name: "Ensemble 1", plans: 500, clusters: 50},
                        {name: "Ensemble 2", plans: 1000, clusters: 80},
                        {name: "Ensemble 3", plans: 1500, clusters: 115},
                        {name: "Ensemble 4", plans: 2000, clusters: 130},
                        {name: "Ensemble 5", plans: 2500, clusters: 140},
                        {name: "Ensemble 6", plans: 3000, clusters: 145},
                        {name: "Ensemble 7", plans: 3500, clusters: 148} ]

    return (
        <>
            <Navbar />
                <div className = "state-page-container">
                    <div className = "map-container"><StateMap state = {state} zoom = {zoom} /></div>
                    { ensemble ? 
                        <div className = "data-container"><StatePageTabs state = {state} /></div>
                               :
                        <div className = "ensemble-container">
                            <div><b>Available Ensembles</b></div>
                            <div>Please select an ensemble size</div>
                            <div className = "radio-checkbox">
                                {
                                    ensembles.map((ensemble, index) => (
                                        <label key = {index} onClick = {() => {setEnsemble("something")}}>
                                            <input type = "radio" name = "ensemble" />
                                            <span><b>{ensemble.name}</b> - {ensemble.plans.toLocaleString()}</span>
                                        </label>
                                    ))
                                }
                            </div>
                            <EnsembleClusterModal ensembles = {ensembles} />
                        </div>
                    }
                </div>
        </>
    )
}

function EnsembleClusterModal({ ensembles }) {
    const [displayGraph, setDisplayGraph] = useState(false)
      
    const handleClose = () => { setDisplayGraph(false) }
    const handleShow = () => { setDisplayGraph(true) }
    
    return (
        <div>
            <span id = "graph-link" onClick = {handleShow}>
                Ensemble Size vs # of Clusters
            </span>
        
            <Modal show = {displayGraph} onHide = {handleClose} dialogClassName = "modal-dialog modal-lg">
                <Modal.Body className = "modal-body">
                    <EnsembleClusterLineGraph ensembles = {ensembles} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick = {handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}