import ProfileForm from '../../components/Profile/ProfileForm';
import classes from './StaffProfile.module.css';
import StaffUserForm from './StaffUserForm';
import DetailCard from '../../components/UI/DetailCard';
import { useState,useCallback } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
const FIREBASE_DOMAIN = "https://userdetails-d84c5-default-rtdb.firebaseio.com";

const StaffProfile = (props) => {
    const [isSet,setIsset]=useState(false);
    const setDetail=()=>{
        setIsset(true);
    }
    const param = useParams();
  const [id, setId] = useState("");
  
  const userId = param.qid;

  // console.log(userId);
  const fetchData = useCallback(
    async function () {
      const response = await fetch(`${FIREBASE_DOMAIN}/staff.json`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not fetch student.");
      }

      const transformedQuotes = [];

      for (const key in data) {
        const quoteObj = {
          id: key,
          ...data[key],
        };
        

        transformedQuotes.push(quoteObj);
      }

      for (const key in transformedQuotes) {
        if (transformedQuotes[key]["email"] === userId) {
          const sId = transformedQuotes[key]["id"];
          setId(sId);
        
          return;
        };
      }
    }, [userId]
  )
  fetchData();
  return (

    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm url="https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDmHdcNB-dQsfYWrJ3ItPyaTR125byfhjQ"/>
     
      <h1>Update Details</h1>
     <StaffUserForm id={id}></StaffUserForm>
     
    </section>
  );
};

export default StaffProfile;
