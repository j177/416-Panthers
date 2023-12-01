import { Table } from "react-bootstrap"

import { DistanceMeasures } from "@/app/constants/distanceMeasureConstants"

export default function EnsembleSummaryTable({ ensembles, setState, setEnsemble, setDistanceMeasure }) {
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
                            <span onClick = {() => {handleSelect(ensemble, DistanceMeasures.OPTIMAL_TRANSPORT)}}>
                                Examine
                            </span>
                        </td>
                        <td>{ensemble.hammingDistance.avgDst}</td>
                        <td className = "td-centered">
                            <span onClick = {() => {handleSelect(ensemble, DistanceMeasures.HAMMING_DISTANCE)}}>
                                Examine
                            </span>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}