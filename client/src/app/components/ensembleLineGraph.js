// Variables: data, title, xLabel, yLabel, width, height
import LineGraph from "./lineGraph";

export default function EnsembleClusterLineGraph({ ensembles }) {
    const x = ensembles.map(ensemble => ensemble.plans)
    const y = ensembles.map(ensemble => ensemble.clusters)
    const data = [
        {
            x: x,
            y: y,
            type: 'scatter',
            mode: 'lines+points',
            marker: { color: 'blue' },
            name: 'Ensemble Size vs # of Clusters'
        }
    ];

    const title = 'Ensemble Size vs # of Clusters'
    const xLabel = 'Ensemble Size'
    const yLabel = '# of Ensembles'
    const width = '100%'
    const height = '100%'

    return (
        <div>
            <LineGraph 
                data = {data} 
                title = {title}
                xLabel = {xLabel}
                yLabel = {yLabel}
                width = {width}
                height = {height}
            />
        </div>
    )
}