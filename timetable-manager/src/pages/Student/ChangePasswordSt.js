import ProfileForm from '../../components/Profile/ProfileForm';
import classes from './ChangePassword.module.css';
import { StudentAuthAPI } from '../../store/APIs';
const ChangePasswordSt=()=>{
  return (

    <section className={classes.profile}>
      <h1>Change Password</h1>
      <ProfileForm url={StudentAuthAPI} />
     
    
     
    </section>
  );
};

export default ChangePasswordSt;
