import React from 'react';
import AuthForm from '../components/Auth/AuthForm';

const StudentPage = () => {
  var url1="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDL9-razGo1HMXZYtLVAISUgIb--XsB4YQ";
  var url2="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDL9-razGo1HMXZYtLVAISUgIb--XsB4YQ";
  return (
    <React.Fragment>
   <AuthForm LogsignInUrl={url1} LogsignUpUrl={url2} mode="Student" />;
  
  </React.Fragment>
  )
};

export default StudentPage;
