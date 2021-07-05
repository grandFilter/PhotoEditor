import React from "react";
import { Router, Route, /* HashRouter, */ Switch } from "react-router-dom";
import "@/styles.module.less";

import Jumbotron from "@/containers";
import Demo from "@/containers/Demo";
import UI from "@/containers/UI";

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
          <Route path="/ui">
            <UI />
          </Route>
        </Switch>
        {/* </HashRouter> */}
      </Router>
    </>
  );
}

export default App;
