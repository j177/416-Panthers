import '../stylesheets/state.css'

import Map from './map.js';
import Tabs from'./statePageTabs.js';

export default function StatePage({ state, zoom }) {

    return (
        <div className = "state-page-container">
            <div className = "map-container"> <Map state = {state} zoom = {zoom}></Map></div>
            <div className = "data-container">
                <Tabs state={state}/>
            </div>
        </div>
    )
}