import ProfileForm from '../../components/Profile/ProfileForm';
import classes from './StaffProfile.module.css';
import StaffUserForm from './StaffUserForm';
import DetailCard from '../../components/UI/DetailCard';
import { useState,useCallback,useContext } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { UserdetailUrl } from '../../store/APIs';
import { StaffAuthAPI } from '../../store/APIs';

import AuthContext from '../../store/auth-context';

const FIREBASE_DOMAIN = UserdetailUrl;

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
      <ProfileForm url={StaffAuthAPI}/>
     
    
     
    </section>
  );
};

export default ChangePassword;
