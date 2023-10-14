import React from 'react';
import Plot from 'react-plotly.js';

export default function ScatterPlot({ data, title, xLabel, yLabel, width, height }) {
    return (
        <Plot data={data}
            layout={{
                title: title,
                titlefont: {
                    size: '15'
                },
                xaxis: { 
                    title: xLabel
                },
                yaxis: {
                    title: yLabel
                },
                width: width,
                height: height
            }}
        />
    );
};