import { useEffect, useState } from 'react';
import '../stylesheets/state.css'

import Navigation from './navbar'
import StateMap from './stateMap.js'
import { Button, Modal, Table } from 'react-bootstrap'
import EnsembleClusterLineGraph from './ensembleLineGraph'
import StatePageTabs from './statePageTabs.js';

export default function StatePage({ state, zoom, e}) {
    const [ensemble, setEnsemble] = useState(e)
    // const [ensembleSelected, setEnsembleSelected] = useState(eSelect)

    const ensembles = [{ name: "Ensemble 1", plans: 500, clusters: 50 },
    { name: "Ensemble 2", plans: 1000, clusters: 80 },
    { name: "Ensemble 3", plans: 1500, clusters: 115 },
    { name: "Ensemble 4", plans: 2000, clusters: 130 },
    { name: "Ensemble 5", plans: 2500, clusters: 140 },
    { name: "Ensemble 6", plans: 3000, clusters: 145 },
    { name: "Ensemble 7", plans: 3500, clusters: 148 }]

    return (
        <>
            <Navigation state={state.name} />
            <div className="state-page-container">
                <div className="map-container"><StateMap state={state} zoom={zoom} /></div>
                {ensemble ?
                    <div className="data-container"><StatePageTabs state={state} ensemble={ensemble} setEnsemble={setEnsemble}/></div>
                    :
                    <div className="ensemble-container">
                        <div><b>Available Ensembles</b></div>
                        <div>Select an ensemble</div>
                        <EnsembleSelection ensembles={ensembles} setEnsemble={setEnsemble} />
                        <EnsembleClusterModalLink ensembles={ensembles}/>
                    </div>
                }
            </div>
        </>
    )
}

function EnsembleSelection({ ensembles, setEnsemble }) {
    return (
        <div className="radio-checkbox">
            {
                ensembles.map((ensemble, index) => (
                    <label key={index} onClick={() => { setEnsemble(ensemble) }}>
                        <input type="radio" name="ensemble" />
                        <span><b>{ensemble.name}</b> - {ensemble.plans.toLocaleString() + " district plans"}</span>
                    </label>
                ))
            }
        </div>
    )
}

// function EnsembleModal({ ensemble, setEnsembleSelected }) {
//     const [display, setDisplay] = useState(false)

//     const handleClose = () => { setDisplay(false) }
//     const handleSelect = () => { setEnsembleSelected(true) }

//     useEffect(() => {
//         if (ensemble) {
//             setDisplay(true)
//         }
//     }, [ensemble])

//     if (!ensemble) {
//         return;
//     }

//     return (
//         <div>
//             <Modal show = {display} onHide = {handleClose} dialogClassName = "modal-dialog modal-lg">
//                 <Modal.Header>
//                     {ensemble.name}
//                 </Modal.Header>
//                 <Modal.Body className = "modal-body">
//                     <EnsembleSummaryTable />
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant = "primary" onClick = {handleSelect}>
//                         Select
//                     </Button>
//                     <Button variant = "secondary" onClick = {handleClose}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// }

// function EnsembleSummaryTable() {
//     return (
//         <Table striped bordered hover>
//             <thead>
//                 <tr>
//                     <th>#</th>
//                     <th></th>
//                     <th>Last Name</th>
//                     <th>Username</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 <tr>
//                     <td>1</td>
//                     <td>Mark</td>
//                     <td>Otto</td>
//                     <td>@mdo</td>
//                 </tr>
//                 <tr>
//                     <td>2</td>
//                     <td>Jacob</td>
//                     <td>Thornton</td>
//                     <td>@fat</td>
//                 </tr>
//                 <tr>
//                     <td>3</td>
//                     <td colSpan={2}>Larry the Bird</td>
//                     <td>@twitter</td>
//                 </tr>
//             </tbody>
//         </Table>
//     )
// }

function EnsembleClusterModalLink({ ensembles }) {
    const [display, setDisplay] = useState(false)

    const handleClose = () => { setDisplay(false) }
    const handleShow = () => { setDisplay(true) }

    return (
        <div>
            <span id="graph-link" onClick={handleShow}>
                Ensemble Size vs # of Clusters
            </span>

            <Modal show={display} onHide={handleClose} dialogClassName="modal-dialog modal-lg">
                <Modal.Body className="modal-body">
                    <EnsembleClusterLineGraph ensembles={ensembles} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}