//variables: xValues, yValues
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import qs from "qs"

import { PageData } from "../contexts/context"

import ScatterPlot from "./scatterPlot"

export default function StatePageScatterPlot() {
	const { ensemble } = useContext(PageData)

	const [points, setPoints] = useState([])

    useEffect(() => {
		const getPoints = async () => {
            try {				
				const key = "typeofdistmeasure" + ensemble._id

				const getClusterPoints = async () => {
					try {
						const result = await axios.get("http://localhost:8080/cluster-points", {
							params: {
								ids: [0,1,2,3,4,5,6,7,8,9]
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

				const storedData = localStorage.getItem(key)
				storedData ? setPoints(JSON.parse(storedData))
				 		   : getClusterPoints()

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

    const totalPoints = 500; // Total number of points (sum of all clusters and random points)

	const xValuesC1 = Array.from({ length: 100 }, () => getRandomNumber(0, 3));
	const yValuesC1 = Array.from({ length: 100 }, () => getRandomNumber(0, 30));

	const xValuesC2 = Array.from({ length: 100 }, () => getRandomNumber(3, 6));
	const yValuesC2 = Array.from({ length: 100 }, () => getRandomNumber(30, 60));

	const xValuesC3 = Array.from({ length: 100 }, () => getRandomNumber(6, 9));
	const yValuesC3 = Array.from({ length: 100 }, () => getRandomNumber(60, 90));

	const xValuesRandom = Array.from({ length: 400 }, () => getRandomNumber(0, 10));
	const yValuesRandom = Array.from({ length: 400 }, () => getRandomNumber(0, 100));

	const xValues = [...xValuesC1, ...xValuesC2, ...xValuesC3, ...xValuesRandom];
	const yValues = [...yValuesC1, ...yValuesC2, ...yValuesC3, ...yValuesRandom];
	const sizeValues = Array.from({ length: totalPoints }, () => Math.random() * 10); // Generate size values for all points
	const availableValues = Array.from({ length: totalPoints }, () => Math.random() < 0.5); // true or false

	const data = [
	{
		x: xValues,
		y: yValues,
		mode: 'markers',
		type: 'scatter',
		marker: {
			color: availableValues.map(isAvailable => isAvailable ? 'green' : 'red'), // Green for available, red for not available
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