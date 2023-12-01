import axios from "axios"
import qs from "qs"
import { useEffect, useState, useContext } from "react"

import ScatterPlot from "../scatterPlot"
import { GlobalData } from "@/app/contexts/context"

export default function MeasureScatterPlot() {
	const { ensemble, distanceMeasure } = useContext(GlobalData)

	const [points, setPoints] = useState([])

    useEffect(() => {
		const getPoints = async () => {
            try {
				const clusterIds = ensemble[distanceMeasure].clusterIds
				const getClusterPoints = async () => {
					try {
						const result = await axios.get("http://localhost:8080/cluster-points", {
							params: {
								clusterIds
							},
							paramsSerializer: params => {
								return qs.stringify(params, { arrayFormat: 'repeat' })
							}
						})

						setPoints(result.data)
						//localStorage.setItem(key, JSON.stringify(result.data));
					} catch (error) {
						console.log("Error fetching cluster points: ", error)
					}
				}

				// const key = "typeofdistmeasure" + ensemble._id
				// const storedData = localStorage.getItem(key)
				// storedData ? setPoints(JSON.parse(storedData))
				//  		   : getClusterPoints()

				getClusterPoints()
            } catch (error) {
                console.log("Error fetching points: ", error)
            }
        }

        getPoints()
	}, [])

    const getRandomNumber = (a, b) => {
        if (a > b) {
          [a, b] = [b, a];
        }
        return Math.random() * (b - a) + a;
    }

    const totalPoints = 100; // Total number of points (sum of all clusters and random points)

	const xValuesC1 = Array.from({ length: 10 }, () => getRandomNumber(0, 3));
	const yValuesC1 = Array.from({ length: 10 }, () => getRandomNumber(0, 30));

	const xValuesC2 = Array.from({ length: 10 }, () => getRandomNumber(3, 6));
	const yValuesC2 = Array.from({ length: 10 }, () => getRandomNumber(30, 60));

	const xValuesC3 = Array.from({ length: 10 }, () => getRandomNumber(6, 9));
	const yValuesC3 = Array.from({ length: 10 }, () => getRandomNumber(60, 90));

	const xValuesRandom = Array.from({ length: 10 }, () => getRandomNumber(0, 10));
	const yValuesRandom = Array.from({ length: 10 }, () => getRandomNumber(0, 100));

	const xValues = [...xValuesC1, ...xValuesC2, ...xValuesC3, ...xValuesRandom];
	const yValues = [...yValuesC1, ...yValuesC2, ...yValuesC3, ...yValuesRandom];
	const sizeValues = Array.from({ length: totalPoints }, () => Math.random() * 20); // Generate size values for all points

	const data = [
	{
		x: xValues,
		y: yValues,
		mode: 'markers',
		type: 'scatter',
		marker: {
			color: '#57fa7b',
			size: sizeValues,
		},
	},
	];

	const title = '# of districts with African-American population &gt; 50%<br>' + 
		'vs<br> average African-American population percentage';
	const xLabel = '# of districts with AA population > 50%';
	const yLabel = 'average AA population percentage';

	return (
	<div className="scatter-plot-container">
		<ScatterPlot className="scatter-plot" data={data} title={title}
			xLabel={xLabel} yLabel={yLabel} width='600' height='400' />
	</div>
	);
};