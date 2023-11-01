import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "bootstrap-icons/font/bootstrap-icons.css";

import { States } from "../constants/stateConstants";
import { useRouter } from "next/navigation";

export default function Navigation({state}) {
  const router = useRouter();
  const [currentState, setCurrentState] = useState(state);

  const handleStateClick = (stateName) => {
    setCurrentState(state);
    router.push('/' + stateName.replace(/ /g, ''));
  };

  return (
    <Navbar collapseOnSelect expand="sm" className="d-flex p-2">
      <Container>
        <Navbar.Brand href='/'>
          <i className='bi bi-house'></i>
          <Navbar.Text className='gap-2 px-1'>416 Panthers</Navbar.Text>
        </Navbar.Brand>
        {currentState == '' ? (
          <Navbar.Text>2022 Federal Congressional Plans</Navbar.Text>
        ) : (
          <Navbar.Text>{currentState}</Navbar.Text>
        )}
        <Nav>
          <NavDropdown title = 'States' id='collapsible-nav-dropdown' className='ml-auto'>
            <NavDropdown.Item onClick={() => handleStateClick(States.MICHIGAN.name)}>
              Michigan
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleStateClick(States.NEW_YORK.name)}>
              New York
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleStateClick(States.PENNSYLVANIA.name)}>
              Pennsylvania
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
