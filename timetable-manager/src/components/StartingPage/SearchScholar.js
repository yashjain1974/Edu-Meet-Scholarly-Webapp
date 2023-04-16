import React, { useState, useEffect, useRef } from 'react';
import classes from './SearchScholar.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';
import jaypeeLogo from "../images/jaypee.png";
import DataList from '../Layout/DataList';
const SearchScholar = () => {
    const [data, setData] = useState(null);
    const searchUser = useRef()
    const [searchh, setSearch] = useState(null);
    const [isLoading,setIsLoading]=useState(false);

    const searchHandler = (event) => {
        const searchResult = searchUser.current.value;
        setSearch(searchResult);
        setIsLoading(true);
        console.log(searchh)
        setData(null);
    }

    useEffect(() => {
        console.log(searchh);
        fetch(`http://localhost:8000/api/my_view/${searchh} jiit.ac.in/`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            });
    }, [searchh]);
    console.log(typeof(data));
    // console.log(data.total_citations)

    return (
        <div>
            <div className={classes.head}><h1> Search Scholar</h1></div>
            <div className={classes.search}>
                
            <input type="text" ref={searchUser}  className={classes.search} placeholder="Search Author..."></input>
           
            <button type="submit" onClick={searchHandler} className={classes.submit}>Search</button> 

            </div>
            <DataList></DataList>
            {isLoading && <div className='loading'><LoadingSpinner></LoadingSpinner></div>}
            {!data && <div className={classes.logo} >
     <img  src={jaypeeLogo} alt="jaypee logo"></img>
     </div>}
            {data && (
                <div>
                 <div>Total Citations:{data[1][0]["total_citations"]}</div>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Title</th>
                            <th>Citation Count</th>
                            
                            
                        </tr>
                    </thead>
                    <tbody>
                        {data[0].map(data => (
                            <tr>
                                <td>{1}</td>

                                <td>{data.title}</td>
                                <td>{data.number_citations}</td>
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