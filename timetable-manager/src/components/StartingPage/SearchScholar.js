import React, { useState, useEffect, useRef } from 'react';
import classes from './SearchScholar.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';
import jaypeeLogo from "../images/jaypee.png";
import DataList from '../Layout/DataList';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { VscReferences } from 'react-icons/vsc';
const SearchScholar = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const searchUser = useRef()
    const [searchh, setSearch] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [id, setScholarId] = useState([]);
    const [empty, setIsEmpty] = useState(false);

    const searchHandler = (event) => {
        const searchResult = searchUser.current.value;
        setSearch(searchResult);
        setIsLoading(true);
        console.log(searchh)
        setData(null);
    }
    useEffect(() => {
        // our fetch codes

    }, []);

    useEffect(() => {
        console.log(searchh);
        fetch(`http://localhost:8000/api/my_view/${searchh} jiit.ac.in/`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            });
        fetch(`http://localhost:8000/api/publications/`)
            .then((res) => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    const loadData = [];
                    for (let key in data) {
                        if (data[key].pub_author === searchh && data[key].private === false) {
                            loadData.push({
                                title: data[key].title,
                                subject: data[key].subject,
                                category: data[key].category,
                                file: data[key].file,
                                Date: data[key].date,
                                private: data[key].private
                            });
                        }
                    }
                    

                    console.log(data)
                    setItems(loadData);
                    console.log(loadData);
                    if (loadData.length === 0) {
                        setIsEmpty(false)
                      } else {
                        setIsEmpty(true);
                      }

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, [searchh]);
    console.log(typeof (data));
    // console.log(data.total_citations)

    return (
        <div>
            <div className={classes.head}><h1> Search Scholar</h1></div>
            <div className={classes.search}>

                <input type="text" ref={searchUser} className={classes.search} placeholder="Search Author..."></input>

                <button type="submit" onClick={searchHandler} className={classes.submit}>Search</button>

            </div>
            {/* <DataList></DataList> */}
           
           {empty && <div className={classes.head1}> Published in Edu-Meet plateform:</div>}
                {!items && <p>Not yet published in plateform</p>}
            <table class="table table-striped mt32 customers-list">
                <thead>
                    <tr>

                        <th>Title</th>
                        <th>Subject</th>
                        <th>Category</th>

                        <th>Date</th>
                        <th>File</th>




                    </tr>
                </thead>
           
                
                {items.map((item) => (

                    <tbody>

                        <tr>


                            <td>{item.title}</td>
                            <td>{item.subject}</td>
                            <td>{item.category}</td>
                            <td>{item.Date}</td>
                            <td><a href={item.file} download>Click to view </a></td>
                        </tr>


                    </tbody>
                ))
                }





            </table>
            {error && <p>Failed to find</p>}
            {isLoading && <div className='loading'><LoadingSpinner></LoadingSpinner></div>}
            {!data && <div className={classes.logo} >
                <img src={jaypeeLogo} alt="jaypee logo"></img>
            </div>}
            {data && (
                <div>
                     <div className={classes.head1}> Published in Google-Scholar plateform:</div>
                    <div>Total Citations:{data[1][0]["total_citations"]}</div>
                    <table className={classes.table}>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Title</th>
                                <th>Citation Count</th>
                                <th>Pub_URL</th>
                                <th>Cited_URL</th>


                            </tr>
                        </thead>
                        <tbody>
                            {data && data[0].map((row, index) => (
                                <tr>
                                    <td>{index+1}</td>

                                    <td>{row.title}</td>
                                    <td>{row.number_citations}</td>
                                    <td><a href={`https://scholar.google.com/citations?view_op=view_citation&hl=en&user=&citation_for_view=${row.pub_id}`} target="_blank"><FaExternalLinkAlt size="25px"></FaExternalLinkAlt></a></td>
                {row.citedby_url!='N/A' && <td><a href={row.citedby_url} target="_blank"><VscReferences size="25px"></VscReferences></a></td>}
                {row.citedby_url=='N/A' && <td>N/A</td>}
                                    {/* <td>{data[0].email}</td>
                            <td>{data[0].citedby}</td> */}

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

}

export default SearchScholar;