import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import StudentPage from "./pages/StudentLogin";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/auth-context";
import StaffPage from "./pages/StaffLogin";
import AdminPage from "./pages/AdminLogin";
import AdminHome from "./pages/Admin/AdminPage";
import StaffHome from "./pages/Staff/StaffPage";
import StudentHome from "./pages/Student/StudentPage";


function App() {
  const authctx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
        {!authctx.isLoggedIn && <HomePage />}
        </Route>

        {!authctx.isLoggedIn && (
          <Route path="/student">
            <StudentPage />
          </Route>
        )}
        {!authctx.isLoggedIn && (
          <Route path="/staff">
            < StaffPage />
          </Route>
        )}
        {!authctx.isLoggedIn && (
          <Route path="/admin">
            < AdminPage />
            
          </Route>
        )}

        <Route path="/admin/AdminHome">
          <AdminHome></AdminHome>
        </Route>
        <Route path="/student/StudentHome">
        {authctx.isLoggedIn &&  <StudentHome></StudentHome>}
        </Route>
        <Route path="/staff/StaffHome">
          {authctx.isLoggedIn && <StaffHome></StaffHome>}
        </Route>

        <Route path="/profile">
          {authctx.isLoggedIn && <UserProfile />}
          {!authctx.isLoggedIn && <Redirect to="/auth"></Redirect>}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
