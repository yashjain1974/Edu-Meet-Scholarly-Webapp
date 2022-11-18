import ProfileForm from '../../components/Profile/ProfileForm';
import classes from './ChangePassword.module.css';

const ChangePasswordSt=()=>{
  return (

    <section className={classes.profile}>
      <h1>Change Password</h1>
      <ProfileForm url="https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCw40p_iCCdcwHAlySc7PR6FSX9xShGWn8" />
     
    
     
    </section>
  );
};

export default ChangePasswordSt;
