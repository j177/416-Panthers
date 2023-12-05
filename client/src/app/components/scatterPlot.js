import Plot from 'react-plotly.js'

export default function ScatterPlot({ data, title, xLabel, yLabel, width, height, onClick }) {   
    const layout = {
        title: title,
        titlefont: {
            size: '20'
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
    
    return (
        <div>
            <Plot 
                data = {data}
                layout = {layout}
                onClick = {onClick}
            />
        </div>
    )
}
