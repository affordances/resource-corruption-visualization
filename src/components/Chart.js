import React from "react"
import { Line } from 'react-chartjs-2';
import years from '../reference/years';
import '../App.css';

const Chart = props => {
  const data = {
    labels: years,
    datasets: [
      {
        label: 'Oil export value',
        yAxisID: 'A',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        spanGaps: false,
        data: props.oilData,
      },
      {
        label: 'Corruption perception (higher is better)',
        yAxisID: 'B',
        fill: false,
        lineTension: 0.1,
        borderColor: 'red',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'red',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'white',
        pointHoverBorderColor: 'red',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        spanGaps: false,
        data: props.corruptionData
      },
    ]
  };

  return (
    <div className="chart-container">
      <Line
        data={data}
        legend={{
          position: 'bottom'
        }}
        options={{
          maintainAspectRatio: false,
          title: {
            display: true,
            text: props.countryName,
            fontSize: 20,
          },
          scales: {
            yAxes: [
            {
              id: 'A',
              type: 'linear',
              position: 'left',
            },
            {
              id: 'B',
              type: 'linear',
              position: 'right',
              ticks: {
                max: 100,
                min: 0
              }
            }]
          }
        }}
      />
    </div>
  );
}

export default Chart;
