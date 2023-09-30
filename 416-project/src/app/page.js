"use client"

import './page.css'
import { useState } from 'react'

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

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
              <li>Michigan</li>
              <li>New York</li>
              <li>Pennsylvania</li>
            </ul>
          )}
        </div>
      </div>
      <Map />
    </div>
  )
}

function Map() {
  return (
    <div>
      Map
    </div>
  )
}
