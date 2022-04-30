import React, { Component } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import Keycloak from 'keycloak-js';
// import Welcome from './Welcome';
// import AdminApi from './AdminApi';
// import Test from './Test';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: "Loading...",
      keycloak: null, 
      authenticated: false,
      roles: [],
      userInfo: {
        email: "",
        emailVerified: false,
        familyName: "",
        givenName: "",
        name: "",
        preferredUsername: "",
        sub: ""
      }
    };
  }

  componentDidMount() {
    this.initKeycloak()
  }

  initKeycloak = () => {
    this.setState({status: "Connecting..."})

    const keycloak = Keycloak('/keycloak.json');
    keycloak.init({
      onLoad: 'check-sso',
      // silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      pkceMethod: 'S256'
    })
    .then(authenticated => {
      this.setState({
        status: "Connected",
        keycloak: keycloak, 
        authenticated: authenticated
      });
      if (this.state.authenticated) {
        this.setState({status: "Connected with Auth"})
      }
    })
    .then(this.fetchUserInfo)
    .catch(error => {
      console.log("error = " + error)
    })
  }

  fetchUserInfo = () => {
    this.state.keycloak.loadUserInfo()
    .then(userInfo => {
      this.setState({
        name: userInfo.name, 
        email: userInfo.email, 
        id: userInfo.sub
      })
    })
    .catch(error => {
      console.log("userinfo error = " + error)
    })
  }
  
  render() {
    if(this.state.keycloak) {
      if(this.state.authenticated) {
        return (
          <BrowserRouter>
            <div className="shared">Connected [{this.state.name}] [{this.state.status}]</div>
            <AdminApi keycloak={this.state.keycloak}/>
            <Test />
          </BrowserRouter>
        )
      } else {
        return (
          <BrowserRouter>
            <div className="shared"><button onClick={this.state.keycloak.login}>Login</button> [{this.state.status}]</div>
            <Welcome/>
            <Test />
          </BrowserRouter>
        )
      }
    } else {
      return (
        <BrowserRouter>
          <div className="shared">Connecting... [{this.state.status}]</div>
          <Test />
        </BrowserRouter>
      )
    }
  }
}

export default App;
