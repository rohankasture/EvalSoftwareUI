import React, { Component } from 'react';

import EvalueeDetail from './components/evaluee_detail';
import EvalueeList from './components/evaluee_list';

import './App.css';
import { BrowserRouter, Route } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <div>
        <EvalueeList/>
        <EvalueeDetail/>
      </div>
      // <BrowserRouter>
      //   <div>
      //     <Route
      //       exact={true}
      //       path="/"
      //       render={() => (
      //         <div className="App">
      //           <LoginPage/>
      //         </div>
      //       )}
      //     />
      //     <Route
      //       exact={true}
      //       path="/mainpage"
      //       render={() => (
      //         <div className="App">
      //           <MainPage/>
      //         </div>
      //       )}
      //     />
      //   </div>
      // </BrowserRouter>
    );
  }
}

export default App;
