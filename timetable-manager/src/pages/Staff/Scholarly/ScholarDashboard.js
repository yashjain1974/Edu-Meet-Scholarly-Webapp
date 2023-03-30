import React, { useState, useEffect, useContext } from "react";
import PublicationsList from "./PublicationsList";
import { useMemo } from "react";
import "./Dashboard.css";
import BarChart from "./Charts/BarChart";
import { Line } from "react-chartjs-2";
import PieChart from "./Charts/PieChart";
import Rough from "./Rough";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import AuthContext from "../../../store/auth-context";
import ScholarDetailCard from "./ScholarDetailCard";
const ScholarDashboard = () => {
  const ctx = useContext(AuthContext);
  let name = localStorage.getItem("staffName");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let local = localStorage.getItem("scholarData");
  const myObject = JSON.parse(local);
  useEffect(() => {
    fetch(`http://localhost:8000/api/my_view/${name} jiit.ac.in/`)
      .then(response => response.json())
      .then(data => {
        let k;
        k = {
          Scholar_Id: data[1][0]["scholar_id"],
          url_img: data[1][0]["url_picture"],
          Name: data[1][0]["name"],
          Affiliation: data[1][0]["affiliation"],
          Interests: data[1][0]["interests"],
          Total_Citations: data[1][0]["total_citations"],
          Cites_per_year: data[1][0]["cites_per_year"]
        }
        setData(data);
        ctx.setScholarData(k);
        setIsLoading(false);
      });
  }, []);
  console.log(data);
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
    { myObject &&
       <ScholarDetailCard myObject={myObject}></ScholarDetailCard>
      }
      <h1 className="dashboard__title">My Dashboard</h1>
      <div className="chart">
        <PieChart></PieChart>
        {myObject && <BarChart bardata={myObject.Cites_per_year}></BarChart>}
      </div>



      {/* <Line data={chartData} /> */}
      <table className="dashboard__table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {/* {data.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.value}</td>
            </tr>
          ))} */}
        </tbody>
      </table>




    </div>
  );
};

export default ScholarDashboard;
