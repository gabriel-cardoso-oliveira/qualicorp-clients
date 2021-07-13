import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";

export default function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/users" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/users" />}
        />
        <PublicRoute path="/app" component={Layout} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props => React.createElement(component, props)}
      />
    );
  }
}
