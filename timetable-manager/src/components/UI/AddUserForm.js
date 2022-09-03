import { useRef } from 'react';

import classes from './AddUserForm.module.css';

const AddUser = (props) => {
  const taskInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredValue = taskInputRef.current.value;

    if (enteredValue.trim().length > 0) {
      props.onEnterTask(enteredValue);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      User Name:<input type='text' ref={taskInputRef} />
      User Email Id:<input type='text' ref={taskInputRef} />
      User Password:<input type='text' ref={taskInputRef} />
      <button className={classes.btn}>{props.loading ? 'Adding...' : 'Add User'}</button>
    </form>
  );
};

export default AddUser;
