import React from "react";
import { Switch, Route,} from "react-router-dom";
import Desktop from "./Desktop";
import {BrowserRouter} from "react-router-dom";
import Home from "./Home";
import Laptop from "./Laptop";
import Parts from "./Parts";
import Login from "./Login";
import Register from "./Register";
import { Context } from './ContextApi';
import Account from "./Account";

const Routes = () => {
  return (
    <BrowserRouter>
    <Context>
      <Switch>
        <Route exact={true} path={"/"} component={Home} />
        <Route exact={true} path={"/login"} component={Login} />
        <Route exact={true} path={"/register"} component={Register} />
        <Route exact={true} path={"/account/:user"} component={Account} />
        <Route exact={true} path={"/desktops"} component={Desktop} />
        <Route exact={true} path={"/laptops"} component={Laptop} />
        <Route exact={true} path={"/desktops/:os/:purpose/:arch"} component={Parts} />
      </Switch>
      </Context>
    </BrowserRouter>
  );
};

export default Routes;