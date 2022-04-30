import React, { Component } from 'react';
import SubTest from './SubTest';

class Test extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      name: "<not known>",
      email: "",
      id: ""
    };
  }

  componentDidMount() {
    this.setState({
      name: "Bill"
    })
  }

  buttonHandler = () => {
    console.log("button handler called")
    this.setState({
      name: "Joe"
    })
  }

  render() {
    return (
      <div className="shared debug">
        <button onClick={this.buttonHandler}>Do Stuff</button>
        <p>Name = {this.state.name}</p>
        <SubTest person={this.state} />
      </div>
    );
  }
}

export default Test;
