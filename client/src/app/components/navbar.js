import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "bootstrap-icons/font/bootstrap-icons.css";

import { States } from "../constants/stateConstants";
import { useRouter } from "next/navigation";

export default function navigation() {
    const router = useRouter();
    return (
        <Navbar collapseOnSelect expand="sm" className="d-flex p-2 bg-body-tertiary">
            <Nav>
                <li className = "nav-item me-3 me-sm-0">
                    <a className = "nav-link" onClick = {() => {router.push('/')}}>
                        <i className ="bi bi-house"></i>
                    </a>
                </li>
              <NavDropdown title="States" id="collapsible-nav-dropdown">
                <NavDropdown.Item onClick = {() => {router.push('/' + States.MICHIGAN.name)}}>Michigan</NavDropdown.Item>
                <NavDropdown.Item onClick = {() => {router.push('/' + States.NEW_YORK.name.replace(/ /g, ''))}}>
                  New York
                </NavDropdown.Item>
                <NavDropdown.Item onClick = {() => {router.push('/' + States.PENNSYLVANIA.name)}}>Pennsylvania</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
            </Nav>
      </Navbar>
    )
}