import React from 'react';
import AuthForm from '../components/Auth/AuthForm';

const StaffPage = () => {
  var url1="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmHdcNB-dQsfYWrJ3ItPyaTR125byfhjQ";
  return (
    <React.Fragment>
   <AuthForm LogsignInUrl={url1} mode="Staff" navigate="staff/StaffHome" />;
  
  </React.Fragment>
  )
};

export default StaffPage;
