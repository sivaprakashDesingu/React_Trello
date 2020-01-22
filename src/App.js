import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import {Dashboard,Header} from './container'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
