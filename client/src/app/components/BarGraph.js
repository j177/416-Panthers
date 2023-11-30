import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarGraph = ({ rdSplits }) => {
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
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarGraph;
