import React, { useEffect, useState, useCallback } from "react"
import { useId } from "react";
import { useParams } from 'react-router-dom';
import { getSingleStudent } from "../../lib/api";
import { getAllStudent } from "../../lib/api";
import useHttp from "../../lib/use-http";
const FIREBASE_DOMAIN = "https://userdetails-d84c5-default-rtdb.firebaseio.com";

const StudentHome = () => {
  const param = useParams();
  const [id, setId] = useState("");
  const userId = param.qid;
  const [data, setData] = useState({});
  // console.log(userId);
  const fetchData = useCallback(
    async function () {
      const response = await fetch(`${FIREBASE_DOMAIN}/student.json`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not fetch staff.");
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
    }, [useId]
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

  function myStopFunction() {
    clearTimeout(myTimeout);
  }

  if (status === "pending") {
    return (
      <div className="centered">
        Waiting...
      </div>
    );
  }
  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (!loadedQuote.email) {
    return <p>No Quote found</p>;
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

  const k = loadedQuote.user;
  const l = loadedQuote.email




  return (
    <React.Fragment>
      <div>
        Welcome {k}
        <hr></hr>
        Email:{<p>{l}</p>}
      </div>
    </React.Fragment>
  )

}
export default StudentHome;