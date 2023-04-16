import React from "react";
import classes from './ScholarDetailCard.module.css'

const ScholarDetailCard=(props)=>{
    return (
    <React.Fragment>
        <div className={classes.body}>
        <div className={classes.layout}>
      
          
         
      
          <div className={classes.content}>
            <div className={classes.main_header}>
              <div className={classes.main_title}>
              <img className={classes.img1} src={props.myObject.url_img}></img>
                <h1>{props.myObject.Name}</h1>
                
              </div>
              <div className={classes.main_form}>
                <form className={classes.form}>
                    <div>
     <div>
          <p>Scholar Id:{props.myObject.Scholar_Id}</p>
          
         
          <p>Affiliation:{props.myObject.Affiliation}</p>
          <p>Interests:{props.myObject.interests}</p>
          <p>Total Citations:{props.myObject.Total_Citations}</p>
       
        </div>
                         
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
        </div>
</React.Fragment>
    )

}

export default ScholarDetailCard;