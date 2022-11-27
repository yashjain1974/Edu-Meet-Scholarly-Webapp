import { useRef, useState, useContext, useEffect } from 'react';
import AuthContext from "../../store/auth-context";
import emailjs from "emailjs-com"
import classes from './AddUserForm.module.css';

const AddUser = (props) => {
  const UserInputRef = useRef();

  const EmailInputRef = useRef();
  const PasswordInputRef = useRef();
  const Authctx = useContext(AuthContext);
  const [isweekPassword, setisWeekPassword] = useState(false);
  const [isweekPasswordMes, setisWeekPasswordMes] = useState("");
  const [iserror, setIserror] = useState(false);
  const [isset,setIsSet]=useState(false);

  async function fetchUserDetail(data) {
    await fetch(props.SignUpUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {

        if (res.ok) {
          return res.json();
          setIsSet(true)
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
        setIserror(true);
        setisWeekPasswordMes(err.message);
        console.log("nhi jii");
        return;

      });
    console.log("Ohk jii");


  }

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredUserValue = UserInputRef.current.value;
    const enteredEmailValue = EmailInputRef.current.value;
    const enteredPasswordValue = PasswordInputRef.current.value;
    const d = {
      email: enteredEmailValue,
      password: enteredPasswordValue,
      returnSecureToken: true,
    }


    if (enteredUserValue.trim().length > 0 && enteredPasswordValue.trim().length >= 8) {

      fetchUserDetail(d);
      props.onEnterTask(enteredUserValue, enteredEmailValue, enteredPasswordValue);
      emailjs.sendForm('service_xbooorp', 'template_uok12o3', event.target, '07iS9ofaueIYYc1r8')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });


    }
    else {
      setisWeekPassword(true);
      setisWeekPasswordMes("Password should be greater than 8 character ")

    }
    UserInputRef.current.value="";
     EmailInputRef.current.value="";
    PasswordInputRef.current.value="";

  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      User Name:<input type='text' ref={UserInputRef} name="name" />
      User Email Id:<input type='email' ref={EmailInputRef} name="loginId"/>
      User Password:<input type='text' ref={PasswordInputRef} name="password" />

      {isweekPassword && (
        <p className={classes.invalid}>{isweekPasswordMes} : please Enter again</p>
      )}
      <button className={classes.btn}>{props.loading ? 'Adding...' : 'Add User'}</button>
      {isset && <p>User Added Successfully Please refresh the page to see it.</p>}
      
    </form>
  );
};

export default AddUser;
