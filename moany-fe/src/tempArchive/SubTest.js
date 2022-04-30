import React, { Component } from 'react';

class SubTest extends Component {

  render() {
    if (this.props.person !== undefined) {
      return (
        <p>Sub-Test Name = {this.props.person.name}</p>
      );
    } else {
      return (
        <p>Sub-Test Name = </p>
      );
    }
  }
}

export default SubTest;
