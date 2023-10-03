"use client"

import './stylesheets/page.css'

import { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'

import Navbar from './components/navbar'
import MainMap from './components/mainMap.js'

export default function Home() {
  return (
    <div className = "main">
      <Navbar />
      <div className = "map-container">
        <MainMap />
      </div>
    </div>
  )
}