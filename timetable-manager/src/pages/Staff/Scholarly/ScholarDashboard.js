import React, { useState, useEffect } from "react";
import PublicationsList from "./PublicationsList";
import "./Dashboard.css";
import BarChart from "./Charts/BarChart";
import { Line } from "react-chartjs-2";
import PieChart from "./Charts/PieChart";
import Rough from "./Rough";

const ScholarDashboard = () => {
  const [data, setData] = useState([
    { id: 1, title: "Dashboard Item 1", value: 10 },
    { id: 2, title: "Dashboard Item 2", value: 20 },
    { id: 3, title: "Dashboard Item 3", value: 30 },
    { id: 4, title: "Dashboard Item 4", value: 40 },
  ]);
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    setChartData({
      labels: 1,
      datasets: [
        {
          label: "Value",
          data: 10,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",

          ],
        },
      ],
    });
  }, []);

  return (
    <div className="dashboard">
      
      <div className="chart">
      <PieChart></PieChart>
        <BarChart></BarChart>
</div>


      <h1 className="dashboard__title">My Dashboard</h1>
      {/* <Line data={chartData} /> */}
      <table className="dashboard__table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>




    </div>
  );
};

export default ScholarDashboard;
