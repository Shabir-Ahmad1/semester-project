import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import { Provider } from "react-redux";
import Dashbaord from "./Dashboard";

const history = createHistory();

class Root extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Dashbaord />
      </Router>
    );
  }
}

export default Root;
