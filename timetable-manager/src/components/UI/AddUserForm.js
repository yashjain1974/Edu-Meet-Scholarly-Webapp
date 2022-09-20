import { useRef,useState,useContext } from 'react';
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import classes from './AddUserForm.module.css';

const AddUser = (props) => {
  const UserInputRef = useRef();
  const history = useHistory();
  const EmailInputRef = useRef();
  const PasswordInputRef = useRef();
  const Authctx = useContext(AuthContext);
  const [isweekPassword, setisWeekPassword] = useState(false);
  const [isweekPasswordMes, setisWeekPasswordMes] = useState("");
  
  async function fetchUserDetail(data) {
    await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCw40p_iCCdcwHAlySc7PR6FSX9xShGWn8", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
       
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
              throw new Error(errorMessage);
            }
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        Authctx.login(data.idToken, expirationTime.toISOString());
        // history.replace(`${props.navigate}`);
      })
      .catch((err) => {
        setisWeekPassword(true);
        setisWeekPasswordMes(err.message);
      });
  }
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredUserValue = UserInputRef.current.value;
    const enteredEmailValue = EmailInputRef.current.value;
    const enteredPasswordValue = PasswordInputRef.current.value;
    const d={
      email: enteredEmailValue,
      password: enteredPasswordValue,
      returnSecureToken: true,
    }

    if (enteredUserValue.trim().length > 0) {
      props.onEnterTask(enteredUserValue,enteredEmailValue,enteredPasswordValue);
      fetchUserDetail(d);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      User Name:<input type='text' ref={UserInputRef} />
      User Email Id:<input type='email' ref={EmailInputRef} />
      User Password:<input type='text' ref={PasswordInputRef} />
      {isweekPassword && (
            <p className={classes.invalid}>{isweekPasswordMes}</p>
          )}
      <button className={classes.btn}>{props.loading ? 'Adding...' : 'Add User'}</button>
    </form>
  );
};

export default AddUser;
