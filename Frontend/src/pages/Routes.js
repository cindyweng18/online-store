import React from "react";
import { Switch, Route,} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import Home from "./Home";
import Parts from "./Parts";
import Login from "./Login";
import Register from "./Register";
import { Context } from './ContextApi';
import Account from "./Account";
import Item from "./Item";
import Checkout from "./Checkout";
import Computer from "./Computer";
import Discussion from "./Discussion";
import Employee from "./EmployeeLogin";
import Delivery from "./Delivery";
import Clerk from "./Clerk";

const Routes = () => {
  return (
    <BrowserRouter>
    <Context>
      <Switch>
        <Route exact={true} path={"/"} component={Home} />
        <Route exact={true} path={"/login"} component={Login} />
        <Route exact={true} path={"/register"} component={Register} />
        <Route exact={true} path={"/account/:user"} component={Account} />
        <Route exact={true} path={"/employeelogin"} component={Employee} />
        <Route exact={true} path={"/delivery/:name"} component={Delivery} />
        <Route exact={true} path={"/clerk/:name"} component={Clerk} />
        <Route exact={true} path={"/checkout"} component={Checkout} />
        <Route exact={true} path={"/discussion"} component={Discussion} />
        <Route exact={true} path={"/:computer"} component={Computer} />
        <Route exact={true} path={"/:computer/:os/:purpose/:arch"} component={Parts} />
        <Route exact={true} path={"/:computer/:os/:purpose/:arch/:name"} component={Item} />
      </Switch>
      </Context>
    </BrowserRouter>
  );
};

export default Routes;