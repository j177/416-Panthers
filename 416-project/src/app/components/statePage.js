import '../stylesheets/state.css'

import StateMap from './stateMap.js'
import Tabs from'./statePageTabs.js';

export default function StatePage({ state, zoom }) {

    return (
        <div className = "state-page-container">
            <div className = "map-container"> <StateMap state = {state} zoom = {zoom} /></div>
            <div className = "data-container"><Tabs state={state} /></div>
        </div>
    )
}