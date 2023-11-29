// variables: title, xaxis, yaxis, data
import Plot from "react-plotly.js";

export default function LineGraph({ data, title, xLabel, yLabel }) {
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
        }
    }

    return (
        <Plot
            data = {data}
            layout = {layout}
            config = {{ displayModeBar: false }}
        />
    )
}