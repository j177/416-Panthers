import { useContext, useEffect, useState } from 'react'
import { Container, Table, Pagination, Button, Dropdown } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import axios from 'axios'
import qs from 'qs'

import { GlobalData } from '@/app/contexts/context.js'
import { TableData } from '@/app/constants/tableData'
import { ComparePlanButton } from '@/app/constants/comparePlanButtonData'
import { DistanceMeasures } from '@/app/constants/distanceMeasureConstants'

export default function DistrictPlanSummary({ districtPlans }) {
    const [comparison, setComparison] = useState(false)
    const { districtPlanIds } = useContext(GlobalData)

    const textToDisplay = comparison
                            ? <div className = "comparison-tip">
                                <i>Select two district plans from the district plan table to display.</i>
                              </div>
                            : <div></div>

    const legendToDisplay = comparison && districtPlanIds && districtPlanIds.length === 2
                            ? <div className = "comparison-legend">
                                <div>
                                    <div className = "purple-square"></div>
                                    <div>{districtPlanIds[0]}</div>
                                </div>
                                <div>
                                    <div className = "orange-square"></div>
                                    <div>{districtPlanIds[1]}</div>
                                </div>
                              </div>
                            : <div></div>

    return (
        <div className = "dp-summary-container">
            <div>
                <StateSummary />
                <StateSummaryLegend />
                <div className = "comparison-container">
                    <ComparePlansButton comparison = {comparison} setComparison = {setComparison} />
                    {textToDisplay}
                    <div className = "comparison-title">
                        <b>
                            Comparison of District Plans <br></br> By Distance Measure
                        </b>
                    </div>
                    <ComparePlansTable comparison = {comparison} />
                    {legendToDisplay}
                </div>
            </div>
            <DistrictPlanAnalysisTable districtPlans = {districtPlans} comparison = {comparison} />
        </div>
    )
}

function StateSummary() {
    const { state, cluster } = useContext(GlobalData)

    return (
        <div className = "dp-ensemble-summary">
            <div className = "header"><b>State Summary ({state.name})</b></div>
            <Container className = "body">
                <Table striped bordered hover>
                    <tbody>
                        <tr className = "td-center">
                            <th>% of Rep*:</th>
                            <td className = "td-right">{cluster.cluster.republican}%</td>
                            <th>% of Dem*:</th>
                            <td className = "td-right">{cluster.cluster.democrat}%</td>
                        </tr>
                        <tr className = "td-center">
                            <th>% of White:</th>
                            <td className = "td-right">{cluster.cluster.white}%</td>
                            <th>% of Black:</th>
                            <td className = "td-right">{cluster.cluster.black}%</td>
                        </tr>
                        <tr className = "td-center">
                            <th>% of Hispanic:</th>
                            <td className = "td-right">{cluster.cluster.hispanic}%</td>
                            <th>% of Asian:</th>
                            <td className = "td-right">{cluster.cluster.asian}%</td>
                        </tr>
                        <tr className = "td-center">
                            <th>% of Native:</th>
                            <td className = "td-right">{cluster.cluster.native}%</td>
                            <th>% of Pacific:</th>
                            <td className = "td-right">{cluster.cluster.pacific}%</td>
                        </tr>
                        <tr className = "td-center">
                            <th>% of Other:</th>
                            <td className = "td-right">{cluster.cluster.other}%</td>
                            <th>% of Mixed:</th>
                            <td className = "td-right">{cluster.cluster.mixed}%</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

function StateSummaryLegend() {
    return (
        <div className = "state-summary-legend">
            <b className = "rep"><i>*Rep = Republican</i></b>
            <b className = "dem"><i>*Dem = Democratic</i></b>
        </div>
    )
}

function ComparePlansButton({ comparison, setComparison }) {
    const [compare, setCompare] = useState(ComparePlanButton.OFF)

    const handleClick = () => {
        if (compare === ComparePlanButton.ON) {
            setCompare(ComparePlanButton.OFF)
        }
        else {
            setCompare(ComparePlanButton.ON)
        }
        setComparison(!comparison)
    }

    const nameOfClass = comparison ? "compare-on" : "compare-off"

    return (
        <Button className = {"compare-plans-button " + nameOfClass} onClick = {handleClick}>
            Compare two district plans: {compare}
        </Button>
    )
}

function ComparePlansTable({ comparison }) {
    const [optValue, setOptValue] = useState()
    const [hamValue, setHamValue] = useState()
    const { state, ensemble, districtPlanIds } = useContext(GlobalData)

    useEffect(() => {
        if (!comparison) {
            setOptValue()
            setHamValue()
        }
    }, [comparison])

    useEffect(() => {
        if (districtPlanIds.length < 2) {
            return
        }

        const matriceNames = Object.values(DistanceMeasures).map((distanceMeasure) => 
                            distanceMeasure + state.name + ensemble.numPlans)

        const convertToNumber = (id) => {
            const match = id.match(/\d+/)
            if (match) {
                const extractedNumberString = match[0];
                
                return parseInt(extractedNumberString, 10);
            }
            else {
                return 0
            }
        }

        const getTableValues = async () => {
            for (let i = 0; i < matriceNames.length; i++) {
                const idOne = convertToNumber(districtPlanIds[0])
                const idTwo = convertToNumber(districtPlanIds[1])
                try {
                    const tableValues = await axios.get("http://localhost:8080/districtPlanComparison", {
                        params: {
                            matrix: matriceNames[i],
                            idOne: idOne,
                            idTwo: idTwo
                        }
                    })

                    if (matriceNames[i] === DistanceMeasures.OPTIMAL_TRANSPORT + state.name + ensemble.numPlans) {
                        setOptValue(tableValues.data)
                    }
                    else {
                        setHamValue(tableValues.data)
                    }
                } catch (error) {
                    console.log("Error fetching table data: ", error)
                }
            }
        }
    
        getTableValues()
    }, [districtPlanIds])

    return (
        <Container className = "comparison-table">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className = "td-centered">Distance Measure</th>
                        <th className = "td-centered">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Optimal Transport</td>
                        <td className = "td-right">{optValue !== undefined ? Number(optValue.toFixed(5)) : '-'}</td>
                    </tr>
                    <tr>
                        <td>Hamming Distance</td>
                        <td className = "td-right">{hamValue !== undefined ? Number(hamValue.toFixed(5)) : '-'}</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
     )
}

function DistrictPlanAnalysisTable({ districtPlans, comparison }) {
    const { setDistrictPlan, setDistrictPlanIds } = useContext(GlobalData)

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = TableData.ITEMS_PER_PAGE

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage

    const mainPageNumbers = []
    for (let i = 1; i <= Math.ceil(districtPlans.length / itemsPerPage); i++) {
        mainPageNumbers.push(
            <Pagination.Item key = {i} active = {i === currentPage} onClick = {() => setCurrentPage(i)}>
                {i}
            </Pagination.Item>
        )
    }

    const handleClick = (districtPlan) => {
        setDistrictPlan(districtPlan)
        if (comparison) {
            setDistrictPlanIds((prev) => {
                const newDistrictPlanIds = [...prev, districtPlan._id]

                if (newDistrictPlanIds.length > 2) { 
                    newDistrictPlanIds.shift()
                }

                return newDistrictPlanIds
            })
        }
        else {
            setDistrictPlanIds([])
        }
    }

    return (
        <Container className = "dp-table">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th colSpan = {1}>District Plan</th>
                        <th colSpan = {2}># of districts by party</th>
                        <th colSpan = {2}># of opportunity districts</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Rep</th>
                        <th>Dem</th>
                        <th>Black</th>
                        <th>Hisp</th>
                    </tr>
                </thead>
                <tbody>
                    {districtPlans.slice(indexOfFirstItem, indexOfLastItem).map((districtPlan, index) => (
                        <tr key = {index}>
                            <td onClick = {() => {handleClick(districtPlan)}}>
                                <span>{districtPlan._id}</span>
                            </td>
                            <td className = "td-right">{districtPlan.rDistricts}</td>
                            <td className = "td-right">{districtPlan.dDistricts}</td>
                            <td className = "td-right">{districtPlan.blackOppDistricts}</td>
                            <td className = "td-right">{districtPlan.hispOppDistricts}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className = "right-align">
                <Pagination>{mainPageNumbers}</Pagination>
            </div>
        </Container>
    )
}