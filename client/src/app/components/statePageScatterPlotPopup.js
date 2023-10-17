import ScatterPlotPopup from "./scatterPlotPopup";

export default function StatePageScatterPlotPopup() {
    const getRandomNumber = (a, b) => {
        if (a > b) {
          [a, b] = [b, a];
        }
        return Math.random() * (b - a) + a;
    }


    const xValuesC1 = Array.from({ length: 100 }, () => getRandomNumber(0, 3));
    const yValuesC1 = Array.from({ length: 100 }, () => getRandomNumber(0, 30));

    const xValuesC2 = Array.from({ length: 100 }, () => getRandomNumber(3, 6));
    const yValuesC2 = Array.from({ length: 100 }, () => getRandomNumber(30, 60));

    const xValuesC3 = Array.from({ length: 100 }, () => getRandomNumber(6, 9));
    const yValuesC3 = Array.from({ length: 100 }, () => getRandomNumber(60, 90));

    const xValuesRandom = Array.from({ length: 400 }, () => getRandomNumber(0, 10));
    const yValuesRandom = Array.from({ length: 400 }, () => getRandomNumber(0, 100));

    const xValues = [...xValuesC1, ...xValuesC2, ...xValuesC3, ...xValuesRandom]
    const yValues = [...yValuesC1, ...yValuesC2, ...yValuesC3, ...yValuesRandom]

    const data = [
      {
        x: xValues,
        y: yValues,
        mode: 'markers',
        type: 'scatter',
        marker: { color: 'blue' },
      }
      ]


const title = '# of districts with African-American population &gt; 50%<br>' + 
    'vs<br> average African-American population percentage';
const xLabel = '# of districts with AA population > 50%';
const yLabel = 'average AA population percentage';

return (
  <div className="scatter-plot-container">
      <ScatterPlotPopup className="scatter-plot" data={data} title={title}
        xLabel={xLabel} yLabel={yLabel} width='495' height='400' />
  </div>
);
    };