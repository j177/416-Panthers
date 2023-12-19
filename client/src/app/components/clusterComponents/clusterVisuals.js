import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import axios from 'axios'
import qs from 'qs'
import { useContext, useState, useEffect } from 'react'

import ClusterAnalysisTable from './clusterAnalysisTable.js'
import MDSPlot from './mdsPlot.js'
import NonMDSPlot from './nonMDSPlot.js'
import RDSplitsBarGraph from './rdSplitsBarGraph.js'
import { TabNames } from '@/app/constants/tabConstants.js'
import { GlobalData } from '@/app/contexts/context.js'

export default function ClusterVisuals() {
    const { ensemble, setEnsemble } = useContext(GlobalData)
    const { distanceMeasure, setDistanceMeasure } = useContext(GlobalData)
    const { setCluster, setDistrictPlan } = useContext(GlobalData)

    const [clusters, setClusters] = useState()
    const [activeTab, setActiveTab] = useState(TabNames.CLUSTER_ANALYSIS)

    useEffect(() => {
        const getClusters = async () => {
            try {
                const clusters = await axios.get("http://localhost:8080/clusters", {
                    params: {
                        ids: ensemble[distanceMeasure].clusterIds
                    },
                    paramsSerializer: params => {
                        return qs.stringify(params, { arrayFormat: 'repeat' })
                    }
                })

                setClusters(clusters.data)
            } catch (error) {
                console.log("Error fetching clusters: ", error)
            }
        }
    
        getClusters()
    }, [])

    const handleTabClick = (tab) => {
        if (tab === TabNames.BACK_TAB) {
            setEnsemble()
            setDistanceMeasure()
        } else {
            setActiveTab(tab)
        }
        setCluster()
        setDistrictPlan()
    }

    if (!clusters) {
        return
    }

    return (
        <>
            <Tabs
                defaultActiveKey = {TabNames.CLUSTER_ANALYSIS}
                transition = {false}
                className = "mb-3"
                activeKey = {activeTab}
                onSelect = {handleTabClick}
            >
                <Tab eventKey = {TabNames.BACK_TAB} title = {TabNames.BACK_TAB}>
                </Tab>
                <Tab eventKey = {TabNames.CLUSTER_ANALYSIS} title = {TabNames.CLUSTER_ANALYSIS}>
                    <ClusterAnalysisTable clusters = {clusters} />
                </Tab>
                <Tab eventKey = {TabNames.MDS} title = {TabNames.MDS}>
                    <MDSPlot clusters = {clusters} activeTab = {activeTab} />
                </Tab>
                <Tab eventKey = {TabNames.NON_MDS} title = {TabNames.NON_MDS}>
                    <NonMDSPlot clusters = {clusters} activeTab = {activeTab} />
                </Tab>
                <Tab eventKey = {TabNames.RD_SPLITS} title = {TabNames.RD_SPLITS}>
                    <RDSplitsBarGraph clusters = {clusters} />
                </Tab>
            </Tabs>
        </>
    )
}
