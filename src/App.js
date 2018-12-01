import React, { Component } from 'react';
// import LoginPage from "./Components/LoginPage";
import LoginPage from "./Components/LoginPage";
import MainPage from "./Components/MainPage";
import axios from 'axios';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";


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
              <div className="App">
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
