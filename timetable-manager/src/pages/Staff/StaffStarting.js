import classes from './StaffStarting.module.css';
import React from 'react';
import { Link } from "react-router-dom";
import { FcGraduationCap } from 'react-icons/fc';
import { FcManager } from 'react-icons/fc';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom';
const StaffStarting = () => {
  const routee=useRouteMatch();
  const p = useParams();
  return (
    <React.Fragment>
    <div className={classes.starting}>

      <button className={classes.btn}>
        <Link exact to={`/staff/college/${p.qid}`}><FcGraduationCap size="80px"></FcGraduationCap><br></br>College Portal</Link>
      </button><br></br>
      <button className={classes.btn} >
        <Link exact to={`/staff/scholar/${p.qid}`} ><FcManager size="80px"></FcManager><br></br>Scholarly Portal</Link>
      </button>
     
    </div>
     </React.Fragment>
    

  );
};

export default StaffStarting;
