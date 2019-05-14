'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _Collapsible = require('./Collapsible');

var _Collapsible2 = _interopRequireDefault(_Collapsible);

var _Zones = require('./Zones');

var _Zones2 = _interopRequireDefault(_Zones);

var _FilterItem = require('./FilterItem');

var _FilterItem2 = _interopRequireDefault(_FilterItem);

var _ProblemForm = require('./ProblemForm');

var _ProblemForm2 = _interopRequireDefault(_ProblemForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.toggleFilter = _this.toggleFilter.bind(_this);
    _this.toggleModal = _this.toggleModal.bind(_this);
    _this.clearFIlter = _this.clearFIlter.bind(_this);
    _this.submitAddProblem = _this.submitAddProblem.bind(_this);
    _this.state = {
      items: [],
      isOpen: false,
      roomNames: { main: "Main room",
        dusty: "Dusty room",
        bigcnc: "Big CNC room",
        welding: "Welding room",
        wc: "WC",
        kitchen: "Kitchen" },
      filterOptions: ["main", "dusty", "bigcnc", "welding", "wc", "kitchen"],
      filterIndex: null,
      labelColor: ["red", "orange", "yellow"]
    };
    return _this;
  }

  _createClass(App, [{
    key: 'toggleModal',
    value: function toggleModal(event) {
      var isOpen = this.state.isOpen;

      this.setState({ isOpen: !isOpen });
    }
  }, {
    key: 'allProblems',
    value: function allProblems() {
      alert("allProblems");
    }
  }, {
    key: 'submitAddProblem',
    value: function submitAddProblem(problem) {
      //console.log(problem);
      var URL = window.location.href + "data";
      var xhr = new XMLHttpRequest();
      xhr.open("POST", URL, true);
      xhr.setRequestHeader("Content-type", "application/json");

      xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
          var data = JSON.parse(xhr.response);
          //console.log(data);
          this.setState({
            items: data
          });
        }
      }.bind(this);
      console.log(JSON.stringify(problem));
      xhr.send(JSON.stringify(problem));
    }
  }, {
    key: 'toggleFilter',
    value: function toggleFilter(index) {
      if (index === this.state.filterIndex) {
        this.setState({ filterIndex: null });
      } else {
        this.setState({ filterIndex: index });
      }
    }
  }, {
    key: 'clearFIlter',
    value: function clearFIlter() {
      this.setState({ filterIndex: null });
    }
  }, {
    key: 'deleteItem',
    value: function deleteItem(id, event) {
      if (confirm("Are you sure you want to delete this item?")) {
        var URL = window.location.href + "data/" + id.toString();
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", URL, true);
        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var data = JSON.parse(xhr.response);
              //console.log(data);
              this.setState({
                items: data
              });
              //alert(data);
            } else {
              console.error(xhr.statusText);
            }
          }
        }.bind(this);

        xhr.onerror = function (e) {
          console.error(xhr.statusText);
        };
        xhr.send(null);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var URL = window.location.href + "data";
      var xhr = new XMLHttpRequest();
      xhr.open("GET", URL, true);
      xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var data = JSON.parse(xhr.response);
            //console.log(data);
            this.setState({
              items: data
            });
            //alert(data);
          } else {
            console.error(xhr.statusText);
          }
        }
      }.bind(this);

      xhr.onerror = function (e) {
        console.error(xhr.statusText);
      };
      xhr.send(null);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          isOpen = _state.isOpen,
          filterOptions = _state.filterOptions,
          roomNames = _state.roomNames,
          filterIndex = _state.filterIndex,
          labelColor = _state.labelColor,
          items = _state.items;
      //const filterOption = filterIndex !== null ? filterOptions[filterIndex];

      var filtered = filterIndex !== null ? items.filter(function (data) {
        if (data.room.toLowerCase() === filterOptions[filterIndex].toLowerCase()) {
          return data;
        }return false;
      }) : items;

      var colorsZones = { main: null,
        dusty: null,
        bigcnc: null,
        welding: null,
        wc: null,
        kitchen: null };
      filterOptions.map(function (filterOption) {
        items.map(function (item) {
          if (item.room.toLowerCase() === filterOption.toLowerCase() && item.priority === 3) {
            colorsZones[filterOption] = "yellow";
          }
          return true;
        });
        items.map(function (item) {
          if (item.room.toLowerCase() === filterOption.toLowerCase() && item.priority === 2) {
            colorsZones[filterOption] = "orange";
          }
          return true;
        });
        items.map(function (item) {
          if (item.room.toLowerCase() === filterOption.toLowerCase() && item.priority === 1) {
            colorsZones[filterOption] = "red";
          }
          return true;
        });
        return true;
      });
      return _react2.default.createElement(
        'div',
        { className: 'allsite' },
        _react2.default.createElement(
          'div',
          { className: 'header' },
          _react2.default.createElement(
            'label',
            { className: 'mainLabel' },
            'HackLab Problems'
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.toggleModal, className: 'butt' },
            'All Problems'
          )
        ),
        _react2.default.createElement(
          'div',
          { onClick: this.toggleModal, className: 'mybody' },
          _react2.default.createElement(_Zones2.default, { colorsZones: colorsZones })
        ),
        _react2.default.createElement(
          _Modal2.default,
          {
            id: 'modal_with_forms',
            isOpen: isOpen,
            className: 'Modal',
            shouldFocusAfterRender: false,
            shouldCloseOnOverlayClick: true,
            ariaHideApp: false,
            onRequestClose: this.toggleModal,
            aria: {
              labelledby: "heading",
              describedby: "fulldescription"
            } },
          _react2.default.createElement(
            'div',
            { className: 'gridcontainer' },
            _react2.default.createElement(
              'div',
              { className: 'left' },
              filterOptions.map(function (filterOptionName, i) {
                return _react2.default.createElement(_FilterItem2.default, {
                  key: i,
                  isChecked: _this2.state.filterIndex === i,
                  text: roomNames[filterOptionName],
                  index: i,
                  onClck: _this2.toggleFilter });
              }),
              _react2.default.createElement(
                'div',
                { style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                    marginTop: "10px",
                    border: "1.5px solid #3500F3",
                    borderRadius: "5px",
                    padding: "10px",
                    color: "white",
                    background: "#353535" },
                  onClick: this.clearFIlter },
                'Clear filter'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'middle' },
              _react2.default.createElement(
                _Collapsible2.default,
                {
                  trigger: 'Add problem',
                  classParentString: 'AddProblemCollapsible',
                  transitionTime: 300,
                  open: false
                },
                _react2.default.createElement(_ProblemForm2.default, { submit: this.submitAddProblem })
              ),
              _react2.default.createElement(
                'div',
                { className: 'listHolder' },
                filtered.sort(function (a, b) {
                  return a.priority - b.priority;
                }).map(function (_ref, i) {
                  var id = _ref.id,
                      compactdesc = _ref.compactdesc,
                      fulldesc = _ref.fulldesc,
                      priority = _ref.priority,
                      room = _ref.room;

                  var trg = compactdesc.toString() + " | " + roomNames[room.toLowerCase()].toString();
                  return _react2.default.createElement(
                    _Collapsible2.default,
                    {
                      key: id,
                      trigger: trg,
                      transitionTime: 200,
                      triggerStyle: { background: labelColor[priority - 1] } },
                    _react2.default.createElement(
                      'div',
                      null,
                      fulldesc,
                      _react2.default.createElement(
                        'button',
                        { key: id, className: 'removeButton', onClick: _this2.deleteItem.bind(_this2, id) },
                        'Remove'
                      )
                    )
                  );
                })
              )
            )
          )
        )
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;