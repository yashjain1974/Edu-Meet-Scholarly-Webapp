import React from 'react';
import AuthForm from '../components/Auth/AuthForm';

const StudentPage = () => {
  var url1="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDL9-razGo1HMXZYtLVAISUgIb--XsB4YQ";
 
  return (
    <React.Fragment>
   <AuthForm LogsignInUrl={url1} mode="Student" navigate="student/StudentHome"/>;
   
  
  </React.Fragment>
  )
};

export default StudentPage;
