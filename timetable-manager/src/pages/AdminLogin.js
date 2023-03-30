import React from 'react';
import AuthForm from '../components/Auth/AuthForm';
import { AdminAuthSignIn } from '../store/APIs';
import { AdminAuthSignUp } from '../store/APIs';
const StaffPage = () => {
  var url1=AdminAuthSignIn;
  var url2=AdminAuthSignUp;
  return (
    <React.Fragment>
   <AuthForm LogsignInUrl={url1} LogsignUpUrl={url2} mode="Admin" navigate="admin/adminHome/" />;
   
  
  </React.Fragment>
  )
};

export default StaffPage;