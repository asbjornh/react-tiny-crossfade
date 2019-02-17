import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import TinyTransition from "react-tiny-transition";

class Crossfade extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.string,
    disableInitialAnimation: PropTypes.bool,
    duration: PropTypes.number,
    classNames: PropTypes.shape({
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

  delayTimer = null;
  heightTimer = null;
  raf = null;

  // Because TinyTransition uses request animation frame, we need to wait two frames before accessing children in the DOM
  waitTwoFrames = callback => {
    this.raf = requestAnimationFrame(() => {
      this.raf = requestAnimationFrame(() => {
        callback();
      });
    });
  };

  setWrapperHeight = () => {
    const wrapper = ReactDOM.findDOMNode(this);
    const child = wrapper && wrapper.firstElementChild;
    const newHeight = child ? child.offsetHeight : 0;

    this.previousHeight = newHeight;

    clearTimeout(this.heightTimer);
    this.setState({ height: newHeight }, () => {
      this.heightTimer = setTimeout(() => {
        this.setState({ height: "auto" });
      }, this.props.duration);
    });
  };

  transition = nextChildren => {
    clearTimeout(this.delayTimer);
    clearTimeout(this.heightTimer);

    this.setState({ children: null, height: this.previousHeight }, () => {
      this.delayTimer = setTimeout(() => {
        this.waitTwoFrames(() => {
          this.setState({ children: nextChildren }, () => {
            this.waitTwoFrames(() => {
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

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      this.transition(this.props.children);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.delayTimer);
    clearTimeout(this.heightTimer);
    cancelAnimationFrame(this.raf);
  }

  render() {
    const Component = this.props.component;

    return (
      <Component
        className={this.props.className}
        style={{ height: this.state.height }}
      >
        <TinyTransition
          classNames={this.props.classNames}
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
