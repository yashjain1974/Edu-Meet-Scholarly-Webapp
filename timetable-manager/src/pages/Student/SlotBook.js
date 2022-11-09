import React from "react";
import classes from "./SlotBook.module.css"
import TeacherTimeTable from "./TeacherTimetable";
const SlotBook = (props) => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;
    let lastDate = `${year}-${month}-${day + 7}`
    console.log(currentDate);

    return (
        <React.Fragment>

            <div className={classes.body}>
                <TeacherTimeTable></TeacherTimeTable>
                <h1>Book your Slot here </h1>

                <div class="row">
                    <div class="col-xs">
                        <div className={classes.styledInput}>
                            <input type="text" required />
                            <label>Enter Your Name</label>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-6">
                        <div className={classes.styledInput}>
                            <input type="text" required />
                            <label>Enter Your Email ID</label>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-6">
                        <div className={classes.styledInput}>
                            <input type="text" required />
                            <label>Enter Your Enrollment Number</label>
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-12">
                        <div className={classes.styledInput}>
                            <div>Select Date:</div>
                            <label for="date"></label> <input id="date" type="date" min={currentDate} max={lastDate} />
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div className={classes.styledInput} >
                            <div>Select time:</div>
                            <label for="time"></label>
                            <select className={classes.selectTime}>
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
                            <textarea className={classes.textarea} required></textarea>
                            <label>Why You Want to meet ?</label>
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <div className={classes.submitBtn}>Book Slot</div>
                    </div>
                </div>



            </div>
        </React.Fragment>
    )


}

export default SlotBook;