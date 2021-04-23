import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import App from "../App";
import Windows from "./Windows";
import {BrowserRouter} from "react-router-dom";
import Home from "./Home";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        
        <Route exact={true} path={"/"} component={Home} />
        <Route exact={true} path={"/windows"} component={Windows} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;