import React,{useRef,useState} from "react";
import { useHistory } from "react-router-dom";
import classes from "./SlotBook.module.css"
import TeacherTimeTable from "./TeacherTimetable";
import emailjs from "emailjs-com"

const FIREBASE_DOMAIN = "https://userdetails-d84c5-default-rtdb.firebaseio.com/staff";
const SlotBook = (props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmitted, setDidSubmitted] = useState(false);
  const hist=useHistory();
    const date = new Date();
    const emailInputRef=useRef();
    const nameInputRef=useRef();
    const dateInputRef=useRef();
    const timeInputRef=useRef();
    const messageInputRef=useRef();
    const destinationInputRef=useRef();
    const enrollmentInputRef=useRef();




    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;
    let lastDate = `${year}-${month}-${day + 7}`;
    console.log(currentDate);

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
      const loginId=localStorage.getItem("teacherLoginId");
        
    const sendEmail = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const studentid=localStorage.getItem("studentId");
        
       
        const enteredMail=emailInputRef.current.value;
        const enteredName=nameInputRef.current.value;
       // const enteredDestination=destinationInputRef.current.value;
        const enteredDate=dateInputRef.current.value;
        const enteredTime=timeInputRef.current.value;
       
        const enteredMessage=messageInputRef.current.value;
        

        const data={
            id:studentid,
            email:enteredMail,
            name:enteredName,
            date:enteredDate,
            time:enteredTime,
            message:enteredMessage
            

        }
        



   
    
        emailjs.sendForm('service_r1hizja', 'template_odxz9eq', e.target, 'Py0QKxjxpCst7v9HX')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          let teacherId=localStorage.getItem("teacherId");
       
        
          const startingAddedId = enteredMail;
          let newId=startingAddedId.replaceAll(".","_");
          console.log(newId);
          submitOrderHandler(newId,data,teacherId);
          setIsSubmitting(false);
          setDidSubmitted(true);

          emailInputRef.current.value="";
          nameInputRef.current.value="";
         // const enteredDestination=destinationInputRef.current.value;
          dateInputRef.current.value="";
          timeInputRef.current.value="";
          enrollmentInputRef.current.value="";
          messageInputRef.current.value="";
      };
      const navigateTo=()=>{
        hist.replace(`/student/studentHome/${loginId}`)

      }

const teacherEmailId=localStorage.getItem("teacherEmail");
const name=localStorage.getItem("name");
const teacherloginId=localStorage.getItem("teacherLoginId");

    return (
        <React.Fragment>
            

           <div className={classes.body}>
                <TeacherTimeTable></TeacherTimeTable>
                <hr></hr>
                <center><h1>Book your Slot here </h1></center>

                {!didSubmitted &&  <form onSubmit={sendEmail} >

                <div class="row">
                    <div class="col-xs">
                        <div className={classes.styledInput}>
                            <input type="text" name="name" value={name} ref={nameInputRef} required hidden  />
                           
                        </div>
                    </div>
                    
                        
                            <input type="text" name="email" value={teacherEmailId} ref={emailInputRef} required hidden/>
                            <input type="text" name="from_email" value={teacherloginId} ref={emailInputRef} required hidden/>
                           
                        
                       
                 
                   
                    <div class="col-md-6 col-sm-12">
                        <div className={classes.styledInput}>
                            <div>Select Date:</div>
                            <label for="date"></label> 
                            <input id="date" type="date" name="date" ref={dateInputRef} min={currentDate} max={lastDate}  />
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div className={classes.styledInput} >
                            <div>Select time:</div>
                            <label for="time"></label>
                            <select className={classes.selectTime} ref={timeInputRef} name="slotTime">
                                <option>09:00-10:00</option>
                                <option>10:00-11:00</option>
                                <option>11:00-12:00</option>
                                <option>12:00-01:00</option>
                                <option>01:00-02:00</option>
                                <option>02:00-03:00</option>
                                <option>03:00-04:00</option>
                                <option>04:00-05:00</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-6">
                        <div className={classes.styledInput}>
                            <textarea className={classes.textarea} name="reason" ref={messageInputRef} required></textarea>
                            <label>Why You Want to meet ?</label>
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <input type="submit" className={classes.submitBtn} value="Book slot"></input>
                    
                    </div>
                </div>
                </form>
            }
                {didSubmitted && <div><p>Slot booking request sent successfully</p> <button className={classes.submitBtn} onClick={navigateTo}>Back to main page </button></div>}



            </div>
        </React.Fragment>
    )


}

export default SlotBook;