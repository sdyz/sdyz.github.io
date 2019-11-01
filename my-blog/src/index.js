import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import './index.css';
import Home from './pages/home';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
