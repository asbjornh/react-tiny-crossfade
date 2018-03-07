import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import TinyTransition from "react-tiny-transition";

// Because TinyTransition uses request animation frame, we need to wait two frames before accessing children in the DOM
function waitTwoFrames(callback) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      callback();
    });
  });
}

class Crossfade extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.string,
    disableInitialAnimation: PropTypes.bool,
    duration: PropTypes.number,
    transitionClassNames: PropTypes.shape({
      beforeEnter: PropTypes.string,
      entering: PropTypes.string,
      beforeLeave: PropTypes.string,
      leaving: PropTypes.string
    })
  };

  static defaultProps = {
    component: "div",
    disableInitialAnimation: false,
    duration: 500
  };

  state = {
    children: this.props.disableInitialAnimation ? this.props.children : null,
    height: this.props.disableInitialAnimation ? "auto" : 0
  };

  setWrapperHeight = () => {
    const wrapper = ReactDOM.findDOMNode(this);
    const child = wrapper && wrapper.firstElementChild;

    if (child) {
      this.setState({ height: child.offsetHeight });
    }
  };

  transition = nextChildren => {
    this.setState({ children: null }, () => {
      clearTimeout(this.delayTimer);
      this.delayTimer = setTimeout(() => {
        waitTwoFrames(() => {
          this.setState({ children: nextChildren }, () => {
            waitTwoFrames(() => {
              this.setWrapperHeight();
            });
          });
        });
      }, this.props.duration);
    });
  };

  componentDidMount() {
    if (!this.props.disableInitialAnimation) {
      this.transition(this.props.children);
    } else {
      this.setWrapperHeight();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.children !== this.props.children) {
      this.transition(nextProps.children);
    }
  }

  render() {
    const Component = this.props.component;

    return (
      <Component
        className={this.props.className}
        style={{ height: this.state.height }}
      >
        <TinyTransition
          duration={this.props.duration}
          disableInitialAnimation={this.props.disableInitialAnimation}
        >
          {this.state.children}
        </TinyTransition>
      </Component>
    );
  }
}

export default Crossfade;
