import classes from './StartingPageContent.module.css';
import React from 'react';
import { Link } from "react-router-dom";
import { FcGraduationCap } from 'react-icons/fc';
import { FcSearch } from 'react-icons/fc';
import { FcManager } from 'react-icons/fc';
import SearchScholar from './SearchScholar';
const StartingPageContent = () => {
  return (
    <React.Fragment>
    <div className={classes.starting}>

      <button className={classes.btn}>
        <Link to="/student" ><FcGraduationCap size="80px"></FcGraduationCap><br></br>Student Login</Link>
      </button>
      <button className={classes.btn} >
        <Link to="/staff" ><FcManager size="80px"></FcManager><br></br>Staff Login</Link>
      </button>
      <button className={classes.btn} >
        <Link to="/searchScholar" ><FcSearch size="70px"></FcSearch><br></br>Search Scholar</Link>
      </button>
     
    </div>
     <marquee>Welcome to Slot_Scholar Web App </marquee>
     </React.Fragment>
    

  );
};

export default StartingPageContent;
