import '../stylesheets/state.css'

import StateMap from './stateMap.js'

export default function StatePage({ state, zoom }) {

    return (
        <div className = "state-page-container">
            <div className = "map-container"> <StateMap state = {state} zoom = {zoom} /></div>
            <div className = "data-container">Data goes here</div>
        </div>
    )
}