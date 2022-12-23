import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';
import { AdminAuthAPI } from '../../store/APIs';
const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm url={AdminAuthAPI}/>
    </section>
  );
};

export default UserProfile;
