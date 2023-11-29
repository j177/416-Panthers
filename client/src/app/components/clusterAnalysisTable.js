// variables: id (cluster ID), rdSplits, republicanVoters, democraticVoters, asianVoters, blackVoters, whiteVoters
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Pagination from 'react-bootstrap/Pagination';
import '../stylesheets/state.css';

export default function ClusterAnalysisTable() {
    const [showModal, setShowModal] = useState(false);
    const [selectedClusterId, setSelectedClusterId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentModalPage, setCurrentModalPage] = useState(1);
    const itemsPerPage = 10;

    const generateRandomNumber = () => {
        return Math.floor(Math.random() * 10) + 1;
    };

    const generateRandomPercentage = () => {
        return (Math.random() * 100).toFixed(1) + '%';
    };

    const renderRows = (count) => {
        let rows = [];
        for (let i = 0; i < count; i++) {
            rows.push({
                id: i,
                rdSplits: `${generateRandomNumber()}/${generateRandomNumber()}`,
                republicanVoters: generateRandomPercentage(),
                democraticVoters: generateRandomPercentage(),
                asianVoters: generateRandomPercentage(),
                blackVoters: generateRandomPercentage(),
                whiteVoters: generateRandomPercentage()
            });
        }
        return rows;
    };

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
    const currentItems = renderRows(50).slice(indexOfFirstItem, indexOfLastItem);

    const mainPageNumbers = [];
    for (let i = 1; i <= Math.ceil(renderRows(50).length / itemsPerPage); i++) {
        mainPageNumbers.push(
            <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
                {i}
            </Pagination.Item>
        );
    }

    const modalPageNumbers = [];
    for (let i = 1; i <= Math.ceil(renderRows(50).length / itemsPerPage); i++) {
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
                        <th>Cluster ID</th>
                        <th>% of Republican voters</th>
                        <th>% of Democratic voters</th>
                        <th>% of Asian voters</th>
                        <th>% of Black voters</th>
                        <th>% of White voters</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((row) => (
                        <tr key={row.id}>
                            <td>
                                <button className='btn btn-link' onClick={() => handleOpenModal(row.id)}>
                                    {row.id}
                                </button>
                            </td>
                            <td>{row.republicanVoters}</td>
                            <td>{row.democraticVoters}</td>
                            <td>{row.asianVoters}</td>
                            <td>{row.blackVoters}</td>
                            <td>{row.whiteVoters}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>{mainPageNumbers}</Pagination>
            <Container>
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
            </Container>
        </Container>
    );
}
