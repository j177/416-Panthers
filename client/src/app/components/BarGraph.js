import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarGraph = ({ rdSplits }) => {
  // Extract data for the chart
  const data = {
    labels: rdSplits.map((split, index) => `Split ${index + 1}`),
    datasets: [
      {
        label: 'Republican Seats',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: rdSplits.map((split) => split.rSeats),
        categoryPercentage: 0.5,
        barPercentage: 0.33, // Adjust bar width as needed
      },
      {
        label: 'Democratic Seats',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: rdSplits.map((split) => split.dSeats),
        categoryPercentage: 0.5,
        barPercentage: 0.33,
      },
      {
        label: 'Quantity',
        backgroundColor: 'rgba(169, 169, 169, 0.2)', // Grey color
        borderColor: 'rgba(169, 169, 169, 1)', // Grey color
        borderWidth: 1,
        data: rdSplits.map((split) => split.quantity),
        categoryPercentage: 0.5,
        barPercentage: 0.33,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
        beginAtZero: true,
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
