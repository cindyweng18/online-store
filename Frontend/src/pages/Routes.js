import React from "react";
import { Switch, Route,} from "react-router-dom";
import Desktop from "./Desktop";
import {BrowserRouter} from "react-router-dom";
import Home from "./Home";
import Laptop from "./Laptop";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path={"/"} component={Home} />
        <Route exact={true} path={"/desktops"} component={Desktop} />
        <Route exact={true} path={"/laptops"} component={Laptop} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;