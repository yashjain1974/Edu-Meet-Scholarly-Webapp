import { useRef } from 'react';

import classes from './AddUserForm.module.css';

const AddUser = (props) => {
  const UserInputRef = useRef();
  const EmailInputRef = useRef();
  const PasswordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredUserValue = UserInputRef.current.value;
    const enteredEmailValue = EmailInputRef.current.value;
    const enteredPasswordValue = PasswordInputRef.current.value;

    if (enteredUserValue.trim().length > 0) {
      props.onEnterTask(enteredUserValue,enteredEmailValue,enteredPasswordValue);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      User Name:<input type='text' ref={UserInputRef} />
      User Email Id:<input type='text' ref={EmailInputRef} />
      User Password:<input type='text' ref={PasswordInputRef} />
      <button className={classes.btn}>{props.loading ? 'Adding...' : 'Add User'}</button>
    </form>
  );
};

export default AddUser;
