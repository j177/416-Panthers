import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import '../stylesheets/dm.css'

export default function RandomTable() {
    const [clusterNum, setClusterNum] = useState([]);
    const [clusterSize, setclusterSize] = useState([]);
    const [randNum1, setRandNum1] = useState([]);
    const [randNum2, setRandNum2] = useState([]);
    const [randNum3, setRandNum3] = useState([]);
    const [tablePage, setTablePage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        var n = 20; // number of clusters to 'generate'

        // numbering cluster ID
        const clusterIncrement = () => {
            const clusterIndex = [];
            for (let i = 0; i < n; i++) {
                clusterIndex.push(i);
            }
            setClusterNum(clusterIndex);
        };

        // generate random numbers for size of each cluster
        const genRandNum = () => {
            const a = [];
            for (let i = 0; i < n; i++) {
                let b = Math.floor(Math.random() * (500 - 80 + 1) + 80);
                a.push(b);
            }
            setclusterSize(a);
        };

        // generate random numbers for the distance measures
        const genRandNumDecimal = () => {
            const num1 = [];
            const num2 = [];
            const num3 = [];
            for (let i = 0; i < n; i++) {
                num1.push(Math.round(Math.random() * 100) / 100);
                num2.push(Math.round(Math.random() * 100) / 100);
                num3.push(Math.round(Math.random() * 100) / 100);
            }
            setRandNum1(num1);
            setRandNum2(num2);
            setRandNum3(num3);
        };

        // invoke the functions
        clusterIncrement();
        genRandNum();
        genRandNumDecimal();
    }, []);

    // map each piece of data per row
    const data = clusterNum.map((num, i) => ({
        d0: num,
        d1: clusterSize[i],
        d2: randNum1[i],
        d3: randNum2[i],
        d4: randNum3[i]
    }));

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // calculate the index range for the current page
    const startIndex = (tablePage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    const currentData = data.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setTablePage(page);
    };


    return (
        <div className='dmTable'>
            <div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Cluster ID</th>
                            <th># of Plans</th>
                            <th>Hamming Distance</th>
                            <th>Optimal Transport</th>
                            <th>Total Variation Distance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item, i) => (
                            <tr key={i}>
                                <td className='clust-num'>{item.d0}</td>
                                <td className='clust-size'>{item.d1}</td>
                                <td className='dist-meas'>{item.d2}</td>
                                <td className='dist-meas'>{item.d3}</td>
                                <td className='dist-meas'>{item.d4}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Pagination>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Pagination.Item
                            key={i}
                            active={i + 1 === tablePage}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
        </div>
    );
}