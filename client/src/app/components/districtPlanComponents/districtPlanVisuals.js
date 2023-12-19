import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import axios from 'axios'
import qs from 'qs'
import { useContext, useState, useEffect } from 'react'

import DistrictPlanSummary from './districtPlanSummary'
import { GlobalData } from '@/app/contexts/context.js'
import { TabNames } from '@/app/constants/tabConstants'

export default function DistrictPlanVisuals() {
    const { cluster, setCluster, setDistrictPlan, setDistrictPlanIds } = useContext(GlobalData)

    const [districtPlans, setDistrictPlans] = useState()
    const [activeTab, setActiveTab] = useState(TabNames.DP_ANALYSIS)

    useEffect(() => {
        const getDistrictPlans = async () => {
            try {
                const districtPlans = await axios.get("http://localhost:8080/district-plans", {
                    params: {
                        ids: cluster.cluster.dpIds
                    },
                    paramsSerializer: params => {
                        return qs.stringify(params, { arrayFormat: 'repeat' })
                    }
                })

                setDistrictPlans(districtPlans.data)
            } catch (error) {
                console.log("Error fetching district plans: ", error)
            }
        }
    
        getDistrictPlans()
    }, [])

    const handleTabClick = (tab) => {
        if (tab === TabNames.BACK_TAB) {
            setCluster()
            setDistrictPlan()
            setDistrictPlanIds([])
        } else {
            setActiveTab(tab)
        }
    }

    if (!districtPlans) {
        return
    }

    return (
        <>
            <Tabs
                defaultActiveKey = {TabNames.DP_ANALYSIS}
                transition = {false}
                className = "mb-3"
                activeKey = {activeTab}
                onSelect = {handleTabClick}
            >
                <Tab eventKey = {TabNames.BACK_TAB} title = {TabNames.BACK_TAB}>
                </Tab>
                <Tab eventKey = {TabNames.DP_ANALYSIS} title = {TabNames.DP_ANALYSIS}>
                    <DistrictPlanSummary districtPlans = {districtPlans} />
                </Tab>
            </Tabs>
        </>
    )
}