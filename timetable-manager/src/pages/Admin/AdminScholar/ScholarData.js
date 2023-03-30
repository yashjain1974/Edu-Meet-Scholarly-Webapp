import React, { useState,useEffect } from "react";
import Papa from "papaparse";
import './table.css'
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import CitaionCount from "./CitationCount";
// Allowed extensions for input file
const allowedExtensions = ["csv"];
 
const ScholarData = () => {
     
    // This state will store the parsed data
    const [data, setData] = useState([]);
    const [cite, setCite] = useState(null);
    const [searchh, setSearch] = useState(null);
    const [isLoading,setIsLoading]=useState(false);
    useEffect(() => {
      console.log(searchh);
      fetch(`http://localhost:8000/api/my_view/${searchh} jiit.ac.in/`)
          .then(response => response.json())
          .then(data => {
              setCite(data);
              setIsLoading(false);
          });
  }, [searchh]);
    // It state will contain the error when
    // correct file extension is not used
    const [error, setError] = useState("");
    const[isClicked,setIsClicked]=useState(false);
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
    let author=[]
    for (let key in data){
      author.push(data[key]["Faculty"])
    }
   console.log(author)
    let newCite=[]
    const extractCitation=()=>{
      setIsClicked(true);
}
   
    console.log(newCite);
      
    return (
        <div>
          <button onClick={extractCitation}>Extract Citation</button>
          {isLoading && <LoadingSpinner></LoadingSpinner>}
          {isClicked &&<CitaionCount authh={author}></CitaionCount>}
           
            <table className="styled-table">
      <thead>
        <tr>
          <th>Index</th>
          <th>Name</th>
          <th>Gmail</th>
          <th>Designation</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{index}</td>
            <td>{row.Faculty}</td>
            <td>{row.Email}</td>
            <td>{row.Profile}</td>
          </tr>
        ))}
      </tbody>
    </table>
 
    </div>
       
    );
};
 
export default ScholarData;