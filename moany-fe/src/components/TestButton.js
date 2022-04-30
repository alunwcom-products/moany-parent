import React, { Component } from 'react';
import './TestButton.css';

class TestButton extends Component {

  constructor(props) {
    super();
    this.state = {
      result: " ",
      loading: true
    }
  }

  componentDidMount() {
    this.setState({
      loading: false
    })
  }

  callApi = () => {
    this.setState({
      result: "...",
      loading: true
    })
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
          loading: false,
          result: JSON.stringify(result, null, 2)
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log(error)
        this.setState({
          loading: false,
          result: "Error... ("+error+")"
        });
      }
    )
  }

  render() {
    return (
      <div className="shared">
        {/*
        <button onClick={this.props.keycloak.accountManagement}>Account</button>
        <button onClick={this.props.keycloak.register}>Register</button>
        */}
        <button onClick={this.callApi} disabled={this.state.loading}>Call API</button>
        <pre className="json">{this.state.result}</pre>
      </div>
    );
  }
}

export default TestButton;
