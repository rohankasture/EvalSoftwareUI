import React, { Component } from 'react';
import LoginPage from "./Components/LoginPage";
import MainPage from "./Components/MainPage";

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
            path="/mainpage"
            render={() => (
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
