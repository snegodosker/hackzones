'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FilterItem = function (_Component) {
  _inherits(FilterItem, _Component);

  function FilterItem(props) {
    _classCallCheck(this, FilterItem);

    var _this = _possibleConstructorReturn(this, (FilterItem.__proto__ || Object.getPrototypeOf(FilterItem)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(FilterItem, [{
    key: 'handleClick',
    value: function handleClick() {
      this.props.onClck(this.props.index);
    }
  }, {
    key: 'render',
    value: function render() {

      var checkedClass = this.props.isChecked ? 'is-checked' : '';

      var classString = this.props.classString + ' ' + checkedClass;

      return _react2.default.createElement(
        'div',
        { className: classString.trim(), onClick: this.handleClick },
        _react2.default.createElement(
          'label',
          null,
          this.props.text
        )
      );
    }
  }]);

  return FilterItem;
}(_react.Component);

FilterItem.propTypes = {
  text: _propTypes2.default.string,
  isChecked: _propTypes2.default.bool,
  onClck: _propTypes2.default.func,
  classString: _propTypes2.default.string
};

FilterItem.defaultProps = {
  text: "",
  isChecked: false,
  onClck: function onClck() {},
  classString: "FilterItem"
};

exports.default = FilterItem;