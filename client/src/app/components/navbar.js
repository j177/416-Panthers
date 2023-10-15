import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "bootstrap-icons/font/bootstrap-icons.css";

import { States } from "../constants/stateConstants";
import { useRouter } from "next/navigation";

export default function navigation() {
  const router = useRouter();
  return (
    <Navbar collapseOnSelect expand="sm" className="d-flex p-2">
      <Container>
        <Navbar.Brand href='/'>
          <i class='bi bi-house'></i>
          <Navbar.Text className='gap-2 px-1'>416 Panthers</Navbar.Text>
        </Navbar.Brand>
        <Navbar.Text>2022 Federal Congressional Plans</Navbar.Text>
        <Nav>
          <NavDropdown title='States' id='collapsible-nav-dropdown' className='ml-auto'>
            <NavDropdown.Item onClick={() => { router.push('/' + States.MICHIGAN.name) }}>Michigan</NavDropdown.Item>
            <NavDropdown.Item onClick={() => { router.push('/' + States.NEW_YORK.name.replace(/ /g, '')) }}>
              New York
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => { router.push('/' + States.PENNSYLVANIA.name) }}>Pennsylvania</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}




