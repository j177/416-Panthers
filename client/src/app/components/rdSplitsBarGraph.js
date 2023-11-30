import React, { useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2';
import { Dropdown } from 'react-bootstrap';

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
    labels: rdSplits.map((split) => `${split.rSeats}/${split.dSeats}`),
    datasets: [{
      label: 'Quantity',
      backgroundColor: rdSplits.map((split) => {
        // Use red/blue/green based on the split
        if (split.rSeats > split.dSeats) {
          return 'rgba(0, 0, 255, 0.8)'; // Blue
        } else if (split.rSeats < split.dSeats) {
          return 'rgba(255, 0, 0, 0.8)'; // Red
        } else {
          return 'rgba(0, 255, 0, 0.8)'; // Green
        }
      }),
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      data: rdSplits.map((split) => split.quantity),
    }],
  };

  const options = {
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Split Ratio (Republican Seats / Democratic Seats)',
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Quantity',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          generateLabels: function (chart) {
            return [{
              text: `X-axis: Split Ratio (Republican Seats / Democratic Seats)`,
              fillStyle: 'rgba(75, 192, 192, 0.5)',
              strokeStyle: 'rgba(75, 192, 192, 1)',
              lineWidth: 1,
            }, {
              text: `Y-axis: Quantity`,
              fillStyle: 'rgba(75, 192, 192, 0.5)',
              strokeStyle: 'rgba(75, 192, 192, 1)',
              lineWidth: 1,
            }];
          },
          boxWidth: 0,
        },
      },
    },
  };

  return (
    <div>
      <ClusterDropdown clusters = {clusters} setCluster = {setCluster}/>
      <Bar data = {data} options = {options} />
    </div>
  );
};

function ClusterDropdown({ clusters, setCluster }) {
  const [selectedValue, setSelectedValue] = useState(0)

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
                          onClick = {() => {setSelectedValue(cluster._id); setCluster(cluster)}}
                      >
                          Cluster {cluster._id}
                      </Dropdown.Item>
                  )
              }
          </Dropdown.Menu>
      </Dropdown>
  );
}