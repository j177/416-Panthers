import { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import qs from 'qs'

import EnsembleSummaryTable from './ensembleSummaryTable'
import EnsembleClusterVisuals from './ensembleClusterVisuals'
import { GlobalData } from '@/app/contexts/context'

export default function EnsembleVisuals() {
    const { state, setState, setEnsemble, setDistanceMeasure } = useContext(GlobalData)

    const [ensembles, setEnsembles] = useState()

    useEffect(() => {
        const getEnsembles = async () => {
            try {
                if (!state.ensembleIds) {
                    return
                }

                const ensembles = await axios.get("http://localhost:8080/ensembles", {
                    params: {
                        ids: state.ensembleIds
                    },
                    paramsSerializer: params => {
                        return qs.stringify(params, { arrayFormat: 'repeat' })
                    }
                })
        
                setEnsembles(ensembles.data)
            } catch (error) {
                console.log("Error fetching ensembles: ", error)
            }
        }
    
        getEnsembles()
    }, [state])

    if (!ensembles) {
        return
    }

    return (
        <>
            <div className = "ensemble-table-container">
                <EnsembleSummaryTable 
                    ensembles = {ensembles}
                    setState = {setState}
                    setEnsemble = {setEnsemble}
                    setDistanceMeasure = {setDistanceMeasure} />
            </div>
            <div className = "ensemble-legend">
                <b><i>*DPs = District Plans</i></b>
            </div>
            <div>
                <EnsembleClusterVisuals ensembles = {ensembles} />
            </div>
        </>
    )
}