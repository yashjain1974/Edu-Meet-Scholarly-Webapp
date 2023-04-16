import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import './table.css'
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import CitaionCount from "./CitationCount";
import data from './citation.json';
import CitaionAuthor from "./CitationAuthor";
import DataList from "../../../components/Layout/DataList";
// Allowed extensions for input file
const allowedExtensions = ["csv"];

const ScholarData = () => {

  // This state will store the parsed data
  const [data, setData] = useState([]);
  const [cite, setCite] = useState(null);
  const [searchh, setSearch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [citationdata, setCitationData] = useState([]);







  // It state will contain the error when
  // correct file extension is not used
  const [error, setError] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    async function getData() {
      const response = await fetch('/jaypeeTeachers.csv');
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);
      const { data } = Papa.parse(csv, { header: true });
      setData(data);
    }
    getData();
  }, []);
  console.log(data);
  let author = []
  for (let key in data) {
    author.push(data[key]["Faculty"])
  }
  console.log(author)
  let newCite = []
  const extractCitation = () => {
    setIsClicked(true);
  }


  useEffect(() => {
    fetch('/citation.json')
      .then(response => response.json())
      .then(data => {
        setCitationData(data)
        console.log(typeof data);
      })
      .catch(error => console.error(error));
  }, []);
  const keys = Object.keys(citationdata);
  console.log(keys)



  var length = Object.keys(data).length;
  // for (let i = 0; i < length; i++) {
  //   if (data in keys) {
  //    
  //   }
  //   else {
  //    
  //   }

  // }
  for (let key in data) {
    if (data.hasOwnProperty(key) && citationdata.hasOwnProperty(key)) {
      console.log(key + ' is present in both objects');
      data[key]["Citation"] = citationdata[key]["citation"];
    } else {
      console.log(key + ' is not present in obj2');
      data[key]["Citation"] = "Nan";
    }
  }

  console.log(data)



  return (
    <div>

      {/* <button onClick={extractCitation}>Extract Citation</button> */}
      <div>

      </div>
      {isLoading && <LoadingSpinner></LoadingSpinner>}
    

      <DataList></DataList>

      {/* <table className="styled-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Gmail</th>
            <th>Designation</th>
            <th>Interest Area</th>
            <th>Citation</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{row.Faculty}</td>
              <td>{row.Email}</td>
              <td>{row.Profile}</td>
              <td>{row.InterestArea}</td>
              <td>{row.Citation}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

    </div>

  );
};

export default ScholarData;