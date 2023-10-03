import { States } from "../constants/stateConstants";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    return (
        <div className = "navbar">
            <div className = "dropdown" onMouseEnter = {toggleDropdown} onMouseLeave = {toggleDropdown}>
                <div className = "dropdown-button">
                    States
                    <div className = {isDropdownOpen ? "up-triangle" : "down-triangle"}></div>
                </div>
                {isDropdownOpen && (
                    <ul className = "dropdown-options">
                        <li onClick = {() => {router.push('/' + States.MICHIGAN.name)}}>Michigan</li>
                        <li onClick = {() => {router.push('/' + States.NEW_YORK.name.replace(/ /g, ''))}}>New York</li>
                        <li onClick = {() => {router.push('/' + States.PENNSYLVANIA.name)}}>Pennsylvania</li>
                    </ul>
                )}
            </div>
            <div className = "navbar-text">
                Federal Congressional Plans
            </div>
        </div>
    )
}