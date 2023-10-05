"use client"
import { useState } from 'react'

import StatePage from '../../components/statePage'
import { States } from '../../constants/stateConstants'

export default function PennsylvaniaPage() {
    const [state, setState] = useState(States.PENNSYLVANIA)

    return (
        <StatePage state = {state} zoom = {7} />
    )
}