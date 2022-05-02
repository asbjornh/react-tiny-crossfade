import React, { Component } from "react";
import { createRoot } from "react-dom/client";

require("./style.css");

import Crossfade from "../src";

class App extends Component {
  state = {
    content: "Component A",
    showA: true,
  };

  toggle = () => {
    this.setState(state => ({ showA: !state.showA }));
  };

  toggleContent = () => {
    this.setState({ content: "Heyyyyyyy" });
  };

  render() {
    return (
      <div className="page">
        <h1>TinyCrossfade</h1>
        <button onClick={this.toggle}>Toggle component</button>
        <button onClick={this.toggleContent}>Toggle content</button>
        <Crossfade
          className="crossfade"
          classNames={{
            beforeEnter: "test1",
            entering: "test2",
            beforeLeave: "test3",
            leaving: "test4",
          }}
          disableInitialAnimation={true}
        >
          {this.state.showA ? (
            <div className="component" key="a">
              <h2>{this.state.content}</h2>
            </div>
          ) : (
            <div className="component" key="b">
              <h2>Component B</h2>
              <p>Hello 🎉</p>
            </div>
          )}
        </Crossfade>
      </div>
    );
  }
}

createRoot(document.getElementById("App")).render(<App />);
