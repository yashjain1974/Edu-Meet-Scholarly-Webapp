import React,{useState,useEffect} from "react";
import Section from "../UI/Section";
import UserItem from "./UserItem";
import classes from "./UserView.module.css"
const UserView = (props) => {
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isHttpError, setIsHttpError] = useState();
    const [isEmpty,setIsEmpty]=useState(false);
    useEffect(() => {
      const fetchUser = async () => {
        const response = await fetch(
          "https://to-do-task-7340d-default-rtdb.firebaseio.com/tasks.json"
        );
  
        if (!response.ok) {
          throw new Error("Unable to fetch Meals");
        }
        const data = await response.json();

        
  
        const loadData = [];
        for (let key in data) {
          loadData.push({
            id: key,
            name: data[key].user,
            email: data[key].email,
            password: data[key].password,
          });
        }
        if(loadData.length===0){
          setIsEmpty(true);
        }

        setUser(loadData);
        setIsLoading(false);
      };
  
      fetchUser().catch((error) => {
        setIsLoading(false);
        setIsHttpError(error.message);
      });
    }, []);
  
    const mealList = user.map((ids) => {
      return (
        <React.Fragment>
          <UserItem id={ids.id}
            name={ids.name}
            email={ids.email}
            password={ids.password}
          ></UserItem>
        </React.Fragment>
      );
    });
  
  
    return (
      <Section>
        {!isEmpty && <div >{mealList}</div>}
        {isEmpty && <div>There is no user</div>}
        {isHttpError && (
          <section className={classes.errorMessage}>
            <p>{isHttpError}</p>
          </section>
        )}
         {isLoading && (
          <section className={classes.loading}>
            <p>Loading...</p>
            
          </section>
        
        )}
        
      </Section>
    );
  };
  
  export default UserView;