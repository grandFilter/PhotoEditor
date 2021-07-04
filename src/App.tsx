import React from "react";
import { Router, Route, /* HashRouter, */ Switch } from "react-router-dom";
import "@/styles.module.less";

import Jumbotron from "@/containers";
import Demo from "@/containers/Demo";

import { FabricContextProvider } from "@/context/FabricContext";

import { createBrowserHistory } from "history";
const history = createBrowserHistory();

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
