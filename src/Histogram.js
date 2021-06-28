import React, {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import moment from "moment";

export default function Histogram({data}) {
    const [chartData, setChartData] = useState({})

    useEffect(() => {
        setChartData({
            labels: data.map(i => i.userId),
            datasets: [
                {
                    label: 'Live duration',
                    data: data.map(i => moment.duration(i.duration).days()),
                    backgroundColor: 'rgba(12, 110, 253)'
                }
            ]
        })
    }, [data])

    return (
        <div className="chart">
            <Bar
                width={450}
                height={400}
                data={chartData}
                options={{
                    title: {
                        display: true,
                        text: 'Live durations',
                        fontSize: 25
                    },
                    legend: {
                        display: false,
                        position: 'right'
                    },
                    maintainAspectRatio: false,
                    responsive:false
                }}
             type='bar'/>
        </div>
    );
}
