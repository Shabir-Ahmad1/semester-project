import { Route } from "react-router-dom";
import Dashboard from "./Dashboard";

import React, { Component } from "react";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <Route path="/admin/dashboard" component={Dashboard} />
      </div>
    );
  }
}

export default App;
