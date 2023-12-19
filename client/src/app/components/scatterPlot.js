import Plot from 'react-plotly.js'

export default function ScatterPlot({ data, title, xLabel, yLabel, width, height, onClick }) {   
    const layout = {
        title: title,
        titlefont: {
            size: '18'
        },
        xaxis: {
            title: xLabel,
            tickfont: {
                size: 14
            },
            titlefont: {
                size: 16
            }
        },
        yaxis: {
            title: yLabel,
            tickfont: {
                size: 14
            },
            titlefont: {
                size: 16
            }
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
