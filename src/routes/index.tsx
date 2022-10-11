import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "../pages/Home";
import UserDashoardPage from "../pages/UserDashboard";
import { useAuth } from "../providers/authtoken";

function Routes() {
  const { auth } = useAuth();
  return (
    <Switch>
      <Route exact path="/">
        {auth ? <Redirect to={`/dashboard`} /> : <HomePage />}
      </Route>
      <Route exact path="/dashboard">
        {auth ? <UserDashoardPage /> : <Redirect to={`/`} />}
      </Route>
    </Switch>
  );
}

export default Routes;
