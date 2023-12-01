import '../stylesheets/state.css'

import { useContext, useEffect, useState } from 'react'
import { Button, Modal, Dropdown, Table } from 'react-bootstrap'
import axios from 'axios'
import qs from 'qs'

import { GlobalData } from '../contexts/context'

import StateMap from './stateMap.js'
import EnsembleClusterLineGraph from './ensembleClusterLineGraph'
import ClusterVisuals from './clusterVisuals'
import DistrictPlanVisuals from './districtPlanVisuals'

import { DistanceMeasures } from '../constants/distanceMeasureConstants'

export default function StatePage() {
    const { ensemble, distanceMeasure, cluster } = useContext(GlobalData)

    let visualsToDisplay
    if (cluster) {
        visualsToDisplay = 
            <div className = "dp-data-container">
                <DistrictPlanVisuals />
            </div>
    }
    else if (ensemble && distanceMeasure) {
        visualsToDisplay =
            <div className = "cluster-data-container">
                <ClusterVisuals />
            </div>
    }
    else {
        visualsToDisplay = 
            <div className = "ensemble-data-container">
                <EnsembleVisuals />
            </div>
    }

    return (
        <>
            <div className = "state-page-container">
                <div className = "left-container">
                    <StateMap />
                </div>
                <div className = "right-container">
                    {visualsToDisplay}
                </div>
            </div>
        </>
    )
}

function EnsembleVisuals() {
    const { state, setState, setEnsemble, setDistanceMeasure } = useContext(GlobalData)

    const [ensembles, setEnsembles] = useState()
    const [visualsFor, setVisualsFor] = useState(DistanceMeasures.OPTIMAL_TRANSPORT) /* The distance measure displayed by the visuals */

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

    if (!ensembles) {
        return
    }

    return (
        <>
            <div className = "ensemble-table-container">
                <EnsembleSummaryTable 
                    ensembles = {ensembles}
                    setState = {setState}
                    setEnsemble = {setEnsemble}
                    setDistanceMeasure = {setDistanceMeasure} />
            </div>
            <div>
                <DistanceMeasureDropdown setVisualsFor = {setVisualsFor} />
            </div>
            <div className = "ensemble-cluster-visuals">
                <div className = "line-graph-container">
                    <EnsembleClusterLineGraph
                        ensembles = {ensembles}
                        distanceMeasure = {visualsFor} />
                </div>
                <div className = "table-container">
                    <EnsembleClusterTable 
                        ensembles = {ensembles}
                        distanceMeasure = {visualsFor}/>
                </div>
            </div>
        </>
    )
}

function EnsembleSummaryTable({ ensembles, setState, setEnsemble, setDistanceMeasure }) {
    const backToMenu = () => {
        setState()
    }

    const handleSelect = (ensemble, distanceMeasure) => {
        setEnsemble(ensemble)
        setDistanceMeasure(distanceMeasure)
    }

    return (
        <Table className = "ensemble-table" striped bordered hover>
            <thead>
                <tr>
                    <th className = "back-button" onClick = {backToMenu} colSpan = {2}>&lt; Back</th>
                    <th colSpan = {4}>Average distance between pairs of district plans</th>
                </tr>
            </thead>
            <thead>
                <tr>
                    <th>Ensemble Name</th>
                    <th># of District Plans</th>
                    <th colSpan = {2}>Optimal Transport</th>
                    <th colSpan = {2}>Hamming Distance</th>
                </tr>
            </thead>
            <tbody>
                {ensembles.map((ensemble, index) =>
                    <tr key = {index}>
                        <td>{ensemble.name}</td>
                        <td>{ensemble.numPlans}</td>
                        <td>{ensemble.optimalTransport.avgDst}</td>
                        <td className = "td-centered">
                            <span onClick = {() => {handleSelect(ensemble, DistanceMeasures.OPTIMAL_TRANSPORT)}}>Examine</span>
                        </td>
                        <td>{ensemble.hammingDistance.avgDst}</td>
                        <td className = "td-centered">
                            <span onClick = {() => {handleSelect(ensemble, DistanceMeasures.HAMMING_DISTANCE)}}>Examine</span>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

function EnsembleClusterTable({ ensembles, distanceMeasure }) {
    return (
        <Table className = "ensemble-cluster-table" striped bordered hover>
            <thead>
                <tr>
                    <th>Ensemble Size</th>
                    <th># of Clusters</th>
                </tr>
            </thead>
            <tbody>
                {ensembles.map((ensemble, index) =>
                    <tr key = {index}>
                        <td>{ensemble.numPlans}</td>
                        <td>{ensemble[distanceMeasure].clusterIds.length}</td>
                    </tr>
                )}
            </tbody>
        </Table>
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

function EnsembleDropdown( {ensembles, setEnsemble} ) {
    const [selectedValue, setSelectedValue] = useState("")

    return (
        <Dropdown className = "ensemble-dropdown">
            <Dropdown.Toggle variant = "success" id = "dropdown-basic">
                {selectedValue}
            </Dropdown.Toggle>
    
            <Dropdown.Menu className = "dropdown-menu">
                {
                    ensembles.map((ensemble) => 
                        <Dropdown.Item 
                            key = {ensemble._id} 
                            className = "dropdown-item"
                            onClick = {() => {setSelectedValue(ensemble.name); setEnsemble(ensemble)}}
                        >
                            {ensemble.name}
                        </Dropdown.Item>
                    )
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}

function DistanceMeasureDropdown({ setVisualsFor }) {
    const [selectedValue, setSelectedValue] = useState(DistanceMeasures.OPTIMAL_TRANSPORT)

    const convertToDisplay = (name) => {
        return (name.charAt(0).toUpperCase() + name.slice(1)).replace(/([a-z])([A-Z])/g, '$1 $2')
    }

    const handleClick = (distanceMeasure) => {
        setSelectedValue(distanceMeasure)
        setVisualsFor(distanceMeasure)
    }

    return (
        <Dropdown className = "dm-dropdown">
            <Dropdown.Toggle variant = "success" id = "dropdown-basic">
                {convertToDisplay(selectedValue)}
            </Dropdown.Toggle>
  
            <Dropdown.Menu className = "dropdown-menu">
                    {
                        Object.values(DistanceMeasures).map((distanceMeasure, index) => 
                            <Dropdown.Item
                                key = {index}
                                className = "dropdown-item"
                                onClick = {() => {
                                    handleClick(distanceMeasure)
                                }}
                            >
                                {convertToDisplay(distanceMeasure)}
                            </Dropdown.Item>
                        )
                    }
            </Dropdown.Menu>
        </Dropdown>
    );
}