import React, {Component} from 'react';
import { Table, Container, Button, ButtonToolbar } from "react-bootstrap";
class Header extends React.Component {
  render() {
    return (
      <div className='header' >
        
        <h1>{this.props.pageTitle}</h1>
        
       
        
      </div>
      
    );
  }
}

export default Header;