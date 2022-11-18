import React,{useEffect} from "react";
import useHttp from "../../lib/use-http";
import { getSingleStudent } from "../../lib/api";
import Card from "../../components/UI/card";

const StudentDModal=(props)=>{
    const {
        sendRequest,
        status,
        data: loadedQuote,
        error,
      } = useHttp(getSingleStudent, true);
      useEffect(() => {
        sendRequest(props.id);
    
      }, [sendRequest,props.id]);
      let name;
      let contact;
  let academic;
  let program;
  let branch;
  let batch;
  let semester;
    
    console.log(loadedQuote);
    for (const key in loadedQuote) {
        if (key === "contact") {
          contact = loadedQuote[key];
        }
        else if (key === "academics") {
          academic = loadedQuote[key];
        }
        else if (key === "user") {
            name = loadedQuote[key];
          }
        else if (key === "program") {
          program = loadedQuote[key];
        }
        else if (key === "branch") {
          branch = loadedQuote[key];
        }
        else if (key === "batch") {
          batch = loadedQuote[key];
        }
        else if (key === "semester") {
          semester = loadedQuote[key];
        }
    
    
      }
      if (status === "pending") {
        return (
          <div className="centered">
            <Card title="waiting"></Card>
          </div>
        );
      }
      if (error) {
        return <p className="centered focused"> <Card title={error}></Card></p>;
      }
    
      if (!loadedQuote.academics) {
        return <p> <Card title="Details are not filled ">
          
          </Card></p>;
      }
    
    return(
    <React.Fragment>
        {/* {loadedQuote.map((item) => (
            <p>{item.name}</p>


        )
        )

} */}
           <marquee > <h1>STUDENT DETAIL</h1></marquee>
          <p>CONTACT NUMBER : {contact} </p> <hr></hr>
          <p>ACADEMICS : {academic} </p><hr></hr>
          <p>PROGRAM : {program}</p><hr></hr>
          <p>BRANCH : {branch} </p><hr></hr>
          <p>BATCH : {batch} </p><hr></hr>
          <p>SEMESTER : {semester} </p><hr></hr>

    </React.Fragment>
        )

}

export default StudentDModal;