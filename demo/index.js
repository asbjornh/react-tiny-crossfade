import React, { Component } from "react";
import ReactDOM from "react-dom";

require("./style.css");

import Crossfade from "../src";

class App extends Component {
  state = {
    showA: true
  };

  toggle = () => {
    this.setState(state => ({ showA: !state.showA }));
  };

  render() {
    return (
      <div className="page">
        <h1>TinyCrossfade</h1>
        <button onClick={this.toggle}>Toggle component</button>
        <Crossfade className="crossfade" disableInitialAnimation={true}>
          {this.state.showA ? (
            <div className="component">
              <h2>Component A</h2>
            </div>
          ) : (
            <div className="component">
              <h2>Component B</h2>
              <p>Hello 🎉</p>
            </div>
          )}
        </Crossfade>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("App"));
