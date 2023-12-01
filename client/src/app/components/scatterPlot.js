import Plot from 'react-plotly.js'

export default function ScatterPlot({ data, title, xLabel, yLabel, width, height }) {   
    const layout = {
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
    }

    const config = {
        displayModeBar: false
    }
    
    return (
        <div>
            <Plot 
                data = {data}
                layout = {layout}
                config = {config}
            />
        </div>
    )
}
