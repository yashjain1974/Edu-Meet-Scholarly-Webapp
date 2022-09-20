import React,{useContext} from 'react';
import { useRouteMatch } from 'react-router-dom';
import AuthForm from '../components/Auth/AuthForm';
import AuthContext from '../store/auth-context';

const StudentPage = () => {
  var url1="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCw40p_iCCdcwHAlySc7PR6FSX9xShGWn8";
 const ctx=useContext(AuthContext);
 const routee=useRouteMatch();
 console.log(routee);
  return (
    <React.Fragment>
   <AuthForm LogsignInUrl={url1} mode="Student" navigate={`${routee.path}/${ctx.id}`}/>;
   
  
  </React.Fragment>
  )
};

export default StudentPage;
