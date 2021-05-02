import React from "react";
import PropTypes from "prop-types";
import { StaticRouter, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";

export const SSRRoutes = ({basename, routerContext}) => {
  return (
    <StaticRouter basename={basename} context={routerContext}>
      <Home />
    </StaticRouter>
  );
};

SSRRoutes.prototype = {
  basename : PropTypes.object,
  context : PropTypes.object
}
