import { useState, useEffect, useContext } from "react";
import Modal from "../../components/UI/Modal";

import classes from "./TeacherList.module.css"
import { Link, useRouteMatch, Route, useHistory } from "react-router-dom";
import { FcGraduationCap } from 'react-icons/fc';
import AuthContext from "../../store/auth-context";
import TeacherTimeTable from "./TeacherTimetable";
import TeacherDetail from "./TeacherDetail";
import { UserdetailUrl } from "../../store/APIs";
import React from "react";
const TeacherList = (props) => {
    const [error, setError] = useState(null);
    const ctx = useContext(AuthContext)
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const [timeTableisVisible, setTimetableisVisible] = useState(false);
    const hist = useHistory();


    //     set search query to empty string
    const [q, setQ] = useState("");
    //     set search parameters
    //     we only what to search countries by capital and name
    //     this list can be longer if you want
    //     you can search countries even by their population
    // just add it to this array
    const [searchParam] = useState(["capital", "name"]);
    const match = useRouteMatch();


    useEffect(() => {
        // our fetch codes
        fetch(`${UserdetailUrl}/staff.json`)
            .then((res) => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    const loadData = [];

                    for (let key in data) {
                        loadData.push({
                            id: key,
                            name: data[key].user,
                            email: data[key].email,
                            dept: data[key].Dept,
                            room: data[key].room,

                        });
                    }
                    setItems(loadData);
                    console.log(data);
                    console.log(loadData["id"]);

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);


    function search(items) {

        return items.filter((item) => {

            return searchParam.some((newItem) => {
                return (

                    item["email"].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
                );
            });
        });
    }
    const seeTimeTable = (event) => {
        const k = event.target.value;
        ctx.setTeacherId(k);
        localStorage.getItem("teacherId");






    }
    const isClickHandler = (event) => {
        setTimetableisVisible(true);
        const k = event.target.value;
        const l = event.currentTarget.id
        localStorage.setItem("teacherEmail", l);
        ctx.setTeacherId(k);
        localStorage.getItem("teacherId");

    };

    const HideCartHandler = () => {
        setTimetableisVisible(false);
        hist.replace(`${match.url}`)

    };

    if (error) {

        <>{error.message}</>;

    } else if (!isLoaded) {
        return <div className={classes.loading}>loading...</div>;
    } else {


        return (
            <div className={classes.wrapper}>
                <div className={classes.cont}>
                    <h3>
                        <span>Search Teacher By Name</span><br></br>
                        <label htmlFor="search-form">
                            <input type="search" class="form-control search-input" data-table="customers-list"
                                name="search-form"
                                id="search-form"
                                placeholder="Search..."
                                value={q}
                                /* 
                                // set the value of our useState e
                                //  anytime the user types in the search box
                                */
                                onChange={(e) => setQ(e.target.value)} />
                            <span className={classes.srOnly}>Search countries here</span>
                        </label>
                    </h3>

                    <table class="table table-striped mt32 customers-list">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>

                                <th>Department</th>
                                <th>Timetable</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        {search(items).map((item) => (

                            <tbody>
                                <tr>

                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.dept}</td>

                                    <td>
                                        <Link to={`${match.url}/timetable/${item.id}`}><button className={classes.btn} onClick={isClickHandler} value={item.id} id={item.email}>See Time table</button></Link>
                                    </td>
                                    <td>
                                        <Link to={`${match.url}/detail/${item.id}`}><button className={classes.btn} onClick={isClickHandler} value={item.id}>See Details</button></Link>
                                    </td>
                                </tr>


                                {timeTableisVisible && <Modal onClose={HideCartHandler}>

                                    <Route path={`${match.path}/timetable/${item.id}`}>
                                        <div className={classes.timeTable}>
                                            <TeacherTimeTable onClose={HideCartHandler}></TeacherTimeTable>
                                        </div>
                                    </Route>

                                </Modal>

                                }
                                {timeTableisVisible && <Modal onClose={HideCartHandler}>

                                    <Route path={`${match.path}/detail/${item.id}`}>
                                        <div className={classes.timeTable}>
                                             <TeacherDetail onClose={HideCartHandler} id={item.id}></TeacherDetail>
                                        </div>
                                    </Route>


                                </Modal>

                                }


                            </tbody>





                        )

                        )
                        }





                    </table>
                </div>

            </div>




        );


    }

}

export default TeacherList;