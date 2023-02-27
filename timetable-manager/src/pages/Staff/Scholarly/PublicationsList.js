import React,{useEffect,useState} from "react";



const PublicationsList=()=>{
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        // our fetch codes
        fetch("http://localhost:8000/api/publications/")
            .then((res) => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    const loadData = [];
                    for (let key in data) {
                        loadData.push({
                           
                            title: data[key].title,
                            category: data[key].category,
                            file: data[key].file,
                            Date: data[key].date,
                            private: data[key].private
                        });
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
   
   
return(
    <React.Fragment>
        
        {items.map((item)=>(
                    <ul>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.Date}</td>
                    <td>{item.file}</td>

                    </ul>


                ))
}
        

    </React.Fragment>
)

}

export default PublicationsList;