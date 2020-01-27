import React from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";

import ReactHooksGame from "./components/ReactHooksGame";
import CanvasGame from "./components/CanvasGame";

const AppRouter = () => (
  <BrowserRouter>
    <h1>Game of Life</h1>
    <nav>
      <NavLink to="/" exact={true} activeClassName="active">
        built with react hooks
      </NavLink>
      <NavLink to="/canvas" exact={true} activeClassName="active">
        built with canvas HTML element
      </NavLink>
    </nav>
    <Switch>
      <Route path="/" component={ReactHooksGame} exact={true} />
      <Route path="/canvas" component={CanvasGame} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
