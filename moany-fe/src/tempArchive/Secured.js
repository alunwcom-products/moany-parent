import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import UserInfo from './UserInfo';
// import Logout from './Logout';
/*import Keycloak from 'keycloak-js';*/

class Secured extends Component {

  /*
  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    const keycloak = Keycloak('/keycloak.json');
    keycloak.init({onLoad: 'login-required'}).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated })
    })
  }
  */

  render() {
    return (
      <div className="shared">
    {/*
    if(this.state.keycloak) {
      if(this.state.authenticated) return (
        <div>
          <p><Link to="/">public component</Link></p>
          <p>
            You shouldn't be able to see this unless you've authenticated.
          </p>
          <UserInfo keycloak={this.state.keycloak} />
          <Logout keycloak={this.state.keycloak} />
        </div>
      ); else return (<div>Unable to authenticate!</div>)
    }
    return (
      <div>Initializing Keycloak...</div>
    );
    */}

      <p><Link to="/">back to landing page (public component)</Link></p>
      </div>
    )
  }
}

export default Secured;
