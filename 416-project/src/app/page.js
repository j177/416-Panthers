"use client"

import './stylesheets/page.css'

import { useState } from 'react'

import { States } from './constants/stateConstants'
import MainMap from './components/mainMap.js'

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [state, setState] = useState(States.NOT_SELECTED)
  const [zoom, setZoom] = useState(6)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className = "main">
      <div className = "navbar">
        <div className = "dropdown" onMouseEnter = {toggleDropdown} onMouseLeave = {toggleDropdown}>
          <div className = "dropdown-button">
            States
            <div className = {isDropdownOpen ? "up-triangle" : "down-triangle"}></div>
          </div>
          {isDropdownOpen && (
            <ul className = "dropdown-options">
              <li onClick = {() => {setState(States.MICHIGAN); setZoom(7)}}>Michigan</li>
              <li onClick = {() => {setState(States.NEW_YORK); setZoom(7)}}>New York</li>
              <li onClick = {() => {setState(States.PENNSYLVANIA); setZoom(7)}}>Pennsylvania</li>
            </ul>
          )}
        </div>
      </div>
      <div className = "map-container">
        <MainMap state = {state} zoom = {zoom} />
      </div>
    </div>
  )
}