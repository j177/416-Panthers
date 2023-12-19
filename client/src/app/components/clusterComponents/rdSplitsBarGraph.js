import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js'
import { Dropdown } from 'react-bootstrap'
import { Bar } from 'react-chartjs-2'
import { useState } from 'react'

import { BarGraphData } from '@/app/constants/barGraphData'

export default function RDSplitsBarGraph({ clusters }) {
	const [cluster, setCluster] = useState(clusters[0])

	const rdSplits = cluster.rdSplits
	ChartJS.register(
		BarElement,
		CategoryScale,
		LinearScale,
		Tooltip,
		Legend
	)

	const data = {
		labels: rdSplits.map((split) => `${split.rDistricts}/${split.dDistricts}`),
		datasets: [{
			label: BarGraphData.YLABEL,
			backgroundColor: rdSplits.map((split) => {
				if (split.rDistricts > split.dDistricts) {
					return 'blue'
				} else if (split.rDistricts < split.dDistricts) {
					return 'red'
				} else {
					return '#12fc46'
				}
			}),
			borderColor: 'rgba(75, 192, 192, 1)',
			borderWidth: 1,
			barThickness: 70,
			data: rdSplits.map((split) => split.quantity)
		}]
	}

	const options = {
		maintainAspectRatio: false,
		scales: {
			x: {
				stacked: true,
				beginAtZero: true,
				title: {
					display: true,
					text: BarGraphData.XLABEL,
					font: {
						size: 20
					}
				}
			},
			y: {
				stacked: true,
				beginAtZero: true,
				title: {
					display: true,
					text: BarGraphData.YLABEL,
					font: {
						size: 20
					}
				}
			}
		},
		plugins: {
			legend: {
				display: true,
				labels: {
					font: {
						size: 30,
						weight: "bold"
					},
					generateLabels: function (chart) {
						return [{
							text: BarGraphData.TITLE,
							fillStyle: 'rgba(75, 192, 192, 0.5)',
							strokeStyle: 'rgba(75, 192, 192, 1)',
							lineWidth: 1,
						}]
					},
					boxWidth: 0
				}
			}
		}
	}

	return (
		<div>
			<ClusterDropdown clusters = {clusters} setCluster = {setCluster}/>
			<div className = "rd-split-graph-container">
				<div>
					<Bar data = {data} options = {options} height = {BarGraphData.HEIGHT} />
				</div>
			</div>
		</div>
	)
}

function ClusterDropdown({ clusters, setCluster }) {
	const [selectedValue, setSelectedValue] = useState(clusters[0]._id)

	const handleClick = (clusterId, cluster) => {
		setSelectedValue(clusterId)
		setCluster(cluster)
	}

	return (
		<Dropdown className = "cluster-dropdown">
			<Dropdown.Toggle variant = "success" id = "dropdown-basic">
				Cluster {selectedValue}
			</Dropdown.Toggle>

			<Dropdown.Menu className = "dropdown-menu">
				{
					clusters.map((cluster) => 
						<Dropdown.Item 
							key = {cluster._id} 
							className = "dropdown-item"
							onClick = {() => {handleClick(cluster._id, cluster)}}
						>
							Cluster {cluster._id}
						</Dropdown.Item>
					)
				}
			</Dropdown.Menu>
		</Dropdown>
	)
}
