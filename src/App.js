import React, { Component } from 'react';
import LoginPage from "./Components/LoginPage";
import MainPage from "./Components/MainPage";
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import backgroundImage from "./Images/backgroundimage.jpg"

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route
            exact={true}
            path="/"
            render={() => (
              <div className="App">
                <LoginPage/>
              </div>
            )}
          />
          <Route
            exact={true}
            // path="/mainpage/:email"
            path="/mainpage"
            render={(res) => (       
              <div className="App" style={{backgroundImage: `url(${backgroundImage})`, top:'0', bottom:'0',left:'0',right:'0',position:'absolute'}}>
                <MainPage/>
              </div>
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
