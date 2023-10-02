"use client"

import { useState } from 'react'

import StatePage from '../../components/statePage'
import { States } from '../../constants/stateConstants'

export default function MichiganPage() {
    const [state, setState] = useState(States.MICHIGAN)

    return (
        <StatePage state = {state} zoom = {7} />
    )
}