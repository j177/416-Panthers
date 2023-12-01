import '../stylesheets/state.css'

import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'

import { GlobalData } from '../contexts/context'

export default function ClusterAnalysisTable({ clusters }) {
    const { setCluster } = useContext(GlobalData)

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 14;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const mainPageNumbers = [];
    for (let i = 1; i <= Math.ceil(clusters.length / itemsPerPage); i++) {
        mainPageNumbers.push(
            <Pagination.Item key = {i} active = {i === currentPage} onClick = {() => setCurrentPage(i)}>
                {i}
            </Pagination.Item>
        );
    }
    
    return (
        <Container className = "cluster-table">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th colSpan = {1}>Cluster</th>
                        <th colSpan = {3}>Average % of voters by party</th>
                        <th colSpan = {7}>Average % of voters by race</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th>Id</th>
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
                    {clusters.slice(indexOfFirstItem, indexOfLastItem).map((cluster, index) => (
                        <tr key = {index}>
                            <td>
                                <span onClick = {() => setCluster(cluster)}>{cluster._id}</span>
                            </td>
                            <td>{cluster.republican}%</td>
                            <td>{cluster.democrat}%</td>
                            <td>{cluster.other}%</td>
                            <td>{cluster.white}%</td>
                            <td>{cluster.black}%</td>
                            <td>{cluster.hispanic}%</td>
                            <td>{cluster.asian}%</td>
                            <td>{cluster.native}%</td>
                            <td>{cluster.pacific}%</td>
                            <td>{cluster.minority}%</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>{mainPageNumbers}</Pagination>
        </Container>
    );
}