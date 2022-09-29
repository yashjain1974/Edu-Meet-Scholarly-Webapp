import classes from './UserItem.module.css';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { AuthContextProvider } from '../../store/auth-context';

const UserItem = (props) => {
  let ctx=useContext(AuthContext);
  
  return (
    
    <div className={classes.tasks}>
     
      
      
     
        <h3>{props.name}</h3>
        <div className={classes.mail}>Email:{props.email}</div>
        <div className={classes.pswd}>Password: {props.password}</div>
       

    </div>)
};

export default UserItem;