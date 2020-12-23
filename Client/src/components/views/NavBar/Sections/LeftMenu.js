import React from "react";
import { Menu } from "antd";
import { HomeFilled } from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import ant from "./ant.css";
import logo from "../logo.png";


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const { t, i18n } = useTranslation();

  function handleClick1(lang){
    i18n.changeLanguage(lang);
  }

  return (
    <Menu mode={props.mode}>
      <Menu.Item >
     
        <Link to="/"><h4 style={{marginBottom:"14px", color:"white"}}>Home</h4></Link>
     
      </Menu.Item>
      <SubMenu title={<span style={{color:"white"}}> {t('Language.1')} </span>}>
        <MenuItemGroup>
          <Menu.Item key="setting:1" onClick = {()=> handleClick1('en')}>English</Menu.Item>
        </MenuItemGroup>
      </SubMenu>
    </Menu>
  );
}

export default LeftMenu;
