"use client"

import './page.css'

import { useState } from 'react'

import { States } from './constants/stateConstants';
import Map from './Map';

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [state, setState] = useState(States.NOT_SELECTED)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className = "main">
      <div className = "navbar">
        <div className = "dropdown" onMouseEnter = {toggleDropdown} onMouseLeave = {toggleDropdown}>
          <div className = "dropdown-button">
            States
          </div>
          {isDropdownOpen && (
            <ul className = "dropdown-options">
              <li onClick = {() => {setState(States.MICHIGAN)}}>Michigan</li>
              <li onClick = {() => {setState(States.NEW_YORK)}}>New York</li>
              <li onClick = {() => {setState(States.PENNSYLVANIA)}}>Pennsylvania</li>
            </ul>
          )}
        </div>
      </div>
      <Map coordinates = {state.coordinates} zoom = {6} />
    </div>
  )
}