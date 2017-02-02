Intro to ReactJS

Presenter

John Contreras
twitter: @johnnycon
github: https://github.com/johnnycon
blog: https://OriginMaster.com
work: CEO/CoFounder at https://Stridekick.com
email: john@stridekick.com

Prerequisites

Node and npm (If you don’t have node/npm installed, go to https://nodejs.org/en/ )

    node --version
    npm --version

yarn (preferred methods to install yarn, check https://yarnpkg.com/docs/install )

    // may need to sudo install yarn
    npm install -g yarn

create-react-app

    npm install -g create-react-app

react-dev-tools chrome extension (optional)

    https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en
Workshop Goals
- A little history, a little theory, some context, mostly coding together.  
- Only have 80-90 minutes, so will breeze over some things and not cover others.
- Using lots of modern tooling
  - Yarn
  - ES6, ES7 etc..
- We will limit external components.  A couple exceptions
- React Router v4
- App
  - Couple pages
  - Couple routes
  - Couple visuals
  - API call
  - Some state
History of React
- Created in 2011 by an engineer at Facebook
- Deployed internally at Facebook and Instagram in 2011 and 2012
- Open sourced in 2013
- Defied a number of best practices
- Many of Reacts principles are now being adopted by other frameworks
- Used heavily at companies like Facebook, Twitter, Netflix, Airbnb, Walmart and a ton of startups
- Spreading React
  - Has a mobile counterpart React Native
  - Works great as a desktop app tool using electron and reactjs
  - React VR for immersive VR experiences
Important ideas in react
Design principles
- Composition (Components)
- Common Abstractions
  - Support for local state
  - Life-cycle hooks
  - Cross browser event normalization
- Stability (stable api, migration paths and deprecation warnings)
- Interoperable

Developer Experience

- React dev tools
- Redux dev tools
- Hot module reloading

Performance

- Virtual DOM
- One-way data flow

Managing complexity

- JSX
- Functional Style
- State management
Let’s create our app
How it used to be done

Historically, running react consisted of trying to coordinate/coerce/hack/fight a number of tools to work together.  This is the point where most people would give up on their journey to learning React.  It happened to me twice.  These tools consisted of things like:

- Babel
- Babel presets and plugins
- Webpack
- Build systems
- Hot module reloading
- etc.. etc… a ton of weird json configuration

A lot of boilerplate projects were created to try and address this, but they tended to be very opinionated and kitchen sinks.


A better solution now

Create React App (C-R-A) was created by Dan Abramov (creator of Redux), to simplify the creation of react apps (similar to how they are done in React Native).

Let’s create our app!

    create-react-app cityview

You should now have a very simple, but functional react project.  Let’s run it.

    cd cityview
    yarn start


Structure of project

Let’s cover the important pieces

- Clean package.json file
  - let’s eject and see how much complexity has been created (and hidden) for us
- Our html entry point /public/index.html
- Our application entry point /src/index.js
- App.js, where the first of our real code appears.
- (optional) react-dev-tools

Let’s simplify App.js to this

    import React, { Component } from 'react';
    import './App.css';

    class App extends Component {
      render() {
        return (
          <div>
            Hello react
          </div>
        );
      }
    }

    export default App;


Save the file and see how the app will auto-reload in the browser.

The anatomy of a very simple component

- import things you need
- your component (class-based or functional)
  - render method
  - jsx
- export your component
Navigation, our first component
- Create a new file called Navigation.js (in the /src directory)


    // lets install react router
    yarn add react-router-dom@next

Final navigation page

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


Build our pages
- Create a new file called About.js (in the /src directory)
- Create a new file called Home.js (in the /src directory)

About page

    import React, {Component} from 'react'

    class About extends Component  {
      render(){
        return (
          <div>
            <h3>About</h3>
            <p>This app helps you research city populations</p>
          </div>
        )
      }
    }

    export default About

Home page

    import React, { Component } from 'react';

    class Home extends Component {
      render() {
        return (
          <div>
            <h3>Cities</h3>
            I am at home now!
          </div>
        );
      }
    }

    export default Home;


Life-cycle events

Most useful (let’s console log)

- constructor
- componentDidMount

Useful in some circumstances

- componentWillMount
- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
Add dynamic data from API

Updated Home page

    import React, { Component } from 'react';

    class Home extends Component {
      state = {cities: []}

      async componentDidMount() {
        const response = await fetch('https://cl-react.herokuapp.com/cities')
        const cities   = await response.json()

        this.setState({cities: cities})
      }

      render() {
        return (
          <div>
            <h3>Cities</h3>

            {this.state.cities.map( city => {
              return <div>{city.name} : {city.population}</div>
            })}
          </div>
        );
      }
    }

    export default Home;




Render each city as an individual component

Home.js

    import React, { Component } from 'react';
    import City from './City'

    class Home extends Component {
      state = {cities: []}

      async componentDidMount() {
        const response = await fetch('https://cl-react.herokuapp.com/cities')
        const cities   = await response.json()

        this.setState({cities: cities})
      }

      render() {
        return (
          <div>
            <h3>Cities</h3>

            {this.state.cities.map( city => {
              return <City key={city.name} name={city.name} population={city.population} />
            })}
          </div>
        );
      }
    }

    export default Home;

City.js

    import React, {Component} from 'react'
    import './City.css';

    class City extends Component  {
      constructor(){
        super()
        this.state = {
          highlighted: false
        }
      }

      handleHighlight = () => {
        const {highlighted} = this.state
        this.setState({
          highlighted: !highlighted
        })
      }

      render(){
        const {name, population} = this.props
        const {highlighted} = this.state

        return (
          <div className={highlighted ? 'highlight' : ''}>
            City is <b>{name}</b>, popuation is {population}
            <button onClick={this.handleHighlight} className="hollow button warning small"> Highlight</button>
          </div>
        )
      }
    }

    export default City


City.css

    .highlight {
      background-color: yellow;
      font-size: 20px
    }
