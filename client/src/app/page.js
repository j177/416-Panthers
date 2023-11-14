"use client"

import './stylesheets/page.css'

import { useState } from 'react'

import { PageData } from './contexts/context'

import Navigation from './components/navbar'
import MainMap from './components/mainMap.js'
import StatePage from './components/statePage'

export default function Home() {
    const [state, setState] = useState()
    const [ensemble, setEnsemble] = useState()

    return (
        <PageData.Provider value = {{ state, setState, ensemble, setEnsemble }}>
            <div className = "main">
                <Navigation />
                <div className = "map-container">
                    {state ? (
                        <StatePage />
                        ) : (
                        <MainMap />
                    )}
                </div>
            </div>
        </PageData.Provider>
    )
}