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
import Sidebar from "./components/UI/Sidebar";
import AdminSidebar from "./pages/Admin/AdminSideBar";
import DashBoard from "./pages/Admin/DashBoard";
import AddStaff from "./pages/Admin/AddStaff";
import AddStudent from "./pages/Admin/AddStudent";

import './App.css'
import DashBoardDes from "./components/AdminComp/DashBoardDes";

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

        <Route path="/admin/AdminHome/:qid">
          <div className="cont">

            <AdminSidebar></AdminSidebar>

            <DashBoardDes></DashBoardDes>
          </div>
        </Route>
        <Route path="/admin/staff/:qid" exact>
          <div className="cont">


            <AdminSidebar></AdminSidebar>


            <AddStaff></AddStaff>

          </div>
        </Route>
        <Route path="/admin/student/:qid" exact>
          <div className="cont">


            <AdminSidebar></AdminSidebar>

            <AddStudent></AddStudent>
          </div>
        </Route>
        <Route path="/admin/profile/:qid" exact>
          <div className="cont">

            <AdminSidebar></AdminSidebar>

            <UserProfile />
          </div>
        </Route>
        <Route path="/student/:qid">
          {authctx.isLoggedIn &&
            <div className="cont">

              <Sidebar></Sidebar>

              <StudentHome></StudentHome>
            </div>}
        </Route>
        <Route path="/staff/StaffHome">
          {authctx.isLoggedIn &&
            <div className="cont">

              <Sidebar></Sidebar>
              <StaffHome></StaffHome>
            </div>}
        </Route>

        <Route path="/profile">
          {authctx.isLoggedIn &&
            <div className="cont">

              <Sidebar></Sidebar>
              <UserProfile />
            </div>}
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
