import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Card } from './components/Card/Card';
import { Home } from './components/Home/Home';
import { Upload } from "./components/Upload/Upload";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Switch>
          <Route path="/upload" exact component={Upload} />
          <Route path="/:id" exact component={Card} />
        </Switch>
      </Router>
    );
  }
}

export default App;
