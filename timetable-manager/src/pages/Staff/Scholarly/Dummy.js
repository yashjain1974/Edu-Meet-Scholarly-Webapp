import React, { useState, useEffect,useRef } from 'react';

function Dummy() {
    const [data, setData] = useState(null);
    const searchUser=useRef()
    const [searchh,setSearch]=useState(null);



const searchHandler=(event)=>{
    
    const searchResult=searchUser.current.value;
    setSearch(searchResult);
    console.log(searchh)


}
    useEffect(() => {
        console.log(searchh);
        fetch(`http://localhost:8000/api/my_view/${searchh}/`)
            .then(response => response.json())
            .then(data => setData(data));
    }, [searchh]);
    console.log(data);

    return (
        <div>
            <input type="text" ref={searchUser}></input>
            <button type="submit" onClick={searchHandler}>Search</button>
            {data && (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Authors</th>
                            <th>Venue</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map(data=>(
                        <tr>
                           
                            <td>{data.title}</td>
                            <td>{data.number_citations}</td>
                            {/* <td>{data[0].email}</td>
                            <td>{data[0].citedby}</td> */}
                           
                        </tr>
                         ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
export default Dummy;
