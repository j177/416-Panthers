import { useContext, useState } from 'react'
import { Container, Table, Pagination } from 'react-bootstrap'

import { GlobalData } from '@/app/contexts/context.js'
import { TableData } from '@/app/constants/tableData'

export default function DistrictPlanAnalysisTable({ districtPlans }) {
    const { setDistrictPlan } = useContext(GlobalData)

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
    )
}