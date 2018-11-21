import React, { Component } from "react";
import "./LoginPage.css"
import axios from "axios";
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
const formStyle = {
  paddingLeft: "300px",
  paddingTop: "20px"
};

const welcomeStyle = {
  color: "blue",
  fontSize: "35px"
}; 
const colorStyle = {
  color: "blue",
};  

const bgStyle = {
  height: "100%",
  width: "100%",
  position: "absolute"
};
const divStyle = {
  paddingTop: "40px",
  height: "100%",
  width: "100%",
  backgroundColor: "#F17070",
  display: "inline-block"
};
const imgStyle = {
  height: "70%",
  width: "75%",
  align: "center"
};

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
  
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch = event =>{
    event.preventDefault();
    window.location.assign('/mainpage');
  };

  render() {
    

    return (
      <div>
        <h1>Welcome to CSCI-P 532/632 Evaluation Software</h1>
          <div className="divStyle">
          <h2 style={{color:'blue'}}> Evaluation Software</h2>
            <div className= "fContainer" >
                <div className ="flexItem">UserName:</div>
                <div className ="flexItem">
                <input
                    type="text"
                    required
                    className="username"
                    placeholder = "IU Username"
                    ref="username"
                  /></div>
               </div>
               <div className= "fContainer" >
                <div className ="flexItem">Password:</div>
                <div className ="flexItem">
                  <input
                    type="text"
                    required
                    className="password"
                    placeholder = "password"
                    ref="userpassword"
                  /></div>
                </div>
              <div className="divStyle">
                  <Button
                    onClick = {this.handleSearch}
                    type="submit"
                    className="btn btn-primary mb-2 btn-color"
                    color = 'primary'
                    variant ='contained'
                  >
                    <u>Login</u>
                  </Button>
                  
              </div>
            </div>  
        </div>

     ); 
  }
  }
export default LoginPage;
