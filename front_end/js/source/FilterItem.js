import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FilterItem extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onClck(this.props.index);
  }


  render() {

    var checkedClass = this.props.isChecked ? 'is-checked' : '';

    const classString = `${this.props.classString} ${checkedClass}`;

    return(
      <div className={classString.trim()} onClick={this.handleClick}>
        <label>{this.props.text}</label>
      </div>
    );
  }
}

FilterItem.propTypes = {
  text: PropTypes.string,
  isChecked: PropTypes.bool,
  onClck: PropTypes.func,
  classString: PropTypes.string,
}

FilterItem.defaultProps = {
  text: "",
  isChecked: false,
  onClck: () => {},
  classString: "FilterItem",
};

export default FilterItem;