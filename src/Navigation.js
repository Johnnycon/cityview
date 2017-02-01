import React, {Component} from 'react'
import logo from './logo.svg';
import About from './About'
import Home  from './Home'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Navigation extends Component {
  render(){
    return (
      <div>

        <Router>
          <div>
            <ul className="menu">
              <li><img src={logo} className="App-logo" alt='logo' /></li>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>

            <Route path="/"       component={Home} exact />
            <Route path="/about"  component={About} />
          </div>
        </Router>
      </div>
    )
  }
}

export default Navigation
