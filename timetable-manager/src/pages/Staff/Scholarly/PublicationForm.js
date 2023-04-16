import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import classes from './ScholarForm.module.css';
import { Switch } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Modal from '../../../components/UI/Modal';
const PublicationForm = () => {

    let history = useHistory();


    const [image, setImage] = useState(null)
    const [name, setName] = useState(null)
    const [category, setCategory] = useState(null)
    const [subject, setSubject] = useState(null)
    const [date, setDate] = useState(null)
    const [description, setDescription] = useState(null)
    const [priv, setPrivate] = useState(false)
    const [isSubmitted,setIsSubmitted]=useState(false);
    const [isClicked,setisClicked]=useState(false);

    const isClickHandler=()=>{
      setisClicked(true);
  }
    const HideHandler=()=>{
      setisClicked(false);
  }
  
  let author_name = localStorage.getItem("staffName");
    const addNewpublication = async () => {
        let formField = new FormData()
        formField.append('title',name)
        formField.append('pub_author',author_name)
        formField.append('category',category)
        formField.append('date',date)
        formField.append('description',description)
        formField.append('private',priv)
        formField.append('subject',subject)
        

        if(image !== null) {
          formField.append('file', image)
        }
        console.log(formField)

        await axios({
          method: 'post',
          url:'http://localhost:8000/api/publications/',
          data: formField
        }).then(response=>{
          console.log(response.data);
          setIsSubmitted(true);
          setisClicked(true);
          // history.push('/')
          window.location.reload(false);
        })






    }
   console.log(priv);
    return (
        <div className="container">
            <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add Publication</h2>
        
        <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Title"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        <div className="form-group">
        <label>File</label>
             <input type="file" className="form-control" onChange={(e)=>setImage(e.target.files[0])}/>
          </div>

          
         
          {/* <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your E-mail Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div> */}
           <div className={classes.selection_container}>
              <p>Which Type of publication you provide?</p>
              <select className={classes.dropdown} value={category}
              onChange={(e) => setCategory(e.target.value)}>
                <option value="Research paper">Research paper</option>
                <option value="Book">Book</option>
                <option value="Article">Article</option>
                <option value="Blog">Blog</option>
                <option value="Other">Other</option>
              </select>
            </div>
          <div className={classes.selection_container}>
              <p>Which topic are this publication related with?</p>
              <select className={classes.dropdown} value={subject}
              onChange={(e) => setSubject(e.target.value)}>
                <option value="Computer Science">Computer Science</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Electrical Science">Electrical Science</option>
                <option value="Other">Other</option>
              </select>
            </div>
           
          {/* <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Description"
              name="phone"
              value={description}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div> */}
          
          <div className="form-group">
            DATE:
            <input
              type="date"
              className={classes.td_container}
              
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          
          <div className={classes.radio_container}> </div>
          <div className={classes.radio_container}>
              
              <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Public</Typography>    <Switch 
              onChange={(e) => setPrivate(e.target.checked)} ></Switch>
              <Typography>Private</Typography>
              </Stack>
            </div>
          <button className="btn btn-primary" onClick={addNewpublication}>Submit</button> 
        
        {isClicked && <Modal onClose={HideHandler}>
          <p className={classes.mod}>Publication added successfully</p>
          </Modal>}
      </div>
    </div>
        </div>
    );
};

export default PublicationForm;