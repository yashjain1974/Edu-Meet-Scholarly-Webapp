import { useState, useEffect } from "react";

import classes from "./SearchPublication.module.css"

import { FcGraduationCap } from 'react-icons/fc';

import { Switch } from "@mui/material";
import emailjs from "emailjs-com"
import React from "react";
import { Link, useRouteMatch, Route, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";


const SearchPublications = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [isClicked, setisClicked] = useState(false);
    const [timeTableisVisible, setTimetableisVisible] = useState(false);
    const [isEmailEmpty, setIsEmailEmpty] = useState(true);

    //     set search query to empty string
    const [q, setQ] = useState("");
    //     set search parameters
    //     we only what to search countries by capital and name
    //     this list can be longer if you want
    //     you can search countries even by their population
    // just add it to this array
    const [searchParam] = useState(["capital", "name"]);
    const hist = useHistory();
    const match = useRouteMatch();
    console.log(match.path);
    let author=localStorage.getItem("staffName");
    useEffect(() => {
        // our fetch codes
        fetch(`http://localhost:8000/api/publications/`)
            .then((res) => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    const loadData = [];
                    for (let key in data) {
                        if(data[key].pub_author==author){
                        loadData.push({
                            title: data[key].title,
                            subject:data[key].subject,
                            category: data[key].category,
                            file: data[key].file,
                            Date: data[key].date,
                            private: data[key].private
                        });
                    }
                    }
                    setItems(loadData);
                    console.log(data);

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
    const isClickHandler = () => {
        setisClicked(true);
    }
    const HideHandler = () => {
        setisClicked(false);
    }
    const [dataArray, setdataArray] = useState([]);

    const handleChange = (e) => {
       
        // setisChecked(e.target.checked);
        if (e.target.checked === true) {

            setdataArray([...dataArray, e.target.value]);
        }
        else if (e.target.checked === false) {

            let freshArray = dataArray.filter(val => val !== e.target.value);
            setdataArray([...freshArray]);
        }
    }
    const checked=()=>{

        

    }


    useEffect(() => {

        console.log(dataArray);

    }, [dataArray]);
    //  console.log( `${match.url}/detail/${item.id}`);

    function search(items) {

        return items.filter((item) => {

            return searchParam.some((newItem) => {
                return (

                    item["title"].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
                );
            });
        });
    }
    if (error) {

        <>{error.message}</>;

    } else if (!isLoaded) {
        return <>loading...</>;
    } else {


        return (
            <div className={classes.wrapper}>


                <div className={classes.wrapper}>
                    <div class="container">
                        <h3>
                            <span>Search Publication by title</span><br></br>
                            <label htmlFor="search-form">
                                <input type="search" class="form-control search-input" data-table="customers-list"
                                    name="search-form"
                                    id="search-form"
                                    placeholder="Search Publication..."
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

                                    <th>Title</th>
                                    <th>Subject</th>
                                    <th>Category</th>

                                    <th>Date</th>
                                    <th>File</th>
                                    <th>Private</th>



                                </tr>
                            </thead>
                            {search(items).map((item) => (

                                <tbody>

                                    <tr>


                                        <td>{item.title}</td>
                                        <td>{item.subject}</td>
                                        <td>{item.category}</td>
                                        <td>{item.Date}</td>
                                        <td><a href ={item.file} download>Click to view </a></td>
                                        <td>
                                            <div >
                                                
                                               {item.private && <Switch  onChange={handleChange} defaultChecked></Switch>}
                                               {!item.private && <Switch  onChange={handleChange} ></Switch>}
                                            </div>
                                        </td>




                                    </tr>


                                </tbody>





                            ))
                            }


                            {dataArray.length > 0 && <button onClick={isClickHandler} className={classes.btn} >Save changes</button>}


                        </table>

                    </div>
                </div>



            </div>

        )
    }





}

export default SearchPublications;