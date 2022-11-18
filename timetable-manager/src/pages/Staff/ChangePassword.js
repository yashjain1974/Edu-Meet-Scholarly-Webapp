import ProfileForm from '../../components/Profile/ProfileForm';
import classes from './StaffProfile.module.css';
import StaffUserForm from './StaffUserForm';
import DetailCard from '../../components/UI/DetailCard';
import { useState,useCallback,useContext } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import AuthContext from '../../store/auth-context';

const FIREBASE_DOMAIN = "https://userdetails-d84c5-default-rtdb.firebaseio.com";

const ChangePassword = (props) => {
 const ctx=useContext(AuthContext);
    const [isSet,setIsset]=useState(false);
    const setDetail=()=>{
        setIsset(true);
    }
    const param = useParams();
  const [id, setId] = useState("");
  
  const userId = param.qid;

  return (

    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm url="https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDmHdcNB-dQsfYWrJ3ItPyaTR125byfhjQ"/>
     
    
     
    </section>
  );
};

export default ChangePassword;
