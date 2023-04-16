import React, { useState, useEffect, useContext } from "react";
import PublicationsList from "./PublicationsList";
import { useMemo } from "react";
import classes from './ScholarDashboard.module.css'
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
  const [pub_Yr, setPubYr] = useState([]);
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
      const array=[];
      for (let key in data[0]){
        array.push(data[0][key].pub_yr);

      }
      setPubYr(array);
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

  const counts = pub_Yr.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
console.log(typeof counts); // {1: 2, 2: 1, 3: 1}

  const myObj= Object.entries(counts);
 


  return (
    <div className={classes.dashboard}>
       <h1 className={classes.dashboard__title}>My Dashboard</h1>
      {!myObject && <LoadingSpinner></LoadingSpinner>}
    { myObject &&
      <div className={classes.chart}>
     
       <ScholarDetailCard myObject={myObject}></ScholarDetailCard>
       <BarChart bardata={myObject.Cites_per_year} title="Citation" label="month" color="blue"></BarChart>
       
       
       </div>
      }
     
      <div className={classes.chart}>
         <PieChart></PieChart>
         <BarChart bardata={counts} title="Counts" label="month" color="red"></BarChart>
      {!myObject && <div><LoadingSpinner></LoadingSpinner> <p>Extracting data</p></div>}
      
        {myObject &&  <div>  <div>
      <h2>Year Wise Display:</h2>
      <ul>
        {myObj.map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </div> </div>}
      </div>



      {/* <Line data={chartData} /> */}
      {!data && <LoadingSpinner></LoadingSpinner>}
      
                <div>
                
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Title</th>
                            <th>Year</th>
                            <th>Citation Count</th>
                            
                            
                        </tr>
                    </thead>
                    <tbody>
                        {data && data[0].map((row, index) => (
                            <tr>
                                <td>{index+1}</td>

                                <td>{row.title}</td>
                                <td>{row.pub_yr}</td>
                                <td>{row.number_citations}</td>
                                {/* <td>{data[0].email}</td>
                            <td>{data[0].citedby}</td> */}

                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            



    </div>
  );
};

export default ScholarDashboard;
