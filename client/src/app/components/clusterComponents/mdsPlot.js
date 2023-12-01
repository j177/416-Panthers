import { useState } from "react"

import ScatterPlot from "../scatterPlot"
import { MDSPlotData } from "@/app/constants/mdsPlotData"

export default function MDSPlot({ clusters }) {
    const [cluster, setCluster] = useState()

    const ids = clusters.map(cluster => cluster._id)
    const points = clusters.map(cluster => cluster.mds)

	return (
        <div className = "scatter-plot-container">
            <MDSClusterPlot ids = {ids} points = {points} />
        </div>
	)
}

function MDSClusterPlot({ ids, points }) {
    const xValues = points.map(point => point.x)
    const yValues = points.map(point => point.y)
    const sizeValues = points.map(point => point.size * 10)

    const data = [{
        x: xValues,
        y: yValues,
        mode: 'markers',
        type: 'scatter',
        ids: ids,
        marker: {
            color: '#57fa7b',
            size: sizeValues,
        }
    }]

	const title = MDSPlotData.TITLE
	const xLabel = MDSPlotData.XLABEL
	const yLabel = MDSPlotData.YLABEL
    const width = MDSPlotData.WIDTH
    const height = MDSPlotData.HEIGHT

    return (
        <div>
            <ScatterPlot 
                data = {data}
                title = {title}
                xLabel = {xLabel}
                yLabel = {yLabel}
                width = {width}
                height = {height}
            />
        </div>
    )
}