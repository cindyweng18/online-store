import React from "react";
import { Switch, Route,} from "react-router-dom";
import Desktop from "./Desktop";
import {BrowserRouter} from "react-router-dom";
import Home from "./Home";
import Laptop from "./Laptop";
import Parts from "./Parts";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path={"/"} component={Home} />
        <Route exact={true} path={"/desktops"} component={Desktop} />
        <Route exact={true} path={"/laptops"} component={Laptop} />
        <Route exact={true} path={"/desktops/windows/gaming/intel"} component={Parts} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;