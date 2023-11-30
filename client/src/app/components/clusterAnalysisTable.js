import '../stylesheets/state.css'

import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Pagination from 'react-bootstrap/Pagination'
import axios from 'axios'
import qs from 'qs'

import { PageData } from '../contexts/context'

export default function ClusterAnalysisTable() {
    const { ensemble, distanceMeasure } = useContext(PageData)

    const [clusters, setClusters] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    const [showModal, setShowModal] = useState(false);
    const [selectedClusterId, setSelectedClusterId] = useState(null);
    const [currentModalPage, setCurrentModalPage] = useState(1);
    const itemsPerPage = 10;

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

    if (!clusters) {
        return
    }

    const handleOpenModal = (clusterId) => {
        setSelectedClusterId(clusterId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedClusterId(null);
    };

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

    const modalPageNumbers = [];
    for (let i = 1; i <= Math.ceil(clusters.length / itemsPerPage); i++) {
        modalPageNumbers.push(
            <Pagination.Item key={i} active={i === currentModalPage} onClick={() => setCurrentModalPage(i)}>
                {i}
            </Pagination.Item>
        );
    }
    
    return (
        <Container className = "cluster-table">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th className = "td-centered" colSpan = {2}>% of voters</th>
                        <th className = "td-centered" colSpan = {5}>% of total population</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th className = "td-centered">Cluster Id</th>
                        <th className = "td-centered">Republican</th>
                        <th className = "td-centered">Democrat</th>
                        <th className = "td-centered">White</th>
                        <th className = "td-centered">Black</th>
                        <th className = "td-centered">Hispanic</th>
                        <th className = "td-centered">Asian</th>
                        <th className = "td-centered">Other</th>
                    </tr>
                </thead>
                <tbody>
                    {clusters.slice(indexOfFirstItem, indexOfLastItem).map((cluster, index) => (
                        <tr key = {index}>
                            <td>
                                <button className = 'btn btn-link' onClick = {() => handleOpenModal(cluster._id)}>
                                    {cluster._id}
                                </button>
                            </td>
                            <td>{cluster.rVoters}</td>
                            <td>{cluster.dVoters}</td>
                            <td>{cluster.white}</td>
                            <td>{cluster.black}</td>
                            <td>{cluster.hispanic}</td>
                            <td>{cluster.asian}</td>
                            <td>{cluster.other}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>{mainPageNumbers}</Pagination>
        </Container>
    );
}


{/* <Container>
                <Modal show={showModal} onHide={handleCloseModal} size='xl'>
                    <Modal.Header closeButton>
                        <Modal.Title>Cluster Details for Cluster {selectedClusterId}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span>Number of Plans: 50</span>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Plan #</th>
                                    <th>% of Republican voters</th>
                                    <th>% of Democratic voters</th>
                                    <th>% of Asian voters</th>
                                    <th>% of Black voters</th>
                                    <th>% of White voters</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderRows(10).map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.republicanVoters}</td>
                                        <td>{row.democraticVoters}</td>
                                        <td>{row.asianVoters}</td>
                                        <td>{row.blackVoters}</td>
                                        <td>{row.whiteVoters}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Pagination>{modalPageNumbers}</Pagination>
                </Modal>
            </Container> */}