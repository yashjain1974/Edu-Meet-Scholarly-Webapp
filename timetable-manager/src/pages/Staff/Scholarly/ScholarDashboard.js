import React, { useState, useEffect, useContext } from "react";
import PublicationsList from "./PublicationsList";
import { useMemo } from "react";
import CreatePdf from "../../Admin/AdminScholar/CreatePdf";
import classes from './ScholarDashboard.module.css'
import BarChart from "./Charts/BarChart";
import { Line } from "react-chartjs-2";
import PieChart from "./Charts/PieChart";
import Rough from "./Rough";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import AuthContext from "../../../store/auth-context";
import ScholarDetailCard from "./ScholarDetailCard";
import { FaExternalLinkAlt } from 'react-icons/fa';
import { VscReferences } from 'react-icons/vsc';
const ScholarDashboard = () => {
  const ctx = useContext(AuthContext);
  let name = localStorage.getItem("staffName");
  const [data, setData] = useState(null);
  const [pub_Yr, setPubYr] = useState([]);
  const [tabData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [citationdata, setCitationData] = useState([]);
  let local = localStorage.getItem("scholarData");
  const [rank,setRank]=useState()
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
        const array = [];
        for (let key in data[0]) {
          array.push(data[0][key].pub_yr);

        }
        const tableData = data[0].map((item, index) => {
          return [
            index+1,

            item['title'],
            item['pub_yr'],
            item['number_citations'],

          ];
        });

        setTableData(tableData);
        setPubYr(array);
        setData(data);
        ctx.setScholarData(k);
        setIsLoading(false);
      });
  }, []);
  console.log(data);
  
 

  const counts = pub_Yr.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
  console.log(typeof counts); // {1: 2, 2: 1, 3: 1}

  const myObj = Object.entries(counts);



  const header = ['S.no','title', 'pub_yr', 'number_citations']
  console.log(tabData)
  useEffect(() => {

    fetch('/citation.json')
      .then(response => response.json())
      .then(result => setCitationData(result))
      .catch(error => console.log(error))
  }, [])
  let rnk;
  if(myObject){
  const searchName = myObject.Name;
  
const filteredData = Object.values(citationdata).find(obj => obj.name === searchName);

if (filteredData) {
  const citationRank = Object.values(citationdata)
    .sort((a, b) => b.citation - a.citation)
    .findIndex(obj => obj.name === searchName) + 1;
  console.log(`${searchName} has a citation ranking of ${citationRank}`);
  rnk=citationRank

} else {
  console.log(`${searchName} not found in the data`);
}
  }
  
  
  return (
    <div className={classes.dashboard}>
      <h1 className={classes.dashboard__title}>My Dashboard</h1>
      {myObject &&<div className={classes.dashboard__title}>Your Ranking in Jaypee according to number of citation is: {rnk}</div>}
      {!myObject && <LoadingSpinner></LoadingSpinner>}
      {myObject &&
        <div className={classes.chart}>

          <ScholarDetailCard myObject={myObject} rank={rnk}></ScholarDetailCard>
          <BarChart bardata={myObject.Cites_per_year} title="Citation" label="month" color="blue"></BarChart>
          


        </div>
      }

      <div className={classes.chart}>
        <PieChart></PieChart>
        <BarChart bardata={counts} title="Counts" label="month" color="red"></BarChart>
        {!myObject && <div><LoadingSpinner></LoadingSpinner> <p>Extracting data</p></div>}

        {myObject && <div>  <div>
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



      {data && <CreatePdf tableData={tabData} head={header}></CreatePdf>}
      

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
              <th>Pub_URL</th>
              <th>Cited_URL</th>


            </tr>
          </thead>
          <tbody>
            {data && data[0].map((row, index) => (
              <tr>
                <td>{index + 1}</td>

                <td>{row.title}</td>
                <td>{row.pub_yr}</td>
                <td>{row.number_citations}</td>
                <td><a href={`https://scholar.google.com/citations?view_op=view_citation&hl=en&user=${myObject.Scholar_Id}&citation_for_view=${row.pub_id}`} target="_blank"><FaExternalLinkAlt size="25px"></FaExternalLinkAlt></a></td>
                {row.citedby_url!='N/A' && <td><a href={row.citedby_url} target="_blank"><VscReferences size="25px"></VscReferences></a></td>}
                {row.citedby_url=='N/A' && <td>N/A</td>}
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
