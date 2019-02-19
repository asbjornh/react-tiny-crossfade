/* eslint react/prefer-stateless-function: 0 */
/* eslint react/no-multi-comp: 0 */
jest.disableAutomock().useRealTimers();

const React = require("react");
const ReactDOM = require("react-dom");
const TinyCrossfade = require("../lib").default;
const TestUtils = require("react-dom/test-utils");

global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

class View extends React.Component {
  render() {
    return <div {...this.props} />;
  }
}

describe("TinyCrossfade", () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
  });

  it("should not crash", () => {
    expect(() =>
      TestUtils.renderIntoDocument(
        <TinyCrossfade>
          <div />
        </TinyCrossfade>
      )
    ).not.toThrow();
  });

  it("should render children", () => {
    class TestComponent extends React.Component {
      constructor(props) {
        super(props);
      }
      render() {
        return (
          <TinyCrossfade>
            <View>{"foo"}</View>
          </TinyCrossfade>
        );
      }
    }

    const testComponent = TestUtils.renderIntoDocument(<TestComponent />);

    const reactTinyCrossfade = TestUtils.findRenderedComponentWithType(
      testComponent,
      TinyCrossfade
    );

    return new Promise(done => {
      setTimeout(() => {
        const elements = TestUtils.scryRenderedComponentsWithType(
          reactTinyCrossfade,
          View
        );

        expect(elements.length).toBe(1);
        done();
      }, 600);
    });
  });

  it("should apply classnames", () => {
    class TestComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          showA: true
        };
      }
      render() {
        return (
          <TinyCrossfade disableInitialAnimation={true}>
            {this.state.showA ? (
              <View key="a">{"foo"}</View>
            ) : (
              <View key="b">{"bar"}</View>
            )}
          </TinyCrossfade>
        );
      }
    }

    const testComponent = TestUtils.renderIntoDocument(<TestComponent />);

    return new Promise(done => {
      testComponent.setState(
        {
          showA: false
        },
        () => {
          setTimeout(() => {
            const node = ReactDOM.findDOMNode(testComponent);
            const child = node.firstElementChild;

            expect(!!child).toBe(true);
            expect(child.getAttribute("class")).toBe("before-leave leaving");

            setTimeout(() => {
              const child = node.firstElementChild;
              expect(child.getAttribute("class")).toBe("before-enter entering");
              done();
            }, 500);
          }, 20);
        }
      );
    });
  });

  it("should apply custom classnames", () => {
    class TestComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          showA: true
        };
      }
      render() {
        return (
          <TinyCrossfade
            disableInitialAnimation={true}
            classNames={{
              beforeEnter: "test1",
              entering: "test2",
              beforeLeave: "test3",
              leaving: "test4"
            }}
          >
            {this.state.showA ? (
              <View key="a">{"foo"}</View>
            ) : (
              <View key="b">{"bar"}</View>
            )}
          </TinyCrossfade>
        );
      }
    }

    const testComponent = TestUtils.renderIntoDocument(<TestComponent />);

    return new Promise(done => {
      testComponent.setState(
        {
          showA: false
        },
        () => {
          setTimeout(() => {
            const node = ReactDOM.findDOMNode(testComponent);
            const child = node.firstElementChild;

            expect(!!child).toBe(true);
            expect(child.getAttribute("class")).toBe("test3 test4");

            setTimeout(() => {
              const child = node.firstElementChild;
              expect(child.getAttribute("class")).toBe("test1 test2");
              done();
            }, 500);
          }, 20);
        }
      );
    });
  });
});
