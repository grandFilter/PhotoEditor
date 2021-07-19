import React from "react";
import { Router, Route, /* HashRouter, */ Switch } from "react-router-dom";
import "@/styles.module.less";

import Jumbotron from "@/containers";
import Origin from "@/containers/Origin";
import Demo from "@/containers/Demo";

import { FabricContextProvider } from "@/context/FabricContext";

import { createBrowserHistory } from "history";
const history = createBrowserHistory({
  basename: "/PhotoEditor", // The base URL for all locations
});

function App() {
  return (
    <>
      <Router history={history}>
        {/* <HashRouter> */}
        <Switch>
          <Route path="/" exact>
            <FabricContextProvider>
              <Jumbotron />
            </FabricContextProvider>
          </Route>
          <Route path="/origin">
            <Origin />
          </Route>
          <Route path="/demo">
            <Demo />
          </Route>
        </Switch>
        {/* </HashRouter> */}
      </Router>
    </>
  );
}

export default App;
