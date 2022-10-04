import React, { useState, useRef } from "react"
import classes from './StUserForm.module.css'

const StUserForm = (props) => {
  const [isformValidity, setIsformValidity] = useState({
    contact: true,
    academic: true,
    program: true,
    branch: true,
    batch: true,
    semester: true,
  });
  const [isError, setIsError] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmitted, setDidSubmitted] = useState(false);

  const refContact = useRef();
  const refAcademic = useRef();
  const refProgram = useRef();
  const refBranch = useRef();
  const refBatch = useRef();
  const refCurrentSem = useRef();

  

  

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredContactNumber = refContact.current.value;
  const enteredAcademic = refAcademic.current.value;
  const enteredProgram = refProgram.current.value;
  const enteredBranch = refBranch.current.value;
  const enteredBatch = refBatch.current.value;
  const enteredCurrentSem = refCurrentSem.current.value;

  const isValidEnteredContact = !(enteredContactNumber.trim().length === 11);
  const isValidEnteredProgram = !(enteredProgram.trim() === "");
  const isValidEnteredAcademic = !(enteredAcademic.trim() === "");
  const isValidEnteredBranch = !(enteredBranch.trim() === "");
  const isValidEnteredBatch = !(enteredBatch.trim() === "");
  const isValidEnteredCurrentSem = !(enteredCurrentSem.trim() === "");
  setIsformValidity({
    contact: isValidEnteredContact,
    academic: isValidEnteredAcademic,
    program: isValidEnteredProgram,
    branch: isValidEnteredBranch,
    batch: isValidEnteredBatch,
    semester: isValidEnteredCurrentSem,
  });
  const formIsValid =
    isValidEnteredContact &&
    isValidEnteredAcademic &&
    isValidEnteredProgram &&
    isValidEnteredBranch &&
    isValidEnteredBatch &&
    isValidEnteredCurrentSem;

  if (!formIsValid) {
    return;
  }
  submitOrderHandler({
    contact:enteredContactNumber,
    academics:enteredAcademic,
    program:enteredProgram,
    branch:enteredBranch,
    batch:enteredBatch,
    semester:enteredCurrentSem
  })

  }
  const submitOrderHandler = async (userData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(
        `https://userdetails-d84c5-default-rtdb.firebaseio.com/student/${props.id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify(userData),
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
      
      <div className={classes.container}>
        <form className={classes.contact} onSubmit={submitHandler} >
          <h3>Details</h3>
          <h4>Please fill your details here!!</h4>
          {!isSubmitting && <div>
          <div
          className={`${classes.control} ${
            isformValidity.contact ? "" : classes.invalid
          }`}
        ></div>
          <fieldset>
            <input placeholder="Contact Number"  type="text" ref={refContact} required />
          
          </fieldset>
        
          <fieldset>
            <input placeholder="Academic Year" ref={refAcademic} type="text" required />
          </fieldset>

          <fieldset>
            <input placeholder="Program " ref={refProgram} type="text" required  />
          </fieldset>

          <fieldset>
            <input placeholder="Branch" ref={refBranch} type="text" required />
          </fieldset>
          <fieldset>
            <input placeholder="Batch" type="text" ref={refBatch} required />
          </fieldset>
          <fieldset>
            <input placeholder="Current Semester" type="text" ref={refCurrentSem} required />
          </fieldset>
          


          <fieldset>
            <button name="submit" type="submit" data-submit="...Sending" onClick={submitOrderHandler}>Submit</button>
          </fieldset>
</div>}
          
        </form>


      </div>

    </React.Fragment>
  )

}
export default StUserForm