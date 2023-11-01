"use client"
import { useState } from 'react'

import StatePage from '../../components/statePage'
import { States } from '../../constants/stateConstants'

export default function NewYorkPage() {
    const [state, setState] = useState(States.NEW_YORK)

    return (
        <StatePage state = {state} zoom = {7}/>
    )
}