"use client"

import './stylesheets/page.css'

import axios from 'axios'

import Navbar from './components/navbar'
import MainMap from './components/mainMap.js'
import { useEffect } from 'react'

export default function Home() {
  // useEffect(() => {
  //   loadData();
  // }, [])

  // const loadData = async () => {
  //   const data = await axios.get("http://localhost:8080/clusters");
  //   console.log(data);
  // }

  return (
    <div className="main">
      <Navbar />
      <div className="map-container">
        <MainMap />
      </div>
    </div>
  )
}