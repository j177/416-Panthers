import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import BootstrapTable from "react-bootstrap-table-next";
import Modal from 'react-bootstrap/Modal';
import paginationFactory from "react-bootstrap-table2-paginator";
import '../stylesheets/state.css';

export default function ClusterAnalysis() {
    const [showModal, setShowModal] = useState(false);
    const [selectedClusterId, setSelectedClusterId] = useState(null);

    const generateRandomNumber = () => {
        return Math.floor(Math.random() * 10) + 1;
    };

    const generateRandomPercentage = () => {
        return (Math.random() * 100).toFixed(1) + '%';
    };

    const renderRows = () => {
        let rows = [];
        for (let i = 0; i < 50; i++) {
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

    const columns = [
        {
            dataField: 'id',
            text: 'Cluster ID',
            formatter: (cellContent, row) => {
                return (
                    <button className='btn btn-link' onClick={() => handleOpenModal(row.id)}>
                        {cellContent}
                    </button>
                );
            }
        },
        {
            dataField: 'rdSplits',
            text: 'Avg R/D Splits'
        },
        {
            dataField: 'republicanVoters',
            text: 'Avg % of Republican voters'
        },
        {
            dataField: 'democraticVoters',
            text: 'Avg % of Democratic voters'
        },
        {
            dataField: 'asianVoters',
            text: 'Avg % of Asian voters'
        },
        {
            dataField: 'blackVoters',
            text: 'Avg % of Black voters'
        },
        {
            dataField: 'whiteVoters',
            text: 'Avg % of White voters'
        }
    ]

    const planColumns = [
        {
            dataField: 'id',
            text: 'Plan #',
        },
        {
            dataField: 'rdSplits',
            text: 'R/D Splits'
        },
        {
            dataField: 'republicanVoters',
            text: '% of Republican voters'
        },
        {
            dataField: 'democraticVoters',
            text: '% of Democratic voters'
        },
        {
            dataField: 'asianVoters',
            text: '% of Asian voters'
        },
        {
            dataField: 'blackVoters',
            text: '% of Black voters'
        },
        {
            dataField: 'whiteVoters',
            text: '% of White voters'
        }
    ]

    const handleOpenModal = (clusterId) => {
        setSelectedClusterId(clusterId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedClusterId(null);
    };

    return (
        <Container>
            <BootstrapTable
                keyField='id'
                data={renderRows()}
                columns={columns}
                striped
                bordered
                hover
                responsive
                bootstrap4
                wrapperClasses="table-responsive"
                classes="bootstrap-table"
                pagination={paginationFactory({ sizePerPage: 10, hideSizePerPage: true })}
            />
            <Container>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cluster Details for Cluster {selectedClusterId}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Number of Plans: 50
                        <BootstrapTable
                            keyField='id'
                            data={renderRows()}
                            columns={planColumns}
                            striped
                            bordered
                            hover
                            responsive
                            bootstrap4
                            wrapperClasses="table-responsive"
                            classes="bootstrap-table"
                            pagination={paginationFactory({ sizePerPage: 10, hideSizePerPage: true })}
                        />


                    </Modal.Body>
                </Modal>
            </Container>
        </Container>
    );
}
