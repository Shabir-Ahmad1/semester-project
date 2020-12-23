import React, { Component } from "react";
import User from "./GetUser";
import {useTranslation} from 'react-i18next';


function Dashboard () {
  const {t} = useTranslation();
 
  
    return (
      <React.Fragment>
        <User t = {t} />
      </React.Fragment>
    );
 
}

export default Dashboard;
