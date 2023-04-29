import React,{useState,useEffect} from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import ScholarCard from "./ScholarCard";
const ScholarDetail=(props)=>{
    const [citationdata, setCitationData] = useState([]);
    useEffect(() => {

        fetch('/citation.json')
            .then(response => response.json())
            .then(result => setCitationData(result))
            .catch(error => console.log(error))
    }, [])

    
    
    const getDetailsByName = (name) => {
        const person = Object.values(citationdata).find((p) => p.name.toLowerCase() === name.toLowerCase());
        if (person) {
          return person;
        } else {
          return null;
        }
      }
      const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Convert the data object to an array for easier handling in the table component
    const newData = Object.values(citationdata);
    setTableData(newData);
  }, []);
  console.log(tableData);
  const personDetails = getDetailsByName("Dr. Sandeep Kumar  Singh");
  if(personDetails){
    console.log(personDetails["citation"]);
  }
  
  return (
    <React.Fragment>
      {personDetails&&<ScholarCard author={personDetails}></ScholarCard>}
      {personDetails&& personDetails["citation"]}

    </React.Fragment>
   
  );

}
export default ScholarDetail;