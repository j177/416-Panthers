import React, { useContext, useState, useEffect } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { Container, Table, Pagination } from 'react-bootstrap'
import axios from 'axios'
import qs from 'qs'

import { GlobalData } from '../contexts/context.js'

import { TabNames } from '../constants/tabConstants.js'

export default function DistrictPlanVisuals() {
    const { cluster, setCluster, districtPlan, setDistrictPlan } = useContext(GlobalData)

    const [districtPlans, setDistrictPlans] = useState()
    const [activeTab, setActiveTab] = useState(TabNames.DP_ANALYSIS)

    useEffect(() => {
        const getDistrictPlans = async () => {
            try {
                const districtPlans = await axios.get("http://localhost:8080/district-plans", {
                    params: {
                        ids: cluster.dpIds
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
                defaultActiveKey = { TabNames.DP_ANALYSIS }
                transition = { false }
                className = "mb-3"
                activeKey = { activeTab }
                onSelect = { handleTabClick }
            >
                <Tab eventKey = { TabNames.BACK_TAB } title = '< Back'>
                </Tab>
                <Tab eventKey = { TabNames.DP_ANALYSIS } title = "District Plan Analysis">
                    <DistrictPlanAnalysisTable districtPlans = {districtPlans} />
                </Tab>
            </Tabs>
        </>
    )
}

function DistrictPlanAnalysisTable({ districtPlans }) {
    const { setDistrictPlan } = useContext(GlobalData)

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 14;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const mainPageNumbers = [];
    for (let i = 1; i <= Math.ceil(districtPlans.length / itemsPerPage); i++) {
        mainPageNumbers.push(
            <Pagination.Item key = {i} active = {i === currentPage} onClick = {() => setCurrentPage(i)}>
                {i}
            </Pagination.Item>
        );
    }

    return (
        <Container className = "dp-table">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th colSpan = {2}>District Plan</th>
                        <th colSpan = {3}>% of voters by party</th>
                        <th colSpan = {7}>% of voters by race</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>R/D Split</th>
                        <th>Republican</th>
                        <th>Democrat</th>
                        <th>Other</th>
                        <th>White</th>
                        <th>Black</th>
                        <th>Hispanic</th>
                        <th>Asian</th>
                        <th>Native</th>
                        <th>Pacific</th>
                        <th>Minority</th>
                    </tr>
                </thead>
                <tbody>
                    {districtPlans.slice(indexOfFirstItem, indexOfLastItem).map((districtPlan, index) => (
                        <tr key = {index}>
                            <td onClick = {() => setDistrictPlan(districtPlan)}>
                                <span>{districtPlan._id}</span>
                            </td>
                            <td>{districtPlan.rSeats} / {districtPlan.dSeats}</td>
                            <td>{districtPlan.republican}%</td>
                            <td>{districtPlan.democrat}%</td>
                            <td>{districtPlan.other}%</td>
                            <td>{districtPlan.white}%</td>
                            <td>{districtPlan.black}%</td>
                            <td>{districtPlan.hispanic}%</td>
                            <td>{districtPlan.asian}%</td>
                            <td>{districtPlan.native}%</td>
                            <td>{districtPlan.pacific}%</td>
                            <td>{districtPlan.minority}%</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>{mainPageNumbers}</Pagination>
        </Container>
    );
}