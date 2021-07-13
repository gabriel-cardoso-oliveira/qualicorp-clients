import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Users from "../../pages/users/Users";
import AddUsers from "../../pages/users/AddUsers";
import EditUsers from "../../pages/users/EditUsers/EditUsers";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  const classes = useStyles();

  const layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/users" component={Users} />
              <Route path="/app/add-users" component={AddUsers} />
              <Route path="/app/edit-users" component={EditUsers} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
