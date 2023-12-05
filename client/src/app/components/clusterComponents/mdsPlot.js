import { useState, useEffect } from "react"
import axios from "axios"
import qs from "qs"

import ScatterPlot from "../scatterPlot"
import { MDSPlotData } from "@/app/constants/mdsPlotData"

export default function MDSPlot({ clusters }) {
    const [clusterId, setClusterId] = useState()
    const [districtPlans, setDistrictPlans] = useState()

    useEffect(() => {
        if (!clusterId) {
            return
        }

        const getDistrictPlans = async () => {
            const cluster = clusters.find(cluster => cluster._id === clusterId)
            try {
                const dps = await axios.get("http://localhost:8080/district-plans", {
                    params: {
                        ids: cluster.dpIds
                    },
                    paramsSerializer: params => {
                        return qs.stringify(params, { arrayFormat: 'repeat' })
                    }
                })

                setDistrictPlans(dps.data)
            } catch (error) {
                console.log("Error fetching district plans: ", error)
            }
        }
    
        getDistrictPlans()
    }, [clusterId])

    const clusterPoints = clusters.map(cluster => ({
        id: cluster._id,
        name: 'Cluster ' + cluster._id,
        x: cluster.mds.x,
        y: cluster.mds.y,
        size: cluster.mds.size * 10
    }))

    let dpPlot
    if (districtPlans) {
        const dpPoints = districtPlans.map(districtPlan => ({
            id: districtPlan._id,
            name: 'District Plan ' + districtPlan._id,
            x: districtPlan.mds.x,
            y: districtPlan.mds.y
        }))

        dpPlot = <MDSDistrictPlanPlot points = {dpPoints} />
    }
    else {
        dpPlot = <div className = "place-holder"><i>Select a cluster point</i></div>
    }

	return (
        <div className = "scatter-plot-container">
            <div className = "cluster-plot-container">
                <MDSClusterPlot points = {clusterPoints} setClusterId = {setClusterId} />
            </div>
            <div className = "dp-plot-container">
                {dpPlot}
            </div>
        </div>
	)
}

function MDSClusterPlot({ points, setClusterId }) {
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
            size: sizeValues
        }
    }]
	const title = MDSPlotData.CLUSTER_TITLE
	const xLabel = MDSPlotData.CLUSTER_XLABEL
	const yLabel = MDSPlotData.CLUSTER_YLABEL
    const width = MDSPlotData.CLUSTER_WIDTH
    const height = MDSPlotData.CLUSTER_HEIGHT

    const handleClick = (event) => {
        setClusterId(event.points[0].id)
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
    const ids = points.map(point => point.id)
    const names = points.map(point => point.name)
    const xValues = points.map(point => point.x)
    const yValues = points.map(point => point.y)

    const data = [{
        x: xValues,
        y: yValues,
        mode: 'markers',
        type: 'scatter',
        text: names,
            ids: ids,
            hovertemplate: '<b>%{text}</b><extra></extra>',
            marker: {
                color: '#57fa7b'
            }
    }]
    const title = MDSPlotData.DP_TITLE
    const xLabel = MDSPlotData.DP_XLABEL
    const yLabel = MDSPlotData.DP_YLABEL
    const width = MDSPlotData.DP_WIDTH
    const height = MDSPlotData.DP_HEIGHT

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
