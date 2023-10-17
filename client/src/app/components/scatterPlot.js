import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import StatePageScatterPlotPopup from './statePageScatterPlotPopup';

export default function ScatterPlot({ data, title, xLabel, yLabel, width, height }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Plot 
                data={data}
                layout={{
                    title: title,
                    titlefont: {
                        size: '15'
                    },
                    xaxis: { 
                        title: xLabel
                    },
                    yaxis: {
                        title: yLabel
                    },
                    width: width,
                    height: height
                }}
                config={{ displayModeBar: false }}
                onClick={handleShow}
            />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton >
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StatePageScatterPlotPopup/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
