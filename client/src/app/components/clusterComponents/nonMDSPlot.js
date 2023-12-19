import { useState, useEffect, useContext } from "react"
import { Button, Dropdown, DropdownItem } from "react-bootstrap"
import axios from "axios"
import qs from "qs"

import ScatterPlot from "../scatterPlot"
import { NonMDSPlotData } from "@/app/constants/nonMdsPlotData"
import { GlobalData } from "@/app/contexts/context"
import { ClusterFrom } from "@/app/constants/clusterFromData"
import { TabNames } from "@/app/constants/tabConstants"

export default function NonMDSPlot({ clusters, activeTab }) {    
    const [clusterId, setClusterId] = useState()
    const [districtPlans, setDistrictPlans] = useState()
    const [xAxis, setXAxis] = useState(NonMDSPlotData.BLACK_LABEL)
    const [yAxis, setYAxis] = useState(NonMDSPlotData.HISP_LABEL)
    const {setCluster} = useContext(GlobalData)

    useEffect(() => {
        if (activeTab !== TabNames.NON_MDS) {
            setClusterId()
            setDistrictPlans()
            setXAxis(NonMDSPlotData.BLACK_LABEL)
            setYAxis(NonMDSPlotData.HISP_LABEL)
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

    const handleBackClick = () => {
        setCluster()
        setClusterId()
        setDistrictPlans()
    }

    const determineField = (axis) => {
        if (axis === NonMDSPlotData.BLACK_LABEL) {
            return 'blackDistricts'
        } else if (axis === NonMDSPlotData.HISP_LABEL) {
            return 'hispDistricts'
        } else if (axis === NonMDSPlotData.ASIAN_LABEL) {
            return 'asianDistricts'
        }
    }

    const xField = determineField(xAxis)
    const yField = determineField(yAxis)

    let plotToDisplay
    if (districtPlans) {
        const dpPoints = districtPlans.map(districtPlan => ({
            id: districtPlan._id,
            name: 'District Plan ' + districtPlan._id,
            x: districtPlan[xField],
            y: districtPlan[yField]
        }))

        plotToDisplay = <NonMDSDistrictPlanPlot
                            points = {dpPoints}
                            xAxis = {xAxis}
                            yAxis = {yAxis}
                        />
    }
    else {
        const lengths = clusters.map((cluster) => cluster.dpIds.length);
        const maxLength = Math.max(...lengths);
        const clusterPoints = clusters.map(cluster => ({
            id: cluster._id,
            name: 'Cluster ' + cluster._id,
            x: cluster[xField],
            y: cluster[yField],
            size: cluster.dpIds.length / maxLength * 30,
            length: cluster.dpIds.length
        }))

        plotToDisplay = <NonMDSClusterPlot
                            points = {clusterPoints}
                            setClusterId = {setClusterId}
                            xAxis = {xAxis}
                            yAxis = {yAxis}
                        />
    }

	return (
        <div className = "scatter-plot-container">
            <div className = "dropdown-container">
                <div className = "x-dropdown">
                    X-Axis:
                    <AxisDropdown
                        className = "x-dropdown" 
                        initialValue = {NonMDSPlotData.BLACK_LABEL}
                        setAxis = {setXAxis}
                    />
                </div>
                <div className = "y-dropdown">
                    Y-Axis:
                    <AxisDropdown
                        className = "y-dropdown" 
                        initialValue = {NonMDSPlotData.HISP_LABEL}
                        setAxis = {setYAxis}
                    />
                </div>
            </div>
            <div className = "cluster-plot-container-large">
                {plotToDisplay}
            </div>
            <div className = "button-container">
                <Button disabled = {!districtPlans} onClick = {handleBackClick}>
                    &lt; Back to <br></br> Cluster Plot
                </Button>
            </div>
        </div>
	)
}

function NonMDSClusterPlot({ points, setClusterId, xAxis, yAxis }) {
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
	const title = "<b>" + xAxis + " vs " + yAxis + "<br>" + "(With Population of Demographic Group > 10%)" + "</b>"
	const xLabel = xAxis
	const yLabel = yAxis
    const width = NonMDSPlotData.CLUSTER_WIDTH
    const height = NonMDSPlotData.CLUSTER_HEIGHT

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

 function NonMDSDistrictPlanPlot({ points, xAxis, yAxis }) {
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
            color: 'purple',
            size: 20
        }
    }]
    const title = "<b>" + xAxis + " vs " + yAxis + "<br>" + "(With Population of Demographic Group > 10%)" + "</b>"
	const xLabel = xAxis
	const yLabel = yAxis
    const width = NonMDSPlotData.CLUSTER_WIDTH
    const height = NonMDSPlotData.CLUSTER_HEIGHT

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

function AxisDropdown({ initialValue, setAxis }) {
	const [selectedValue, setSelectedValue] = useState(initialValue)

	const handleClick = (label) => {
		setSelectedValue(label)
        setAxis(label)
	}

	return (
		<Dropdown>
			<Dropdown.Toggle variant = "success" id = "dropdown-basic">
				{selectedValue}
			</Dropdown.Toggle>

			<Dropdown.Menu className = "dropdown-menu">
				{
                    <>
                        <DropdownItem className = "dropdown-item"
                            onClick = {() => {handleClick(NonMDSPlotData.BLACK_LABEL)}}>
                            {NonMDSPlotData.BLACK_LABEL}
                        </DropdownItem>
                        <DropdownItem className = "dropdown-item"
                            onClick = {() => {handleClick(NonMDSPlotData.HISP_LABEL)}}>
                            {NonMDSPlotData.HISP_LABEL}
                        </DropdownItem>
                        <DropdownItem className = "dropdown-item"
                            onClick = {() => {handleClick(NonMDSPlotData.ASIAN_LABEL)}}>
                            {NonMDSPlotData.ASIAN_LABEL}
                        </DropdownItem>
                    </>
				}
			</Dropdown.Menu>
		</Dropdown>
	)
}
