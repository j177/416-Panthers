import '../stylesheets/state.css'

import Navbar from './navbar'
import StateMap from './stateMap.js'
import StatePageTabs from'./statePageTabs.js';

export default function StatePage({ state, zoom }) {
    return (
        <>
            <Navbar />
            <div className = "state-page-container">
                <div className = "map-container"><StateMap state = {state} zoom = {zoom} /></div>
                <div className = "data-container"><StatePageTabs state = {state} /></div>
            </div>
        </>
    )
}