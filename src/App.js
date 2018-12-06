import React, { Component } from 'react';
import LoginPage from "./Components/LoginPage";
import MainPage from "./Components/MainPage";
import SignUp from "./Components/SignUp"
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import UserLogin from './Components/UserLogin';
import ErrorPage from './Components/ErrorPage';

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
              <div className="App" >
                <MainPage/>
              </div>
            )}
          />
          <Route
            exact={true}
            path="/signup"
            render={(res) => (       
              <div className="App">
                <SignUp/>
              </div>
            )}
          />
          <Route
            exact={true}
            path="/register"
            render={(res) => (       
              <div className="App">
                <UserLogin/>
              </div>
            )}
          />
          <Route
            exact={true}
            path="/error"
            render={(res) => (       
              <div className="App">
                <ErrorPage/>
              </div>
            )}
          />
           <Route
            exact={true}
            path="/success"
            render={(res) => (       
              <div className="App">
                <ErrorPage/>
              </div>
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
