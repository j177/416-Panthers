import { useState } from "react"

import ScatterPlot from "../scatterPlot"
import { MDSPlotData } from "@/app/constants/mdsPlotData"

export default function MDSPlot({ clusters }) {
    const [cluster, setCluster] = useState()

    const points = clusters.map(cluster => ({
        id: cluster._id,
        name: 'Cluster ' + cluster._id,
        x: cluster.mds.x,
        y: cluster.mds.y,
        size: cluster.mds.size * 10
    }))

	return (
        <div>
            <MDSClusterPlot points = {points} />
        </div>
	)
}

function MDSClusterPlot({ points }) {
    const ids = points.map(point => point.id)
    const names = points.map(point => point.name)
    const xValues = points.map(point => point.x)
    const yValues = points.map(point => point.y)
    const sizeValues = points.map(point => point.size)
    const data = [{
        x: xValues,
        y: yValues,
        mode: 'markers',
        type: 'scatter',
        text: names,
        ids: ids,
        hovertemplate: '<b>%{text}</b><extra></extra>',
        marker: {
            color: '#57fa7b',
            size: sizeValues,
        },
        connectgaps: false
    }]
	const title = MDSPlotData.TITLE
	const xLabel = MDSPlotData.XLABEL
	const yLabel = MDSPlotData.YLABEL
    const width = MDSPlotData.WIDTH
    const height = MDSPlotData.HEIGHT

    const handleClick = (event) => {
        console.log(event.points[0].id)
    }

    return (
        <div>
            <ScatterPlot 
                data = {data}
                title = {title}
                xLabel = {xLabel}
                yLabel = {yLabel}
                width = {width}
                height = {height}
                onClick = {handleClick}
            />
        </div>
    )
}

function MDSDistrictPlanPlot({ points }) {

    return (
        <div>
        </div>
    )
}