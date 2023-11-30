import { useContext } from 'react'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { PageData } from '../contexts/context'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

import { States } from '../constants/stateConstants'

export default function Navigation() {
	const { state, setState, setEnsemble, setDistanceMeasure, setCluster } = useContext(PageData)

	const handleMenuClick = () => {
		setState()
		setEnsemble()
		setDistanceMeasure()
		setCluster()
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
	}

	return (
		<Navbar collapseOnSelect expand = "sm" className = "d-flex p-2">
			<Container>
				<Navbar.Brand className = "home-btn" onClick = { handleMenuClick } >
					<i className = "bi bi-house"></i>
					<Navbar.Text className = "gap-2 px-1">416 Panthers</Navbar.Text>
				</Navbar.Brand>
				{state ? (
					<Navbar.Text>{ state.name }</Navbar.Text>
				) : (
					<Navbar.Text>2022 Federal Congressional Plans</Navbar.Text>
				)}
				<Nav>
					<NavDropdown title = 'States' id = "collapsible-nav-dropdown" className = "ml-auto">
					{
						Object.values(States).map((state, index) => {
							return (
								<NavDropdown.Item key = { index } onClick = { () => handleStateClick(state) } >
									{ state }
								</NavDropdown.Item>
							)
						})
					}
					</NavDropdown>
				</Nav>
    		</Container>
		</Navbar>
	)
}
