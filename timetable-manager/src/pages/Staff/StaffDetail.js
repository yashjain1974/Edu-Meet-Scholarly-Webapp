import React,{useEffect} from "react"

import { getDetailsStudent, getSingleStaff } from "../../lib/api";
import useHttp from "../../lib/use-http";
import Card from "../../components/UI/card";
import Section from "../../components/UI/Section";



const StaffDetail=(props)=>{
    const {
        sendRequest,
        status,
        data: loadedQuote,
        error,
      } = useHttp(getSingleStaff, true);
      useEffect(() => {
        sendRequest(props.id);
    
      }, [sendRequest,props.id]);
    //   const {contact:contact,
    //     academics:academics,
    //     program:program,
    //     branch:branch,
    //     batch:batch,
    //     semester:semester}=loadedQuote;
    let contact;
    let academic;
    let program;
    let branch;
    let batch;
    
    console.log(loadedQuote);

      for(const key in loadedQuote){
      if(key==="contact"){
        contact=loadedQuote[key];
      }
      else if(key==="Dept"){
        academic=loadedQuote[key];
      }
      else if(key==="grade"){
        program=loadedQuote[key];
      }
      else if(key==="office"){
        branch=loadedQuote[key];
      }
      else if(key==="room"){
        batch=loadedQuote[key];
      }
     

       console.log(batch)
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
    
      if (!loadedQuote.contact) {
        return <p> <Card title="Details is not filled "></Card></p>;
      }


//     fetch('https://userdetails-d84c5-default-rtdb.firebaseio.com/student/-ND-XSmAIC9yxYRWabk3.json', {
//   method: 'PATCH',
//   body: JSON.stringify({
//     title: 'f',
//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));
    return(
        <React.Fragment>
          <Section>
            <h1>Details:</h1>
            <p>  Contact:{contact};</p><hr></hr>
                
            <p> Academics:{academic}</p><hr></hr>
            <p> Program:{program}</p><hr></hr>
            <p> Branch:{branch}</p><hr></hr>
            <p> Batch:{batch}</p><hr></hr>
          
           

            </Section>

          

        </React.Fragment>

    )
}

export default StaffDetail;