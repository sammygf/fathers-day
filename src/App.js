import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Card } from './components/Card/Card';
import { Home } from './components/Home/Home';
import { Upload } from "./components/Upload/Upload";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/upload" exact component={Upload} />
        <Route path="/share/:id" component={Card} />
      </Router>
    );
  }
}

export default App;
