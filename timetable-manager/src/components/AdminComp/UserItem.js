import classes from './UserItem.module.css';

const UserItem = (props) => {
  return (
    <div className={classes.tasks}>
     
        <h3>{props.name}</h3>
        <div className={classes.mail}>Email:{props.email}</div>
        <div className={classes.pswd}>Password: {props.password}</div>
       

    </div>)
};

export default UserItem;