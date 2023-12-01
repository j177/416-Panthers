import React, { useState } from 'react';
import Plot from 'react-plotly.js';

export default function ScatterPlot({ data, title, xLabel, yLabel }) {    
    return (
        <div>
            <Plot 
                data = {data}
                layout = {{
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
                    width: '800',
                    height: '400'
                }}
                config = {{displayModeBar: false}}
            />
        </div>
    );
}
