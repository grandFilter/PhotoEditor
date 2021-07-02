import React from "react";
import { Router, Route, /* HashRouter, */ Switch } from "react-router-dom";
import "@/styles.module.less";

import Jumbotron from "@/containers";

import { createBrowserHistory } from "history";
const history = createBrowserHistory();

function App() {
  return (
    <>
      <Router history={history}>
        {/* <HashRouter> */}
        <Switch>
          <Route path="/" exact>
            <Jumbotron />
          </Route>
          {/* <Route path="*">
                <NotFound />
              </Route> */}
        </Switch>
        {/* </HashRouter> */}
      </Router>
    </>
  );
}

export default App;
