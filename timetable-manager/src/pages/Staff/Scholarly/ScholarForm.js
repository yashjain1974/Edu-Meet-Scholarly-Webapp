import React, { useState, useRef, useEffect } from "react";
import classes from './ScholarForm.module.css';
import PublicationsList from "./PublicationsList";
import { useHistory } from "react-router-dom";
import axios from "axios";
const ScholarForm = (props) => {
  let history = useHistory();


    const [file, setFile] = useState(null)
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [priv, setPrivate] = useState(false)
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(null)
    const submitFormHandler = async (event) => {
      event.preventDefault();
      let formField = new FormData()
      formField.append('title',title)
      formField.append('category',category)
      formField.append('date',date)
      formField.append('private',priv)
      

      // if(file !== null) {
      //   formField.append('file', file)
      // }
      console.log(formField)

      await axios({
        method: 'post',
        url:'http://localhost:8000/api/publications/',
        data: formField
      }).then(response=>{
        console.log(response.data);
        // history.push('/')
      })
  }
  
  return (
    <React.Fragment>


      <div className={classes.body}>

        <hr></hr>
        

        
        <h1>Add your publications here:-</h1>
          <div class="group-section-one">
            <label for="name" className={classes.name_label} >Title</label><br />
            <input type="text" id="title" name="title" placeholder="Enter your title"  
            value={title}
              onChange={(e) => setTitle(e.target.value)} required /><br />



            
            <div className={classes.selection_container}>
              <p>Which topic are you related with?</p>
              <select className={classes.dropdown} value={category}
              onChange={(e) => setCategory(e.target.value)}>
                <option>Computer Science</option>
                <option>Machine Learning</option>
                <option>Software Engineering</option>
                <option>Electrical Science</option>
              </select>
            </div>
            <div className={classes.selection_container}>
              <label for="number" id="number-label">Upload Your Document</label><br/>
                <input type="file" id="file"
              onChange={(e) => setFile(e.target.files[0])}/>
                </div>
            </div>
            <div className={classes.selection_container}>

              <label for="Date">Select Date : </label>
              <input type="date" id="date" name="date" value={date}
              onChange={(e) => setDate(e.target.value)}/>
            </div>


            <div className={classes.textarea_container}>
              <p>Details About the Document : </p>
              <textarea placeholder="Enter your comment here..." className={classes.textarea_box} value={description}
              onChange={(e) => setDescription(e.target.value)}>
              </textarea>
            </div>
            <div className={classes.selection_container}>
              <p>How do you want to show your document :</p>
              <div className={classes.radio}> </div>
               Private:    <input type="checkbox" value={priv}
              onChange={(e) => setPrivate(e.target.value)} checked></input>
            </div>
            <div className={classes.button_container}>
              <button className={classes.submit} onClick={submitFormHandler}>Upload</button>
            </div>
       
       <div><h1>    </h1></div>




      </div>

    </React.Fragment>
  )
}
export default ScholarForm;