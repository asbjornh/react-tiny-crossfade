# react-tiny-crossfade

TinyCrossfade is a lightweight component for adding css transitions when replacing one component with another. Specifically, TinyCrossfade does these things:

* Measures height and applies it inline so you can add a transition
* Adds class names when children are mounting/unmounting so you can add your animation effects.

### Browser support:
TinyCrossfade needs `requestAnimationFrame` and `element.classList` in order to do its thing, so make sure to add polyfills if you need to support older browsers (like IE9 and below).


### Why it exists
There are a couple of other libraries like this, like [react-crossfade](https://github.com/m-anikanov/react-crossfade) or [react-css-transition-replace](https://github.com/marnusw/react-css-transition-replace). These usually use [react-transition-group](https://github.com/reactjs/react-transition-group) which is great, but in some cases it is just too big a library if you just want to do simple css stuff. TinyCrossfade is meant to be a smaller alternative and uses [react-tiny-transition](https://github.com/asbjornh/react-tiny-transition) instead, which is a much smaller library.


### Other Tiny libraries

* [react-tiny-transition](https://github.com/asbjornh/react-tiny-transition)


## Install

```console
npm install --save react-tiny-crossfade
```

or

```console
yarn add react-tiny-crossfade
```

## Import

```javascript
// in ES5/commonJS
var TinyCrossfade = require("react-tiny-crossfade").default;

// in ES6
import TinyCrossfade from "react-tiny-crossfade";
```

## Props:

| Prop         | Type          | Default | Description                                                                       |
| ------------ | ------------- | --------- | --------------------------------------------------------------------------------- |
| `children`   | React element |         | Single React element
| `component`  | String        | "div"   | Type of element used for the wrapper node
| `duration`   | Number        | 500       | The duration of your css transition (milliseconds)                              |
| `disableInitialAnimation` | Boolean | false | Disable the animation when TinyTransition mounts
| `transitionClassNames` | Object        | <pre>{<br>  beforeEnter: "before-enter",<br>  entering: "entering",<br>  beforeLeave: "before-leave",<br>  leaving: "leaving"<br>}</pre>    | Classnames to use when mounting / unmounting |


#### Example usage:

```js
<TinyCrossfade className="component-wrapper">
  {this.state.showComponentA
  	 ? <ComponentA />
  	 : <ComponentB />
  }
</TinyCrossfade>
```


#### CSS example:

TinyCrossfade will add the following class names (unless you provided your own). When your child component is mounting, `before-enter` will be applied. Here's where you put the initial styles of your mounting animation. One frame later, `entering` will be applied, which is where you put the final animation styles as well as a transition property. Same logic for unmounting-transition.

(Remember to add transition and overflow to the wrapper if you want animated height)

```css
.component-wrapper {
  transition: height 0.5s;
  overflow: hidden;
}

.before-enter {
  opacity: 0;
}

.entering {
  opacity: 1;
  transition: opacity 0.5s;
}

.before-leave {
  opacity: 1;
}

.leaving {
  opacity: 0;
  transition: opacity 0.5s;
}
```
