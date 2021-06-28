import React, {useEffect, useState} from 'react'
import Histogram from './Histogram'
import Table from "./Table";
import Styles from "./Styles";
import axios from "axios";

function App() {
    const [rolling, setRolling] = useState(0)
    const [metricsVisibility, setMetricsVisibility] = useState(false)
    const [liveDurations, setLiveDurations] = useState([])
    const [users, setUsers] = useState([]);

    async function updateUsers(){
        const result = await axios.get('https://abtestserver.herokuapp.com/api/users');
        setUsers(result.data.map(i => { return {
            id: i.id,
            dateRegistration: new Date(Date.parse(i.dateRegistration)),
            dateLastActivity: new Date(Date.parse(i.dateLastActivity))
        }}));
    }

    useEffect(() => {
        updateUsers();
    }, []);

    const updateMyData = (rowIndex, columnName, value) => {
        setUsers(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    // validate
                    if (columnName === 'dateLastActivity' && row.dateRegistration > value){
                        return row
                    }
                    return Object.assign({}, old[rowIndex], {[columnName]: value})
                }
                return row
            })
        )
        setMetricsVisibility(false)
    }

    async function handleCalculate() {
        await handleSave()
        const rollingRes = await axios.get('https://abtestserver.herokuapp.com/api/metrics/rolling/7')
        setRolling(rollingRes.data)
        const liveDurationRes = await axios.get('https://abtestserver.herokuapp.com/api/metrics/lifedurations');
        setLiveDurations(liveDurationRes.data)
        setMetricsVisibility(true)
    }

    async function handleSave() {
        await axios.post('https://abtestserver.herokuapp.com/api/users', users)
        await updateUsers();
    }

    return (
        <div>
            <Styles>
                <div className=''>
                    <button
                        onClick={handleSave}
                        className="btn btn-primary">
                        Save
                    </button>
                    <button
                        onClick={handleCalculate}
                        className="btn btn-primary m-1">
                        Calculate
                    </button>
                </div>
                <Table
                    data={users}
                    updateMyData={updateMyData}
                />
                <div className='my-1'>
                    <div className={metricsVisibility ? '' : 'collapse'}>
                        <h5>Rolling Retention 7 day: {rolling}%</h5>
                        <Histogram data={liveDurations} />
                    </div>
                </div>

            </Styles>
        </div>
    )
}

export default App