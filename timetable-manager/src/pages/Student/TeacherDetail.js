import React,{useEffect} from "react";
import useHttp from "../../lib/use-http";
import { getSingleStaff } from "../../lib/api";
import Card from "../../components/UI/card";
const TeacherDetail=(props)=>{
    const {
        sendRequest,
        status,
        data: loadedQuote,
        error,
      } = useHttp(getSingleStaff, true);
      useEffect(() => {
        sendRequest(props.id);
    
      }, [sendRequest,props.id]);
      let name;
      let contact;
      let dept;
      let grade;
      let office;
      let room_no;
    
    console.log(loadedQuote);
    for(const key in loadedQuote){
        if(key==="contact"){
          contact=loadedQuote[key];
        }
        else if(key==="Dept"){
          dept=loadedQuote[key];
        }
        else if(key==="user"){
            name=loadedQuote[key];
          }
        else if(key==="grade"){
          grade=loadedQuote[key];
        }
        else if(key==="office"){
          office=loadedQuote[key];
        }
        else if(key==="room"){
          room_no=loadedQuote[key];
        }
       
  
         
        }
        if (status === "pending") {
          return (
            <div className="centered">
              Loading...
            </div>
          );
        }
        if (error) {
          return <p className="centered focused"> <Card title={error}></Card></p>;
        }
      
    
    return(
    <React.Fragment>
        {/* {loadedQuote.map((item) => (
            <p>{item.name}</p>


        )
        )

} */}
<marquee > <h1>{name}'s Detail</h1></marquee>
            <p>NAME : {name} </p> <hr></hr>
          <p>CONTACT NUMBER : {contact} </p> <hr></hr>
          
          <p>DEPARTMENT : {dept} </p><hr></hr>
          <p>GRADE : {grade}</p><hr></hr>
          <p>OFFICE : {office} </p><hr></hr>
          <p>ROOM : {room_no} </p><hr></hr>

    </React.Fragment>
        )

}

export default TeacherDetail;