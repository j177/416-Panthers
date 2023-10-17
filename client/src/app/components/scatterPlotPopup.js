import Plot from 'react-plotly.js';

export default function ScatterPlotPopup({ data, title, xLabel, yLabel, width, height }) {
    return (
        <div>
            <Plot 
                data={data}
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
        </div>
    );
}
