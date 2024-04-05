import React from "react";
import { Line } from "react-chartjs-2";

const DisplayChart = ({ data, title }) => {
  const chartData = {
    labels: data.map(entry => entry.date),
    datasets: [
      {
        label: "Price",
        data: data.map(entry => entry.price),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.4)",
        fill: false
      }
    ]
  };

  const options = {
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'day'
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  return (
    <div> 
      Track Price for: {title} 
      <div className="size-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  ); 
};

export default DisplayChart;
