import { useState, useEffect, useContext } from "react"
import axios from "axios"
import qs from "qs"

import ScatterPlot from "../scatterPlot"
import { MDSPlotData } from "@/app/constants/mdsPlotData"
import { GlobalData } from "@/app/contexts/context"
import { ClusterFrom } from "@/app/constants/clusterFromData"
import { TabNames } from "@/app/constants/tabConstants"

export default function MDSPlot({ clusters, activeTab }) {
    const [clusterId, setClusterId] = useState()
    const [districtPlanId, setDistrictPlanId] = useState()
    const [districtPlans, setDistrictPlans] = useState()
    const {setCluster, setDistrictPlan} = useContext(GlobalData)

    useEffect(() => {
        if (activeTab !== TabNames.MDS) {
            setClusterId()
            setDistrictPlanId()
            setDistrictPlans()
        }
    }, [activeTab])

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
        setCluster({cluster: clusters.find(cluster => cluster._id === clusterId), from: ClusterFrom.PLOT })
    }, [clusterId])

    console.log(districtPlanId)
    useEffect(() => {
        if (!districtPlanId) {
            return
        }

        setDistrictPlan(districtPlans.find(dp => dp._id === districtPlanId))
    }, [districtPlanId, districtPlans])

    const clusterPoints = clusters.map(cluster => ({
        id: cluster._id,
        name: 'Cluster ' + cluster._id,
        x: cluster.mds.x,
        y: cluster.mds.y,
        size: cluster.mds.size * 10,
        length: cluster.dpIds.length
    }))

    let dpPlot
    if (districtPlans) {
        const dpPoints = districtPlans.map(districtPlan => ({
            id: districtPlan._id,
            name: 'District Plan ' + districtPlan._id,
            x: districtPlan.mds.x,
            y: districtPlan.mds.y
        }))

        dpPlot = <MDSDistrictPlanPlot points = {dpPoints} setDistrictPlanId = {setDistrictPlanId} />
    }
    else {
        dpPlot = <div className = "place-holder"><i>Click a cluster point</i></div>
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
    const namesAndLengths = points.map(point => [point.name, point.length])
    const xValues = points.map(point => point.x)
    const yValues = points.map(point => point.y)
    const sizeValues = points.map(point => point.size)

    const data = [{
        x: xValues,
        y: yValues,
        mode: 'markers',
        type: 'scatter',
        text: namesAndLengths,
        ids: ids,
        hovertemplate: '<b>%{text[0]} <br> (%{x}, %{y}) <br> %{text[1]} district plans</b><extra></extra>',
        marker: {
            color: 'purple',
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

function MDSDistrictPlanPlot({ points, setDistrictPlanId }) {
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
            hovertemplate: '<b>%{text} <br> (%{x}, %{y})</b><extra></extra>',
            marker: {
                color: 'purple'
            }
    }]
    const title = MDSPlotData.DP_TITLE
    const xLabel = MDSPlotData.DP_XLABEL
    const yLabel = MDSPlotData.DP_YLABEL
    const width = MDSPlotData.DP_WIDTH
    const height = MDSPlotData.DP_HEIGHT

    const handleClick = (event) => {
        setDistrictPlanId(event.points[0].id)
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
