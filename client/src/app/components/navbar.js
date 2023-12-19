import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useContext } from 'react'

import { GlobalData } from '../contexts/context'
import { convertToDisplayString } from '../misc/convertToDisplayString'
import { States } from '../constants/stateConstants'

export default function Navigation() {
	const { state, setState } = useContext(GlobalData)
	const { ensemble, setEnsemble } = useContext(GlobalData)
	const { distanceMeasure, setDistanceMeasure } = useContext(GlobalData)
	const { cluster, setCluster } = useContext(GlobalData)
	const { districtPlan, setDistrictPlan } = useContext(GlobalData)
	const { setDistrictPlanIds } = useContext(GlobalData)

	const handleMenuClick = () => {
		setState()
		setEnsemble()
		setDistanceMeasure()
		setCluster()
		setDistrictPlan()
		setDistrictPlanIds([])
	}

	const handleStateClick = (stateName) => {
		const getState = async (stateName) => {
            try {
                const stateData = await axios.get("http://localhost:8080/state", {
                    params: {
                        state: stateName
                    }
                })

				setState(stateData.data)
            } catch (error) {
                console.log("Error fetching state: ", error)
            }
        }

		getState(stateName)
    	setEnsemble()
		setDistanceMeasure()
		setCluster()
		setDistrictPlan()
	}

	const generateDisplayString = () => {
		if (!state) {
			return "2022 Federal Congressional Plans"
		}

		let displayString = state.name;
		if (ensemble) {
			displayString += ' / Ensemble ' + ensemble._id
		}
		if (distanceMeasure) {
			displayString += ' / ' + convertToDisplayString(distanceMeasure)
		}
		if (cluster) {
			displayString += ' / Cluster ' + cluster.cluster._id
		}
		if (districtPlan) {
			displayString += ' / District Plan ' + districtPlan._id
		}

		return displayString
	}

	const stringToDisplay = generateDisplayString()

	return (
		<Navbar collapseOnSelect expand = "sm" className = "d-flex p-2">
			<Container>
				<Navbar.Brand className = "home-btn" onClick = {handleMenuClick}>
					<i className = "bi bi-house"></i>
					<Navbar.Text className = "gap-2 px-1">416 Panthers</Navbar.Text>
				</Navbar.Brand>
					<Navbar.Text>{stringToDisplay}</Navbar.Text>
				<Nav>
					<NavigationDropdown handleStateClick = {handleStateClick} />
				</Nav>
    		</Container>
		</Navbar>
	)
}

function NavigationDropdown({ handleStateClick }) {
	return (
		<NavDropdown title = 'States' id = "collapsible-nav-dropdown" className = "ml-auto">
			{
				Object.values(States).map((state, index) => {
					return (
						<NavDropdown.Item key = {index} onClick = {() => handleStateClick(state)}>
							{state}
						</NavDropdown.Item>
					)
				})
			}
		</NavDropdown>
	)
}
