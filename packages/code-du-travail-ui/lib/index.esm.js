import React, { Component, Children, cloneElement, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import { createPortal } from 'react-dom';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

var Question = function Question(props) {
  return React.createElement("svg", _extends({
    viewBox: "0 0 50 50"
  }, props), React.createElement("title", null, "question"), React.createElement("g", {
    fill: props.fill ? props.fill : "currentColor",
    fillRule: "evenodd"
  }, React.createElement("path", {
    d: "M33.045 30.728a.951.951 0 0 0-.955.946v6.533c0 2.61-2.143 4.733-4.775 4.733H17.003a.951.951 0 0 0-.955.947l-.001 1.882-2.28-2.26a.955.955 0 0 0-.876-.569H6.685c-2.633 0-4.775-2.123-4.775-4.733v-14.58c0-2.61 2.142-4.734 4.775-4.734h9.647a.951.951 0 0 0 .955-.946.951.951 0 0 0-.955-.947H6.685C3 17 0 19.973 0 23.627v14.58c0 3.654 2.999 6.627 6.685 6.627h5.717l3.922 3.889a.96.96 0 0 0 1.04.205.946.946 0 0 0 .59-.874l.003-3.22h9.358C31 44.834 34 41.86 34 38.207v-6.533a.951.951 0 0 0-.955-.946z"
  }), React.createElement("path", {
    d: "M35.201 0H32.8C25.189 0 19 6.195 19 13.81s6.19 13.811 13.798 13.811h2.403a13.82 13.82 0 0 0 3.502-.45l3.55 3.551a.949.949 0 0 0 1.62-.672v-5.498a13.942 13.942 0 0 0 3.627-4.475c.995-1.952 1.5-4.06 1.5-6.267C49 6.195 42.81 0 35.201 0zm7.152 23.33a.95.95 0 0 0-.379.76v3.667l-2.323-2.324a.948.948 0 0 0-.95-.236c-1.13.347-2.307.524-3.5.524H32.8c-6.562 0-11.9-5.343-11.9-11.91 0-6.568 5.338-11.91 11.9-11.91H35.2c6.562 0 11.9 5.342 11.9 11.91 0 3.775-1.73 7.245-4.748 9.52z"
  }), React.createElement("path", {
    d: "M37.99 10.71a4.005 4.005 0 0 0-3.708-3.7A4 4 0 0 0 30 10.99a.944.944 0 0 0 1.89 0c0-.59.238-1.136.67-1.539a2.099 2.099 0 0 1 1.591-.56 2.109 2.109 0 0 1 1.954 1.948 2.096 2.096 0 0 1-1.641 2.206 1.785 1.785 0 0 0-1.409 1.748v2.264a.944.944 0 0 0 1.89 0V14.87a3.971 3.971 0 0 0 3.045-4.16zM34.707 19.293A1.01 1.01 0 0 0 34 19a1.01 1.01 0 0 0-.707.293A1.008 1.008 0 0 0 33 20c0 .264.107.522.293.708a1.006 1.006 0 0 0 1.414 0A1.01 1.01 0 0 0 35 20c0-.263-.107-.52-.293-.707zM26.048 30H5.952C5.426 30 5 30.448 5 31s.426 1 .952 1h20.096c.526 0 .952-.448.952-1s-.426-1-.952-1zM26.707 35.293A1.007 1.007 0 0 0 26 35c-.263 0-.521.107-.707.293A1.007 1.007 0 0 0 25 36c0 .263.107.521.293.707.186.186.444.293.707.293.263 0 .521-.107.707-.293.186-.186.293-.443.293-.707 0-.263-.107-.521-.293-.707zM23.009 35H5.99A.996.996 0 0 0 5 36c0 .552.444 1 .991 1H23.01A.996.996 0 0 0 24 36c0-.552-.444-1-.991-1zM20.036 25H5.964C5.432 25 5 25.448 5 26s.432 1 .964 1h14.072c.532 0 .964-.448.964-1s-.432-1-.964-1z"
  })));
};
Question.propTypes = {
  fill: PropTypes.string
};



var index = /*#__PURE__*/Object.freeze({
  Question: Question
});

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  0% {\n    transform: translateX(-100%);\n  }\n\n  100% {\n    transform: translateX(0);\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  0% {\n    transform: translateY(100%);\n  }\n\n  100% {\n    transform: translateY(0);\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  0% {\n    transform: translateX(100%);\n  }\n\n  100% {\n    transform: translateX(0);\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  0% {\n    transform: translateY(-100%);\n  }\n\n  100% {\n    transform: translateY(0);\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  0% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var fadeIn = keyframes(_templateObject());
var fromTop = keyframes(_templateObject2());
var fromRight = keyframes(_templateObject3());
var fromBottom = keyframes(_templateObject4());
var fromLeft = keyframes(_templateObject5());

var keyframes$1 = /*#__PURE__*/Object.freeze({
  fadeIn: fadeIn,
  fromTop: fromTop,
  fromRight: fromRight,
  fromBottom: fromBottom,
  fromLeft: fromLeft
});

var colors = {
  black: "#0c0c0e",
  almostBlack: "#26353f",
  blue: "#0053b3",
  blueLight: "#006be6",
  blueDark: "#003b80",
  elementBackground: "#f5f7fa",
  elementBorder: "#c9d3df",
  white: "#fff",
  lighterGrey: "#ebeff3",
  lightGrey: "#c9d3df",
  grey: "#adb9c9",
  darkGrey: "#8393a7",
  darkerGrey: "#53657d",
  title: "#006ab2",
  lightBackground: "#f9f9fc",
  lightText: "#4c5467",
  darkBackground: "#ebeff3",
  darkText: "#434956",
  /// ui colours
  markBackground: "#fff28e",
  focus: "#80bdff",
  focusShadow: "#bfdeff",
  primaryBackground: "#005994",
  secondaryBackground: "#eaeaea",
  successBackground: "#e0f2bd",
  infoBackground: "#d7e8f9",
  warningBackground: "#fee5ad",
  dangerBackground: "#f6bcc2"
}; // adding colour shortcuts

colors.primaryText = colors.white;
colors.secondaryText = colors.black;
colors.successText = colors.black;
colors.infoText = colors.black;
colors.warningText = colors.black;
colors.dangerText = colors.black;
/* Rem with a 16px base:
  20px = 1.25rem => (20 * 1) / 16
  12px => 0.75rem
  10px => 0.625rem
  etc.
*/

var spacing = {
  tiny: "0.25rem",
  // 4px
  xsmall: "0.5rem",
  // 8px
  small: "0.625rem",
  // 10px
  base: "1rem",
  // 16px
  medium: "1.25rem",
  // 20px
  large: "2rem",
  // 32px
  larger: "2.5em",
  // 40px
  interComponent: "1.25rem"
};
var fonts = {
  sizeBase: "1rem",
  lineHeight: "1.4",
  sizeXsmall: "0.8rem",
  sizeSmall: "0.9rem",
  sizeH1: "1.6rem",
  sizeH2: "1.5rem",
  sizeH3: "1.4rem",
  sizeH4: "1.3rem",
  sizeH5: "1.2rem",
  sizeH6: "1.1rem"
};
var breakpoints = {
  desktop: "1200px",
  tablet: "980px",
  mobile: "600px"
};
var box = {
  lightBorderRadius: "0.2rem",
  borderRadius: "0.25rem",
  shadow: "0 5px 10px 0 ".concat(colors.lightGrey),
  shadowBottom: "0 10px 10px -10px #b7bcdf"
};
var animations = {
  transitionTiming: "250ms"
};

var theme = /*#__PURE__*/Object.freeze({
  colors: colors,
  spacing: spacing,
  fonts: fonts,
  breakpoints: breakpoints,
  box: box,
  animations: animations
});

function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn$1(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _objectWithoutProperties$1(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}

var cleanProps = function cleanProps(props) {
  var initialState = props.initialState,
      getInitialState = props.getInitialState,
      refs = props.refs,
      getRefs = props.getRefs,
      didMount = props.didMount,
      didUpdate = props.didUpdate,
      willUnmount = props.willUnmount,
      getSnapshotBeforeUpdate = props.getSnapshotBeforeUpdate,
      shouldUpdate = props.shouldUpdate,
      render = props.render,
      rest = _objectWithoutProperties$1(props, ["initialState", "getInitialState", "refs", "getRefs", "didMount", "didUpdate", "willUnmount", "getSnapshotBeforeUpdate", "shouldUpdate", "render"]);

  return rest;
};

var Component$1 = function (_React$Component) {
  _inherits$1(Component$$1, _React$Component);

  function Component$$1() {
    var _temp, _this, _ret;

    _classCallCheck$1(this, Component$$1);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn$1(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn$1(_this, _ret);
  }

  Component$$1.prototype.getArgs = function getArgs() {
    var state = this.state,
        props = this.props,
        setState = this._setState,
        forceUpdate = this._forceUpdate,
        refs = this._refs;
    return {
      state: state,
      props: cleanProps(props),
      refs: refs,
      setState: setState,
      forceUpdate: forceUpdate
    };
  };

  Component$$1.prototype.componentDidMount = function componentDidMount() {
    if (this.props.didMount) this.props.didMount(this.getArgs());
  };

  Component$$1.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.props.shouldUpdate) return this.props.shouldUpdate({
      props: this.props,
      state: this.state,
      nextProps: cleanProps(nextProps),
      nextState: nextState
    });else return true;
  };

  Component$$1.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.props.willUnmount) this.props.willUnmount({
      state: this.state,
      props: cleanProps(this.props),
      refs: this._refs
    });
  };

  Component$$1.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.didUpdate) this.props.didUpdate(Object.assign(this.getArgs(), {
      prevProps: cleanProps(prevProps),
      prevState: prevState
    }), snapshot);
  };

  Component$$1.prototype.getSnapshotBeforeUpdate = function getSnapshotBeforeUpdate(prevProps, prevState) {
    if (this.props.getSnapshotBeforeUpdate) {
      return this.props.getSnapshotBeforeUpdate(Object.assign(this.getArgs(), {
        prevProps: cleanProps(prevProps),
        prevState: prevState
      }));
    } else {
      return null;
    }
  };

  Component$$1.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        render = _props.render;
    return render ? render(this.getArgs()) : typeof children === "function" ? children(this.getArgs()) : children || null;
  };

  return Component$$1;
}(React.Component);

Component$1.defaultProps = {
  getInitialState: function getInitialState() {},
  getRefs: function getRefs() {
    return {};
  }
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.state = this.props.initialState || this.props.getInitialState(this.props);
  this._refs = this.props.refs || this.props.getRefs(this.getArgs());

  this._setState = function () {
    return _this2.setState.apply(_this2, arguments);
  };

  this._forceUpdate = function () {
    return _this2.forceUpdate.apply(_this2, arguments);
  };
};

var Portal = function Portal(_ref) {
  var children = _ref.children,
      _ref$type = _ref.type,
      type = _ref$type === undefined ? "reach-portal" : _ref$type;
  return React.createElement(Component$1, {
    getRefs: function getRefs() {
      return {
        node: null
      };
    },
    didMount: function didMount(_ref2) {
      var refs = _ref2.refs,
          forceUpdate = _ref2.forceUpdate;
      refs.node = document.createElement(type);
      document.body.appendChild(refs.node);
      forceUpdate();
    },
    willUnmount: function willUnmount(_ref3) {
      var node = _ref3.refs.node;
      document.body.removeChild(node);
    },
    render: function render(_ref4) {
      var node = _ref4.refs.node;
      return node ? createPortal(children, node) : null;
    }
  });
};

var checkStyles = function checkStyles() {};
var wrapEvent = function wrapEvent(handler, cb) {
  return function (event) {
    handler && handler(event);

    if (!event.defaultPrevented) {
      return cb(event);
    }
  };
};

var candidateSelectors = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])'];
var candidateSelector = candidateSelectors.join(',');
var matches = typeof Element === 'undefined' ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

function tabbable(el, options) {
  options = options || {};
  var elementDocument = el.ownerDocument || el;
  var regularTabbables = [];
  var orderedTabbables = [];
  var untouchabilityChecker = new UntouchabilityChecker(elementDocument);
  var candidates = el.querySelectorAll(candidateSelector);

  if (options.includeContainer) {
    if (matches.call(el, candidateSelector)) {
      candidates = Array.prototype.slice.apply(candidates);
      candidates.unshift(el);
    }
  }

  var i, candidate, candidateTabindex;

  for (i = 0; i < candidates.length; i++) {
    candidate = candidates[i];
    if (!isNodeMatchingSelectorTabbable(candidate, untouchabilityChecker)) continue;
    candidateTabindex = getTabindex(candidate);

    if (candidateTabindex === 0) {
      regularTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        node: candidate
      });
    }
  }

  var tabbableNodes = orderedTabbables.sort(sortOrderedTabbables).map(function (a) {
    return a.node;
  }).concat(regularTabbables);
  return tabbableNodes;
}

tabbable.isTabbable = isTabbable;
tabbable.isFocusable = isFocusable;

function isNodeMatchingSelectorTabbable(node, untouchabilityChecker) {
  if (!isNodeMatchingSelectorFocusable(node, untouchabilityChecker) || isNonTabbableRadio(node) || getTabindex(node) < 0) {
    return false;
  }

  return true;
}

function isTabbable(node, untouchabilityChecker) {
  if (!node) throw new Error('No node provided');
  if (matches.call(node, candidateSelector) === false) return false;
  return isNodeMatchingSelectorTabbable(node, untouchabilityChecker);
}

function isNodeMatchingSelectorFocusable(node, untouchabilityChecker) {
  untouchabilityChecker = untouchabilityChecker || new UntouchabilityChecker(node.ownerDocument || node);

  if (node.disabled || isHiddenInput(node) || untouchabilityChecker.isUntouchable(node)) {
    return false;
  }

  return true;
}

var focusableCandidateSelector = candidateSelectors.concat('iframe').join(',');

function isFocusable(node, untouchabilityChecker) {
  if (!node) throw new Error('No node provided');
  if (matches.call(node, focusableCandidateSelector) === false) return false;
  return isNodeMatchingSelectorFocusable(node, untouchabilityChecker);
}

function getTabindex(node) {
  var tabindexAttr = parseInt(node.getAttribute('tabindex'), 10);
  if (!isNaN(tabindexAttr)) return tabindexAttr; // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // so if they don't have a tabindex attribute specifically set, assume it's 0.

  if (isContentEditable(node)) return 0;
  return node.tabIndex;
}

function sortOrderedTabbables(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
} // Array.prototype.find not available in IE.


function find(list, predicate) {
  for (var i = 0, length = list.length; i < length; i++) {
    if (predicate(list[i])) return list[i];
  }
}

function isContentEditable(node) {
  return node.contentEditable === 'true';
}

function isInput(node) {
  return node.tagName === 'INPUT';
}

function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
}

function isRadio(node) {
  return isInput(node) && node.type === 'radio';
}

function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
}

function getCheckedRadio(nodes) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      return nodes[i];
    }
  }
}

function isTabbableRadio(node) {
  if (!node.name) return true; // This won't account for the edge case where you have radio groups with the same
  // in separate forms on the same page.

  var radioSet = node.ownerDocument.querySelectorAll('input[type="radio"][name="' + node.name + '"]');
  var checked = getCheckedRadio(radioSet);
  return !checked || checked === node;
} // An element is "untouchable" if *it or one of its ancestors* has
// `visibility: hidden` or `display: none`.


function UntouchabilityChecker(elementDocument) {
  this.doc = elementDocument; // Node cache must be refreshed on every check, in case
  // the content of the element has changed. The cache contains tuples
  // mapping nodes to their boolean result.

  this.cache = [];
} // getComputedStyle accurately reflects `visibility: hidden` of ancestors
// but not `display: none`, so we need to recursively check parents.


UntouchabilityChecker.prototype.hasDisplayNone = function hasDisplayNone(node, nodeComputedStyle) {
  if (node === this.doc.documentElement) return false; // Search for a cached result.

  var cached = find(this.cache, function (item) {
    return item === node;
  });
  if (cached) return cached[1];
  nodeComputedStyle = nodeComputedStyle || this.doc.defaultView.getComputedStyle(node);
  var result = false;

  if (nodeComputedStyle.display === 'none') {
    result = true;
  } else if (node.parentNode) {
    result = this.hasDisplayNone(node.parentNode);
  }

  this.cache.push([node, result]);
  return result;
};

UntouchabilityChecker.prototype.isUntouchable = function isUntouchable(node) {
  if (node === this.doc.documentElement) return false;
  var computedStyle = this.doc.defaultView.getComputedStyle(node);
  if (this.hasDisplayNone(node, computedStyle)) return true;
  return computedStyle.visibility === 'hidden';
};

var tabbable_1 = tabbable;

var immutable = extend;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
  var target = {};

  for (var i = 0; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
}

var listeningFocusTrap = null;

function focusTrap(element, userOptions) {
  var doc = document;
  var container = typeof element === 'string' ? doc.querySelector(element) : element;
  var config = immutable({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true
  }, userOptions);
  var state = {
    firstTabbableNode: null,
    lastTabbableNode: null,
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false
  };
  var trap = {
    activate: activate,
    deactivate: deactivate,
    pause: pause,
    unpause: unpause
  };
  return trap;

  function activate(activateOptions) {
    if (state.active) return;
    updateTabbableNodes();
    state.active = true;
    state.paused = false;
    state.nodeFocusedBeforeActivation = doc.activeElement;
    var onActivate = activateOptions && activateOptions.onActivate ? activateOptions.onActivate : config.onActivate;

    if (onActivate) {
      onActivate();
    }

    addListeners();
    return trap;
  }

  function deactivate(deactivateOptions) {
    if (!state.active) return;
    removeListeners();
    state.active = false;
    state.paused = false;
    var onDeactivate = deactivateOptions && deactivateOptions.onDeactivate !== undefined ? deactivateOptions.onDeactivate : config.onDeactivate;

    if (onDeactivate) {
      onDeactivate();
    }

    var returnFocus = deactivateOptions && deactivateOptions.returnFocus !== undefined ? deactivateOptions.returnFocus : config.returnFocusOnDeactivate;

    if (returnFocus) {
      delay(function () {
        tryFocus(state.nodeFocusedBeforeActivation);
      });
    }

    return trap;
  }

  function pause() {
    if (state.paused || !state.active) return;
    state.paused = true;
    removeListeners();
  }

  function unpause() {
    if (!state.paused || !state.active) return;
    state.paused = false;
    addListeners();
  }

  function addListeners() {
    if (!state.active) return; // There can be only one listening focus trap at a time

    if (listeningFocusTrap) {
      listeningFocusTrap.pause();
    }

    listeningFocusTrap = trap;
    updateTabbableNodes(); // Delay ensures that the focused element doesn't capture the event
    // that caused the focus trap activation.

    delay(function () {
      tryFocus(getInitialFocusNode());
    });
    doc.addEventListener('focusin', checkFocusIn, true);
    doc.addEventListener('mousedown', checkPointerDown, true);
    doc.addEventListener('touchstart', checkPointerDown, true);
    doc.addEventListener('click', checkClick, true);
    doc.addEventListener('keydown', checkKey, true);
    return trap;
  }

  function removeListeners() {
    if (!state.active || listeningFocusTrap !== trap) return;
    doc.removeEventListener('focusin', checkFocusIn, true);
    doc.removeEventListener('mousedown', checkPointerDown, true);
    doc.removeEventListener('touchstart', checkPointerDown, true);
    doc.removeEventListener('click', checkClick, true);
    doc.removeEventListener('keydown', checkKey, true);
    listeningFocusTrap = null;
    return trap;
  }

  function getNodeForOption(optionName) {
    var optionValue = config[optionName];
    var node = optionValue;

    if (!optionValue) {
      return null;
    }

    if (typeof optionValue === 'string') {
      node = doc.querySelector(optionValue);

      if (!node) {
        throw new Error('`' + optionName + '` refers to no known node');
      }
    }

    if (typeof optionValue === 'function') {
      node = optionValue();

      if (!node) {
        throw new Error('`' + optionName + '` did not return a node');
      }
    }

    return node;
  }

  function getInitialFocusNode() {
    var node;

    if (getNodeForOption('initialFocus') !== null) {
      node = getNodeForOption('initialFocus');
    } else if (container.contains(doc.activeElement)) {
      node = doc.activeElement;
    } else {
      node = state.firstTabbableNode || getNodeForOption('fallbackFocus');
    }

    if (!node) {
      throw new Error("You can't have a focus-trap without at least one focusable element");
    }

    return node;
  } // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event.


  function checkPointerDown(e) {
    if (container.contains(e.target)) return;

    if (config.clickOutsideDeactivates) {
      deactivate({
        returnFocus: !tabbable_1.isFocusable(e.target)
      });
    } else {
      e.preventDefault();
    }
  } // In case focus escapes the trap for some strange reason, pull it back in.


  function checkFocusIn(e) {
    // In Firefox when you Tab out of an iframe the Document is briefly focused.
    if (container.contains(e.target) || e.target instanceof Document) {
      return;
    }

    e.stopImmediatePropagation();
    tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
  }

  function checkKey(e) {
    if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
      e.preventDefault();
      deactivate();
      return;
    }

    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  } // Hijack Tab events on the first and last focusable nodes of the trap,
  // in order to prevent focus from escaping. If it escapes for even a
  // moment it can end up scrolling the page and causing confusion so we
  // kind of need to capture the action at the keydown phase.


  function checkTab(e) {
    updateTabbableNodes();

    if (e.shiftKey && e.target === state.firstTabbableNode) {
      e.preventDefault();
      tryFocus(state.lastTabbableNode);
      return;
    }

    if (!e.shiftKey && e.target === state.lastTabbableNode) {
      e.preventDefault();
      tryFocus(state.firstTabbableNode);
      return;
    }
  }

  function checkClick(e) {
    if (config.clickOutsideDeactivates) return;
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  function updateTabbableNodes() {
    var tabbableNodes = tabbable_1(container);
    state.firstTabbableNode = tabbableNodes[0] || getInitialFocusNode();
    state.lastTabbableNode = tabbableNodes[tabbableNodes.length - 1] || getInitialFocusNode();
  }

  function tryFocus(node) {
    if (node === doc.activeElement) return;

    if (!node || !node.focus) {
      tryFocus(getInitialFocusNode());
      return;
    }

    node.focus();
    state.mostRecentlyFocusedNode = node;

    if (isSelectableInput(node)) {
      node.select();
    }
  }
}

function isSelectableInput(node) {
  return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function';
}

function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
}

function isTabEvent(e) {
  return e.key === 'Tab' || e.keyCode === 9;
}

function delay(fn) {
  return setTimeout(fn, 0);
}

var focusTrap_1 = focusTrap;

var _extends$1 = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

function _objectWithoutProperties$2(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}

var createAriaHider = function createAriaHider(dialogNode) {
  var originalValues = [];
  var rootNodes = [];
  Array.prototype.forEach.call(document.querySelectorAll("body > *"), function (node) {
    if (node === dialogNode.parentNode) {
      return;
    }

    var attr = node.getAttribute("aria-hidden");
    var alreadyHidden = attr !== null && attr !== "false";

    if (alreadyHidden) {
      return;
    }

    originalValues.push(attr);
    rootNodes.push(node);
    node.setAttribute("aria-hidden", "true");
  });
  return function () {
    rootNodes.forEach(function (node, index) {
      var originalValue = originalValues[index];

      if (originalValue === null) {
        node.removeAttribute("aria-hidden");
      } else {
        node.setAttribute("aria-hidden", originalValue);
      }
    });
  };
};

var k = function k() {};

var checkDialogStyles = function checkDialogStyles() {
  return checkStyles("dialog");
};

var portalDidMount = function portalDidMount(refs, initialFocusRef) {
  refs.disposeAriaHider = createAriaHider(refs.overlayNode);
  refs.trap = focusTrap_1(refs.overlayNode, {
    initialFocus: initialFocusRef ? function () {
      return initialFocusRef.current;
    } : undefined,
    fallbackFocus: refs.contentNode,
    escapeDeactivates: false,
    clickOutsideDeactivates: false
  });
  refs.trap.activate();
};

var contentWillUnmount = function contentWillUnmount(_ref) {
  var refs = _ref.refs;
  refs.trap.deactivate();
  refs.disposeAriaHider();
};

var FocusContext = React.createContext();
var DialogOverlay = React.forwardRef(function (_ref2, forwardRef) {
  var _ref2$isOpen = _ref2.isOpen,
      isOpen = _ref2$isOpen === undefined ? true : _ref2$isOpen,
      _ref2$onDismiss = _ref2.onDismiss,
      onDismiss = _ref2$onDismiss === undefined ? k : _ref2$onDismiss,
      initialFocusRef = _ref2.initialFocusRef,
      onClick = _ref2.onClick,
      onKeyDown = _ref2.onKeyDown,
      props = _objectWithoutProperties$2(_ref2, ["isOpen", "onDismiss", "initialFocusRef", "onClick", "onKeyDown"]);

  return React.createElement(Component$1, {
    didMount: checkDialogStyles
  }, isOpen ? React.createElement(Portal, {
    "data-reach-dialog-wrapper": true
  }, React.createElement(Component$1, {
    refs: {
      overlayNode: null,
      contentNode: null
    },
    didMount: function didMount(_ref3) {
      var refs = _ref3.refs;
      portalDidMount(refs, initialFocusRef);
    },
    willUnmount: contentWillUnmount
  }, function (_ref4) {
    var refs = _ref4.refs;
    return React.createElement(FocusContext.Provider, {
      value: function value(node) {
        return refs.contentNode = node;
      }
    }, React.createElement("div", _extends$1({
      "data-reach-dialog-overlay": true,
      onClick: wrapEvent(onClick, function (event) {
        event.stopPropagation();
        onDismiss();
      }),
      onKeyDown: wrapEvent(onKeyDown, function (event) {
        if (event.key === "Escape") {
          event.stopPropagation();
          onDismiss();
        }
      }),
      ref: function ref(node) {
        refs.overlayNode = node;
        forwardRef && forwardRef(node);
      }
    }, props)));
  })) : null);
});
DialogOverlay.propTypes = {
  initialFocusRef: function initialFocusRef() {}
};

var stopPropagation = function stopPropagation(event) {
  return event.stopPropagation();
};

var DialogContent = React.forwardRef(function (_ref5, forwardRef) {
  var onClick = _ref5.onClick,
      onKeyDown = _ref5.onKeyDown,
      props = _objectWithoutProperties$2(_ref5, ["onClick", "onKeyDown"]);

  return React.createElement(FocusContext.Consumer, null, function (contentRef) {
    return React.createElement("div", _extends$1({
      "aria-modal": "true",
      "data-reach-dialog-content": true,
      tabIndex: "-1",
      onClick: wrapEvent(onClick, stopPropagation),
      ref: function ref(node) {
        contentRef(node);
        forwardRef && forwardRef(node);
      }
    }, props));
  });
});

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var x = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var _react2 = _interopRequireDefault(React);



var _propTypes2 = _interopRequireDefault(PropTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}

var X = function X(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement('svg', _extends({
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, otherProps), _react2.default.createElement('line', {
    x1: '18',
    y1: '6',
    x2: '6',
    y2: '18'
  }), _react2.default.createElement('line', {
    x1: '6',
    y1: '6',
    x2: '18',
    y2: '18'
  }));
};

X.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};
X.defaultProps = {
  color: 'currentColor',
  size: '24'
};
exports.default = X;
});

var IconClose = unwrapExports(x);

function _templateObject3$1() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: ", ";\n  color: ", ";\n  line-height: 0;\n  background: transparent;\n  border: none;\n  -webkit-appearance: none;\n  cursor: pointer;\n  @media (max-width: ", ") {\n  }\n  @media (max-width: ", ") {\n  }\n  @media (max-width: ", ") {\n    position: fixed;\n    top: ", ";\n    right: ", ";\n  }\n"]);

  _templateObject3$1 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$1() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  margin: 10vh auto;\n  padding: 2rem;\n  width: 50vw;\n  max-height: calc(100vh - 2 * 10vh);\n  background: white;\n  border-radius: ", ";\n  outline: none;\n  overflow-y: auto;\n  @media (max-width: ", ") {\n    width: 60vw;\n  }\n  @media (max-width: ", ") {\n    width: 80vw;\n  }\n  @media (max-width: ", ") {\n    margin: ", ";\n    max-height: calc(100vh - 2 * ", ");\n    width: calc(100% - 2 * ", ");\n  }\n"]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background: rgba(0, 0, 0, 0.5);\n  overflow: auto;\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var Modal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal() {
    _classCallCheck(this, Modal);

    return _possibleConstructorReturn(this, _getPrototypeOf(Modal).apply(this, arguments));
  }

  _createClass(Modal, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          isOpen = _this$props.isOpen,
          onDismiss = _this$props.onDismiss,
          ContentWrapper = _this$props.ContentWrapper;
      var Wrapper = ContentWrapper || StyledDialogContent;
      return React.createElement(StyledDialogOverlay, {
        isOpen: isOpen,
        onDismiss: onDismiss,
        className: className
      }, React.createElement(Wrapper, null, children, React.createElement(CloseIcon, {
        onClick: onDismiss
      }, React.createElement(IconClose, {
        title: "fermer la modale"
      }))));
    }
  }]);

  return Modal;
}(React.Component);
Modal.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  ContentWrapper: PropTypes.object
};
var StyledDialogOverlay = styled(DialogOverlay)(_templateObject$1());
var StyledDialogContent = styled(DialogContent)(_templateObject2$1(), box.borderRadius, breakpoints.desktop, breakpoints.tablet, breakpoints.mobile, spacing.base, spacing.base, spacing.base);
var ModalContentWrapper = StyledDialogContent;
var CloseIcon = styled.button(_templateObject3$1(), spacing.small, colors.darkGrey, breakpoints.desktop, breakpoints.tablet, breakpoints.mobile, spacing.small, spacing.small);

function _templateObject2$2() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject2$2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$2() {
  var data = _taggedTemplateLiteral(["\n  margin: 0;\n  padding: 0;\n  list-style-type: none;\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}

var RootList = function RootList(_ref) {
  var className = _ref.className,
      children = _ref.children;
  return React.createElement("ul", {
    className: className
  }, children);
};

RootList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
RootList.defaultProps = {
  className: ""
};
var List = styled(RootList)(_templateObject$2());
var ListItem = styled.li(_templateObject2$2());

function _templateObject2$3() {
  var data = _taggedTemplateLiteral(["\n      max-width: 43.75rem; //700px;\n    "]);

  _templateObject2$3 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$3() {
  var data = _taggedTemplateLiteral(["\n  max-width: ", ";\n  margin: 0 auto;\n  padding: 0 ", ";\n  ", ";\n  & > *:last-child {\n    margin-bottom: 0;\n  }\n  @media print {\n    max-width: 100%;\n    padding: 0;\n  }\n"]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}

var Container = function Container(_ref) {
  var children = _ref.children,
      className = _ref.className,
      narrow = _ref.narrow;
  return React.createElement(StyledContainer, {
    className: className,
    narrow: narrow
  }, children);
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  narrow: PropTypes.bool
};
Container.defaultProps = {
  className: "",
  narrow: false
};
var StyledContainer = styled.div(_templateObject$3(), breakpoints.desktop, spacing.medium, function (props) {
  return props.narrow && css(_templateObject2$3());
});

function _templateObject4$1() {
  var data = _taggedTemplateLiteral(["\n        background-color: ", ";\n      "]);

  _templateObject4$1 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$2() {
  var data = _taggedTemplateLiteral(["\n        background-color: ", ";\n      "]);

  _templateObject3$2 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$4() {
  var data = _taggedTemplateLiteral(["\n        background-color: ", ";\n      "]);

  _templateObject2$4 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$4() {
  var data = _taggedTemplateLiteral(["\n  padding: ", " 0;\n  ", "\n"]);

  _templateObject$4 = function _templateObject() {
    return data;
  };

  return data;
}

var Section = function Section(_ref) {
  var children = _ref.children,
      className = _ref.className,
      variant = _ref.variant;
  return React.createElement(StyledSection, {
    variant: variant,
    className: className
  }, children);
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["default", "white", "light", "dark"])
};
Section.defaultProps = {
  className: "",
  variant: "default"
};
var StyledSection = styled.div(_templateObject$4(), spacing.interComponent, function (props) {
  if (props.variant === "white") {
    return css(_templateObject2$4(), colors.white);
  }

  if (props.variant === "light") {
    return css(_templateObject3$2(), colors.lightBackground);
  }

  if (props.variant === "dark") {
    return css(_templateObject4$1(), colors.darkBackground);
  }
});

function _templateObject5$1() {
  var data = _taggedTemplateLiteral(["\n        margin: 0 calc(-1 * ", ");\n        padding: ", ";\n      "]);

  _templateObject5$1 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$2() {
  var data = _taggedTemplateLiteral(["\n        background-color: ", ";\n      "]);

  _templateObject4$2 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$3() {
  var data = _taggedTemplateLiteral(["\n        background-color: ", ";\n      "]);

  _templateObject3$3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$5() {
  var data = _taggedTemplateLiteral(["\n        border-color: transparent;\n      "]);

  _templateObject2$5 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$5() {
  var data = _taggedTemplateLiteral(["\n  padding: ", " ", ";\n  color: ", ";\n  border-width: 1px;\n  border-style: solid;\n  border-radius: ", ";\n  border-color: ", ";\n  ", "\n  & > *:last-child {\n    margin-bottom: 0;\n  }\n  @media print {\n    border: none;\n    padding: 0 5pt;\n  }\n"]);

  _templateObject$5 = function _templateObject() {
    return data;
  };

  return data;
}

var Wrapper = function Wrapper(_ref) {
  var children = _ref.children,
      className = _ref.className,
      variant = _ref.variant;
  return React.createElement(StyledWrapper, {
    className: className,
    variant: variant
  }, children);
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["default", "light", "dark", "outline"])
};
Wrapper.defaultProps = {
  className: "",
  variant: "default"
};
var StyledWrapper = styled.div(_templateObject$5(), spacing.small, spacing.medium, colors.darkText, box.borderRadius, colors.elementBorder, function (props) {
  if (props.variant === "default") {
    return css(_templateObject2$5());
  }

  if (props.variant === "light") {
    return css(_templateObject3$3(), colors.white);
  }

  if (props.variant === "dark") {
    return css(_templateObject4$2(), colors.darkBackground);
  }

  if (props.variant === "outline") {
    return css(_templateObject5$1(), spacing.large, spacing.large);
  }
});

function _classCallCheck$2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$1(Constructor, staticProps);
  return Constructor;
}

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends$2() {
  _extends$2 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$2.apply(this, arguments);
}

function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty$1(target, key, source[key]);
    });
  }

  return target;
}

function _inherits$2(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf$1(subClass, superClass);
}

function _getPrototypeOf$1(o) {
  _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf$1(o);
}

function _setPrototypeOf$1(o, p) {
  _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf$1(o, p);
}

function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties$3(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose$1(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized$1(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn$2(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized$1(self);
}

function _toConsumableArray$1(arr) {
  return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _nonIterableSpread$1();
}

function _arrayWithoutHoles$1(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray$1(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
} // Arbitrary, but ought to be unique to avoid context namespace clashes.


var CONTEXT_KEY = 'react-accessible-accordion@AccordionContainer';

var Provider =
/*#__PURE__*/
function (_Component) {
  _inherits$2(Provider, _Component);

  function Provider() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck$2(this, Provider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn$2(this, (_getPrototypeOf2 = _getPrototypeOf$1(Provider)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty$1(_assertThisInitialized$1(_assertThisInitialized$1(_this)), "state", {
      items: _this.props.items || []
    });

    _defineProperty$1(_assertThisInitialized$1(_assertThisInitialized$1(_this)), "addItem", function (newItem) {
      // Need to use callback style otherwise race-conditions are created by concurrent registrations.
      _this.setState(function (state) {
        var items;

        if (state.items.some(function (item) {
          return item.uuid === newItem.uuid;
        })) {
          // eslint-disable-next-line no-console
          console.error("AccordionItem error: One item already has the uuid \"".concat(newItem.uuid, "\". Uuid property must be unique. See: https://github.com/springload/react-accessible-accordion#accordionitem"));
        }

        if (_this.props.accordion && newItem.expanded) {
          // If this is a true accordion and the new item is expanded, then the others must be closed.
          items = _toConsumableArray$1(state.items.map(function (item) {
            return _objectSpread$1({}, item, {
              expanded: false
            });
          })).concat([newItem]);
        } else {
          items = _toConsumableArray$1(state.items).concat([newItem]);
        }

        return {
          items: items
        };
      });
    });

    _defineProperty$1(_assertThisInitialized$1(_assertThisInitialized$1(_this)), "removeItem", function (key) {
      return _this.setState(function (state) {
        return {
          items: state.items.filter(function (item) {
            return item.uuid !== key;
          })
        };
      });
    });

    _defineProperty$1(_assertThisInitialized$1(_assertThisInitialized$1(_this)), "setExpanded", function (key, expanded) {
      return _this.setState(function (state) {
        return {
          items: state.items.map(function (item) {
            if (item.uuid === key) {
              return _objectSpread$1({}, item, {
                expanded: expanded
              });
            }

            if (_this.props.accordion && expanded) {
              // If this is an accordion, we might need to collapse the other expanded item.
              return _objectSpread$1({}, item, {
                expanded: false
              });
            }

            return item;
          })
        };
      }, function () {
        if (_this.props.onChange) {
          _this.props.onChange(_this.props.accordion ? key : _this.state.items.filter(function (item) {
            return item.expanded;
          }).map(function (item) {
            return item.uuid;
          }));
        }
      });
    });

    return _this;
  }

  _createClass$1(Provider, [{
    key: "getChildContext",
    value: function getChildContext() {
      var context = {
        items: this.state.items,
        accordion: !!this.props.accordion,
        addItem: this.addItem,
        removeItem: this.removeItem,
        setExpanded: this.setExpanded
      };
      return _defineProperty$1({}, CONTEXT_KEY, context);
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children || null;
    }
  }]);

  return Provider;
}(Component); // eslint-disable-next-line react/no-multi-comp


_defineProperty$1(Provider, "childContextTypes", _defineProperty$1({}, CONTEXT_KEY, function () {
  return null;
}));

var Consumer =
/*#__PURE__*/
function (_Component2) {
  _inherits$2(Consumer, _Component2);

  function Consumer() {
    _classCallCheck$2(this, Consumer);

    return _possibleConstructorReturn$2(this, _getPrototypeOf$1(Consumer).apply(this, arguments));
  }

  _createClass$1(Consumer, [{
    key: "render",
    value: function render() {
      return this.props.children(this.context[CONTEXT_KEY]);
    }
  }]);

  return Consumer;
}(Component);

_defineProperty$1(Consumer, "contextTypes", _defineProperty$1({}, CONTEXT_KEY, function () {
  return null;
}));

var accordionDefaultProps = {
  accordion: true
};

var Accordion = function Accordion(_ref) {
  var accordion = _ref.accordion,
      rest = _objectWithoutProperties$3(_ref, ["accordion"]);

  return React.createElement("div", _extends$2({
    role: accordion ? 'tablist' : null
  }, rest));
};

Accordion.defaultProps = accordionDefaultProps;
var defaultProps = {
  accordion: true,
  onChange: function onChange() {},
  className: 'accordion',
  children: null
};

var AccordionWrapper =
/*#__PURE__*/
function (_Component) {
  _inherits$2(AccordionWrapper, _Component);

  function AccordionWrapper() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck$2(this, AccordionWrapper);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn$2(this, (_getPrototypeOf2 = _getPrototypeOf$1(AccordionWrapper)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty$1(_assertThisInitialized$1(_assertThisInitialized$1(_this)), "renderAccordion", function (accordionStore) {
      var _this$props = _this.props,
          accordion = _this$props.accordion,
          onChange = _this$props.onChange,
          rest = _objectWithoutProperties$3(_this$props, ["accordion", "onChange"]);

      return React.createElement(Accordion, _extends$2({
        accordion: accordionStore.accordion
      }, rest));
    });

    return _this;
  }

  _createClass$1(AccordionWrapper, [{
    key: "render",
    value: function render() {
      return React.createElement(Provider, {
        accordion: this.props.accordion,
        onChange: this.props.onChange
      }, React.createElement(Consumer, null, this.renderAccordion));
    }
  }]);

  return AccordionWrapper;
}(Component);

_defineProperty$1(AccordionWrapper, "defaultProps", defaultProps);
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */


function _inheritsLoose$1(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


function unwrapExports$1(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule$1(fn, module) {
  return module = {
    exports: {}
  }, fn(module, module.exports), module.exports;
}

var lib = createCommonjsModule$1(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var createChangeEmitter = exports.createChangeEmitter = function createChangeEmitter() {
    var currentListeners = [];
    var nextListeners = currentListeners;

    function ensureCanMutateNextListeners() {
      if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice();
      }
    }

    function listen(listener) {
      if (typeof listener !== 'function') {
        throw new Error('Expected listener to be a function.');
      }

      var isSubscribed = true;
      ensureCanMutateNextListeners();
      nextListeners.push(listener);
      return function () {
        if (!isSubscribed) {
          return;
        }

        isSubscribed = false;
        ensureCanMutateNextListeners();
        var index = nextListeners.indexOf(listener);
        nextListeners.splice(index, 1);
      };
    }

    function emit() {
      currentListeners = nextListeners;
      var listeners = currentListeners;

      for (var i = 0; i < listeners.length; i++) {
        listeners[i].apply(listeners, arguments);
      }
    }

    return {
      listen: listen,
      emit: emit
    };
  };
});
unwrapExports$1(lib);
var lib_1 = lib.createChangeEmitter;

function symbolObservablePonyfill(root) {
  var result;
  var Symbol = root.Symbol;

  if (typeof Symbol === 'function') {
    if (Symbol.observable) {
      result = Symbol.observable;
    } else {
      result = Symbol('observable');
      Symbol.observable = result;
    }
  } else {
    result = '@@observable';
  }

  return result;
}
/* global window */


var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = symbolObservablePonyfill(root);

var Nothing =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose$1(Nothing, _Component);

  function Nothing() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Nothing.prototype;

  _proto.render = function render() {
    return null;
  };

  return Nothing;
}(Component);

var fromRenderProps = function fromRenderProps(RenderPropsComponent, propsMapper, renderPropName) {
  if (renderPropName === void 0) {
    renderPropName = 'children';
  }

  return function (BaseComponent) {
    var baseFactory = React.createFactory(BaseComponent);
    var renderPropsFactory = React.createFactory(RenderPropsComponent);

    var FromRenderProps = function FromRenderProps(ownerProps) {
      var _renderPropsFactory;

      return renderPropsFactory((_renderPropsFactory = {}, _renderPropsFactory[renderPropName] = function () {
        return baseFactory(_extends$2({}, ownerProps, propsMapper.apply(void 0, arguments)));
      }, _renderPropsFactory));
    };

    return FromRenderProps;
  };
};

var compose = function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  }, function (arg) {
    return arg;
  });
};
/*!
 * consecutive
 * Get consecutive numbers
 * Copyright(c) 2017 ivanoff .$ curl -A cv ivanoff.org.ua
 * MIT Licensed
 */


var consecutive = function (begin, base, inc) {
  var number = begin || 0;
  if (typeof base !== 'number') base = 10;
  if (typeof inc !== 'number') inc = 1;
  return function () {
    var res;

    if (typeof base === 'undefined' || base === 10) {
      res = number;
      number += inc;
    } else {
      res = number.toString();
      number = (parseInt(number, base) + inc).toString(base);
    }

    return res;
  };
}; // Arbitrary, but ought to be unique to avoid context namespace clashes.


var CONTEXT_KEY$1 = 'react-accessible-accordion@ItemContainer';

var Provider$1 =
/*#__PURE__*/
function (_Component) {
  _inherits$2(Provider, _Component);

  function Provider() {
    _classCallCheck$2(this, Provider);

    return _possibleConstructorReturn$2(this, _getPrototypeOf$1(Provider).apply(this, arguments));
  }

  _createClass$1(Provider, [{
    key: "getChildContext",
    value: function getChildContext() {
      var uuid = this.props.uuid;
      var context = {
        uuid: uuid
      };
      return _defineProperty$1({}, CONTEXT_KEY$1, context);
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children || null;
    }
  }]);

  return Provider;
}(Component);

_defineProperty$1(Provider$1, "childContextTypes", _defineProperty$1({}, CONTEXT_KEY$1, function () {
  return null;
})); // eslint-disable-next-line react/no-multi-comp


var Consumer$1 =
/*#__PURE__*/
function (_Component2) {
  _inherits$2(Consumer, _Component2);

  function Consumer() {
    _classCallCheck$2(this, Consumer);

    return _possibleConstructorReturn$2(this, _getPrototypeOf$1(Consumer).apply(this, arguments));
  }

  _createClass$1(Consumer, [{
    key: "render",
    value: function render() {
      return this.props.children(this.context[CONTEXT_KEY$1]);
    }
  }]);

  return Consumer;
}(Component);

_defineProperty$1(Consumer$1, "contextTypes", _defineProperty$1({}, CONTEXT_KEY$1, function () {
  return null;
}));

var classnames = createCommonjsModule$1(function (module) {
  /*!
    Copyright (c) 2016 Jed Watson.
    Licensed under the MIT License (MIT), see
    http://jedwatson.github.io/classnames
  */

  /* global define */
  (function () {
    var hasOwn = {}.hasOwnProperty;

    function classNames() {
      var classes = [];

      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (!arg) continue;
        var argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
          classes.push(arg);
        } else if (Array.isArray(arg)) {
          classes.push(classNames.apply(null, arg));
        } else if (argType === 'object') {
          for (var key in arg) {
            if (hasOwn.call(arg, key) && arg[key]) {
              classes.push(key);
            }
          }
        }
      }

      return classes.join(' ');
    }

    if (module.exports) {
      module.exports = classNames;
    } else {
      window.classNames = classNames;
    }
  })();
});

var AccordionItem =
/*#__PURE__*/
function (_Component) {
  _inherits$2(AccordionItem, _Component);

  function AccordionItem() {
    _classCallCheck$2(this, AccordionItem);

    return _possibleConstructorReturn$2(this, _getPrototypeOf$1(AccordionItem).apply(this, arguments));
  }

  _createClass$1(AccordionItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          uuid = _this$props.uuid,
          accordionStore = _this$props.accordionStore,
          disabled = _this$props.disabled;
      accordionStore.addItem({
        uuid: uuid,
        expanded: this.props.expanded || false,
        disabled: disabled
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.accordionStore.removeItem(this.props.uuid);
    } // This is here so that the user can dynamically set the 'expanded' state using the 'expanded' prop.

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props2 = this.props,
          uuid = _this$props2.uuid,
          expanded = _this$props2.expanded,
          accordionStore = _this$props2.accordionStore;

      if (expanded !== prevProps.expanded) {
        accordionStore.setExpanded(uuid, expanded);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          uuid = _this$props3.uuid,
          className = _this$props3.className,
          hideBodyClassName = _this$props3.hideBodyClassName,
          accordionStore = _this$props3.accordionStore,
          disabled = _this$props3.disabled,
          expanded = _this$props3.expanded,
          rest = _objectWithoutProperties$3(_this$props3, ["uuid", "className", "hideBodyClassName", "accordionStore", "disabled", "expanded"]); // Deliberately not using 'find' because IE compat.


      var currentItem = accordionStore.items.filter(function (item) {
        return item.uuid === uuid;
      })[0];

      if (!currentItem) {
        return null;
      }

      return React.createElement("div", _extends$2({
        className: classnames(className, _defineProperty$1({}, hideBodyClassName, !currentItem.expanded && hideBodyClassName))
      }, rest));
    }
  }]);

  return AccordionItem;
}(Component);

var nextUuid = consecutive();

var AccordionItemWrapper =
/*#__PURE__*/
function (_Component) {
  _inherits$2(AccordionItemWrapper, _Component);

  function AccordionItemWrapper() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck$2(this, AccordionItemWrapper);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn$2(this, (_getPrototypeOf2 = _getPrototypeOf$1(AccordionItemWrapper)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty$1(_assertThisInitialized$1(_assertThisInitialized$1(_this)), "id", nextUuid());

    return _this;
  }

  _createClass$1(AccordionItemWrapper, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          accordionStore = _this$props.accordionStore,
          uuid = _this$props.uuid,
          rest = _objectWithoutProperties$3(_this$props, ["accordionStore", "uuid"]);

      var itemUuid = uuid !== undefined ? uuid : this.id;
      return React.createElement(Provider$1, {
        uuid: itemUuid
      }, React.createElement(AccordionItem, _extends$2({}, rest, {
        uuid: itemUuid,
        accordionStore: accordionStore
      })));
    }
  }]);

  return AccordionItemWrapper;
}(Component);

_defineProperty$1(AccordionItemWrapper, "defaultProps", {
  className: 'accordion__item',
  hideBodyClassName: '',
  disabled: false,
  expanded: false,
  uuid: undefined
});

var AccordionItem_wrapper = compose(fromRenderProps(Consumer, function (accordionStore) {
  return {
    accordionStore: accordionStore
  };
}))(AccordionItemWrapper);

var AccordionItemTitle =
/*#__PURE__*/
function (_Component) {
  _inherits$2(AccordionItemTitle, _Component);

  function AccordionItemTitle() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck$2(this, AccordionItemTitle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn$2(this, (_getPrototypeOf2 = _getPrototypeOf$1(AccordionItemTitle)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty$1(_assertThisInitialized$1(_assertThisInitialized$1(_this)), "handleClick", function () {
      var _this$props = _this.props,
          uuid = _this$props.uuid,
          expanded = _this$props.expanded,
          setExpanded = _this$props.setExpanded;
      setExpanded(uuid, !expanded);
    });

    _defineProperty$1(_assertThisInitialized$1(_assertThisInitialized$1(_this)), "handleKeyPress", function (evt) {
      if (evt.charCode === 13 || evt.charCode === 32) {
        evt.preventDefault();

        _this.handleClick();
      }
    });

    return _this;
  }

  _createClass$1(AccordionItemTitle, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          hideBodyClassName = _this$props2.hideBodyClassName,
          item = _this$props2.item,
          accordion = _this$props2.accordion,
          setExpanded = _this$props2.setExpanded,
          expanded = _this$props2.expanded,
          uuid = _this$props2.uuid,
          disabled = _this$props2.disabled,
          rest = _objectWithoutProperties$3(_this$props2, ["className", "hideBodyClassName", "item", "accordion", "setExpanded", "expanded", "uuid", "disabled"]);

      var id = "accordion__title-".concat(uuid);
      var ariaControls = "accordion__body-".concat(uuid);
      var role = accordion ? 'tab' : 'button';
      var titleClassName = classnames(className, _defineProperty$1({}, hideBodyClassName, hideBodyClassName && !expanded));

      if (role === 'tab') {
        return React.createElement("div", _extends$2({
          id: id,
          "aria-selected": expanded,
          "aria-controls": ariaControls,
          className: titleClassName,
          onClick: disabled ? undefined : this.handleClick,
          role: role,
          tabIndex: "0" // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
          ,
          onKeyPress: this.handleKeyPress,
          disabled: disabled
        }, rest));
      }

      return React.createElement("div", _extends$2({
        id: id,
        "aria-expanded": expanded,
        "aria-controls": ariaControls,
        className: titleClassName,
        onClick: disabled ? undefined : this.handleClick,
        role: role,
        tabIndex: "0" // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
        ,
        onKeyPress: this.handleKeyPress,
        disabled: disabled
      }, rest));
    }
  }]);

  return AccordionItemTitle;
}(Component);

_defineProperty$1(AccordionItemTitle, "accordionElementName", 'AccordionItemTitle'); // eslint-disable-next-line react/prefer-stateless-function


var AccordionItemTitleWrapper =
/*#__PURE__*/
function (_Component) {
  _inherits$2(AccordionItemTitleWrapper, _Component);

  function AccordionItemTitleWrapper() {
    _classCallCheck$2(this, AccordionItemTitleWrapper);

    return _possibleConstructorReturn$2(this, _getPrototypeOf$1(AccordionItemTitleWrapper).apply(this, arguments));
  }

  _createClass$1(AccordionItemTitleWrapper, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          itemStore = _this$props.itemStore,
          accordionStore = _this$props.accordionStore,
          rest = _objectWithoutProperties$3(_this$props, ["itemStore", "accordionStore"]);

      var uuid = itemStore.uuid;
      var items = accordionStore.items,
          accordion = accordionStore.accordion;
      var item = items.filter(function (stateItem) {
        return stateItem.uuid === uuid;
      })[0];
      return React.createElement(AccordionItemTitle, _extends$2({}, rest, item, {
        setExpanded: accordionStore.setExpanded,
        accordion: accordion
      }));
    }
  }]);

  return AccordionItemTitleWrapper;
}(Component);

_defineProperty$1(AccordionItemTitleWrapper, "defaultProps", {
  className: 'accordion__title',
  hideBodyClassName: ''
});

var AccordionItemTitle_wrapper = compose(fromRenderProps(Consumer, function (accordionStore) {
  return {
    accordionStore: accordionStore
  };
}), fromRenderProps(Consumer$1, function (itemStore) {
  return {
    itemStore: itemStore
  };
}))(AccordionItemTitleWrapper);

var AccordionItemBody = function AccordionItemBody(props) {
  var className = props.className,
      hideBodyClassName = props.hideBodyClassName,
      uuid = props.uuid,
      expanded = props.expanded,
      disabled = props.disabled,
      accordion = props.accordion,
      rest = _objectWithoutProperties$3(props, ["className", "hideBodyClassName", "uuid", "expanded", "disabled", "accordion"]);

  return React.createElement("div", _extends$2({
    id: "accordion__body-".concat(uuid),
    className: classnames(className, _defineProperty$1({}, hideBodyClassName, !expanded)),
    "aria-hidden": !expanded,
    "aria-labelledby": "accordion__title-".concat(uuid),
    role: accordion ? 'tabpanel' : null
  }, rest));
}; // eslint-disable-next-line react/prefer-stateless-function


var AccordionItemBodyWrapper =
/*#__PURE__*/
function (_Component) {
  _inherits$2(AccordionItemBodyWrapper, _Component);

  function AccordionItemBodyWrapper() {
    _classCallCheck$2(this, AccordionItemBodyWrapper);

    return _possibleConstructorReturn$2(this, _getPrototypeOf$1(AccordionItemBodyWrapper).apply(this, arguments));
  }

  _createClass$1(AccordionItemBodyWrapper, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          itemStore = _this$props.itemStore,
          accordionStore = _this$props.accordionStore,
          rest = _objectWithoutProperties$3(_this$props, ["itemStore", "accordionStore"]);

      var uuid = itemStore.uuid;
      var items = accordionStore.items,
          accordion = accordionStore.accordion;
      var item = items.filter(function (stateItem) {
        return stateItem.uuid === uuid;
      })[0];
      return item ? React.createElement(AccordionItemBody, _extends$2({}, rest, item, {
        accordion: accordion
      })) : null;
    }
  }]);

  return AccordionItemBodyWrapper;
}(Component);

_defineProperty$1(AccordionItemBodyWrapper, "defaultProps", {
  className: 'accordion__body',
  hideBodyClassName: 'accordion__body--hidden'
});

var AccordionItemBody_wrapper = compose(fromRenderProps(Consumer, function (accordionStore) {
  return {
    accordionStore: accordionStore
  };
}), fromRenderProps(Consumer$1, function (itemStore) {
  return {
    itemStore: itemStore
  };
}))(AccordionItemBodyWrapper); // eslint-disable-next-line

function _templateObject$6() {
  var data = _taggedTemplateLiteral(["\n  flex: 0 0 auto;\n  display: inline-block;\n  position: relative;\n  width: 24px;\n  height: 12px;\n\n  &::after,\n  &::before {\n    display: block;\n    position: absolute;\n    top: 50%;\n    width: 10px;\n    height: 2px;\n    background-color: currentColor;\n    content: \"\";\n  }\n\n  &::before {\n    left: 4px;\n    transform: rotate(45deg);\n  }\n\n  [aria-expanded=\"true\"] &::before,\n  [aria-selected=\"true\"] &::before {\n    transform: rotate(-45deg);\n  }\n\n  &::after {\n    right: 4px;\n    transform: rotate(-45deg);\n  }\n\n  [aria-expanded=\"true\"] &::after,\n  [aria-selected=\"true\"] &::after {\n    transform: rotate(45deg);\n  }\n\n  &::before,\n  &::after {\n    transition: transform 0.25s ease, -webkit-transform 0.25s ease;\n  }\n"]);

  _templateObject$6 = function _templateObject() {
    return data;
  };

  return data;
}
var VerticalArrow = styled.div.attrs(function () {
  return {
    role: "presentation"
  };
})(_templateObject$6());

function _templateObject4$3() {
  var data = _taggedTemplateLiteral(["\n  padding: ", ";\n  animation: ", " 0.35s ease-in;\n  &.accordion__body--hidden {\n    display: none;\n  }\n"]);

  _templateObject4$3 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$4() {
  var data = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border: 1px solid ", ";\n  border-radius: ", ";\n  overflow: hidden;\n  & ", " {\n    padding-right: ", ";\n  }\n"]);

  _templateObject3$4 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$6() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  cursor: pointer;\n  &:hover,\n  &:focus,\n  &:focus-within,\n  &[aria-expanded=\"true\"] {\n    color: ", ";\n  }\n"]);

  _templateObject2$6 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$7() {
  var data = _taggedTemplateLiteral(["\n  & + & {\n    border-top: 1px solid ", ";\n  }\n"]);

  _templateObject$7 = function _templateObject() {
    return data;
  };

  return data;
}

var Accordion$1 =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Accordion$$1, _React$PureComponent);

  function Accordion$$1() {
    _classCallCheck(this, Accordion$$1);

    return _possibleConstructorReturn(this, _getPrototypeOf(Accordion$$1).apply(this, arguments));
  }

  _createClass(Accordion$$1, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          items = _this$props.items,
          className = _this$props.className;
      var StyledAccordionItem = items.length > 1 ? StyledMultipleAccordionItem : StyledSingleAccordionItem;
      return React.createElement(AccordionWrapper, {
        className: className,
        accordion: false
      }, items.map(function (item, index) {
        return React.createElement(StyledAccordionItem, {
          key: index
        }, React.createElement(StyledAccordionItemTitle, null, React.createElement(React.Fragment, null, item.title, React.createElement(VerticalArrow, null))), React.createElement(StyledAccordionItemBody, null, item.body));
      }));
    }
  }]);

  return Accordion$$1;
}(React.PureComponent);

Accordion$1.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.node.isRequired,
    body: PropTypes.node.isRequired
  })).isRequired
};
var StyledMultipleAccordionItem = styled(AccordionItem_wrapper)(_templateObject$7(), colors.elementBorder);
var StyledAccordionItemTitle = styled(AccordionItemTitle_wrapper)(_templateObject2$6(), colors.title);
var StyledSingleAccordionItem = styled(StyledMultipleAccordionItem)(_templateObject3$4(), colors.lightBackground, colors.elementBorder, box.borderRadius, StyledAccordionItemTitle, spacing.base);
var StyledAccordionItemBody = styled(AccordionItemBody_wrapper)(_templateObject4$3(), spacing.base, fadeIn);

var flavors = ["primary", "secondary", "warning", "success", "info", "danger", "link"]; // return the 1st truthy prop that is one of an Button versions

var getFlavor = function getFlavor(props) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "btn";
  var versionProps = Object.keys(props).filter( // ensure value is truthy
  function (flavor) {
    return flavors.indexOf(flavor) > -1 && !!props[flavor];
  });
  return versionProps.length && "".concat(prefix, "__").concat(versionProps[0]) || "";
}; // remove falsy values

var cleanProps$1 = function cleanProps(props) {
  return Object.keys(props).filter(function (key) {
    return flavors.indexOf(key) > -1;
  }).reduce(function (newProps, key) {
    return _objectSpread({}, newProps, _defineProperty({}, key, props[key] === false ? undefined : props[key].toString()));
  }, _objectSpread({}, props));
};
var propTypes = {
  /** use .btn.btn__primary */
  primary: PropTypes.bool,

  /** use .btn.btn__secondary */
  secondary: PropTypes.bool,

  /** use .btn.btn__warning */
  warning: PropTypes.bool,

  /** use .btn.btn__success */
  success: PropTypes.bool,

  /** use .btn.btnrt__info */
  info: PropTypes.bool,

  /** use .btn.btn__danger */
  danger: PropTypes.bool,
  link: PropTypes.bool,
  style: PropTypes.object
};
var defaultProps$1 = {
  primary: false,
  secondary: false,
  warning: false,
  success: false,
  info: false,
  danger: false,
  link: false
};

var Alert = function Alert(props) {
  return React.createElement("div", _extends({
    className: "alert ".concat(getFlavor(props, "alert"))
  }, cleanProps$1(props)));
};

Alert.propTypes = _objectSpread({}, propTypes, {
  style: PropTypes.object
});
Alert.defaultProps = _objectSpread({}, defaultProps$1);

function _templateObject$8() {
  var data = _taggedTemplateLiteral(["\n  padding: ", " 0;\n  font-size: ", ";\n  font-weight: 600;\n  color: ", ";\n"]);

  _templateObject$8 = function _templateObject() {
    return data;
  };

  return data;
}

var AsideTitle = function AsideTitle(_ref) {
  var children = _ref.children;
  return React.createElement(H3, null, children);
};

AsideTitle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element), PropTypes.string]).isRequired,
  style: PropTypes.object
};
var H3 = styled.h3(_templateObject$8(), spacing.interComponent, fonts.sizeH5, colors.black);

var Badge = function Badge(props) {
  return React.createElement("div", _extends({
    className: "badge ".concat(getFlavor(props, "badge"))
  }, cleanProps$1(props)));
};

Badge.propTypes = _objectSpread({}, propTypes, {
  style: PropTypes.object
});
Badge.defaultProps = _objectSpread({}, defaultProps$1);

function _extends$3() {
  _extends$3 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$3.apply(this, arguments);
}

function _assertThisInitialized$2(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inheritsLoose$2(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _getPrototypeOf$2(o) {
  _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf$2(o);
}

function _setPrototypeOf$2(o, p) {
  _setPrototypeOf$2 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf$2(o, p);
}

function _isNativeFunction$1(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function isNativeReflectConstruct$1() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct$1(Parent, args, Class) {
  if (isNativeReflectConstruct$1()) {
    _construct$1 = Reflect.construct;
  } else {
    _construct$1 = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf$2(instance, Class.prototype);
      return instance;
    };
  }

  return _construct$1.apply(null, arguments);
}

function _wrapNativeSuper$1(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper$1 = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction$1(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct$1(Class, arguments, _getPrototypeOf$2(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf$2(Wrapper, Class);
  };

  return _wrapNativeSuper$1(Class);
}

/**
 * Create an error file out of errors.md for development and a simple web link to the full errors
 * in production mode.
 * @private
 */


var PolishedError =
/*#__PURE__*/
function (_Error) {
  _inheritsLoose$2(PolishedError, _Error);

  function PolishedError(code) {
    var _this;

    {
      _this = _Error.call(this, "An error occurred. See https://github.com/styled-components/polished/blob/master/src/internalHelpers/errors.md#" + code + " for more information.") || this;
    }

    return _assertThisInitialized$2(_this);
  }

  return PolishedError;
}(
/*#__PURE__*/
_wrapNativeSuper$1(Error));

function colorToInt(color) {
  return Math.round(color * 255);
}

function convertToInt(red, green, blue) {
  return colorToInt(red) + "," + colorToInt(green) + "," + colorToInt(blue);
}

function hslToRgb(hue, saturation, lightness, convert) {
  if (convert === void 0) {
    convert = convertToInt;
  }

  if (saturation === 0) {
    // achromatic
    return convert(lightness, lightness, lightness);
  } // formular from https://en.wikipedia.org/wiki/HSL_and_HSV


  var huePrime = hue % 360 / 60;
  var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  var secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
  var red = 0;
  var green = 0;
  var blue = 0;

  if (huePrime >= 0 && huePrime < 1) {
    red = chroma;
    green = secondComponent;
  } else if (huePrime >= 1 && huePrime < 2) {
    red = secondComponent;
    green = chroma;
  } else if (huePrime >= 2 && huePrime < 3) {
    green = chroma;
    blue = secondComponent;
  } else if (huePrime >= 3 && huePrime < 4) {
    green = secondComponent;
    blue = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    red = secondComponent;
    blue = chroma;
  } else if (huePrime >= 5 && huePrime < 6) {
    red = chroma;
    blue = secondComponent;
  }

  var lightnessModification = lightness - chroma / 2;
  var finalRed = red + lightnessModification;
  var finalGreen = green + lightnessModification;
  var finalBlue = blue + lightnessModification;
  return convert(finalRed, finalGreen, finalBlue);
}

var namedColorMap = {
  aliceblue: 'f0f8ff',
  antiquewhite: 'faebd7',
  aqua: '00ffff',
  aquamarine: '7fffd4',
  azure: 'f0ffff',
  beige: 'f5f5dc',
  bisque: 'ffe4c4',
  black: '000',
  blanchedalmond: 'ffebcd',
  blue: '0000ff',
  blueviolet: '8a2be2',
  brown: 'a52a2a',
  burlywood: 'deb887',
  cadetblue: '5f9ea0',
  chartreuse: '7fff00',
  chocolate: 'd2691e',
  coral: 'ff7f50',
  cornflowerblue: '6495ed',
  cornsilk: 'fff8dc',
  crimson: 'dc143c',
  cyan: '00ffff',
  darkblue: '00008b',
  darkcyan: '008b8b',
  darkgoldenrod: 'b8860b',
  darkgray: 'a9a9a9',
  darkgreen: '006400',
  darkgrey: 'a9a9a9',
  darkkhaki: 'bdb76b',
  darkmagenta: '8b008b',
  darkolivegreen: '556b2f',
  darkorange: 'ff8c00',
  darkorchid: '9932cc',
  darkred: '8b0000',
  darksalmon: 'e9967a',
  darkseagreen: '8fbc8f',
  darkslateblue: '483d8b',
  darkslategray: '2f4f4f',
  darkslategrey: '2f4f4f',
  darkturquoise: '00ced1',
  darkviolet: '9400d3',
  deeppink: 'ff1493',
  deepskyblue: '00bfff',
  dimgray: '696969',
  dimgrey: '696969',
  dodgerblue: '1e90ff',
  firebrick: 'b22222',
  floralwhite: 'fffaf0',
  forestgreen: '228b22',
  fuchsia: 'ff00ff',
  gainsboro: 'dcdcdc',
  ghostwhite: 'f8f8ff',
  gold: 'ffd700',
  goldenrod: 'daa520',
  gray: '808080',
  green: '008000',
  greenyellow: 'adff2f',
  grey: '808080',
  honeydew: 'f0fff0',
  hotpink: 'ff69b4',
  indianred: 'cd5c5c',
  indigo: '4b0082',
  ivory: 'fffff0',
  khaki: 'f0e68c',
  lavender: 'e6e6fa',
  lavenderblush: 'fff0f5',
  lawngreen: '7cfc00',
  lemonchiffon: 'fffacd',
  lightblue: 'add8e6',
  lightcoral: 'f08080',
  lightcyan: 'e0ffff',
  lightgoldenrodyellow: 'fafad2',
  lightgray: 'd3d3d3',
  lightgreen: '90ee90',
  lightgrey: 'd3d3d3',
  lightpink: 'ffb6c1',
  lightsalmon: 'ffa07a',
  lightseagreen: '20b2aa',
  lightskyblue: '87cefa',
  lightslategray: '789',
  lightslategrey: '789',
  lightsteelblue: 'b0c4de',
  lightyellow: 'ffffe0',
  lime: '0f0',
  limegreen: '32cd32',
  linen: 'faf0e6',
  magenta: 'f0f',
  maroon: '800000',
  mediumaquamarine: '66cdaa',
  mediumblue: '0000cd',
  mediumorchid: 'ba55d3',
  mediumpurple: '9370db',
  mediumseagreen: '3cb371',
  mediumslateblue: '7b68ee',
  mediumspringgreen: '00fa9a',
  mediumturquoise: '48d1cc',
  mediumvioletred: 'c71585',
  midnightblue: '191970',
  mintcream: 'f5fffa',
  mistyrose: 'ffe4e1',
  moccasin: 'ffe4b5',
  navajowhite: 'ffdead',
  navy: '000080',
  oldlace: 'fdf5e6',
  olive: '808000',
  olivedrab: '6b8e23',
  orange: 'ffa500',
  orangered: 'ff4500',
  orchid: 'da70d6',
  palegoldenrod: 'eee8aa',
  palegreen: '98fb98',
  paleturquoise: 'afeeee',
  palevioletred: 'db7093',
  papayawhip: 'ffefd5',
  peachpuff: 'ffdab9',
  peru: 'cd853f',
  pink: 'ffc0cb',
  plum: 'dda0dd',
  powderblue: 'b0e0e6',
  purple: '800080',
  rebeccapurple: '639',
  red: 'f00',
  rosybrown: 'bc8f8f',
  royalblue: '4169e1',
  saddlebrown: '8b4513',
  salmon: 'fa8072',
  sandybrown: 'f4a460',
  seagreen: '2e8b57',
  seashell: 'fff5ee',
  sienna: 'a0522d',
  silver: 'c0c0c0',
  skyblue: '87ceeb',
  slateblue: '6a5acd',
  slategray: '708090',
  slategrey: '708090',
  snow: 'fffafa',
  springgreen: '00ff7f',
  steelblue: '4682b4',
  tan: 'd2b48c',
  teal: '008080',
  thistle: 'd8bfd8',
  tomato: 'ff6347',
  turquoise: '40e0d0',
  violet: 'ee82ee',
  wheat: 'f5deb3',
  white: 'fff',
  whitesmoke: 'f5f5f5',
  yellow: 'ff0',
  yellowgreen: '9acd32'
  /**
   * Checks if a string is a CSS named color and returns its equivalent hex value, otherwise returns the original color.
   * @private
   */

};

function nameToHex(color) {
  if (typeof color !== 'string') return color;
  var normalizedColorName = color.toLowerCase();
  return namedColorMap[normalizedColorName] ? "#" + namedColorMap[normalizedColorName] : color;
}

var hexRegex = /^#[a-fA-F0-9]{6}$/;
var hexRgbaRegex = /^#[a-fA-F0-9]{8}$/;
var reducedHexRegex = /^#[a-fA-F0-9]{3}$/;
var reducedRgbaHexRegex = /^#[a-fA-F0-9]{4}$/;
var rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
var rgbaRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/;
var hslRegex = /^hsl\(\s*(\d{0,3}[.]?[0-9]+)\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
var hslaRegex = /^hsla\(\s*(\d{0,3}[.]?[0-9]+)\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/;
/**
 * Returns an RgbColor or RgbaColor object. This utility function is only useful
 * if want to extract a color component. With the color util `toColorString` you
 * can convert a RgbColor or RgbaColor object back to a string.
 *
 * @example
 * // Assigns `{ red: 255, green: 0, blue: 0 }` to color1
 * const color1 = parseToRgb('rgb(255, 0, 0)');
 * // Assigns `{ red: 92, green: 102, blue: 112, alpha: 0.75 }` to color2
 * const color2 = parseToRgb('hsla(210, 10%, 40%, 0.75)');
 */

function parseToRgb(color) {
  if (typeof color !== 'string') {
    throw new PolishedError(3);
  }

  var normalizedColor = nameToHex(color);

  if (normalizedColor.match(hexRegex)) {
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
      green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
      blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16)
    };
  }

  if (normalizedColor.match(hexRgbaRegex)) {
    var alpha = parseFloat((parseInt("" + normalizedColor[7] + normalizedColor[8], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
      green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
      blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16),
      alpha: alpha
    };
  }

  if (normalizedColor.match(reducedHexRegex)) {
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
      green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
      blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16)
    };
  }

  if (normalizedColor.match(reducedRgbaHexRegex)) {
    var _alpha = parseFloat((parseInt("" + normalizedColor[4] + normalizedColor[4], 16) / 255).toFixed(2));

    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
      green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
      blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16),
      alpha: _alpha
    };
  }

  var rgbMatched = rgbRegex.exec(normalizedColor);

  if (rgbMatched) {
    return {
      red: parseInt("" + rgbMatched[1], 10),
      green: parseInt("" + rgbMatched[2], 10),
      blue: parseInt("" + rgbMatched[3], 10)
    };
  }

  var rgbaMatched = rgbaRegex.exec(normalizedColor);

  if (rgbaMatched) {
    return {
      red: parseInt("" + rgbaMatched[1], 10),
      green: parseInt("" + rgbaMatched[2], 10),
      blue: parseInt("" + rgbaMatched[3], 10),
      alpha: parseFloat("" + rgbaMatched[4])
    };
  }

  var hslMatched = hslRegex.exec(normalizedColor);

  if (hslMatched) {
    var hue = parseInt("" + hslMatched[1], 10);
    var saturation = parseInt("" + hslMatched[2], 10) / 100;
    var lightness = parseInt("" + hslMatched[3], 10) / 100;
    var rgbColorString = "rgb(" + hslToRgb(hue, saturation, lightness) + ")";
    var hslRgbMatched = rgbRegex.exec(rgbColorString);

    if (!hslRgbMatched) {
      throw new PolishedError(4, normalizedColor, rgbColorString);
    }

    return {
      red: parseInt("" + hslRgbMatched[1], 10),
      green: parseInt("" + hslRgbMatched[2], 10),
      blue: parseInt("" + hslRgbMatched[3], 10)
    };
  }

  var hslaMatched = hslaRegex.exec(normalizedColor);

  if (hslaMatched) {
    var _hue = parseInt("" + hslaMatched[1], 10);

    var _saturation = parseInt("" + hslaMatched[2], 10) / 100;

    var _lightness = parseInt("" + hslaMatched[3], 10) / 100;

    var _rgbColorString = "rgb(" + hslToRgb(_hue, _saturation, _lightness) + ")";

    var _hslRgbMatched = rgbRegex.exec(_rgbColorString);

    if (!_hslRgbMatched) {
      throw new PolishedError(4, normalizedColor, _rgbColorString);
    }

    return {
      red: parseInt("" + _hslRgbMatched[1], 10),
      green: parseInt("" + _hslRgbMatched[2], 10),
      blue: parseInt("" + _hslRgbMatched[3], 10),
      alpha: parseFloat("" + hslaMatched[4])
    };
  }

  throw new PolishedError(5);
}

function rgbToHsl(color) {
  // make sure rgb are contained in a set of [0, 255]
  var red = color.red / 255;
  var green = color.green / 255;
  var blue = color.blue / 255;
  var max = Math.max(red, green, blue);
  var min = Math.min(red, green, blue);
  var lightness = (max + min) / 2;

  if (max === min) {
    // achromatic
    if (color.alpha !== undefined) {
      return {
        hue: 0,
        saturation: 0,
        lightness: lightness,
        alpha: color.alpha
      };
    } else {
      return {
        hue: 0,
        saturation: 0,
        lightness: lightness
      };
    }
  }

  var hue;
  var delta = max - min;
  var saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

  switch (max) {
    case red:
      hue = (green - blue) / delta + (green < blue ? 6 : 0);
      break;

    case green:
      hue = (blue - red) / delta + 2;
      break;

    default:
      // blue case
      hue = (red - green) / delta + 4;
      break;
  }

  hue *= 60;

  if (color.alpha !== undefined) {
    return {
      hue: hue,
      saturation: saturation,
      lightness: lightness,
      alpha: color.alpha
    };
  }

  return {
    hue: hue,
    saturation: saturation,
    lightness: lightness
  };
}
/**
 * Returns an HslColor or HslaColor object. This utility function is only useful
 * if want to extract a color component. With the color util `toColorString` you
 * can convert a HslColor or HslaColor object back to a string.
 *
 * @example
 * // Assigns `{ hue: 0, saturation: 1, lightness: 0.5 }` to color1
 * const color1 = parseToHsl('rgb(255, 0, 0)');
 * // Assigns `{ hue: 128, saturation: 1, lightness: 0.5, alpha: 0.75 }` to color2
 * const color2 = parseToHsl('hsla(128, 100%, 50%, 0.75)');
 */


function parseToHsl(color) {
  // Note: At a later stage we can optimize this function as right now a hsl
  // color would be parsed converted to rgb values and converted back to hsl.
  return rgbToHsl(parseToRgb(color));
}
/**
 * Reduces hex values if possible e.g. #ff8866 to #f86
 * @private
 */


var reduceHexValue = function reduceHexValue(value) {
  if (value.length === 7 && value[1] === value[2] && value[3] === value[4] && value[5] === value[6]) {
    return "#" + value[1] + value[3] + value[5];
  }

  return value;
};

function numberToHex(value) {
  var hex = value.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function colorToHex(color) {
  return numberToHex(Math.round(color * 255));
}

function convertToHex(red, green, blue) {
  return reduceHexValue("#" + colorToHex(red) + colorToHex(green) + colorToHex(blue));
}

function hslToHex(hue, saturation, lightness) {
  return hslToRgb(hue, saturation, lightness, convertToHex);
}
/**
 * Returns a string value for the color. The returned result is the smallest possible hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: hsl(359, 0.75, 0.4),
 *   background: hsl({ hue: 360, saturation: 0.75, lightness: 0.4 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${hsl(359, 0.75, 0.4)};
 *   background: ${hsl({ hue: 360, saturation: 0.75, lightness: 0.4 })};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#b3191c";
 *   background: "#b3191c";
 * }
 */


function hsl(value, saturation, lightness) {
  if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number') {
    return hslToHex(value, saturation, lightness);
  } else if (typeof value === 'object' && saturation === undefined && lightness === undefined) {
    return hslToHex(value.hue, value.saturation, value.lightness);
  }

  throw new PolishedError(1);
}
/**
 * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: hsla(359, 0.75, 0.4, 0.7),
 *   background: hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 }),
 *   background: hsla(359, 0.75, 0.4, 1),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${hsla(359, 0.75, 0.4, 0.7)};
 *   background: ${hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 })};
 *   background: ${hsla(359, 0.75, 0.4, 1)};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(179,25,28,0.7)";
 *   background: "rgba(179,25,28,0.7)";
 *   background: "#b3191c";
 * }
 */


function hsla(value, saturation, lightness, alpha) {
  if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number' && typeof alpha === 'number') {
    return alpha >= 1 ? hslToHex(value, saturation, lightness) : "rgba(" + hslToRgb(value, saturation, lightness) + "," + alpha + ")";
  } else if (typeof value === 'object' && saturation === undefined && lightness === undefined && alpha === undefined) {
    return value.alpha >= 1 ? hslToHex(value.hue, value.saturation, value.lightness) : "rgba(" + hslToRgb(value.hue, value.saturation, value.lightness) + "," + value.alpha + ")";
  }

  throw new PolishedError(2);
}
/**
 * Returns a string value for the color. The returned result is the smallest possible hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: rgb(255, 205, 100),
 *   background: rgb({ red: 255, green: 205, blue: 100 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${rgb(255, 205, 100)};
 *   background: ${rgb({ red: 255, green: 205, blue: 100 })};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#ffcd64";
 *   background: "#ffcd64";
 * }
 */


function rgb(value, green, blue) {
  if (typeof value === 'number' && typeof green === 'number' && typeof blue === 'number') {
    return reduceHexValue("#" + numberToHex(value) + numberToHex(green) + numberToHex(blue));
  } else if (typeof value === 'object' && green === undefined && blue === undefined) {
    return reduceHexValue("#" + numberToHex(value.red) + numberToHex(value.green) + numberToHex(value.blue));
  }

  throw new PolishedError(6);
}
/**
 * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
 *
 * Can also be used to fade a color by passing a hex value or named CSS color along with an alpha value.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: rgba(255, 205, 100, 0.7),
 *   background: rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 }),
 *   background: rgba(255, 205, 100, 1),
 *   background: rgba('#ffffff', 0.4),
 *   background: rgba('black', 0.7),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${rgba(255, 205, 100, 0.7)};
 *   background: ${rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 })};
 *   background: ${rgba(255, 205, 100, 1)};
 *   background: ${rgba('#ffffff', 0.4)};
 *   background: ${rgba('black', 0.7)};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(255,205,100,0.7)";
 *   background: "rgba(255,205,100,0.7)";
 *   background: "#ffcd64";
 *   background: "rgba(255,255,255,0.4)";
 *   background: "rgba(0,0,0,0.7)";
 * }
 */


function rgba(firstValue, secondValue, thirdValue, fourthValue) {
  if (typeof firstValue === 'string' && typeof secondValue === 'number') {
    var rgbValue = parseToRgb(firstValue);
    return "rgba(" + rgbValue.red + "," + rgbValue.green + "," + rgbValue.blue + "," + secondValue + ")";
  } else if (typeof firstValue === 'number' && typeof secondValue === 'number' && typeof thirdValue === 'number' && typeof fourthValue === 'number') {
    return fourthValue >= 1 ? rgb(firstValue, secondValue, thirdValue) : "rgba(" + firstValue + "," + secondValue + "," + thirdValue + "," + fourthValue + ")";
  } else if (typeof firstValue === 'object' && secondValue === undefined && thirdValue === undefined && fourthValue === undefined) {
    return firstValue.alpha >= 1 ? rgb(firstValue.red, firstValue.green, firstValue.blue) : "rgba(" + firstValue.red + "," + firstValue.green + "," + firstValue.blue + "," + firstValue.alpha + ")";
  }

  throw new PolishedError(7);
}

var isRgb = function isRgb(color) {
  return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
};

var isRgba = function isRgba(color) {
  return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && typeof color.alpha === 'number';
};

var isHsl = function isHsl(color) {
  return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
};

var isHsla = function isHsla(color) {
  return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && typeof color.alpha === 'number';
};
/**
 * Converts a RgbColor, RgbaColor, HslColor or HslaColor object to a color string.
 * This util is useful in case you only know on runtime which color object is
 * used. Otherwise we recommend to rely on `rgb`, `rgba`, `hsl` or `hsla`.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: toColorString({ red: 255, green: 205, blue: 100 }),
 *   background: toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 }),
 *   background: toColorString({ hue: 240, saturation: 1, lightness: 0.5 }),
 *   background: toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${toColorString({ red: 255, green: 205, blue: 100 })};
 *   background: ${toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 })};
 *   background: ${toColorString({ hue: 240, saturation: 1, lightness: 0.5 })};
 *   background: ${toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 })};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#ffcd64";
 *   background: "rgba(255,205,100,0.72)";
 *   background: "#00f";
 *   background: "rgba(179,25,25,0.72)";
 * }
 */


function toColorString(color) {
  if (typeof color !== 'object') throw new PolishedError(8);
  if (isRgba(color)) return rgba(color);
  if (isRgb(color)) return rgb(color);
  if (isHsla(color)) return hsla(color);
  if (isHsl(color)) return hsl(color);
  throw new PolishedError(8);
} // Type definitions taken from https://github.com/gcanti/flow-static-land/blob/master/src/Fun.js
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-redeclare


function curried(f, length, acc) {
  return function fn() {
    // eslint-disable-next-line prefer-rest-params
    var combined = acc.concat(Array.prototype.slice.call(arguments));
    return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined);
  };
} // eslint-disable-next-line no-redeclare


function curry(f) {
  // eslint-disable-line no-redeclare
  return curried(f, f.length, []);
}
/**
 * Changes the hue of the color. Hue is a number between 0 to 360. The first
 * argument for adjustHue is the amount of degrees the color is rotated along
 * the color wheel.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: adjustHue(180, '#448'),
 *   background: adjustHue('180', 'rgba(101,100,205,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${adjustHue(180, '#448')};
 *   background: ${adjustHue('180', 'rgba(101,100,205,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#888844";
 *   background: "rgba(136,136,68,0.7)";
 * }
 */


function adjustHue(degree, color) {
  if (color === 'transparent') return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends$3({}, hslColor, {
    hue: (hslColor.hue + parseFloat(degree)) % 360
  }));
} // prettier-ignore


var curriedAdjustHue =
/*#__PURE__*/
curry
/* ::<number | string, string, string> */
(adjustHue);

function guard(lowerBoundary, upperBoundary, value) {
  return Math.max(lowerBoundary, Math.min(upperBoundary, value));
}
/**
 * Returns a string value for the darkened color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: darken(0.2, '#FFCD64'),
 *   background: darken('0.2', 'rgba(255,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${darken(0.2, '#FFCD64')};
 *   background: ${darken('0.2', 'rgba(255,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#ffbd31";
 *   background: "rgba(255,189,49,0.7)";
 * }
 */


function darken(amount, color) {
  if (color === 'transparent') return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends$3({}, hslColor, {
    lightness: guard(0, 1, hslColor.lightness - parseFloat(amount))
  }));
} // prettier-ignore


var curriedDarken =
/*#__PURE__*/
curry
/* ::<number | string, string, string> */
(darken);
/**
 * Decreases the intensity of a color. Its range is between 0 to 1. The first
 * argument of the desaturate function is the amount by how much the color
 * intensity should be decreased.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: desaturate(0.2, '#CCCD64'),
 *   background: desaturate('0.2', 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${desaturate(0.2, '#CCCD64')};
 *   background: ${desaturate('0.2', 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#b8b979";
 *   background: "rgba(184,185,121,0.7)";
 * }
 */

function desaturate(amount, color) {
  if (color === 'transparent') return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends$3({}, hslColor, {
    saturation: guard(0, 1, hslColor.saturation - parseFloat(amount))
  }));
} // prettier-ignore


var curriedDesaturate =
/*#__PURE__*/
curry
/* ::<number | string, string, string> */
(desaturate);
/**
 * Returns a string value for the lightened color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: lighten(0.2, '#CCCD64'),
 *   background: lighten('0.2', 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${lighten(0.2, '#FFCD64')};
 *   background: ${lighten('0.2', 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#e5e6b1";
 *   background: "rgba(229,230,177,0.7)";
 * }
 */


function lighten(amount, color) {
  if (color === 'transparent') return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends$3({}, hslColor, {
    lightness: guard(0, 1, hslColor.lightness + parseFloat(amount))
  }));
} // prettier-ignore


var curriedLighten =
/*#__PURE__*/
curry
/* ::<number | string, string, string> */
(lighten);
/**
 * Mixes the two provided colors together by calculating the average of each of the RGB components weighted to the first color by the provided weight.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: mix(0.5, '#f00', '#00f')
 *   background: mix(0.25, '#f00', '#00f')
 *   background: mix('0.5', 'rgba(255, 0, 0, 0.5)', '#00f')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${mix(0.5, '#f00', '#00f')};
 *   background: ${mix(0.25, '#f00', '#00f')};
 *   background: ${mix('0.5', 'rgba(255, 0, 0, 0.5)', '#00f')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#7f007f";
 *   background: "#3f00bf";
 *   background: "rgba(63, 0, 191, 0.75)";
 * }
 */

function mix(weight, color, otherColor) {
  if (color === 'transparent') return otherColor;
  if (otherColor === 'transparent') return color;
  var parsedColor1 = parseToRgb(color);

  var color1 = _extends$3({}, parsedColor1, {
    alpha: typeof parsedColor1.alpha === 'number' ? parsedColor1.alpha : 1
  });

  var parsedColor2 = parseToRgb(otherColor);

  var color2 = _extends$3({}, parsedColor2, {
    alpha: typeof parsedColor2.alpha === 'number' ? parsedColor2.alpha : 1 // The formular is copied from the original Sass implementation:
    // http://sass-lang.com/documentation/Sass/Script/Functions.html#mix-instance_method

  });

  var alphaDelta = color1.alpha - color2.alpha;
  var x = parseFloat(weight) * 2 - 1;
  var y = x * alphaDelta === -1 ? x : x + alphaDelta;
  var z = 1 + x * alphaDelta;
  var weight1 = (y / z + 1) / 2.0;
  var weight2 = 1 - weight1;
  var mixedColor = {
    red: Math.floor(color1.red * weight1 + color2.red * weight2),
    green: Math.floor(color1.green * weight1 + color2.green * weight2),
    blue: Math.floor(color1.blue * weight1 + color2.blue * weight2),
    alpha: color1.alpha + (color2.alpha - color1.alpha) * (parseFloat(weight) / 1.0)
  };
  return rgba(mixedColor);
} // prettier-ignore


var curriedMix =
/*#__PURE__*/
curry
/* ::<number | string, string, string, string> */
(mix);
/**
 * Increases the opacity of a color. Its range for the amount is between 0 to 1.
 *
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: opacify(0.1, 'rgba(255, 255, 255, 0.9)');
 *   background: opacify(0.2, 'hsla(0, 0%, 100%, 0.5)'),
 *   background: opacify('0.5', 'rgba(255, 0, 0, 0.2)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${opacify(0.1, 'rgba(255, 255, 255, 0.9)')};
 *   background: ${opacify(0.2, 'hsla(0, 0%, 100%, 0.5)')},
 *   background: ${opacify('0.5', 'rgba(255, 0, 0, 0.2)')},
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#fff";
 *   background: "rgba(255,255,255,0.7)";
 *   background: "rgba(255,0,0,0.7)";
 * }
 */

function opacify(amount, color) {
  if (color === 'transparent') return color;
  var parsedColor = parseToRgb(color);
  var alpha = typeof parsedColor.alpha === 'number' ? parsedColor.alpha : 1;

  var colorWithAlpha = _extends$3({}, parsedColor, {
    alpha: guard(0, 1, (alpha * 100 + parseFloat(amount) * 100) / 100)
  });

  return rgba(colorWithAlpha);
} // prettier-ignore


var curriedOpacify =
/*#__PURE__*/
curry
/* ::<number | string, string, string> */
(opacify);
/**
 * Increases the intensity of a color. Its range is between 0 to 1. The first
 * argument of the saturate function is the amount by how much the color
 * intensity should be increased.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: saturate(0.2, '#CCCD64'),
 *   background: saturate('0.2', 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${saturate(0.2, '#FFCD64')};
 *   background: ${saturate('0.2', 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#e0e250";
 *   background: "rgba(224,226,80,0.7)";
 * }
 */


function saturate(amount, color) {
  if (color === 'transparent') return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends$3({}, hslColor, {
    saturation: guard(0, 1, hslColor.saturation + parseFloat(amount))
  }));
} // prettier-ignore


var curriedSaturate =
/*#__PURE__*/
curry
/* ::<number | string, string, string> */
(saturate);
/**
 * Sets the hue of a color to the provided value. The hue range can be
 * from 0 and 359.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: setHue(42, '#CCCD64'),
 *   background: setHue('244', 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${setHue(42, '#CCCD64')};
 *   background: ${setHue('244', 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#cdae64";
 *   background: "rgba(107,100,205,0.7)";
 * }
 */

function setHue(hue, color) {
  if (color === 'transparent') return color;
  return toColorString(_extends$3({}, parseToHsl(color), {
    hue: parseFloat(hue)
  }));
} // prettier-ignore


var curriedSetHue =
/*#__PURE__*/
curry
/* ::<number | string, string, string> */
(setHue);
/**
 * Sets the lightness of a color to the provided value. The lightness range can be
 * from 0 and 1.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: setLightness(0.2, '#CCCD64'),
 *   background: setLightness('0.75', 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${setLightness(0.2, '#CCCD64')};
 *   background: ${setLightness('0.75', 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#4d4d19";
 *   background: "rgba(223,224,159,0.7)";
 * }
 */

function setLightness(lightness, color) {
  if (color === 'transparent') return color;
  return toColorString(_extends$3({}, parseToHsl(color), {
    lightness: parseFloat(lightness)
  }));
} // prettier-ignore


var curriedSetLightness =
/*#__PURE__*/
curry
/* ::<number | string, string, string> */
(setLightness);
/**
 * Sets the saturation of a color to the provided value. The saturation range can be
 * from 0 and 1.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: setSaturation(0.2, '#CCCD64'),
 *   background: setSaturation('0.75', 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${setSaturation(0.2, '#CCCD64')};
 *   background: ${setSaturation('0.75', 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#adad84";
 *   background: "rgba(228,229,76,0.7)";
 * }
 */

function setSaturation(saturation, color) {
  if (color === 'transparent') return color;
  return toColorString(_extends$3({}, parseToHsl(color), {
    saturation: parseFloat(saturation)
  }));
} // prettier-ignore


var curriedSetSaturation =
/*#__PURE__*/
curry
/* ::<number | string, string, string> */
(setSaturation);
/**
 * Shades a color by mixing it with black. `shade` can produce
 * hue shifts, where as `darken` manipulates the luminance channel and therefore
 * doesn't produce hue shifts.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: shade(0.25, '#00f')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${shade(0.25, '#00f')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#00003f";
 * }
 */

function shade(percentage, color) {
  if (color === 'transparent') return color;
  return curriedMix(parseFloat(percentage), 'rgb(0, 0, 0)', color);
} // prettier-ignore


var curriedShade =
/*#__PURE__*/
curry
/* ::<number | string, string, string> */
(shade);
/**
 * Tints a color by mixing it with white. `tint` can produce
 * hue shifts, where as `lighten` manipulates the luminance channel and therefore
 * doesn't produce hue shifts.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: tint(0.25, '#00f')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${tint(0.25, '#00f')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#bfbfff";
 * }
 */

function tint(percentage, color) {
  if (color === 'transparent') return color;
  return curriedMix(parseFloat(percentage), 'rgb(255, 255, 255)', color);
} // prettier-ignore


var curriedTint =
/*#__PURE__*/
curry
/* ::<number | string, string, string> */
(tint);
/**
 * Decreases the opacity of a color. Its range for the amount is between 0 to 1.
 *
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: transparentize(0.1, '#fff');
 *   background: transparentize(0.2, 'hsl(0, 0%, 100%)'),
 *   background: transparentize('0.5', 'rgba(255, 0, 0, 0.8)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${transparentize(0.1, '#fff')};
 *   background: ${transparentize(0.2, 'hsl(0, 0%, 100%)')},
 *   background: ${transparentize('0.5', 'rgba(255, 0, 0, 0.8)')},
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(255,255,255,0.9)";
 *   background: "rgba(255,255,255,0.8)";
 *   background: "rgba(255,0,0,0.3)";
 * }
 */

function transparentize(amount, color) {
  if (color === 'transparent') return color;
  var parsedColor = parseToRgb(color);
  var alpha = typeof parsedColor.alpha === 'number' ? parsedColor.alpha : 1;

  var colorWithAlpha = _extends$3({}, parsedColor, {
    alpha: guard(0, 1, (alpha * 100 - parseFloat(amount) * 100) / 100)
  });

  return rgba(colorWithAlpha);
} // prettier-ignore


var curriedTransparentize =
/*#__PURE__*/
curry
/* ::<number | string, string, string> */
(transparentize);

function _templateObject4$4() {
  var data = _taggedTemplateLiteral(["\n      color: ", ";\n      background: ", ";\n      border-color: ", ";\n      border-bottom-color: ", ";\n      :not([disabled]) {\n        &:hover,\n        &:focus {\n          background: ", ";\n          color: ", ";\n        }\n        &:active {\n          color: ", ";\n          background: ", ";\n          border-width: 2px 1px 1px 1px;\n          border-color: ", ";\n          outline: none;\n        }\n      }\n      &[aria-pressed=\"true\"] {\n        color: ", ";\n        background: ", ";\n        border-width: 2px 1px 1px 1px;\n        border-color: ", ";\n        border-top-color: ", ";\n        box-shadow: inset 0 1px 2px 0 ", ";\n        :not([disabled]) {\n          &:hover,\n          &:focus {\n            background-color: ", ";\n          }\n          &:active {\n            border-top-color: ", ";\n          }\n        }\n      }\n      /* keep it last so it overrides other styles */\n      &[disabled] {\n        cursor: not-allowed;\n        color: ", ";\n      }\n    "]);

  _templateObject4$4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$5() {
  var data = _taggedTemplateLiteral(["\n        padding: ", ";\n        color: ", ";\n        line-height: 0;\n        border: none;\n        &:hover {\n          color: ", ";\n        }\n        &:active {\n          position: relative;\n          top: 1px;\n        }\n      "]);

  _templateObject3$5 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$7() {
  var data = _taggedTemplateLiteral(["\n        padding: 0;\n        vertical-align: initial;\n        line-height: initial;\n        color: ", ";\n        font-weight: normal;\n        font-size: inherit;\n        background: none;\n        border: none;\n        border-radius: 0;\n        text-decoration: underline;\n        &:focus,\n        &:hover,\n        &:active {\n          text-decoration: none;\n        }\n      "]);

  _templateObject2$7 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$a() {
  var data = _taggedTemplateLiteral(["\n  padding: ", " ", ";\n  appearance: none;\n  text-align: center;\n  line-height: inherit;\n  font-size: ", ";\n  font-weight: 600;\n  vertical-align: middle;\n  border-style: solid;\n  border-width: 1px 1px 2px 1px;\n  border-radius: ", ";\n  cursor: pointer;\n  transition: background-color ", " ease;\n\n  ", "\n"]);

  _templateObject$a = function _templateObject() {
    return data;
  };

  return data;
}
// eslint-disable-next-line

var Button = function Button(_ref) {
  var pressed = _ref.pressed,
      variant = _ref.variant,
      onClick = _ref.onClick,
      props = _objectWithoutProperties(_ref, ["pressed", "variant", "onClick"]);

  return React.createElement("button", _extends({
    "aria-pressed": pressed
  }, props, {
    onClick: onClick
  }));
};

Button.propTypes = {
  variant: PropTypes.oneOf(["default", "primary", "secondary", "info", "warning", "danger", "success", "icon", "link"]),
  onClick: PropTypes.func,
  pressed: PropTypes.bool
};
Button.defaultProps = {
  variant: "default",
  onClick: function onClick() {},
  pressed: false
};
var StyledButton = styled(Button)(_templateObject$a(), spacing.small, spacing.base, fonts.sizeBase, box.borderRadius, animations.transitionTiming, function (props) {
  var backgroundColor = colors.blueLight;
  var color = colors.primaryText;

  if (props.variant === "link") {
    return css(_templateObject2$7(), colors.blue);
  }

  if (props.variant === "icon") {
    return css(_templateObject3$5(), spacing.base, colors.darkText, curriedLighten(0.3, colors.darkText));
  }

  if (props.variant && props.variant !== "default") {
    backgroundColor = colors["".concat(props.variant, "Background")];
    color = colors["".concat(props.variant, "Text")];
  }

  return css(_templateObject4$4(), color, backgroundColor, backgroundColor, curriedDarken(0.1, backgroundColor), curriedLighten(0.05, backgroundColor), curriedLighten(0.05, color), curriedLighten(0.1, color), curriedLighten(0.1, backgroundColor), backgroundColor, curriedLighten(0.05, color), curriedLighten(0.05, backgroundColor), backgroundColor, curriedDarken(0.1, backgroundColor), curriedDarken(0.1, backgroundColor), backgroundColor, curriedDarken(0.1, backgroundColor), curriedTransparentize(0.6, color));
});
StyledButton.defaultProps = {
  variant: "default"
};

var BreadCrumbs = function BreadCrumbs(_ref) {
  var entries = _ref.entries;
  return React.createElement("nav", {
    className: "breadcrumb",
    "aria-label": "breadcrumb"
  }, React.createElement("ol", {
    className: "breadcrumb"
  }, entries.map(function (entry, i) {
    return React.createElement("li", {
      key: i,
      className: "breadcrumb-item"
    }, entry);
  })));
};

BreadCrumbs.propTypes = {
  entries: PropTypes.node
};
BreadCrumbs.defaultProps = {
  entries: [React.createElement("a", {
    key: "accueil",
    href: "/"
  }, "Accueil"), "end"]
};

function Cards(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  return React.createElement("ul", _extends({
    className: "card-wrapper"
  }, props), children);
}
Cards.propTypes = {
  children: PropTypes.node
};

function Card(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  return React.createElement("li", _extends({
    className: "card"
  }, props), children);
}
Card.propTypes = {
  children: PropTypes.node
};

var Categories = function Categories(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? "" : _ref$className,
      props = _objectWithoutProperties(_ref, ["className"]);

  return React.createElement("div", {
    className: "categories"
  }, React.createElement("ul", _extends({
    className: "categories__list ".concat(className)
  }, props)));
};

Categories.propTypes = {
  className: PropTypes.string
};

var Category = function Category(_ref) {
  var small = _ref.small,
      props = _objectWithoutProperties(_ref, ["small"]);

  return React.createElement("li", _extends({
    className: "categories__list-item".concat(small ? " categories__list-item--small" : "")
  }, props));
};

Category.propTypes = {
  small: PropTypes.bool
};
Category.defaultProps = {
  small: false
};

function LargeLink(props) {
  return (//eslint-disable-next-line jsx-a11y/anchor-has-content
    React.createElement("a", _extends({
      className: "btn-large"
    }, props))
  );
}

function _templateObject$b() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n"]);

  _templateObject$b = function _templateObject() {
    return data;
  };

  return data;
}
var SrOnly = styled.div(_templateObject$b());

function isTab(el) {
  return el.type && el.type.tabsRole === 'Tab';
}
function isTabPanel(el) {
  return el.type && el.type.tabsRole === 'TabPanel';
}
function isTabList(el) {
  return el.type && el.type.tabsRole === 'TabList';
}

function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty$2(target, key, source[key]);
    });
  }

  return target;
}

function _defineProperty$2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function isTabChild(child) {
  return isTab(child) || isTabList(child) || isTabPanel(child);
}

function deepMap(children, callback) {
  return Children.map(children, function (child) {
    // null happens when conditionally rendering TabPanel/Tab
    // see https://github.com/reactjs/react-tabs/issues/37
    if (child === null) return null;

    if (isTabChild(child)) {
      return callback(child);
    }

    if (child.props && child.props.children && typeof child.props.children === 'object') {
      // Clone the child that has children and map them too
      return cloneElement(child, _objectSpread$2({}, child.props, {
        children: deepMap(child.props.children, callback)
      }));
    }

    return child;
  });
}
function deepForEach(children, callback) {
  return Children.forEach(children, function (child) {
    // null happens when conditionally rendering TabPanel/Tab
    // see https://github.com/reactjs/react-tabs/issues/37
    if (child === null) return;

    if (isTab(child) || isTabPanel(child)) {
      callback(child);
    } else if (child.props && child.props.children && typeof child.props.children === 'object') {
      if (isTabList(child)) callback(child);
      deepForEach(child.props.children, callback);
    }
  });
}

var classnames$1 = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

/* global define */
(function () {

  var hasOwn = {}.hasOwnProperty;

  function classNames() {
    var classes = [];

    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;
      var argType = typeof arg;

      if (argType === 'string' || argType === 'number') {
        classes.push(arg);
      } else if (Array.isArray(arg) && arg.length) {
        var inner = classNames.apply(null, arg);

        if (inner) {
          classes.push(inner);
        }
      } else if (argType === 'object') {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }

    return classes.join(' ');
  }

  if (module.exports) {
    classNames.default = classNames;
    module.exports = classNames;
  } else {
    window.classNames = classNames;
  }
})();
});

// Get a universally unique identifier
var count = 0;
function uuid() {
  return "react-tabs-" + count++;
}

function getTabsCount(children) {
  var tabCount = 0;
  deepForEach(children, function (child) {
    if (isTab(child)) tabCount++;
  });
  return tabCount;
}
function getPanelsCount(children) {
  var panelCount = 0;
  deepForEach(children, function (child) {
    if (isTabPanel(child)) panelCount++;
  });
  return panelCount;
}

function _extends$4() {
  _extends$4 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$4.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$2(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _inheritsLoose$3(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function isNode(node) {
  return node && 'getAttribute' in node;
} // Determine if a node from event.target is a Tab element


function isTabNode(node) {
  return isNode(node) && node.getAttribute('role') === 'tab';
} // Determine if a tab node is disabled


function isTabDisabled(node) {
  return isNode(node) && node.getAttribute('aria-disabled') === 'true';
}

var canUseActiveElement;

try {
  canUseActiveElement = !!(typeof window !== 'undefined' && window.document && window.document.activeElement);
} catch (e) {
  // Work around for IE bug when accessing document.activeElement in an iframe
  // Refer to the following resources:
  // http://stackoverflow.com/a/10982960/369687
  // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12733599
  canUseActiveElement = false;
}

var UncontrolledTabs =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose$3(UncontrolledTabs, _Component);

  function UncontrolledTabs() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.tabNodes = [];

    _this.handleKeyDown = function (e) {
      if (_this.isTabFromContainer(e.target)) {
        var index = _this.props.selectedIndex;
        var preventDefault = false;
        var useSelectedIndex = false;

        if (e.keyCode === 32 || e.keyCode === 13) {
          preventDefault = true;
          useSelectedIndex = false;

          _this.handleClick(e);
        }

        if (e.keyCode === 37 || e.keyCode === 38) {
          // Select next tab to the left
          index = _this.getPrevTab(index);
          preventDefault = true;
          useSelectedIndex = true;
        } else if (e.keyCode === 39 || e.keyCode === 40) {
          // Select next tab to the right
          index = _this.getNextTab(index);
          preventDefault = true;
          useSelectedIndex = true;
        } else if (e.keyCode === 35) {
          // Select last tab (End key)
          index = _this.getLastTab();
          preventDefault = true;
          useSelectedIndex = true;
        } else if (e.keyCode === 36) {
          // Select first tab (Home key)
          index = _this.getFirstTab();
          preventDefault = true;
          useSelectedIndex = true;
        } // This prevents scrollbars from moving around


        if (preventDefault) {
          e.preventDefault();
        } // Only use the selected index in the state if we're not using the tabbed index


        if (useSelectedIndex) {
          _this.setSelected(index, e);
        }
      }
    };

    _this.handleClick = function (e) {
      var node = e.target; // eslint-disable-next-line no-cond-assign

      do {
        if (_this.isTabFromContainer(node)) {
          if (isTabDisabled(node)) {
            return;
          }

          var index = [].slice.call(node.parentNode.children).filter(isTabNode).indexOf(node);

          _this.setSelected(index, e);

          return;
        }
      } while ((node = node.parentNode) != null);
    };

    return _this;
  }

  var _proto = UncontrolledTabs.prototype;

  _proto.setSelected = function setSelected(index, event) {
    // Check index boundary
    if (index < 0 || index >= this.getTabsCount()) return;
    var _this$props = this.props,
        onSelect = _this$props.onSelect,
        selectedIndex = _this$props.selectedIndex; // Call change event handler

    onSelect(index, selectedIndex, event);
  };

  _proto.getNextTab = function getNextTab(index) {
    var count = this.getTabsCount(); // Look for non-disabled tab from index to the last tab on the right

    for (var i = index + 1; i < count; i++) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    } // If no tab found, continue searching from first on left to index


    for (var _i = 0; _i < index; _i++) {
      if (!isTabDisabled(this.getTab(_i))) {
        return _i;
      }
    } // No tabs are disabled, return index


    return index;
  };

  _proto.getPrevTab = function getPrevTab(index) {
    var i = index; // Look for non-disabled tab from index to first tab on the left

    while (i--) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    } // If no tab found, continue searching from last tab on right to index


    i = this.getTabsCount();

    while (i-- > index) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    } // No tabs are disabled, return index


    return index;
  };

  _proto.getFirstTab = function getFirstTab() {
    var count = this.getTabsCount(); // Look for non disabled tab from the first tab

    for (var i = 0; i < count; i++) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    }

    return null;
  };

  _proto.getLastTab = function getLastTab() {
    var i = this.getTabsCount(); // Look for non disabled tab from the last tab

    while (i--) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    }

    return null;
  };

  _proto.getTabsCount = function getTabsCount$$1() {
    var children = this.props.children;
    return getTabsCount(children);
  };

  _proto.getPanelsCount = function getPanelsCount$$1() {
    var children = this.props.children;
    return getPanelsCount(children);
  };

  _proto.getTab = function getTab(index) {
    return this.tabNodes["tabs-" + index];
  };

  _proto.getChildren = function getChildren() {
    var _this2 = this;

    var index = 0;
    var _this$props2 = this.props,
        children = _this$props2.children,
        disabledTabClassName = _this$props2.disabledTabClassName,
        focus = _this$props2.focus,
        forceRenderTabPanel = _this$props2.forceRenderTabPanel,
        selectedIndex = _this$props2.selectedIndex,
        selectedTabClassName = _this$props2.selectedTabClassName,
        selectedTabPanelClassName = _this$props2.selectedTabPanelClassName;
    this.tabIds = this.tabIds || [];
    this.panelIds = this.panelIds || [];
    var diff = this.tabIds.length - this.getTabsCount(); // Add ids if new tabs have been added
    // Don't bother removing ids, just keep them in case they are added again
    // This is more efficient, and keeps the uuid counter under control

    while (diff++ < 0) {
      this.tabIds.push(uuid());
      this.panelIds.push(uuid());
    } // Map children to dynamically setup refs


    return deepMap(children, function (child) {
      var result = child; // Clone TabList and Tab components to have refs

      if (isTabList(child)) {
        var listIndex = 0; // Figure out if the current focus in the DOM is set on a Tab
        // If it is we should keep the focus on the next selected tab

        var wasTabFocused = false;

        if (canUseActiveElement) {
          wasTabFocused = React.Children.toArray(child.props.children).filter(isTab).some(function (tab, i) {
            return document.activeElement === _this2.getTab(i);
          });
        }

        result = cloneElement(child, {
          children: deepMap(child.props.children, function (tab) {
            var key = "tabs-" + listIndex;
            var selected = selectedIndex === listIndex;
            var props = {
              tabRef: function tabRef(node) {
                _this2.tabNodes[key] = node;
              },
              id: _this2.tabIds[listIndex],
              panelId: _this2.panelIds[listIndex],
              selected: selected,
              focus: selected && (focus || wasTabFocused)
            };
            if (selectedTabClassName) props.selectedClassName = selectedTabClassName;
            if (disabledTabClassName) props.disabledClassName = disabledTabClassName;
            listIndex++;
            return cloneElement(tab, props);
          })
        });
      } else if (isTabPanel(child)) {
        var props = {
          id: _this2.panelIds[index],
          tabId: _this2.tabIds[index],
          selected: selectedIndex === index
        };
        if (forceRenderTabPanel) props.forceRender = forceRenderTabPanel;
        if (selectedTabPanelClassName) props.selectedClassName = selectedTabPanelClassName;
        index++;
        result = cloneElement(child, props);
      }

      return result;
    });
  };
  /**
   * Determine if a node from event.target is a Tab element for the current Tabs container.
   * If the clicked element is not a Tab, it returns false.
   * If it finds another Tabs container between the Tab and `this`, it returns false.
   */


  _proto.isTabFromContainer = function isTabFromContainer(node) {
    // return immediately if the clicked element is not a Tab.
    if (!isTabNode(node)) {
      return false;
    } // Check if the first occurrence of a Tabs container is `this` one.


    var nodeAncestor = node.parentElement;

    do {
      if (nodeAncestor === this.node) return true;
      if (nodeAncestor.getAttribute('data-tabs')) break;
      nodeAncestor = nodeAncestor.parentElement;
    } while (nodeAncestor);

    return false;
  };

  _proto.render = function render() {
    var _this3 = this; // Delete all known props, so they don't get added to DOM


    var _this$props3 = this.props,
        children = _this$props3.children,
        className = _this$props3.className,
        disabledTabClassName = _this$props3.disabledTabClassName,
        domRef = _this$props3.domRef,
        focus = _this$props3.focus,
        forceRenderTabPanel = _this$props3.forceRenderTabPanel,
        onSelect = _this$props3.onSelect,
        selectedIndex = _this$props3.selectedIndex,
        selectedTabClassName = _this$props3.selectedTabClassName,
        selectedTabPanelClassName = _this$props3.selectedTabPanelClassName,
        attributes = _objectWithoutPropertiesLoose$2(_this$props3, ["children", "className", "disabledTabClassName", "domRef", "focus", "forceRenderTabPanel", "onSelect", "selectedIndex", "selectedTabClassName", "selectedTabPanelClassName"]);

    return React.createElement("div", _extends$4({}, attributes, {
      className: classnames$1(className),
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      ref: function ref(node) {
        _this3.node = node;
        if (domRef) domRef(node);
      },
      "data-tabs": true
    }), this.getChildren());
  };

  return UncontrolledTabs;
}(Component);

UncontrolledTabs.defaultProps = {
  className: 'react-tabs',
  focus: false
};
UncontrolledTabs.propTypes = {};

function _objectWithoutPropertiesLoose$3(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _inheritsLoose$4(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
var MODE_CONTROLLED = 0;
var MODE_UNCONTROLLED = 1;

var Tabs =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose$4(Tabs, _Component);

  function Tabs(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this.handleSelected = function (index, last, event) {
      var onSelect = _this.props.onSelect;
      var mode = _this.state.mode; // Call change event handler

      if (typeof onSelect === 'function') {
        // Check if the change event handler cancels the tab change
        if (onSelect(index, last, event) === false) return;
      }

      var state = {
        // Set focus if the change was triggered from the keyboard
        focus: event.type === 'keydown'
      };

      if (mode === MODE_UNCONTROLLED) {
        // Update selected index
        state.selectedIndex = index;
      }

      _this.setState(state);
    };

    _this.state = Tabs.copyPropsToState(_this.props, {}, props.defaultFocus);
    return _this;
  }

  Tabs.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    return Tabs.copyPropsToState(props, state);
  };

  Tabs.getModeFromProps = function getModeFromProps(props) {
    return props.selectedIndex === null ? MODE_UNCONTROLLED : MODE_CONTROLLED;
  }; // preserve the existing selectedIndex from state.
  // If the state has not selectedIndex, default to the defaultIndex or 0


  Tabs.copyPropsToState = function copyPropsToState(props, state, focus) {
    if (focus === void 0) {
      focus = false;
    }

    var newState = {
      focus: focus,
      mode: Tabs.getModeFromProps(props)
    };

    if (newState.mode === MODE_UNCONTROLLED) {
      var maxTabIndex = getTabsCount(props.children) - 1;
      var selectedIndex = null;

      if (state.selectedIndex != null) {
        selectedIndex = Math.min(state.selectedIndex, maxTabIndex);
      } else {
        selectedIndex = props.defaultIndex || 0;
      }

      newState.selectedIndex = selectedIndex;
    }

    return newState;
  };

  var _proto = Tabs.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        defaultIndex = _this$props.defaultIndex,
        defaultFocus = _this$props.defaultFocus,
        props = _objectWithoutPropertiesLoose$3(_this$props, ["children", "defaultIndex", "defaultFocus"]);

    var _this$state = this.state,
        focus = _this$state.focus,
        selectedIndex = _this$state.selectedIndex;
    props.focus = focus;
    props.onSelect = this.handleSelected;

    if (selectedIndex != null) {
      props.selectedIndex = selectedIndex;
    }

    return React.createElement(UncontrolledTabs, props, children);
  };

  return Tabs;
}(Component);

Tabs.defaultProps = {
  defaultFocus: false,
  forceRenderTabPanel: false,
  selectedIndex: null,
  defaultIndex: null
};
Tabs.propTypes = {};
Tabs.tabsRole = 'Tabs';

function _extends$5() {
  _extends$5 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$5.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$4(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _inheritsLoose$5(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var TabList =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose$5(TabList, _Component);

  function TabList() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = TabList.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        attributes = _objectWithoutPropertiesLoose$4(_this$props, ["children", "className"]);

    return React.createElement("ul", _extends$5({}, attributes, {
      className: classnames$1(className),
      role: "tablist"
    }), children);
  };

  return TabList;
}(Component);

TabList.defaultProps = {
  className: 'react-tabs__tab-list'
};
TabList.propTypes = {};
TabList.tabsRole = 'TabList';

function _extends$6() {
  _extends$6 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$6.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$5(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _inheritsLoose$6(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
var DEFAULT_CLASS = 'react-tabs__tab';

var Tab =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose$6(Tab, _Component);

  function Tab() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Tab.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.checkFocus();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.checkFocus();
  };

  _proto.checkFocus = function checkFocus() {
    var _this$props = this.props,
        selected = _this$props.selected,
        focus = _this$props.focus;

    if (selected && focus) {
      this.node.focus();
    }
  };

  _proto.render = function render() {
    var _cx,
        _this = this;

    var _this$props2 = this.props,
        children = _this$props2.children,
        className = _this$props2.className,
        disabled = _this$props2.disabled,
        disabledClassName = _this$props2.disabledClassName,
        focus = _this$props2.focus,
        id = _this$props2.id,
        panelId = _this$props2.panelId,
        selected = _this$props2.selected,
        selectedClassName = _this$props2.selectedClassName,
        tabIndex = _this$props2.tabIndex,
        tabRef = _this$props2.tabRef,
        attributes = _objectWithoutPropertiesLoose$5(_this$props2, ["children", "className", "disabled", "disabledClassName", "focus", "id", "panelId", "selected", "selectedClassName", "tabIndex", "tabRef"]);

    return React.createElement("li", _extends$6({}, attributes, {
      className: classnames$1(className, (_cx = {}, _cx[selectedClassName] = selected, _cx[disabledClassName] = disabled, _cx)),
      ref: function ref(node) {
        _this.node = node;
        if (tabRef) tabRef(node);
      },
      role: "tab",
      id: id,
      "aria-selected": selected ? 'true' : 'false',
      "aria-disabled": disabled ? 'true' : 'false',
      "aria-controls": panelId,
      tabIndex: tabIndex || (selected ? '0' : null)
    }), children);
  };

  return Tab;
}(Component);

Tab.defaultProps = {
  className: DEFAULT_CLASS,
  disabledClassName: DEFAULT_CLASS + "--disabled",
  focus: false,
  id: null,
  panelId: null,
  selected: false,
  selectedClassName: DEFAULT_CLASS + "--selected"
};
Tab.propTypes = {};
Tab.tabsRole = 'Tab';

function _extends$7() {
  _extends$7 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$7.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$6(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _inheritsLoose$7(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
var DEFAULT_CLASS$1 = 'react-tabs__tab-panel';

var TabPanel =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose$7(TabPanel, _Component);

  function TabPanel() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = TabPanel.prototype;

  _proto.render = function render() {
    var _cx;

    var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        forceRender = _this$props.forceRender,
        id = _this$props.id,
        selected = _this$props.selected,
        selectedClassName = _this$props.selectedClassName,
        tabId = _this$props.tabId,
        attributes = _objectWithoutPropertiesLoose$6(_this$props, ["children", "className", "forceRender", "id", "selected", "selectedClassName", "tabId"]);

    return React.createElement("div", _extends$7({}, attributes, {
      className: classnames$1(className, (_cx = {}, _cx[selectedClassName] = selected, _cx)),
      role: "tabpanel",
      id: id,
      "aria-labelledby": tabId
    }), forceRender || selected ? children : null);
  };

  return TabPanel;
}(Component);

TabPanel.defaultProps = {
  className: DEFAULT_CLASS$1,
  forceRender: false,
  selectedClassName: DEFAULT_CLASS$1 + "--selected"
};
TabPanel.propTypes = {};
TabPanel.tabsRole = 'TabPanel';

function _templateObject$c() {
  var data = _taggedTemplateLiteral(["\n  margin-bottom: ", ";\n\n  .react-tabs__tab-list {\n    position: relative;\n    top: 1px;\n    display: flex;\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n  }\n\n  .react-tabs__tab {\n    margin-right: ", ";\n    padding: ", " ", ";\n    font-size: ", ";\n    background-color: ", ";\n    border: 1px solid ", ";\n    border-bottom: 1px solid ", ";\n    border-top-left-radius: ", ";\n    border-top-right-radius: ", ";\n    cursor: pointer;\n    &:hover {\n      text-decoration: underline;\n    }\n  }\n\n  .react-tabs__tab--selected {\n    color: ", ";\n    background-color: ", ";\n  }\n\n  .react-tabs__tab-panel--selected {\n    padding: ", ";\n    border: 1px solid ", ";\n    border-top-right-radius: ", ";\n    border-bottom-right-radius: ", ";\n    border-bottom-left-radius: ", ";\n  }\n"]);

  _templateObject$c = function _templateObject() {
    return data;
  };

  return data;
}

var Tabs$1 =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Tabs$$1, _React$PureComponent);

  function Tabs$$1() {
    _classCallCheck(this, Tabs$$1);

    return _possibleConstructorReturn(this, _getPrototypeOf(Tabs$$1).apply(this, arguments));
  }

  _createClass(Tabs$$1, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          data = _this$props.data,
          defaultIndex = _this$props.defaultIndex,
          onSelect = _this$props.onSelect,
          selectedIndex = _this$props.selectedIndex;
      var tabs = data.map(function (item, index) {
        return React.createElement(Tab, {
          key: index
        }, item.tab);
      });
      var tabContents = data.map(function (item) {
        return React.createElement(TabPanel, {
          key: item.key
        }, item.panel);
      });

      var props = _objectSpread({
        onSelect: onSelect
      }, typeof selectedIndex === "number" ? {
        selectedIndex: selectedIndex
      } : {
        defaultIndex: defaultIndex
      });

      return React.createElement(StyledTabs, props, React.createElement(TabList, null, tabs), tabContents);
    }
  }]);

  return Tabs$$1;
}(React.PureComponent);

Tabs$1.propTypes = {
  onSelect: PropTypes.func,
  selectedIndex: PropTypes.number,
  defaultIndex: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    tab: PropTypes.node.isRequired,
    panel: PropTypes.node.isRequired
  })).isRequired
};
Tabs$1.defaultProps = {
  defaultIndex: 0,
  onSelect: function onSelect() {}
};
var StyledTabs = styled(Tabs)(_templateObject$c(), spacing.large, spacing.tiny, spacing.small, spacing.base, fonts.sizeH6, colors.darkBackground, colors.elementBorder, colors.primaryBackground, box.lightBorderRadius, box.lightBorderRadius, colors.primaryText, colors.primaryBackground, spacing.base, colors.primaryBackground, box.borderRadius, box.borderRadius, box.borderRadius);

var Tag = function Tag(props) {
  return React.createElement("div", _extends({
    className: "tag ".concat(getFlavor(props, "tag"))
  }, cleanProps$1(props)));
};

Tag.propTypes = _objectSpread({}, propTypes, {
  children: PropTypes.node.isRequired
});
Tag.defaultProps = _objectSpread({}, defaultProps$1);

var alertTriangle = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var _react2 = _interopRequireDefault(React);



var _propTypes2 = _interopRequireDefault(PropTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}

var AlertTriangle = function AlertTriangle(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement('svg', _extends({
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, otherProps), _react2.default.createElement('path', {
    d: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'
  }), _react2.default.createElement('line', {
    x1: '12',
    y1: '9',
    x2: '12',
    y2: '13'
  }), _react2.default.createElement('line', {
    x1: '12',
    y1: '17',
    x2: '12',
    y2: '17'
  }));
};

AlertTriangle.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};
AlertTriangle.defaultProps = {
  color: 'currentColor',
  size: '24'
};
exports.default = AlertTriangle;
});

var IconWarning = unwrapExports(alertTriangle);

var info = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var _react2 = _interopRequireDefault(React);



var _propTypes2 = _interopRequireDefault(PropTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}

var Info = function Info(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement('svg', _extends({
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, otherProps), _react2.default.createElement('circle', {
    cx: '12',
    cy: '12',
    r: '10'
  }), _react2.default.createElement('line', {
    x1: '12',
    y1: '16',
    x2: '12',
    y2: '12'
  }), _react2.default.createElement('line', {
    x1: '12',
    y1: '8',
    x2: '12',
    y2: '8'
  }));
};

Info.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};
Info.defaultProps = {
  color: 'currentColor',
  size: '24'
};
exports.default = Info;
});

var IconInfo = unwrapExports(info);

var check = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var _react2 = _interopRequireDefault(React);



var _propTypes2 = _interopRequireDefault(PropTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}

var Check = function Check(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement('svg', _extends({
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, otherProps), _react2.default.createElement('polyline', {
    points: '20 6 9 17 4 12'
  }));
};

Check.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};
Check.defaultProps = {
  color: 'currentColor',
  size: '24'
};
exports.default = Check;
});

var IconSuccess = unwrapExports(check);

var _this = undefined;

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-grow: 0;\n  align-items: flex-start;\n  justify-content: center;\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  flex-grow: 1;\n  align-self: center;\n  padding: ", ";\n  color: ", ";\n  text-align: left;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n      background-color: ", ";\n    "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-grow: 0;\n  align-items: flex-start;\n  justify-content: center;\n  padding: ", ";\n  font-size: ", ";\n\n  ", "\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n      animation: ", ";\n      border-color: ", ";\n      box-shadow: ", ";\n    "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$2() {
  var data = _taggedTemplateLiteral(["\n          ", " 0.5s ease-out\n        "]);

  _templateObject5$2 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$5() {
  var data = _taggedTemplateLiteral(["\n          ", " 0.3s ease-out\n        "]);

  _templateObject4$5 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$6() {
  var data = _taggedTemplateLiteral(["\n          ", " 0.5s ease-out\n        "]);

  _templateObject3$6 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$8() {
  var data = _taggedTemplateLiteral(["\n          ", " 0.3s ease-out\n        "]);

  _templateObject2$8 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$d() {
  var data = _taggedTemplateLiteral(["\n  box-sizing: border-box;\n  display: inline-flex;\n  justify-content: space-between;\n  min-height: 48px;\n  width: ", ";\n  background-color: white;\n  border-style: solid;\n  border-width: 1px;\n  border-radius: ", ";\n  ", ";\n"]);

  _templateObject$d = function _templateObject() {
    return data;
  };

  return data;
}

var Toast = function Toast(_ref) {
  var animate = _ref.animate,
      children = _ref.children,
      className = _ref.className,
      onRemove = _ref.onRemove,
      timeout = _ref.timeout,
      type = _ref.type,
      wide = _ref.wide;
  var timer = null;
  var Icon = IconInfo;
  if (type === "warning") Icon = IconWarning;
  if (type === "success") Icon = IconSuccess;
  useEffect(function () {
    if (timer) {
      clearTimeout(_this.timer);
    }

    if (timeout) {
      timer = setTimeout(onRemove, timeout);
    }

    return function () {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timeout]);
  return React.createElement(StyledToast, {
    animate: animate,
    type: type,
    wide: wide,
    className: className
  }, React.createElement(IconWrapper, {
    type: type
  }, React.createElement(Icon, null)), React.createElement(Content, {
    role: "alert"
  }, children), onRemove ? React.createElement(ButtonWrapper, null, React.createElement(StyledButton, {
    variant: "icon",
    onClick: onRemove
  }, React.createElement(IconClose, null))) : null);
};

Toast.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(["warning", "success", "info"]),
  wide: PropTypes.bool,
  shadow: PropTypes.bool,
  animate: PropTypes.oneOf(["from-top", "from-right", "from-bottom", "from-left"]),
  timeout: PropTypes.number,
  onRemove: PropTypes.func,
  children: PropTypes.node.isRequired
};
Toast.defaultProps = {
  wide: false,
  type: "info",
  animate: null,
  onRemove: null
};
var StyledToast = styled.div(_templateObject$d(), function (props) {
  return props.wide ? "100%" : "auto";
}, box.borderRadius, function (props) {
  var animation = "none";
  var borderColor = colors["".concat(props.type, "Background")];

  if (props.animate) {
    if (props.animate === "from-top") {
      animation = css(_templateObject2$8(), fromTop);
    } else if (props.animate === "from-right") {
      animation = css(_templateObject3$6(), fromRight);
    } else if (props.animate === "from-bottom") {
      animation = css(_templateObject4$5(), fromBottom);
    } else if (props.animate === "from-left") {
      animation = css(_templateObject5$2(), fromLeft);
    }
  }

  return css(_templateObject6(), animation, borderColor, props.shadow ? box.shadow : "none");
});
var IconWrapper = styled.div(_templateObject7(), spacing.base, fonts.sizeH1, function (props) {
  var backgroundColor = colors.infoBackground;

  if (props.type === "warning") {
    backgroundColor = colors.warningBackground;
  }

  if (props.type === "success") {
    backgroundColor = colors.successBackground;
  }

  return css(_templateObject8(), backgroundColor);
});
var Content = styled.div(_templateObject9(), spacing.base, colors.darkText);
var ButtonWrapper = styled.div(_templateObject10());

export { index as icons, keyframes$1 as keyframes, List, ListItem, Modal, ModalContentWrapper, theme, Container, Section, Wrapper, Accordion$1 as Accordion, Alert, AsideTitle, Badge, StyledButton as Button, BreadCrumbs, Cards, Card, Categories, Category, LargeLink, SrOnly, Tabs$1 as Tabs, Tag, Toast, VerticalArrow };
