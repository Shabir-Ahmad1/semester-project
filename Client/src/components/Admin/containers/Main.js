import React from "react";
import Header from "../components/Header";
import Overview from "../components/Overview";

class Main extends React.Component {
  render() {
    return (
      <div>
        <Header pageTitle="Dashboard" />
        <Overview />
      </div>
    );
  }
}

export default Main;
