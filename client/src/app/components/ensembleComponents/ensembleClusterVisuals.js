import { useState } from "react"
import { Dropdown, Table } from 'react-bootstrap'

import LineGraph from '../lineGraph'
import { DistanceMeasures } from "@/app/constants/distanceMeasureConstants"
import { convertToDisplayString } from '@/app/misc/convertToDisplayString'
import { LineGraphData } from '@/app/constants/lineGraphData'

export default function EnsembleClusterVisuals({ ensembles }) {
    const [distanceMeasure, setDistanceMeasure] = useState(DistanceMeasures.OPTIMAL_TRANSPORT)

    return (
        <>
            <div>
                <DistanceMeasureDropdown setDistanceMeasure = {setDistanceMeasure} />
            </div>
            <div className = "ensemble-cluster-visuals">
                <div className = "line-graph-container">
                    <EnsembleClusterLineGraph
                        ensembles = {ensembles}
                        distanceMeasure = {distanceMeasure} />
                </div>
                <div className = "table-container">
                    <EnsembleClusterTable 
                        ensembles = {ensembles}
                        distanceMeasure = {distanceMeasure} />
                </div>
            </div>
        </>
    )
}

function DistanceMeasureDropdown({ setDistanceMeasure }) {
    const [selectedValue, setSelectedValue] = useState(DistanceMeasures.OPTIMAL_TRANSPORT)

    const handleClick = (distanceMeasure) => {
        setSelectedValue(distanceMeasure)
        setDistanceMeasure(distanceMeasure)
    }

    return (
        <Dropdown className = "dm-dropdown">
            <Dropdown.Toggle variant = "success" id = "dropdown-basic">
                {convertToDisplayString(selectedValue)}
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
                                {convertToDisplayString(distanceMeasure)}
                            </Dropdown.Item>
                        )
                    }
            </Dropdown.Menu>
        </Dropdown>
    )
}

function EnsembleClusterLineGraph({ ensembles, distanceMeasure }) {
    const x = ensembles.map(ensemble => ensemble.numPlans)
    const y = ensembles.map(ensemble => ensemble[distanceMeasure].clusterIds.length)

    const data = [{
        x: x,
        y: y,
        type: 'scatter',
        marker: { color: 'blue' },
        name: 'Ensemble Size vs # of Clusters'
    }]

    const distanceMeasureName = convertToDisplayString(distanceMeasure)
    const title =  LineGraphData.TITLE + '<br> (' + distanceMeasureName + ')'
    const xLabel = LineGraphData.XLABEL
    const yLabel = LineGraphData.YLABEL
    const width = LineGraphData.WIDTH
    const height = LineGraphData.HEIGHT

    return (
        <LineGraph
            data = {data} 
            title = {title}
            xLabel = {xLabel}
            yLabel = {yLabel}
            width = {width}
            height = {height}
        />
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
                        <td>{ensemble.numPlans.toLocaleString()}</td>
                        <td>{ensemble[distanceMeasure].clusterIds.length}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}