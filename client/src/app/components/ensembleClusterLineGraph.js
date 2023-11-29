// Variables: data, title, xLabel, yLabel, width, height
import LineGraph from "./lineGraph"

export default function EnsembleClusterLineGraph({ ensembles, distanceMeasure }) {
    const x = ensembles.map(ensemble => ensemble.numPlans)
    const y = ensembles.map(ensemble => ensemble[distanceMeasure].clusterIds.length)

    const data = [{
        x: x,
        y: y,
        type: 'scatter',
        marker: { color: 'blue' },
        name: 'Ensemble Size vs # of Clusters'
    }]

    const distanceMeasureName = distanceMeasure.charAt(0).toUpperCase() + 
                                distanceMeasure.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')
    const title = 'Ensemble Size vs # of Clusters <br> (' + distanceMeasureName + ')'
    const xLabel = 'Ensemble Size'
    const yLabel = '# of Clusters'
    const width = '500'
    const height = '450'

    return (
        <LineGraph
            data = {data} 
            title = {title}
            xLabel = {xLabel}
            yLabel = {yLabel}
            width = {width}
            height = {height}
        />
    )
}