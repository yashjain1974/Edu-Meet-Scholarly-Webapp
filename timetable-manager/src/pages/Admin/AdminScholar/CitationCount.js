import React from "react"
import { useEffect, useState } from "react";
import Papa from 'papaparse';
import { saveAs } from 'file-saver';




const CitaionCount = (props) => {
  const controller = new AbortController();
  const signal = controller.signal;
  setTimeout(() => {
    controller.abort();
    console.error('Fetch request timed out');

    // display error message to user
  }, 5000); // timeout after 5 seconds
  const [authCite, setAuthCite] = useState({});
  let cite = {}

  // props.authh.length
  for (let i = 0; i < props.authh.length; i++) {
    fetch(`http://localhost:8000/api/my_view/${props.authh[i]} jiit.ac.in/`)
      .then(response => response.json())
      .then(data => {

        cite[i] = {
          "name": data[1][0]["name"],
          "citation": data[1][0]["total_citations"],
          "total_pub":data[0].length,
          "cites_per_year":data[1][0]["cites_per_year"],
          'url_picture':data[1][0]["url_picture"]
        }

        console.log(data[1][0]["total_citations"]);
        console.log(cite)
        setAuthCite(cite);






      }).catch(error => {
        console.error('Error fetching data:', error);



      });




  }
  console.log(authCite);




  console.log("Hello");


  return (
    <React.Fragment>





    </React.Fragment>
  )
}
export default CitaionCount;