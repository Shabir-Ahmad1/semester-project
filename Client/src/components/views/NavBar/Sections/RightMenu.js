/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import './LeftMenu';
import {useTranslation} from 'react-i18next';
import '../../../../i18next';

function RightMenu(props) {
  const {t} = useTranslation();
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
    <a href="/login"><span style={{color:"white"}}>{t('Signin.1')}</span> </a>
        </Menu.Item>
      </Menu>
    );
  } else if (user.userData && user.userData.isAdmin) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
    <a onClick={logoutHandler}><span style={{color:"white"}}> {t('Signout.1')}</span> </a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="history">
    <a href="/users/Dashboard"><span style={{color:"white"}}> {t('Dashboard.1')}</span> </a>
        </Menu.Item>


        <Menu.Item key="logout">
          <a onClick={logoutHandler}><span style={{color:"white"}}> {t('Signout.1')}</span></a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
