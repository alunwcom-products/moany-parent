import React, { Component } from 'react';

class UserInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      id: ""
    };
    this.props.keycloak.loadUserInfo().then(userInfo => {
        this.setState({name: userInfo.name, email: userInfo.email, id: userInfo.sub})
    });
  }

  componentDidMount() {}

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
      <div className="UserInfo">
        <p>Name: {this.state.name}</p>
        <p>Email: {this.state.email}</p>
        <p>ID: {this.state.id}</p>

        <button onClick={this.props.keycloak.accountManagement}>Account</button>
        <button onClick={this.props.keycloak.register}>Register</button>
        <button onClick={this.callApi}>Call API</button>

        {/*
        { console.log(this.props.keycloak.token) }
        { console.log('Bearer ' + this.props.keycloak.idToken) }
        { console.log(this.props.keycloak.tokenParsed) }
        { console.log(this.props.keycloak.idTokenParsed) }
        */}

      </div>
    );
  }
}

export default UserInfo;
