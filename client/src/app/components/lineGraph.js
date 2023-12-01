import Plot from "react-plotly.js"

export default function LineGraph({ data, title, xLabel, yLabel, width, height }) {
    const layout = {
        hovermode: 'none',
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

    const config = {
        displayModeBar: false
    }

    return (
        <Plot
            data = {data}
            layout = {layout}
            config = {config}
        />
    )
}