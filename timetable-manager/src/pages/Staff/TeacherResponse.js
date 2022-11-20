import React, { useState,useRef,useEffect,useCallback } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import classes from './TeacherResponse.module.css'
import { Route } from "react-router-dom/cjs/react-router-dom";

import emailjs from "emailjs-com"

const FIREBASE_DOMAIN = "https://userdetails-d84c5-default-rtdb.firebaseio.com/student";
const TeacherResponse = (props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const hist=useHistory();
    const [didSubmitted, setDidSubmitted] = useState(false);
  
    const loadData=props.data;
    const RespnseRef1=useRef();
    const RespnseRef2=useRef();
    const from_mailRef=useRef();
    const messageRef=useRef();
  
    
    const submitOrderHandler = async (day,userData,id) => {
        
       
        try {
          //`
          const response = await fetch(
            `${FIREBASE_DOMAIN}/${id}/notification/${day}.json`,
            {
              method: "PATCH",
              body: JSON.stringify(userData),
            }
          );
          if (!response.ok) {
            throw new Error("Unable to Order...");
          }
         
          
      
        } catch (error) {
            setDidSubmitted(false);
          
        }
      };
    const sendEmail = (e) => { 
        setIsSubmitting(true);
        const enteredEmail=from_mailRef.current.value;
        const enteredMessage=messageRef.current.value;
        const enteredResponse = RespnseRef1.current.checked ? RespnseRef1.current.value : RespnseRef2.current.value
    
        e.preventDefault();
        console.log("clicked");
        // emailjs.sendForm('service_r1hizja', 'template_rh6ia25', e.target, 'Py0QKxjxpCst7v9HX')
        //     .then((result) => {
        //         console.log(result.text);
        //         setIsSubmitting(false);
        //         setDidSubmitted(true);

        //     }, (error) => {
        //         console.log(error.text);
        //         setDidSubmitted(false)


        //     });
            const data={
            from_mail:enteredEmail,
            response:enteredResponse,
            time:loadData.time,
            date:loadData.date,
            message:enteredMessage,
            


            }
            const startingAddedId = from_mail;
            let newId=startingAddedId.replaceAll(".","_");
            console.log(newId);
            submitOrderHandler(newId,data,loadData.id);
    };
   
    const from_mail=localStorage.getItem('loginEmail');
    const navigateTo=()=>{
        hist.replace(`/staff/timeTable/${from_mail}`)
        
        

    }
    let detail=`Details:- \n Date:${loadData.date} \n, Time:${loadData.time} `
   
    return (
        <React.Fragment>
            <body className={classes.body}>
                <div className={classes.detail}>
                    <h1>Detail:-</h1>
                    <p>Name: {loadData.name}</p>
                    <p>Email: {loadData.email}</p>
                    <p>Date: {loadData.date}</p>
                    <p>Time: {loadData.time}</p>
                    <p>Reason: {loadData.message}</p>
                </div>
                {!didSubmitted && <form className={classes.form} onSubmit={sendEmail} >
                    <h2><u>Response Form</u></h2>
                    {/* <input type="text" name="from_mail" value={userId} hidden/>
      <input type="text" name="reply_to" value={userId} hidden/> */}
                <input className={classes.eml} type="email" required  name="from_name" value={from_mail} ref={from_mailRef} hidden />
                <input className={classes.eml} type="email" required  name="email" value={loadData.email}  hidden />
                <input className={classes.eml} type="text" required  name="purpose" value={`related to yout Slot booking request ${detail}  `} hidden />
    
                <div className={classes.check}>
                   Accept: <input type="radio" name="response" id="round-checkbox" value="Booked" ref={RespnseRef1} required></input>
                   Decline:<input type="radio" name="response" id="round-checkbox" value="Not booked" ref={RespnseRef2} required></input>
                    </div>
                    <textarea
                        rows="6"
                        
                        placeholder="Message"
                        
                        name="message"
                        ref={messageRef}
                    ></textarea>
                     <button className={classes.button} type="submit">Submit Response</button>
                    </form>
}
                {didSubmitted && <div><p>Message sent successfully</p> <button className={classes.button}  onClick={navigateTo}>Go to TimeTable</button></div>}
            </body>
 </React.Fragment>
    )

}

export default TeacherResponse;