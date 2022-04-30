import React, { Component } from 'react';
import Logout from './Logout';

class AdminApi extends Component {

  callApi = () => {
    fetch("http://localhost:9001/test/admin", {
       headers: new Headers({
         'Authorization':'Bearer '+this.props.keycloak.token
       }),
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
        this.setState({
          isLoaded: true,
          items: result.items
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log(error)
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  render() {
    return (
      <div className="shared">
        <button onClick={this.props.keycloak.accountManagement}>Account</button>
        <button onClick={this.props.keycloak.register}>Register</button>
        <button onClick={this.callApi}>Call API</button>
        <Logout keycloak={this.props.keycloak} />
      </div>
    );
  }
}

export default AdminApi;
