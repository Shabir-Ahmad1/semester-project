import React from "react";

import MenuItem from "../components/MenuItem";

class Menu extends React.Component {
  state = { open: false };

  render() {
    return (
      <div>
        <div className="brand">
          <h3 className="title" style={{color:"white"}}> Admin Dashboard</h3>
        </div>
        <ul>
          <MenuItem
            link="/admin/dashboard"
            linkText="Dashboard"
            iconName="tachometer"
          />
         
          <MenuItem
            link="/admin/listing"
            linkText="All Ads"
            iconName="buysellads"
          />         
          <MenuItem 
          link="/admin/customers" 
          linkText="Users" 
          iconName="group" 
          />
        
        </ul>
      </div>
    );
  }
}

export default Menu;
