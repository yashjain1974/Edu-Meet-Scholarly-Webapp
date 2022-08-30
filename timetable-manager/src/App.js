import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import StudentPage from "./pages/StudentPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/auth-context";
import StaffPage from "./pages/StaffPage";

function App() {
  const authctx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
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
