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
                        <th colSpan = {1}>District Plan</th>
                        <th colSpan = {2}># of districts by party</th>
                        <th colSpan = {4}># of opportunity districts</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Republican</th>
                        <th>Democrat</th>
                        <th>White</th>
                        <th>Black</th>
                        <th>Hispanic</th>
                        <th>Asian</th>
                    </tr>
                </thead>
                <tbody>
                    {districtPlans.slice(indexOfFirstItem, indexOfLastItem).map((districtPlan, index) => (
                        <tr key = {index}>
                            <td onClick = {() => setDistrictPlan(districtPlan)}>
                                <span>{districtPlan._id}</span>
                            </td>
                            <td>{districtPlan.rDistricts}</td>
                            <td>{districtPlan.dDistricts}</td>
                            <td>{districtPlan.white_od}</td>
                            <td>{districtPlan.black_od}</td>
                            <td>{districtPlan.hispanic_od}</td>
                            <td>{districtPlan.asian_od}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>{mainPageNumbers}</Pagination>
        </Container>
    )
}