import '../stylesheets/state.css'

import { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import axios from 'axios'
import qs from 'qs'

import { PageData } from '../contexts/context'

import StateMap from './stateMap.js'
import EnsembleClusterLineGraph from './ensembleLineGraph'
import EnsembleVisualizations from './ensembleVisualizations'

export default function StatePage() {
    const { state, setState } = useContext(PageData)
    const { ensemble, setEnsemble } = useContext(PageData)

    const [ensembles, setEnsembles] = useState()

    useEffect(() => {
        const getState = async () => {
            try {
                const stateData = await axios.get("http://localhost:8080/state", {
                    params: {
                        state: state.name
                    }
                })
    
                setState(stateData.data)
            } catch (error) {
                console.log("Error fetching state: ", error)
            }
        }
    
        getState()
    }, [])

    useEffect(() => {
        const getEnsembles = async () => {
            try {
                if (!state.ensembleIds) {
                    return
                }

                const ensembles = await axios.get("http://localhost:8080/ensembles", {
                    params: {
                        ids: state.ensembleIds
                    },
                    paramsSerializer: params => {
                        return qs.stringify(params, { arrayFormat: 'repeat' })
                    }
                })
        
                setEnsembles(ensembles.data)
            } catch (error) {
                console.log("Error fetching ensembles: ", error)
            }
        }
    
        getEnsembles()
    }, [state])

    return (
        <>
            {ensembles &&
                <>
                    <div className = "state-page-container">
                        <div className = "map-container"><StateMap /></div>
                        {ensemble ?
                            <div className = "data-container"><EnsembleVisualizations /></div>
                            :
                            <div className = "ensemble-container">
                                <div><b>Available Ensembles</b></div>
                                <div>Select an ensemble</div>
                                <EnsembleSelection ensembles = {ensembles} setEnsemble = {setEnsemble} />
                                <EnsembleClusterModalLink ensembles = {ensembles}/>
                            </div>
                        }
                    </div>
                </>
            }
        </>
    )
}

function EnsembleSelection({ ensembles, setEnsemble }) {
    return (
        <div className = "radio-checkbox">
            {
                ensembles.map((ensemble, index) => (
                    <label key = { index } onClick = { () => { setEnsemble(ensemble) }}>
                        <input type = "radio" name = "ensemble" />
                        <span><b>Ensemble {index+1}</b> - { ensemble.numPlans.toLocaleString() + ' district plans' }</span>
                    </label>
                ))
            }
        </div>
    )
}

function EnsembleClusterModalLink({ ensembles }) {
    const [display, setDisplay] = useState(false)

    const handleClose = () => { setDisplay(false) }
    const handleShow = () => { setDisplay(true) }

    return (
        <div>
            <span id = "graph-link" onClick = { handleShow } >
                Ensemble Size vs # of Clusters
            </span>

            <Modal show = { display } onHide = { handleClose } dialogClassName = "modal-dialog modal-lg">
                <Modal.Body className = "modal-body">
                    <EnsembleClusterLineGraph ensembles = { ensembles } />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant = "secondary" onClick = { handleClose } >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
