import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "bootstrap-icons/font/bootstrap-icons.css";

import React, { useState, useEffect } from 'react';
import { States } from "../constants/stateConstants";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const [selectedState, setSelectedState] = useState("");
  const router = useRouter();

  const handleStateSelection = (stateName) => {
    setSelectedState(stateName);
    router.push('/' + stateName.replace(/ /g, ''));
  };

  // clear selectedState when page is refreshed
  const handleBeforeUnload = (e) => {
    localStorage.removeItem('selectedState'); 
  };

  // clears selected state when home button is clicked
  const handleHomeClick = () => {
    setSelectedState(""); 
    router.push('/');
  };

  // use local storage to persist the selected state
  useEffect(() => {
    const storedState = localStorage.getItem('selectedState');
    if (storedState) {
      setSelectedState(storedState);
    }
  }, []);

  // update local storage when selectedState changes
  useEffect(() => {
    if (selectedState) {
      localStorage.setItem('selectedState', selectedState);
    } else {
      localStorage.removeItem('selectedState');
    }
  }, [selectedState]);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <Navbar collapseOnSelect expand="sm" className="d-flex p-2 bg-body-tertiary">
      <Nav>
        <li className="nav-item me-3 me-sm-0">
          <a className="nav-link" onClick={handleHomeClick}>
            <i className="bi bi-house"></i>
          </a>
        </li>
        <NavDropdown title="States" id="collapsible-nav-dropdown">
          <NavDropdown.Item onClick={() => handleStateSelection(States.MICHIGAN.name)}>Michigan</NavDropdown.Item>
          <NavDropdown.Item onClick={() => handleStateSelection(States.NEW_YORK.name)}>New York</NavDropdown.Item>
          <NavDropdown.Item onClick={() => handleStateSelection(States.PENNSYLVANIA.name)}>Pennsylvania</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <div id='nav2'>
        <b>{selectedState}</b>
      </div>
      <div id='nav3'>
        416 Panthers Team
      </div>
    </Navbar>
  );
}
