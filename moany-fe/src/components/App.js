import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import './App.css';
import TestButton from './TestButton';

class App extends Component {

  kcSettings = {
    onLoad: 'check-sso',
    // silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256'
  }

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
    this.initKeycloak();
    this.timerId = setInterval(
      () => this.updateToken(),
      10000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  updateToken() {
    if (this.state.authenticated) {
      const kc = this.state.keycloak
      kc.updateToken(120)
      .then(resp => {
        if (resp) {
          console.log("updated token!")
        }
      })
      .catch(err => console.log("error updating token :( " + err));
      console.log('Token Expires in:\t' + Math.round(kc.tokenParsed.exp + kc.timeSkew - new Date().getTime() / 1000) + ' seconds\n');
    }
  }

  initKeycloak = () => {
    const kc = Keycloak('/keycloak.json')
    this.setState({
      roles: [],
      name: "",
      status: "Connecting..."
    });
    kc.init(this.kcSettings)
    .then(authenticated => this.keycloakInitSuccess(kc, authenticated))
    .catch(error => {
      console.log("init error = " + error)
      this.setState({status: "Connection error!"});
    });
  }

  keycloakInitSuccess = (kc, authenticated) => {
    this.setState({
      status: "Connected",
      keycloak: kc,
      authenticated: authenticated
    });
    if (this.state.authenticated) {
      this.authenticationHandler(kc);
    }
  }

  authenticationHandler = (kc) => {
    kc.loadUserInfo()
    .then(userInfo => {
      // debug
      console.log(kc.tokenParsed);
      this.setState({
        name: userInfo.name, 
        email: userInfo.email, 
        id: userInfo.sub,
        roles: kc.tokenParsed.realm_access.roles
      });
    })
    .catch(error => console.log("userinfo error = " + error));
  }

  render() {

    let button = <button disabled={true}>Login</button>;
    let token = ''
    if (this.state.keycloak) {
      if (this.state.authenticated) {
        button = <button onClick={this.state.keycloak.logout}>Log Out</button>
        token = this.state.keycloak.token
      } else {
        button = <button onClick={this.state.keycloak.login}>Login</button>
      }
    }

    return (
      <div>
        <div className="shared debug">
          <p>Status: {this.state.status}</p>
          <p>{token}</p>
        </div>
        <div className="shared">
          {button} [user = {this.state.name}, roles = {this.state.roles.toString()}]
        </div>
        { this.state.authenticated ? 
          this.state.roles.includes('app-user') ? <TestButton keycloak={this.state.keycloak}/> : <div className="shared">You do not have permission to access to API</div>
          : ''
        }
      </div>
    )
  }
}

export default App;
