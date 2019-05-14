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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProblemForm = function (_Component) {
	_inherits(ProblemForm, _Component);

	function ProblemForm(props) {
		_classCallCheck(this, ProblemForm);

		var _this = _possibleConstructorReturn(this, (ProblemForm.__proto__ || Object.getPrototypeOf(ProblemForm)).call(this, props));

		_this.state = {
			shortdescription: "",
			fulldescription: "",
			room: "main",
			priority: "red"
		};
		_this.handleInputChange = _this.handleInputChange.bind(_this);
		_this.addProblem = _this.addProblem.bind(_this);
		return _this;
	}

	_createClass(ProblemForm, [{
		key: 'handleInputChange',
		value: function handleInputChange(event) {
			var target = event.target;
			var name = target.name;

			this.setState(_defineProperty({}, name, target.value));
		}
	}, {
		key: 'addProblem',
		value: function addProblem() {
			if (this.state.shortdescription === "") {
				alert("Short description must be filled");
			} else {
				var problem = {
					room: this.state.room,
					compactdesc: this.state.shortdescription,
					fulldesc: this.state.fulldescription !== "" ? this.state.fulldescription : "Have not details :(",
					priority: this.state.priority === "red" ? 1 : this.state.priority === "orange" ? 2 : 3
				};
				this.props.submit(problem);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _state = this.state,
			    shortdescription = _state.shortdescription,
			    fulldescription = _state.fulldescription,
			    room = _state.room,
			    priority = _state.priority;

			return _react2.default.createElement(
				'div',
				{ style: { height: "100%", display: "flex", flexDirection: "column", width: "100%" } },
				_react2.default.createElement(
					'div',
					{ className: 'FirstRowHolder' },
					_react2.default.createElement(
						'label',
						{ className: 'ShortDescLabel' },
						'Short description:',
						_react2.default.createElement('input', {
							type: 'text',
							value: shortdescription,
							placeholder: 'Short description',
							name: 'shortdescription',
							onChange: this.handleInputChange })
					),
					_react2.default.createElement(
						'label',
						{ className: 'RoomSelectLabel' },
						'Room:',
						_react2.default.createElement(
							'select',
							{
								value: room,
								name: 'room',
								onChange: this.handleInputChange },
							_react2.default.createElement(
								'option',
								{ value: 'wc' },
								'WC'
							),
							_react2.default.createElement(
								'option',
								{ value: 'kitchen' },
								'Kitchen'
							),
							_react2.default.createElement(
								'option',
								{ value: 'bigcnc' },
								'Big CNC room'
							),
							_react2.default.createElement(
								'option',
								{ value: 'main' },
								'Main room'
							),
							_react2.default.createElement(
								'option',
								{ value: 'welding' },
								'Welding room'
							),
							_react2.default.createElement(
								'option',
								{ value: 'dusty' },
								'Dusty room'
							)
						)
					),
					_react2.default.createElement(
						'label',
						{ className: 'PrioritySelectLabel' },
						'Priority:',
						_react2.default.createElement(
							'select',
							{
								value: priority,
								name: 'priority',
								onChange: this.handleInputChange },
							_react2.default.createElement(
								'option',
								{ value: 'yellow' },
								'Yellow'
							),
							_react2.default.createElement(
								'option',
								{ value: 'orange' },
								'Orange'
							),
							_react2.default.createElement(
								'option',
								{ value: 'red' },
								'Red'
							)
						)
					)
				),
				_react2.default.createElement(
					'label',
					{ className: 'FullDescLabel' },
					'Full description:',
					_react2.default.createElement(
						'textarea',
						{
							placeholder: 'Full description',
							name: 'fulldescription',
							onChange: this.handleInputChange },
						fulldescription
					),
					_react2.default.createElement(
						'button',
						{ onClick: this.addProblem },
						'Add problem'
					)
				)
			);
		}
	}]);

	return ProblemForm;
}(_react.Component);

ProblemForm.propTypes = {
	submit: _propTypes2.default.func
};

ProblemForm.defaultProps = {
	submit: function submit() {}
};

exports.default = ProblemForm;