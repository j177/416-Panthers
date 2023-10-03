import React, { useState, useEffect } from 'react';

// SVG arrow icon code
const dropdownArrow = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
    </svg>
);

const infoIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
    </svg>
);

export default function RandomTable() {
    const [clusterNum, setClusterNum] = useState([]);
    const [randNum1, setRandNum1] = useState([]);
    const [randNum2, setRandNum2] = useState([]);
    const [randNum3, setRandNum3] = useState([]);
    const [randNum4, setRandNum4] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showParagraph, setShowParagraph] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        var n = 20;

        const clusterIncrement = () => {
            const clusterIndex = [];
            for (let i = 0; i < n; i++) {
                clusterIndex.push(i);
            }
            setClusterNum(clusterIndex);
        };

        const generateRandomNumbers = () => {
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

        clusterIncrement();
        generateRandomNumbers();
    }, []);

    // show only the first 11 entries
    const data = clusterNum.map((num, i) => ({
        clusterNum: num,
        randNum1: randNum1[i],
        randNum2: randNum2[i],
        randNum3: randNum3[i],
    }));
    const displayData = showAll ? data : data.slice(0, 11);

    const toggleTooltip = () => {
        setShowTooltip(!showTooltip);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setShowParagraph(false);

        const parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 800) {
            setErrorMessage('Not within range! Must be between 1 and 800');
        } else {
            setErrorMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const parsedValue = parseInt(inputValue, 10);

            if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 800) {
                setRandNum4(Math.round(Math.random() * 100) / 100);
                setShowParagraph(true);
            }
        }
    };

    return (
        <div className='make-inline'>
            <div className={`random-table ${showAll ? 'blurred' : ''}`}>
                <table>
                    <thead>
                        <tr>
                            <th>Cluster Num</th>
                            <th>Voting Marking</th>
                            <th>Demographic Margin</th>
                            <th>Income Margin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayData.map((item, i) => (
                            <tr key={i}>
                                {i === 10 && !showAll ? (
                                    <>
                                        <td className={`${i === 10 ? 'gradient-fade-out' : ''}`}>{item.clusterNum}</td>
                                        <td className={` ${i === 10 ? 'gradient-fade-out' : ''}`}>{item.randNum1}</td>
                                        <td className={` ${i === 10 ? 'gradient-fade-out' : ''}`}>{item.randNum2}</td>
                                        <td className={` ${i === 10 ? 'gradient-fade-out' : ''}`}>{item.randNum3}</td>
                                    </>
                                ) : (
                                    <>
                                        <td>{item.clusterNum}</td>
                                        <td>{item.randNum1}</td>
                                        <td>{item.randNum2}</td>
                                        <td>{item.randNum3}</td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='dropdown-arrow-div'>
                    <button className={`dropdown-arrow ${showAll ? 'hidden' : ''}`}
                        onClick={() => setShowAll(!showAll)}>{dropdownArrow}</button>
                    <p className={`${showAll ? 'hidden' : ''}`}>Click for more rows!</p>
                </div>
            </div>

            <div className='user-options'>
                <p>Show Average District Plan in Ensemble:</p>

                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                />
                <br />

                <div className='info-icon' onMouseEnter={toggleTooltip} onMouseLeave={toggleTooltip}>
                    {infoIcon}
                    {showTooltip && (
                        <div className='tooltip'>
                            <p className='small-text'>Press "Enter" with a number from 1 to 800</p>
                        </div>
                    )}
                </div>

                {errorMessage && <p className="error-message"><i>{errorMessage}</i></p>}
                <br />

                {showParagraph && (
                    <p className='small-text'>
                        Average District Plan is: {randNum4}
                    </p>
                )}
            </div>
        </div>
    );
}