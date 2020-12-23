import React from "react";
import { Route } from "react-router-dom";

import Menu from "./Menu";
import Main from "./Main";


import Shop from "./Shop";
import Customers from "./Customers";


const Dashboard = () => (
  <div className="fluid-container">
    <div className="row">
      <div className="aside col-md-2 col-sm-3 sidebarMenu">
        <Menu />
      </div>
      <div className="main col-md-10">
        <div className="fluid-container">
          <Route exact path="/admin/dashboard" component={Main} />        
          <Route exact path="/admin/listing" component={Shop} />
          <Route exact path="/admin/customers" component={Customers} />
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
