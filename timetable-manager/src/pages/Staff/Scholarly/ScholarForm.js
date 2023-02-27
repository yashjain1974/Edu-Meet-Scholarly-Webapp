import React, { useState, useRef, useEffect } from "react";
import classes from './ScholarForm.module.css';
import PublicationsList from "./PublicationsList";
const ScholarForm = (props) => {
    const [isformValidity, setIsformValidity] = useState({
        title:true,
        category: true,
        file: true,
        Date:true,
        private: true
    });

    const [isError, setIsError] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmitted, setDidSubmitted] = useState(false);
  const [isdataSet, setIsDataSet] = useState(false);
  const [isform, setIsform] = useState(false);

  const reftitle = useRef();
  const refcategory = useRef();
  const refFile= useRef();
  const refDate = useRef();
  const refPrivate = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredTitleNumber = reftitle.current.value;
    const enteredCategory = refcategory.current.value;
    const enteredFile = refFile.current.value;
    const enteredDate = refDate.current.value;
    const enteredPrivate = refPrivate.current.value;
    

    const isValidEnteredTitle = !(enteredTitleNumber.trim().length === 11);
    const isValidenteredFile = !(enteredFile.trim() === "");
    const isValidenteredCategory = !(enteredCategory.trim() === "");
    const isValidenteredDate = !(enteredDate.trim() === "");
    const isValidenteredPrivate = !(enteredPrivate.trim() === "");
    
    setIsformValidity({
      title: isValidEnteredTitle,
      category: isValidenteredCategory,
      file: isValidenteredFile,
      Date: isValidenteredDate,
      private: isValidenteredPrivate,
      
    });
    const formIsValid =
      isValidEnteredTitle &&
      isValidenteredCategory &&
      isValidenteredFile &&
      isValidenteredDate &&
      isValidenteredPrivate;

    if (!formIsValid) {
      return;
    }
    submitFormHandler({
      title: enteredTitleNumber,
      category: enteredCategory,
      file: enteredFile,
      date: enteredDate,
      private: enteredPrivate,
      
    })

  }

  const submitFormHandler = async (userData) => {

    try {
      console.log(userData);
      setIsSubmitting(true);
      const response = await fetch(
        `http://localhost:8000/api/publications/`,
        {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Unable to Order...");
      }
      setIsSubmitting(false);
      setDidSubmitted(true);

    } catch (error) {
      setIsSubmitting(false);
      setIsError(error.message);
    }
  };
    return (
        <React.Fragment>


            <div className={classes.body}>

                <hr></hr>
                <center><h1>Add your Publications here</h1></center>

                <form onSubmit={submitHandler} >

                    <div class="row">
                        <div class="col-md">
                            <div className={classes.styledInput}>
                                Title:-
                                <input type="text" name="name" ref={reftitle} required />

                            </div>
                        </div>



                        {/* <input type="text" name="email" required hidden />
                        <input type="text" name="from_email" required hidden /> */}





                        <div class="col-md-6 ">
                            <div className={classes.styledInput}>
                                <div>Select Date:</div>
                                <label for="date"></label>
                                <input id="date" type="date" ref={refDate} name="date" />
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <div className={classes.styledInput} >
                                <div>Select Category:</div>
                                <label for="time"></label>
                                <select className={classes.selectTime} ref={refcategory} name="slotTime">
                                    <option>Science</option>
                                    <option>Maths</option>
                                    <option>Humanity</option>
                                    <option>Society</option>

                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div className={classes.styledInput}>
                                Upload Publication
                                <input type="file"
                                    id="file1"
                                    name="upload" ref={refFile} />
                            </div>
                        </div>
                        < div class="col ">
                            <div className={classes.styledInput}>
                                <div>Private?</div>
                                <label for="private"></label>
                                <input id="private" type="checkbox" ref={refPrivate} name="private" />
                            </div>
                        </div>
                        <div class="col-xs-12">
                            <input type="submit" className={classes.submitBtn} onClick={submitFormHandler} ></input>

                        </div>
                    </div>
                </form>
                <PublicationsList></PublicationsList>





            </div>

        </React.Fragment>
    )
}
export default ScholarForm;