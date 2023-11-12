// variables: title, xaxis, yaxis, data
import Plot from "react-plotly.js";

export default function LineGraph({ data, title, xLabel, yLabel, width, height }) {
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
    };

    return (
        <Plot
            data = {data}
            layout = {layout}
            config = {{ displayModeBar: false }}
        />
    );
}