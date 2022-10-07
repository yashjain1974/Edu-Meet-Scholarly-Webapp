import React, { useEffect, useState, useCallback } from "react"
import { useParams,useHistory } from 'react-router-dom';
import { getSingleStudent } from "../../lib/api";
import Card from "../../components/UI/card";
import useHttp from "../../lib/use-http";
import DetailCard from "../../components/UI/DetailCard";
import StUserForm from "./StUserForm";
import StudentDetail from "./StudentDetail";
const FIREBASE_DOMAIN = "https://userdetails-d84c5-default-rtdb.firebaseio.com";


const StudentHome = () => {
  const hist=useHistory()
  const param = useParams();
  const [id, setId] = useState("");
  
  const userId = param.qid;

  // console.log(userId);
  const fetchData = useCallback(
    async function () {
      const response = await fetch(`${FIREBASE_DOMAIN}/student.json`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not fetch student.");
      }

      const transformedQuotes = [];

      for (const key in data) {
        const quoteObj = {
          id: key,
          ...data[key],
        };
        

        transformedQuotes.push(quoteObj);
      }

      for (const key in transformedQuotes) {
        if (transformedQuotes[key]["email"] === userId) {
          const sId = transformedQuotes[key]["id"];
          setId(sId);
        
          return;
        };
      }
    }, [userId]
  )
  fetchData();
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleStudent, true);


  useEffect(() => {
    sendRequest(id);

  }, [sendRequest, id]);
  const myTimeout = setTimeout(loadedQuote, 10000);
  console.log(loadedQuote);
  function myStopFunction() {
    clearTimeout(myTimeout);
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

  if (!loadedQuote.email) {
    return <p> <Card title="Fetching"></Card></p>;
  }
  // useEffect(()=>{
  //   const user=loadedQuote["user"];

  //   console.log(user);
  //   setData({
  //     name:user,
  //     //email:email
  //   })
  // },[])

  myStopFunction();
  console.log(id);

  const k = loadedQuote.user;
  const l = loadedQuote.email


const navigateTo=()=>{
hist.push(`/student/profile/${userId}`)
}

  return (
    <React.Fragment>
      <Card
        title={k}
        images="https://pngimg.com/uploads/student/student_PNG62543.png"

        alt="batman"
        name={l}
      />
      <DetailCard id={id}>

       
        <StudentDetail id={id}></StudentDetail>
        <button onClick={navigateTo}>Update Details</button>
      </DetailCard>



    </React.Fragment>
  )

}
export default StudentHome;